import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { CheckCircle2, Package, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "o1",
      customer: "john_doe",
      phone: "+1234567890",
      email: "john@example.com",
      item: "Chocolate Cake",
      type: "product",
      price: 35,
      timeslot: "2:00 PM",
      date: "2026-03-20",
    },
    {
      id: "o2",
      customer: "sarah_smith",
      phone: "+1234567891",
      email: "sarah@example.com",
      item: "Gel Manicure",
      type: "service",
      price: 40,
      timeslot: "9:00 AM",
      date: "2026-03-20",
    },
    {
      id: "o3",
      customer: "mike_jones",
      phone: "+1234567892",
      email: "mike@example.com",
      item: "Croissants (6 pack)",
      type: "product",
      price: 12,
      timeslot: "10:00 AM",
      date: "2026-03-21",
    },
    {
      id: "o4",
      customer: "emma_wilson",
      phone: "+1234567893",
      email: "emma@example.com",
      item: "Pedicure Service",
      type: "service",
      price: 35,
      timeslot: "2:00 PM",
      date: "2026-03-21",
    },
  ]);

  const handleFulfill = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    toast.success("Order marked as fulfilled");
  };

  const productOrders = orders.filter((o) => o.type === "product");
  const serviceOrders = orders.filter((o) => o.type === "service");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Manage</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Orders</h1>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-black/5 p-2 rounded-full mb-8">
          <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">All Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Products ({productOrders.length})</TabsTrigger>
          <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Services ({serviceOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {orders.length === 0 ? (
            <Card className="p-16 text-center text-black/40">
              <Package className="w-16 h-16 mx-auto mb-4 text-black/20" />
              <h2 className="text-2xl mb-2">No pending orders</h2>
              <p>New orders will appear here</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders
                .sort((a, b) => new Date(a.date + " " + a.timeslot).getTime() - new Date(b.date + " " + b.timeslot).getTime())
                .map((order) => (
                  <Card key={order.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg">{order.item}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            order.type === "service" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                          }`}>
                            {order.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-black/60">
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Customer:</span> @{order.customer}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Phone:</span> {order.phone}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {order.email}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Date:</span> {order.date}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Time:</span> {order.timeslot}
                            </p>
                            <p className="font-medium text-lg text-black">
                              ${order.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => handleFulfill(order.id)}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Fulfill
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="products">
          {productOrders.length === 0 ? (
            <Card className="p-16 text-center text-black/40">
              <Package className="w-16 h-16 mx-auto mb-4 text-black/20" />
              <h2 className="text-2xl mb-2">No product orders</h2>
              <p>Product orders will appear here</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {productOrders
                .sort((a, b) => new Date(a.date + " " + a.timeslot).getTime() - new Date(b.date + " " + b.timeslot).getTime())
                .map((order) => (
                  <Card key={order.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg mb-3">{order.item}</h3>

                        <div className="grid grid-cols-2 gap-3 text-sm text-black/60">
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Customer:</span> @{order.customer}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Phone:</span> {order.phone}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {order.email}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Collection Date:</span> {order.date}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Collection Time:</span> {order.timeslot}
                            </p>
                            <p className="font-medium text-lg text-black">
                              ${order.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => handleFulfill(order.id)}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Fulfill
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          {serviceOrders.length === 0 ? (
            <Card className="p-16 text-center text-black/40">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-black/20" />
              <h2 className="text-2xl mb-2">No service bookings</h2>
              <p>Service bookings will appear here</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {serviceOrders
                .sort((a, b) => new Date(a.date + " " + a.timeslot).getTime() - new Date(b.date + " " + b.timeslot).getTime())
                .map((order) => (
                  <Card key={order.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg mb-3">{order.item}</h3>

                        <div className="grid grid-cols-2 gap-3 text-sm text-black/60">
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Customer:</span> @{order.customer}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Phone:</span> {order.phone}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span> {order.email}
                            </p>
                          </div>
                          <div>
                            <p className="mb-1">
                              <span className="font-medium">Appointment Date:</span> {order.date}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Appointment Time:</span> {order.timeslot}
                            </p>
                            <p className="font-medium text-lg text-black">
                              ${order.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button onClick={() => handleFulfill(order.id)}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Fulfill
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
