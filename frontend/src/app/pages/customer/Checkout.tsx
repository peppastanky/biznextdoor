import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { CheckCircle2, CreditCard, Wallet } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, updateWallet } = useUser();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = 2;
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    if (!user?.wallet || user.wallet < total) {
      toast.error("Insufficient wallet balance");
      return;
    }

    // Process payment
    updateWallet(-total);
    setPaymentSuccess(true);

    // Show success notification
    toast.success("Payment successful! Your order has been confirmed.");

    // Clear cart after delay
    setTimeout(() => {
      clearCart();
      navigate("/customer");
    }, 3000);
  };

  if (cart.length === 0 && !paymentSuccess) {
    navigate("/customer/cart");
    return null;
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-[600px] flex items-center justify-center px-6">
        <Card className="p-12 max-w-md text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-3xl mb-3">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed. You will receive a notification with the details.
          </p>
          <p className="text-sm text-gray-500">Redirecting to home...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-8">Checkout</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl mb-4">Order Items</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.businessName}</p>
                    {item.timeslot && (
                      <p className="text-sm text-gray-600 mt-1">
                        Timeslot: {item.timeslot}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <h2 className="text-xl mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="border border-gray-300 p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-medium">Wallet Balance</p>
                    <p className="text-sm text-gray-600">
                      Available: ${user?.wallet?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked
                    readOnly
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl mb-6">Payment Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span>Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={!user?.wallet || user.wallet < total}
            >
              Pay ${total.toFixed(2)}
            </Button>

            {user?.wallet && user.wallet < total && (
              <p className="text-sm text-red-600 mt-3 text-center">
                Insufficient balance. Please top up your wallet.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
