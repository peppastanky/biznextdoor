import { useNavigate, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useNavigationHistory } from "../context/NavigationHistoryContext";

const HOME_PATHS = ["/customer", "/business", "/", "/login", "/register"];

function getPageName(pathname: string): string {
  if (pathname === "/customer" || pathname === "/business") return "Home";
  if (pathname === "/") return "Landing";
  if (pathname === "/login") return "Login";
  if (pathname === "/register") return "Register";
  if (pathname.startsWith("/customer/discover")) return "Discover";
  if (pathname.startsWith("/customer/businesses")) return "Businesses";
  if (pathname.startsWith("/customer/wishlist")) return "Wishlist";
  if (pathname.startsWith("/customer/cart")) return "Cart";
  if (pathname.startsWith("/customer/checkout")) return "Checkout";
  if (pathname.startsWith("/customer/profile")) return "Profile";
  if (pathname.startsWith("/customer/settings")) return "Settings";
  if (pathname.startsWith("/customer/my-orders")) return "Orders & Bookings";
  if (pathname.startsWith("/customer/faq")) return "FAQ";
  if (pathname.startsWith("/customer/safety")) return "Safety";
  if (pathname.startsWith("/customer/product/")) return "Product";
  if (pathname.startsWith("/customer/service/")) return "Service";
  if (pathname.startsWith("/customer/business/")) return "Business";
  if (pathname.startsWith("/business/create-listing")) return "Create Listing";
  if (pathname.startsWith("/business/inventory")) return "Inventory";
  if (pathname.startsWith("/business/orders")) return "Orders";
  if (pathname.startsWith("/business/insights")) return "Insights";
  if (pathname.startsWith("/business/profile")) return "Profile";
  if (pathname.startsWith("/business/settings")) return "Settings";
  if (pathname.startsWith("/business/faq")) return "FAQ";
  if (pathname.startsWith("/business/safety")) return "Safety";
  return "Back";
}

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { previousPath } = useNavigationHistory();

  const isHome = HOME_PATHS.includes(location.pathname);
  if (isHome) return null;

  const label = previousPath ? getPageName(previousPath) : "Back";

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[97px] left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-md border border-black/8 shadow-sm text-black/50 hover:text-black hover:bg-white hover:shadow-md transition-all duration-300 group"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.5} />
      <span className="text-xs font-semibold tracking-wide pr-0.5">{label}</span>
    </button>
  );
}
