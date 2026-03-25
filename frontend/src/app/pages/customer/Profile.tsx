import { useState, useRef } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Wallet, Star, Pencil, CheckCircle, Loader2 } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useReviews } from "../../context/ReviewContext";
import { useNavigate } from "react-router";
import { mockProducts, mockServices } from "../../data/mockData";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const SERVER_BASE = "https://biznextdoor.onrender.com";

export default function Profile() {
  const { user, updateWallet } = useUser();
  const navigate = useNavigate();
  const { reviews, addReview } = useReviews();

  const [reviewTarget, setReviewTarget] = useState<{ id: string; name: string; type: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Top-up state
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpStep, setTopUpStep] = useState<"amount" | "qr" | "success">("amount");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const purchaseHistory = [
    { ...mockProducts[0], date: "2026-03-15", type: "product" },
    { ...mockServices[0], date: "2026-03-10", type: "service" },
    { ...mockProducts[1], date: "2026-03-05", type: "product" },
  ];

  async function handleTopUp() {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount < 1) {
      toast.error("Minimum top-up is $1");
      return;
    }
    setTopUpLoading(true);
    try {
      const res = await fetch(`${SERVER_BASE}/create-paynow-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const { paymentIntent, error } = await stripe.confirmPayNowPayment(data.clientSecret, {
        payment_method: {},
      });
      if (error) throw new Error(error.message);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qrUrl = (paymentIntent as any)?.next_action?.paynow_display_qr_code?.image_url_png;
      setQrImage(qrUrl || null);
      setTopUpStep("qr");

      // Poll for payment confirmation
      pollingRef.current = setInterval(async () => {
        const statusRes = await fetch(`${SERVER_BASE}/check-payment-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: data.paymentIntentId }),
        });
        const statusData = await statusRes.json();
        if (statusData.status === "succeeded") {
          clearInterval(pollingRef.current!);
          updateWallet(amount);
          setTopUpStep("success");
        }
      }, 3000);
    } catch (err) {
      const e = err as Error;
      toast.error(e.message || "Top-up failed");
    } finally {
      setTopUpLoading(false);
    }
  }

  function closeTopUp() {
    if (pollingRef.current) clearInterval(pollingRef.current);
    setTopUpOpen(false);
    setTopUpStep("amount");
    setTopUpAmount("");
    setQrImage(null);
  }

  function openReview(id: string, name: string, type: string) {
    setReviewTarget({ id, name, type });
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setReviewSuccess(false);
  }

  function handleSubmitReview() {
    if (!reviewTarget) return;
    addReview({
      ...reviewTarget,
      rating,
      text: reviewText,
      date: new Date().toISOString().slice(0, 10),
    });
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewTarget(null);
      setReviewSuccess(false);
    }, 1500);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Account</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Profile</h1>
      </div>

      {/* User Info + Wallet */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="p-8 relative flex flex-col justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full hover:bg-black/5"
            onClick={() => navigate("/customer/settings")}
          >
            <Pencil className="w-4 h-4 text-black/30" strokeWidth={1.5} />
          </Button>
          <div className="flex items-center gap-6 justify-center h-full">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl shrink-0">
              {user?.username?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight mb-1">{user?.username}</h2>
              <p className="text-base text-black/40 mb-1">{user?.email}</p>
              <p className="text-sm text-black/30">User since March 2026</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Wallet</h2>
            <Wallet className="w-6 h-6 text-black/30" />
          </div>
          <div className="flex items-end gap-3 mb-6">
            <p className="text-4xl">${user?.wallet?.toFixed(2) || "0.00"}</p>
            <p className="text-black/60 pb-1">Available Balance</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setTopUpOpen(true)}>Top Up</Button>
            <Button variant="outline">Withdraw</Button>
          </div>
        </Card>
      </div>

      {/* Top Up Dialog */}
      <Dialog open={topUpOpen} onOpenChange={(o) => { if (!o) closeTopUp(); }}>
        <DialogContent className="rounded-3xl border-black/5 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tighter">
              {topUpStep === "success" ? "Top Up Successful" : "Top Up Wallet"}
            </DialogTitle>
          </DialogHeader>

          {topUpStep === "amount" && (
            <div className="space-y-6 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Amount (SGD)</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 font-medium">$</span>
                  <Input
                    type="number"
                    min="1"
                    placeholder="0.00"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    className="pl-8 bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {[10, 20, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setTopUpAmount(String(preset))}
                    className="flex-1 py-2 rounded-xl bg-black/5 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-200"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <Button
                className="w-full rounded-full"
                onClick={handleTopUp}
                disabled={topUpLoading}
              >
                {topUpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue with PayNow"}
              </Button>
            </div>
          )}

          {topUpStep === "qr" && (
            <div className="space-y-6 pt-2 text-center">
              <p className="text-sm text-black/60">Scan this QR code with your banking app to pay <span className="font-bold text-black">${topUpAmount}</span> via PayNow.</p>
              {qrImage ? (
                <img src={qrImage} alt="PayNow QR" className="mx-auto w-48 h-48 rounded-2xl" />
              ) : (
                <div className="mx-auto w-48 h-48 rounded-2xl bg-black/5 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-black/30" />
                </div>
              )}
              <p className="text-xs text-black/40">Waiting for payment confirmation...</p>
              <div className="flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-black/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}

          {topUpStep === "success" && (
            <div className="space-y-4 pt-2 text-center">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-black" strokeWidth={1.5} />
              </div>
              <p className="text-black/60">
                <span className="font-bold text-black">${topUpAmount}</span> has been added to your wallet.
              </p>
              <p className="text-2xl font-bold tracking-tighter">${user?.wallet?.toFixed(2)}</p>
              <p className="text-xs text-black/40">New Balance</p>
              <Button className="w-full rounded-full mt-4" onClick={closeTopUp}>Done</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Purchase History - Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tighter mb-6">Product Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "product")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/product/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/product/${item.id}`)}
                    className="font-medium mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-black/60">{item.businessName}</p>
                  <p className="text-sm text-black/40 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm" onClick={() => openReview(item.id, item.name, "product")}>
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
        </Card>
      </div>

      {/* Purchase History - Services */}
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-6">Service Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "service")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/service/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/service/${item.id}`)}
                    className="font-medium mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-black/60">{item.businessName}</p>
                  <p className="text-sm text-black/40 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm" onClick={() => openReview(item.id, item.name, "service")}>
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
        </Card>
      </div>

      {/* My Reviews */}
      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tighter mb-6">My Reviews</h2>
          <Card className="divide-y">
            {reviews.map((review, index) => (
              <div key={index} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => navigate(`/customer/${review.type}/${review.id}`)}
                    className="font-medium hover:underline text-left"
                  >
                    {review.name}
                  </button>
                  <p className="text-sm text-black/30">{review.date}</p>
                </div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={review.rating >= star ? "#000" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                {review.text && <p className="text-sm text-black/60">{review.text}</p>}
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Review Dialog */}
      <Dialog open={!!reviewTarget} onOpenChange={() => setReviewTarget(null)}>
        <DialogContent className="rounded-3xl p-8 max-w-md">
          {reviewSuccess ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
              <p className="text-xl font-semibold">Review sent successfully!</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl tracking-tight">Leave a Review</DialogTitle>
                {reviewTarget && <p className="text-sm text-black/40 mt-1">{reviewTarget.name}</p>}
              </DialogHeader>

              <div className="flex gap-2 my-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className="w-8 h-8 transition-colors"
                      fill={(hoverRating || rating) >= star ? "#000" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full border border-black/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black/20"
              />

              <div className="flex gap-3 mt-2">
                <Button onClick={handleSubmitReview} disabled={rating === 0} className="flex-1">
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setReviewTarget(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
