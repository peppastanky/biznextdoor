import { useNavigate, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";

const HOME_PATHS = ["/customer", "/business", "/", "/login", "/register"];

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = HOME_PATHS.includes(location.pathname);
  if (isHome) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-[97px] left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-md border border-black/8 shadow-sm text-black/50 hover:text-black hover:bg-white hover:shadow-md transition-all duration-300 group"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.5} />
      <span className="text-xs font-semibold tracking-wide pr-0.5">Back</span>
    </button>
  );
}
