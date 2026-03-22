import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Wallet, MapPin, CheckCircle2 } from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function BusinessProfilePage() {
  const { user } = useUser();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Account</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Business Profile</h1>
      </div>

      {/* Business Info */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl">
            {user?.businessName?.[0].toUpperCase() || user?.username?.[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl">{user?.businessName || "My Business"}</h2>
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-black/60 mb-3">@{user?.username}</p>
            <p className="text-black/60 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              123 Main Street, Downtown
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t">
          <div>
            <p className="text-sm text-black/60 mb-1">Rating</p>
            <p className="text-2xl">4.8 ⭐</p>
          </div>
          <div>
            <p className="text-sm text-black/60 mb-1">Total Reviews</p>
            <p className="text-2xl">127</p>
          </div>
          <div>
            <p className="text-sm text-black/60 mb-1">Verified Business</p>
            <p className="text-2xl">Yes</p>
          </div>
        </div>
      </Card>

      {/* Bank */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Bank</h2>
          <Wallet className="w-6 h-6 text-black/30" />
        </div>
        <div className="flex items-end gap-3 mb-6">
          <p className="text-4xl">${user?.bank?.toFixed(2) || "0.00"}</p>
          <p className="text-black/60 pb-1">Available Balance</p>
        </div>
        <Button>Withdraw Funds</Button>
      </Card>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-6">Recent Transactions</h2>
        <Card className="divide-y">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Order Payment</p>
              <p className="text-sm text-black/60">Chocolate Cake - @john_doe</p>
              <p className="text-sm text-black/40 mt-1">March 18, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$35.00</p>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Service Payment</p>
              <p className="text-sm text-black/60">Gel Manicure - @sarah_smith</p>
              <p className="text-sm text-black/40 mt-1">March 17, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$40.00</p>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Order Payment</p>
              <p className="text-sm text-black/60">Croissants - @mike_jones</p>
              <p className="text-sm text-black/40 mt-1">March 16, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$12.00</p>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Withdrawal</p>
              <p className="text-sm text-black/60">Transfer to bank account</p>
              <p className="text-sm text-black/40 mt-1">March 15, 2026</p>
            </div>
            <p className="text-lg font-medium text-red-600">-$500.00</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
