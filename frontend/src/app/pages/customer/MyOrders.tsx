import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";
import { Clock } from "lucide-react";
import { mockServices, mockProducts } from "../../data/mockData";

const bookedServices = [
  { ...mockServices[0], bookedDate: "2026-03-18", appointmentDate: "2026-03-22", timeSlot: "10:00 AM – 11:00 AM" },
  { ...mockServices[1], bookedDate: "2026-03-15", appointmentDate: "2026-03-25", timeSlot: "2:00 PM – 3:00 PM" },
  { ...mockServices[2], bookedDate: "2026-03-10", appointmentDate: "2026-03-28", timeSlot: "11:30 AM – 12:30 PM" },
];

const toCollectProducts = [
  { ...mockProducts[0], orderedDate: "2026-03-17", readyDate: "2026-03-20", timeSlot: "9:00 AM – 12:00 PM" },
  { ...mockProducts[1], orderedDate: "2026-03-16", readyDate: "2026-03-19", timeSlot: "1:00 PM – 5:00 PM" },
];

export default function MyOrders() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "services");
  const navigate = useNavigate();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">My Orders</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Orders & Bookings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-black/5 p-2 rounded-full">
            <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-10 py-2.5">
              Services Booked
            </TabsTrigger>
            <TabsTrigger value="collect" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-10 py-2.5">
              To Collect
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="services">
          <Card className="divide-y">
            {bookedServices.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/service/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/service/${item.id}`)}
                    className="font-semibold text-base mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-black/50">{item.businessName}</p>
                  <p className="text-sm text-black/40 mt-1">Appointment: {item.appointmentDate}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-black/40">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{item.timeSlot}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price}</p>
                  <span className="inline-block mt-2 text-xs bg-black/5 rounded-full px-3 py-1">Booked</span>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="collect">
          <Card className="divide-y">
            {toCollectProducts.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/product/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/product/${item.id}`)}
                    className="font-semibold text-base mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-black/50">{item.businessName}</p>
                  <p className="text-sm text-black/40 mt-1">Ready for collection: {item.readyDate}</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-black/40">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{item.timeSlot}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.price}</p>
                  <span className="inline-block mt-2 text-xs bg-black/5 rounded-full px-3 py-1">Ready</span>
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
