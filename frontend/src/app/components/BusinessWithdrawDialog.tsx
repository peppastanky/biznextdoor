import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle, Loader2, CreditCard, Trash2, Plus, ChevronLeft } from "lucide-react";
import { useUser } from "../context/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const SERVER = "https://biznextdoor.onrender.com";

interface PaymentMethod {
  id: string;
  card: { brand: string; last4: string; exp_month: number; exp_year: number };
}

interface BusinessWithdrawDialogProps {
  open: boolean;
  onClose: () => void;
}

function AddCardForm({ customerId, onSaved, onBack }: { customerId: string; onSaved: () => void; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!stripe || !elements) return;
    setSaving(true);
    try {
      const res = await fetch(`${SERVER}/create-setup-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });
      const { clientSecret, error: serverError } = await res.json();
      if (serverError) throw new Error(serverError);
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");
      const { error } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: { card: cardElement },
      });
      if (error) throw new Error(error.message);
      toast.success("Card saved");
      onSaved();
    } catch (err) {
      toast.error((err as Error).message || "Failed to save card");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-black/5 rounded-xl p-4">
        <CardElement
          options={{
            style: {
              base: { fontSize: "14px", color: "#000", "::placeholder": { color: "#00000040" } },
            },
          }}
        />
      </div>
      <Button className="w-full rounded-full" onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Card"}
      </Button>
      <button onClick={onBack} className="w-full text-sm text-black/40 hover:text-black transition-colors flex items-center justify-center gap-1">
        <ChevronLeft className="w-3 h-3" /> Back
      </button>
    </div>
  );
}

export default function BusinessWithdrawDialog({ open, onClose }: BusinessWithdrawDialogProps) {
  const { user, updateWallet } = useUser();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"amount" | "method" | "add-card" | "success">("amount");
  const [loading, setLoading] = useState(false);
  const [methodsLoading, setMethodsLoading] = useState(false);

  const balance = user?.bank || 0;

  useEffect(() => {
    if (!open) return;
    setStep("amount");
    setAmount("");
  }, [open]);

  async function loadMethods() {
    if (!user) return;
    setMethodsLoading(true);
    try {
      const res = await fetch(`${SERVER}/get-or-create-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, email: user.email }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCustomerId(data.customerId);
      const pmRes = await fetch(`${SERVER}/list-payment-methods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: data.customerId }),
      });
      const pmData = await pmRes.json();
      setPaymentMethods(pmData.paymentMethods || []);
    } catch {
      toast.error("Could not connect to server");
    } finally {
      setMethodsLoading(false);
    }
  }

  function goToMethod() {
    const value = parseFloat(amount);
    if (!value || value < 1) { toast.error("Minimum withdrawal is $1"); return; }
    if (value > balance) { toast.error("Insufficient balance"); return; }
    setStep("method");
    loadMethods();
  }

  async function handleWithdraw(pmId: string) {
    setLoading(true);
    // Simulate processing delay (mock payout)
    await new Promise((r) => setTimeout(r, 1500));
    updateWallet(-parseFloat(amount));
    setStep("success");
    setLoading(false);
  }

  async function handleDeleteCard(pmId: string) {
    try {
      await fetch(`${SERVER}/delete-payment-method`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: pmId }),
      });
      setPaymentMethods((prev) => prev.filter((m) => m.id !== pmId));
      toast.success("Card removed");
    } catch {
      toast.error("Failed to remove card");
    }
  }

  function handleClose() {
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="rounded-3xl border-black/5 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tighter">
            {step === "success" ? "Withdrawal Requested" : "Withdraw Funds"}
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Enter amount */}
        {step === "amount" && (
          <div className="space-y-6 pt-2">
            <div className="p-4 bg-black/5 rounded-2xl flex items-center justify-between">
              <p className="text-xs text-black/40 font-semibold uppercase tracking-widest">Available</p>
              <p className="text-lg font-bold tracking-tight">${balance.toFixed(2)}</p>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Amount (SGD)</p>
              <div className="flex items-center bg-black/5 rounded-xl overflow-hidden">
                <span className="pl-4 text-black/40 font-medium text-sm select-none">$</span>
                <input
                  type="number"
                  min="1"
                  max={balance}
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent py-3 pr-4 pl-1 text-sm font-semibold outline-none placeholder:text-black/20"
                />
              </div>
              <div className="flex gap-2">
                {[50, 100, 200, balance].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setAmount(String(p))}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      amount === String(p) ? "bg-black text-white" : "bg-black/5 hover:bg-black hover:text-white"
                    }`}
                  >
                    {i === 3 ? "All" : `$${p}`}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full rounded-full"
              onClick={goToMethod}
              disabled={!amount || parseFloat(amount) > balance}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Choose payout card */}
        {step === "method" && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Withdraw To</p>
              <p className="text-sm font-bold">${amount}</p>
            </div>

            {methodsLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-black/30" />
              </div>
            ) : (
              <div className="space-y-2">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
                    <CreditCard className="w-4 h-4 text-black/40 shrink-0" strokeWidth={1.5} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold capitalize">{pm.card.brand} •••• {pm.card.last4}</p>
                      <p className="text-xs text-black/40">Expires {pm.card.exp_month}/{pm.card.exp_year}</p>
                    </div>
                    <button
                      onClick={() => handleWithdraw(pm.id)}
                      disabled={loading}
                      className="text-xs font-semibold bg-black text-white px-3 py-1.5 rounded-full hover:opacity-80 disabled:opacity-30 transition-all"
                    >
                      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Withdraw"}
                    </button>
                    <button onClick={() => handleDeleteCard(pm.id)} className="text-black/20 hover:text-black/60 transition-colors">
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setStep("add-card")}
                  className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-black/10 rounded-xl hover:border-black/30 transition-all duration-200"
                >
                  <Plus className="w-4 h-4 text-black/40" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-black/60">Add a card</span>
                </button>
              </div>
            )}

            <button onClick={() => setStep("amount")} className="w-full text-sm text-black/40 hover:text-black transition-colors flex items-center justify-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Back
            </button>
          </div>
        )}

        {/* Step 3: Add card */}
        {step === "add-card" && customerId && (
          <div className="pt-2">
            <Elements stripe={stripePromise}>
              <AddCardForm
                customerId={customerId}
                onSaved={() => { loadMethods(); setStep("method"); }}
                onBack={() => setStep("method")}
              />
            </Elements>
          </div>
        )}

        {/* Success */}
        {step === "success" && (
          <div className="space-y-4 pt-2 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.5} />
            </div>
            <p className="text-black/60">
              Your withdrawal of <span className="font-bold text-black">${amount}</span> has been submitted.
            </p>
            <p className="text-xs text-black/40">Funds will arrive within 3–5 business days.</p>
            <p className="text-2xl font-bold tracking-tighter">${user?.bank?.toFixed(2)}</p>
            <p className="text-xs text-black/40">Remaining Balance</p>
            <Button className="w-full rounded-full mt-2" onClick={handleClose}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
