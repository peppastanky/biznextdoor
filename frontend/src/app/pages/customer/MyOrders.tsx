import { useEffect, useRef, useState } from "react";
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
  const navigate = useNavigate();
  const highlightId = searchParams.get("order");

  // Auto-select the correct tab based on the order param
  const defaultTab = () => {
    if (highlightId) {
      if (bookedServices.some((s) => s.id === highlightId)) return "services";
      if (toCollectProducts.some((p) => p.id === highlightId)) return "collect";
    }
    return searchParams.get("tab") || "services";
  };

  const [activeTab, setActiveTab] = useState(defaultTab);
  const orderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Switch to the correct tab whenever the order param changes
  useEffect(() => {
    if (!highlightId) return;
    if (bookedServices.some((s) => s.id === highlightId)) setActiveTab("services");
    else if (toCollectProducts.some((p) => p.id === highlightId)) setActiveTab("collect");
  }, [highlightId]);

  // Scroll to the highlighted order after the tab content has rendered
  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => {
      const el = orderRefs.current[highlightId];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    return () => clearTimeout(timer);
  }, [highlightId, activeTab]);

  const renderServiceRow = (item: typeof bookedServices[0]) => (
    <div
      key={item.id}
      ref={(el) => { orderRefs.current[item.id] = el; }}
      className={`p-6 flex items-center gap-4 transition-all duration-300 rounded-2xl ${
        highlightId === item.id ? "border-2 border-black bg-black/3" : ""
      }`}
    >
      <button onClick={() => navigate(`/customer/service/${item.id}`)} className="shrink-0">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl hover:opacity-80 transition-opacity" />
      </button>
      <div className="flex-1">
        <button onClick={() => navigate(`/customer/service/${item.id}`)} className="font-semibold text-base mb-1 hover:underline text-left">
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
  );

  const renderProductRow = (item: typeof toCollectProducts[0]) => (
    <div
      key={item.id}
      ref={(el) => { orderRefs.current[item.id] = el; }}
      className={`p-6 flex items-center gap-4 transition-all duration-300 rounded-2xl ${
        highlightId === item.id ? "border-2 border-black bg-black/3" : ""
      }`}
    >
      <button onClick={() => navigate(`/customer/product/${item.id}`)} className="shrink-0">
        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl hover:opacity-80 transition-opacity" />
      </button>
      <div className="flex-1">
        <button onClick={() => navigate(`/customer/product/${item.id}`)} className="font-semibold text-base mb-1 hover:underline text-left">
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
  );

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
            {bookedServices.map(renderServiceRow)}
          </Card>
        </TabsContent>

        <TabsContent value="collect">
          <Card className="divide-y">
            {toCollectProducts.map(renderProductRow)}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
