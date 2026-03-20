import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Star, MapPin } from "lucide-react";
import { mockBusinesses } from "../../data/mockData";
import { motion } from "motion/react";

export default function Businesses() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Directory</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight mb-4">All Businesses</h1>
        <p className="text-lg text-black/60">Discover local businesses in your community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockBusinesses.map((business, i) => (
          <motion.div
            key={business.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 9) * 0.05 }}
          >
            <Link to={`/customer/business/${business.id}`} className="group block">
              <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{business.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-black" />
                      <span className="font-bold">{business.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-black/60 mb-4 line-clamp-2 leading-relaxed">
                    {business.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span>{business.address}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <span className="text-xs uppercase tracking-widest font-bold text-black/40">
                      {business.category}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
