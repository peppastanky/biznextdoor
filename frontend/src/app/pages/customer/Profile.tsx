import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Wallet, Star, Package, Calendar } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { mockProducts, mockServices } from "../../data/mockData";

export default function Profile() {
  const { user } = useUser();

  const purchaseHistory = [
    { ...mockProducts[0], date: "2026-03-15", type: "product" },
    { ...mockServices[0], date: "2026-03-10", type: "service" },
    { ...mockProducts[1], date: "2026-03-05", type: "product" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-8">Profile</h1>

      {/* User Info */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
            {user?.username?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl mb-1">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Wallet */}
      <Card className="p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Wallet</h2>
          <Wallet className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex items-end gap-3 mb-6">
          <p className="text-4xl">${user?.wallet?.toFixed(2) || "0.00"}</p>
          <p className="text-gray-600 pb-1">Available Balance</p>
        </div>
        <div className="flex gap-3">
          <Button>Top Up</Button>
          <Button variant="outline">Withdraw</Button>
        </div>
      </Card>

      {/* Purchase History - Products */}
      <div className="mb-8">
        <h2 className="text-2xl mb-6">Product Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "product")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm">
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
        <h2 className="text-2xl mb-6">Service Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "service")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
        </Card>
      </div>
    </div>
  );
}
