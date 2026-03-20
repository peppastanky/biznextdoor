import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { DollarSign, Users, TrendingUp, Repeat, ArrowRight, Wallet } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { format } from "date-fns";
import { motion } from "motion/react";

export default function BusinessHome() {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock schedule data
  const schedule = [
    { time: "9:00 AM", customer: "john_doe", phone: "+1234567890", item: "Gel Manicure", type: "service" },
    { time: "10:00 AM", customer: "sarah_smith", phone: "+1234567891", item: "Chocolate Cake", type: "product" },
    { time: "2:00 PM", customer: "mike_jones", phone: "+1234567892", item: "Pedicure Service", type: "service" },
    { time: "4:00 PM", customer: "emma_wilson", phone: "+1234567893", item: "Croissants", type: "product" },
  ];

  const bestSellers = [
    { name: "Chocolate Cake", sales: 45, revenue: 1575, id: "1", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", type: "product" },
    { name: "Gel Manicure", sales: 38, revenue: 1520, id: "6", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400", type: "service" },
    { name: "Pedicure Service", sales: 32, revenue: 1120, id: "7", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400", type: "service" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Revenue This Month</p>
              <DollarSign className="w-5 h-5 text-black/20" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-bold tracking-tighter mb-2">$12,450</p>
            <p className="text-sm text-green-600 font-bold">+15% from last month</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Total Customers</p>
              <Users className="w-5 h-5 text-black/20" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-bold tracking-tighter mb-2">234</p>
            <p className="text-sm text-green-600 font-bold">+8% from last month</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Conversion Rate</p>
              <TrendingUp className="w-5 h-5 text-black/20" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-bold tracking-tighter mb-2">68%</p>
            <p className="text-sm text-green-600 font-bold">+3% from last month</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Returning Customers</p>
              <Repeat className="w-5 h-5 text-black/20" strokeWidth={1.5} />
            </div>
            <p className="text-4xl font-bold tracking-tighter mb-2">42%</p>
            <p className="text-sm text-green-600 font-bold">+5% from last month</p>
          </Card>
        </motion.div>
      </div>

      {/* Calendar and Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-6">Calendar</p>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-xl"
          />
        </Card>

        <Card className="col-span-1 md:col-span-2 p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Schedule</p>
              <h2 className="text-2xl font-bold tracking-tighter">
                {format(selectedDate, "MMMM dd, yyyy")}
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div
                key={index}
                className="border border-black/5 p-6 rounded-3xl hover:bg-black/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold">{item.time}</p>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                    item.type === "service" ? "bg-black/10 text-black" : "bg-black text-white"
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-sm font-bold mb-2">{item.item}</p>
                <div className="flex items-center gap-4 text-sm text-black/60">
                  <span>Customer: @{item.customer}</span>
                  <span>Phone: {item.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Best Sellers */}
      <div className="mb-24">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Top Performers</p>
          <h2 className="text-4xl font-bold tracking-tighter leading-tight">Best Selling Items</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestSellers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-black/60">Sales</span>
                    <span className="font-bold">{item.sales} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-black/60">Revenue</span>
                    <span className="font-bold">${item.revenue}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bank Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Bank Balance</p>
            <Wallet className="w-6 h-6 text-black/20" strokeWidth={1.5} />
          </div>
          <p className="text-5xl font-bold tracking-tighter mb-8">${user?.bank?.toFixed(2) || "0.00"}</p>
          <Button className="w-full rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300 hover:scale-[1.02]">
            Withdraw Funds
          </Button>
        </Card>

        <Card className="col-span-1 md:col-span-2 p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Actions</p>
            <h2 className="text-2xl font-bold tracking-tighter">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/business/create-listing">
              <Button variant="outline" className="w-full h-20 rounded-3xl border-black/10 hover:bg-black/5 transition-all duration-300">
                Create New Listing
              </Button>
            </Link>
            <Link to="/business/orders">
              <Button variant="outline" className="w-full h-20 rounded-3xl border-black/10 hover:bg-black/5 transition-all duration-300">
                View Orders
              </Button>
            </Link>
            <Link to="/business/inventory">
              <Button variant="outline" className="w-full h-20 rounded-3xl border-black/10 hover:bg-black/5 transition-all duration-300">
                Manage Inventory
              </Button>
            </Link>
            <Link to="/business/insights">
              <Button variant="outline" className="w-full h-20 rounded-3xl border-black/10 hover:bg-black/5 transition-all duration-300">
                View Insights
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">History</p>
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Recent Activity</h2>
          </div>
          <Link to="/business/orders">
            <Button variant="ghost" className="rounded-full hover:bg-black/5 gap-2 transition-all duration-300">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>
        <Card className="border border-black/5 rounded-3xl overflow-hidden shadow-sm divide-y divide-black/5">
          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <div className="w-14 h-14 bg-green-600/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-green-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-1">New order received</p>
              <p className="text-sm text-black/60">Chocolate Cake - @john_doe</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">$35.00</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">1 hour ago</p>
            </div>
          </div>

          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-600/10 rounded-full flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-1">Service booked</p>
              <p className="text-sm text-black/60">Gel Manicure - @sarah_smith</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">$40.00</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">3 hours ago</p>
            </div>
          </div>

          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <div className="w-14 h-14 bg-yellow-600/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-yellow-600" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-1">New review received</p>
              <p className="text-sm text-black/60">5 stars for Croissants</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-black/40 uppercase tracking-widest">5 hours ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}