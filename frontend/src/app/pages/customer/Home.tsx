import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Wallet, Package, Calendar, ArrowRight, Star } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { mockProducts, mockServices, mockBusinesses } from "../../data/mockData";
import { motion } from "motion/react";

export default function CustomerHome() {
  const { user } = useUser();

  const recommended = [...mockProducts.slice(0, 3), ...mockServices.slice(0, 2)];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Wallet Balance</p>
                <p className="text-4xl font-bold tracking-tighter">${user?.wallet || 0}</p>
              </div>
              <Wallet className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              Top Up
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Services Booked</p>
                <p className="text-4xl font-bold tracking-tighter">3</p>
              </div>
              <Calendar className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              View All
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">To Collect</p>
                <p className="text-4xl font-bold tracking-tighter">2</p>
              </div>
              <Package className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              View All
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Recommended Products & Services */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Curated</p>
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Recommended for You</h2>
          </div>
          <Link to="/customer/discover">
            <Button variant="ghost" className="rounded-full hover:bg-black/5 gap-2 transition-all duration-300">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {recommended.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/customer/${"timeslots" in item && Array.isArray(item.timeslots) && item.timeslots.length > 0 && typeof item.timeslots[0] === "string" ? "service" : "product"}/${item.id}`}
                className="group block"
              >
                <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-black/40 mb-3">{item.businessName}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold">${item.price}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-black" />
                        <span className="font-bold">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Businesses */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Nearby</p>
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Businesses Near You</h2>
          </div>
          <Link to="/customer/businesses">
            <Button variant="ghost" className="rounded-full hover:bg-black/5 gap-2 transition-all duration-300">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockBusinesses.map((business, i) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/customer/business/${business.id}`} className="group block">
                <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">{business.name}</h3>
                    <p className="text-sm text-black/60 mb-4 line-clamp-2 leading-relaxed">
                      {business.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-black/60">{business.address.split(",")[1]}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-black" />
                        <span className="font-bold">{business.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">History</p>
          <h2 className="text-4xl font-bold tracking-tighter leading-tight">Recent Activity</h2>
        </div>
        <Card className="border border-black/5 rounded-3xl overflow-hidden shadow-sm divide-y divide-black/5">
          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <img
              src={mockProducts[0].image}
              alt={mockProducts[0].name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex-1">
              <p className="font-bold mb-1">{mockProducts[0].name}</p>
              <p className="text-sm text-black/60">Purchased from {mockProducts[0].businessName}</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">${mockProducts[0].price}</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">2 days ago</p>
            </div>
          </div>

          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <img
              src={mockServices[0].image}
              alt={mockServices[0].name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex-1">
              <p className="font-bold mb-1">{mockServices[0].name}</p>
              <p className="text-sm text-black/60">Booked at {mockServices[0].businessName}</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">${mockServices[0].price}</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">5 days ago</p>
            </div>
          </div>

          <div className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
            <img
              src={mockProducts[1].image}
              alt={mockProducts[1].name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex-1">
              <p className="font-bold mb-1">{mockProducts[1].name}</p>
              <p className="text-sm text-black/60">Purchased from {mockProducts[1].businessName}</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">${mockProducts[1].price}</p>
              <p className="text-xs text-black/40 uppercase tracking-widest">1 week ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}