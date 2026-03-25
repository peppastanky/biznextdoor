import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold tracking-tighter">BizNextDoor</p>
            <p className="text-xs text-black/40 mt-1">Connecting your neighbourhood, one business at a time.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-black/40 font-medium">
            <Link to="faq" className="hover:text-black transition-colors duration-200">FAQ</Link>
            <Link to="safety" className="hover:text-black transition-colors duration-200">Safety</Link>
            <Link to="settings" className="hover:text-black transition-colors duration-200">Settings</Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p className="text-[10px] uppercase tracking-widest text-black/30">© {new Date().getFullYear()} BizNextDoor. All rights reserved.</p>
          <p className="text-[10px] uppercase tracking-widest text-black/30">Made with care for local communities.</p>
        </div>
      </div>
    </footer>
  );
}
