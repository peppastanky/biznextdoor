import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = result.user;

      // Restore saved meta if exists
      const saved = localStorage.getItem(`userMeta_${firebaseUser.uid}`);
      const meta = saved ? JSON.parse(saved) : { type: "customer" };

      login({
        id: firebaseUser.uid,
        username: meta.username || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "user",
        email: firebaseUser.email || "",
        type: meta.type || "customer",
        businessName: meta.businessName,
        wallet: meta.type === "customer" ? (meta.wallet ?? 500) : undefined,
        bank: meta.type === "business" ? (meta.bank ?? 0) : undefined,
      });

      toast.success("Welcome back!");
      navigate(meta.type === "business" ? "/business" : "/customer");
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const saved = localStorage.getItem(`userMeta_${firebaseUser.uid}`);
      const meta = saved ? JSON.parse(saved) : null;

      if (!meta) {
        // New Google user — send to registration to pick account type
        toast.success("Signed in with Google! Please complete your profile.");
        navigate("/register?google=true");
        return;
      }

      login({
        id: firebaseUser.uid,
        username: meta.username || firebaseUser.displayName || "user",
        email: firebaseUser.email || "",
        type: meta.type || "customer",
        businessName: meta.businessName,
        wallet: meta.type === "customer" ? (meta.wallet ?? 500) : undefined,
        bank: meta.type === "business" ? (meta.bank ?? 0) : undefined,
      });

      toast.success("Welcome back!");
      navigate(meta.type === "business" ? "/business" : "/customer");
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="block text-center mb-16">
          <h1 className="text-xl font-bold tracking-tighter">BizNextDoor</h1>
        </Link>

        <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-2 text-center">Welcome Back</h2>
          <p className="text-sm text-black/40 text-center mb-8">Sign in to your account</p>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-black/5 border-none rounded-xl py-3 px-6 text-sm font-medium hover:bg-black/10 transition-all duration-300 mb-6 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-black/8" />
            <span className="text-[10px] uppercase tracking-widest text-black/30">or</span>
            <div className="flex-1 h-px bg-black/8" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-black/5 border-none rounded-xl p-3 pr-10 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-black/60 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-black font-bold underline hover:no-underline transition-all duration-300">
              Create one
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
