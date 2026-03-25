import { Outlet, Link, useNavigate } from "react-router";
import BackButton from "../components/BackButton";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import { NavigationHistoryProvider } from "../context/NavigationHistoryContext";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Search, Home, Compass, Heart, ShoppingCart, Bell, User, Settings, HelpCircle, Shield, LogOut, DollarSign, Clock, Package } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { mockProducts, mockServices, mockBusinesses } from "../data/mockData";

export default function CustomerLayout() {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { cart, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Search functionality
  const searchResults = searchQuery.length > 0 ? {
    products: mockProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    services: mockServices.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
    businesses: mockBusinesses.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3),
  } : { products: [], services: [], businesses: [] };

  return (
    <NavigationHistoryProvider>
    <div className="min-h-screen bg-white">
      {/* Navbar with glassmorphism */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/customer" className="text-xl font-bold tracking-tighter">
              BizNextDoor
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <Input
                  placeholder="Search products, services, or businesses..."
                  className="pl-11 bg-black/5 border-none rounded-full h-11 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                />
              </div>

              {/* Search Dropdown */}
              {showSearchDropdown && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 shadow-sm rounded-3xl max-h-96 overflow-y-auto">
                  {searchResults.products.length > 0 && (
                    <div className="p-4 border-b border-black/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Products</p>
                      {searchResults.products.map(product => (
                        <button
                          key={product.id}
                          onClick={() => {
                            navigate(`/customer/product/${product.id}`);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-black/5 text-left rounded-xl transition-all duration-300"
                        >
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" />
                          <div className="flex-1">
                            <p className="text-sm font-bold">{product.name}</p>
                            <p className="text-xs text-black/40">{product.businessName}</p>
                          </div>
                          <p className="text-sm font-bold">${product.price}</p>
                        </button>
                      ))}
                      {mockProducts.filter(p => 
                        p.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length > 3 && (
                        <button
                          onClick={() => {
                            navigate(`/customer/discover?tab=products&q=${searchQuery}`);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-3 text-sm font-bold text-black hover:bg-black/5 rounded-xl transition-all duration-300"
                        >
                          See more products →
                        </button>
                      )}
                    </div>
                  )}

                  {searchResults.services.length > 0 && (
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Services</p>
                      {searchResults.services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            navigate(`/customer/service/${service.id}`);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-black/5 text-left rounded-xl transition-all duration-300"
                        >
                          <img src={service.image} alt={service.name} className="w-12 h-12 object-cover rounded-xl" />
                          <div className="flex-1">
                            <p className="text-sm font-bold">{service.name}</p>
                            <p className="text-xs text-black/40">{service.businessName}</p>
                          </div>
                          <p className="text-sm font-bold">${service.price}</p>
                        </button>
                      ))}
                      {mockServices.filter(s => 
                        s.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length > 3 && (
                        <button
                          onClick={() => {
                            navigate(`/customer/discover?tab=services&q=${searchQuery}`);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-3 text-sm font-bold text-black hover:bg-black/5 rounded-xl transition-all duration-300"
                        >
                          See more services →
                        </button>
                      )}
                    </div>
                  )}

                  {searchResults.businesses.length > 0 && (
                    <div className="p-4">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Businesses</p>
                      {searchResults.businesses.map(business => (
                        <button
                          key={business.id}
                          onClick={() => {
                            navigate(`/customer/business/${business.id}`);
                            setSearchQuery("");
                          }}
                          className="w-full flex items-center gap-3 p-3 hover:bg-black/5 text-left rounded-xl transition-all duration-300"
                        >
                          <img src={business.image} alt={business.name} className="w-12 h-12 object-cover rounded-xl" />
                          <div className="flex-1">
                            <p className="text-sm font-bold">{business.name}</p>
                            <p className="text-xs text-black/40">{business.description}</p>
                          </div>
                        </button>
                      ))}
                      {mockBusinesses.filter(b => 
                        b.name.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length > 3 && (
                        <button
                          onClick={() => {
                            navigate(`/customer/discover?tab=businesses&q=${searchQuery}`);
                            setSearchQuery("");
                          }}
                          className="w-full text-left p-3 text-sm font-bold text-black hover:bg-black/5 rounded-xl transition-all duration-300"
                        >
                          See more businesses →
                        </button>
                      )}
                    </div>
                  )}

                  {searchResults.products.length === 0 && searchResults.services.length === 0 && searchResults.businesses.length === 0 && (
                    <div className="p-12 text-center text-black/40">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
              <Link to="/customer">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 transition-all duration-300">
                  <Home className="w-5 h-5" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/customer/discover">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 transition-all duration-300">
                  <Compass className="w-5 h-5" strokeWidth={1.5} />
                </Button>
              </Link>
              <Link to="/customer/wishlist" className="relative">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 transition-all duration-300">
                  <Heart className="w-5 h-5" strokeWidth={1.5} />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white rounded-full border-2 border-white">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/customer/cart" className="relative">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 transition-all duration-300">
                  <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white rounded-full border-2 border-white">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-black/5 transition-all duration-300">
                    <Bell className="w-5 h-5" strokeWidth={1.5} />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white rounded-full border-2 border-white">
                      2
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 border-black/5 rounded-3xl p-0 mt-2">
                  <div className="p-6 border-b border-black/5">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <button
                      onClick={() => navigate("/customer/my-orders?tab=collect&order=p1")}
                      className="w-full text-left p-6 hover:bg-black/5 border-b border-black/5 transition-all duration-300 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-0.5">
                        <DollarSign className="w-4 h-4 text-black/40" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1">Payment successful</p>
                        <p className="text-xs text-black/60 leading-relaxed">Your order for Chocolate Cake has been confirmed</p>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">2 hours ago</p>
                      </div>
                    </button>
                    <button
                      onClick={() => navigate("/customer/my-orders?tab=services&order=s1")}
                      className="w-full text-left p-6 hover:bg-black/5 transition-all duration-300 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-black/40" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold mb-1">Service reminder</p>
                        <p className="text-xs text-black/60 leading-relaxed">Your Gel Manicure appointment is in 2 days</p>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">1 day ago</p>
                      </div>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 transition-all duration-300">
                    <User className="w-5 h-5" strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-black/5 rounded-3xl p-3 mt-2">
                  <div className="p-3">
                    <p className="text-sm font-bold">{user?.username}</p>
                    <p className="text-xs text-black/40">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-black/5" />
                  <DropdownMenuItem onClick={() => navigate("/customer/profile")} className="rounded-xl cursor-pointer">
                    <User className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer/my-orders")} className="rounded-xl cursor-pointer">
                    <Package className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Orders & Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer/settings")} className="rounded-xl cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer/faq")} className="rounded-xl cursor-pointer">
                    <HelpCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    FAQ
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/customer/safety")} className="rounded-xl cursor-pointer">
                    <Shield className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Safety Guidelines
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-black/5" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[73px]">
        <ScrollToTop />
        <BackButton />
        <Outlet />
      </main>
      <Footer />
    </div>
    </NavigationHistoryProvider>
  );
}