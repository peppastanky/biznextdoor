import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = cart.length > 0 ? 2 : 0;
  const total = subtotal + serviceFee;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Your items</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Shopping Cart</h1>
      </div>

      {cart.length === 0 ? (
        <Card className="p-16 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-black/20" />
          <h2 className="text-2xl mb-2">Your cart is empty</h2>
          <p className="text-black/60 mb-6">Add some products to get started</p>
          <Link to="/customer/discover">
            <Button>Browse Products</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-black/60">{item.businessName}</p>
                        {item.timeslot && (
                          <p className="text-sm text-black/60 mt-1">
                            Timeslot: {item.timeslot}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-lg font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-bold tracking-tighter mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-black/60">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span>Total</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/customer/checkout">
                <Button className="w-full rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/customer/discover">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
