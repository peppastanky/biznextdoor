import { Outlet, Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import { Home, Plus, Package, ShoppingBag, TrendingUp, Bell, User, Settings, HelpCircle, Shield, LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";

export default function BusinessLayout() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with glassmorphism */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/business" className="text-xl font-bold tracking-tighter">
              BizNextDoor
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
              <Link to="/business">
                <Button variant="ghost" className="rounded-full hover:bg-black/5 transition-all duration-300 gap-2">
                  <Home className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm">Home</span>
                </Button>
              </Link>
              <Link to="/business/create-listing">
                <Button variant="ghost" className="rounded-full hover:bg-black/5 transition-all duration-300 gap-2">
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm">Create</span>
                </Button>
              </Link>
              <Link to="/business/inventory">
                <Button variant="ghost" className="rounded-full hover:bg-black/5 transition-all duration-300 gap-2">
                  <Package className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm">Inventory</span>
                </Button>
              </Link>
              <Link to="/business/orders">
                <Button variant="ghost" className="rounded-full hover:bg-black/5 transition-all duration-300 gap-2">
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm">Orders</span>
                </Button>
              </Link>
              <Link to="/business/insights">
                <Button variant="ghost" className="rounded-full hover:bg-black/5 transition-all duration-300 gap-2">
                  <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm">Insights</span>
                </Button>
              </Link>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-black/5 transition-all duration-300">
                    <Bell className="w-5 h-5" strokeWidth={1.5} />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-black text-white rounded-full border-2 border-white">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 border-black/5 rounded-3xl p-0 mt-2">
                  <div className="p-6 border-b border-black/5">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-6 hover:bg-black/5 border-b border-black/5 transition-all duration-300">
                      <p className="text-sm font-bold mb-1">New order received</p>
                      <p className="text-xs text-black/60 leading-relaxed">Customer ordered Chocolate Cake</p>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">1 hour ago</p>
                    </div>
                    <div className="p-6 hover:bg-black/5 border-b border-black/5 transition-all duration-300">
                      <p className="text-sm font-bold mb-1">New order received</p>
                      <p className="text-xs text-black/60 leading-relaxed">Customer booked Gel Manicure</p>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">3 hours ago</p>
                    </div>
                    <div className="p-6 hover:bg-black/5 transition-all duration-300">
                      <p className="text-sm font-bold mb-1">New review</p>
                      <p className="text-xs text-black/60 leading-relaxed">Customer left a 5-star review</p>
                      <p className="text-[10px] uppercase tracking-widest text-black/40 mt-2">1 day ago</p>
                    </div>
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
                    <p className="text-sm font-bold">{user?.businessName || user?.username}</p>
                    <p className="text-xs text-black/40">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-black/5" />
                  <DropdownMenuItem onClick={() => navigate("/business/profile")} className="rounded-xl cursor-pointer">
                    <User className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/business/settings")} className="rounded-xl cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/business/faq")} className="rounded-xl cursor-pointer">
                    <HelpCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    FAQ
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/business/safety")} className="rounded-xl cursor-pointer">
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
        <Outlet />
      </main>
    </div>
  );
}
