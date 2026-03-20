import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search, Star, MapPin } from "lucide-react";
import { mockProducts, mockServices, categories, mockBusinesses } from "../../data/mockData";
import { motion } from "motion/react";

export default function Discover() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "products");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const tab = searchParams.get("tab");
    const query = searchParams.get("q");
    if (tab) setActiveTab(tab);
    if (query) setSearchQuery(query);
  }, [searchParams]);

  const filterItems = (items: any[]) => {
    return items.filter((item) => {
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesPrice = 
        priceRange === "all" ||
        (priceRange === "0-25" && item.price <= 25) ||
        (priceRange === "25-50" && item.price > 25 && item.price <= 50) ||
        (priceRange === "50+" && item.price > 50);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const filteredProducts = filterItems(mockProducts);
  const filteredServices = filterItems(mockServices);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Explore</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Discover</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-black/5 p-2 rounded-full">
          <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-8">
            Products
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-8">
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-12">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                placeholder="Search products..."
                className="pl-11 bg-black/5 border-none rounded-full h-11 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-black/5 border-none rounded-full h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-black/5 rounded-3xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-xl">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 bg-black/5 border-none rounded-full h-11">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="border-black/5 rounded-3xl">
                <SelectItem value="all" className="rounded-xl">All Prices</SelectItem>
                <SelectItem value="0-25" className="rounded-xl">$0 - $25</SelectItem>
                <SelectItem value="25-50" className="rounded-xl">$25 - $50</SelectItem>
                <SelectItem value="50+" className="rounded-xl">$50+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Map Section */}
          <Card className="p-8 border border-black/5 rounded-3xl bg-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Location</p>
                <h3 className="text-2xl font-bold tracking-tighter">Businesses Near You</h3>
              </div>
              <MapPin className="w-6 h-6 text-black/20" strokeWidth={1.5} />
            </div>
            <div className="bg-white border border-black/10 rounded-3xl h-64 flex items-center justify-center text-black/60">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-black/20" strokeWidth={1.5} />
                <p className="font-bold">Map integration area</p>
                <p className="text-sm mt-2">Google Maps API can be integrated here</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {mockBusinesses.map((business) => (
                <Link
                  key={business.id}
                  to={`/customer/business/${business.id}`}
                  className="p-4 border border-black/10 bg-white rounded-xl hover:bg-black/5 transition-all duration-300"
                >
                  <p className="text-sm font-bold mb-1">{business.name}</p>
                  <p className="text-xs text-black/40">{business.address.split(",")[1]}</p>
                </Link>
              ))}
            </div>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              >
                <Link to={`/customer/product/${product.id}`} className="group block">
                  <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-black/40 mb-3">{product.businessName}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">${product.price}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-black" />
                          <span className="font-bold">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24 text-black/40">
              <p className="text-lg">No products found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="services" className="space-y-12">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
              <Input
                placeholder="Search services..."
                className="pl-11 bg-black/5 border-none rounded-full h-11 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-black/5 border-none rounded-full h-11">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="border-black/5 rounded-3xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="rounded-xl">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 bg-black/5 border-none rounded-full h-11">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="border-black/5 rounded-3xl">
                <SelectItem value="all" className="rounded-xl">All Prices</SelectItem>
                <SelectItem value="0-25" className="rounded-xl">$0 - $25</SelectItem>
                <SelectItem value="25-50" className="rounded-xl">$25 - $50</SelectItem>
                <SelectItem value="50+" className="rounded-xl">$50+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Map Section */}
          <Card className="p-8 border border-black/5 rounded-3xl bg-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Location</p>
                <h3 className="text-2xl font-bold tracking-tighter">Businesses Near You</h3>
              </div>
              <MapPin className="w-6 h-6 text-black/20" strokeWidth={1.5} />
            </div>
            <div className="bg-white border border-black/10 rounded-3xl h-64 flex items-center justify-center text-black/60">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-black/20" strokeWidth={1.5} />
                <p className="font-bold">Map integration area</p>
                <p className="text-sm mt-2">Google Maps API can be integrated here</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {mockBusinesses.map((business) => (
                <Link
                  key={business.id}
                  to={`/customer/business/${business.id}`}
                  className="p-4 border border-black/10 bg-white rounded-xl hover:bg-black/5 transition-all duration-300"
                >
                  <p className="text-sm font-bold mb-1">{business.name}</p>
                  <p className="text-xs text-black/40">{business.address.split(",")[1]}</p>
                </Link>
              ))}
            </div>
          </Card>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              >
                <Link to={`/customer/service/${service.id}`} className="group block">
                  <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 line-clamp-1">{service.name}</h3>
                      <p className="text-sm text-black/40 mb-3">{service.businessName}</p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold">${service.price}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-black" />
                          <span className="font-bold">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-24 text-black/40">
              <p className="text-lg">No services found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
