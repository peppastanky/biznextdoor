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

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - in real app would validate against backend
    // For demo, determine user type based on username pattern
    const isBusinessUser = formData.username.toLowerCase().includes("biz") || 
                          formData.username.toLowerCase().includes("shop");

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username,
      email: `${formData.username}@example.com`,
      type: isBusinessUser ? "business" as const : "customer" as const,
      businessName: isBusinessUser ? "Sample Business" : undefined,
      wallet: isBusinessUser ? undefined : 500,
      bank: isBusinessUser ? 1200 : undefined,
    };

    login(user);
    toast.success("Welcome back!");

    // Redirect based on user type
    if (user.type === "customer") {
      navigate("/customer");
    } else {
      navigate("/business");
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
          <p className="text-sm text-black/40 text-center mb-12">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
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

            <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300 hover:scale-[1.02]">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-black/60 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-black font-bold underline hover:no-underline transition-all duration-300">
              Create one
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-black/5">
            <p className="text-[10px] uppercase tracking-widest text-black/40 text-center">
              Demo tip: Use any username. Include "biz" or "shop" for business account.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
