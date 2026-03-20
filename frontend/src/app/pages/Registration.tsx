import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function Registration() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    businessName: "",
    address: "",
    verificationDoc: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType) {
      toast.error("Please select account type");
      return;
    }

    // Create user object
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username,
      email: formData.email,
      type: userType,
      businessName: userType === "business" ? formData.businessName : undefined,
      wallet: userType === "customer" ? 500 : undefined,
      bank: userType === "business" ? 0 : undefined,
    };

    login(newUser);
    toast.success("Account created successfully!");
    
    // Redirect based on user type
    if (userType === "customer") {
      navigate("/customer");
    } else {
      navigate("/business");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, verificationDoc: e.target.files[0] });
    }
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
          <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-2 text-center">Create Account</h2>
          <p className="text-sm text-black/40 text-center mb-12">Join our community today</p>

          {!userType ? (
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 text-center mb-6">
                Select Account Type
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full h-20 text-lg rounded-3xl border border-black/10 hover:bg-black/5 transition-all duration-300"
                  onClick={() => setUserType("customer")}
                >
                  I'm a Customer
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full h-20 text-lg rounded-3xl border border-black/10 hover:bg-black/5 transition-all duration-300"
                  onClick={() => setUserType("business")}
                >
                  I'm a Business
                </Button>
              </motion.div>
            </div>
          ) : (
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
                  className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                  required
                />
              </div>

              {userType === "business" && (
                <>
                  <div>
                    <Label htmlFor="businessName" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                      Home Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
                      required
                    />
                  </div>
                </>
              )}

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

              {userType === "business" && (
                <div>
                  <Label htmlFor="verification" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                    Verification Document (Optional)
                  </Label>
                  <div className="mt-2 border-2 border-dashed border-black/10 rounded-3xl p-8 text-center hover:border-black/20 transition-all duration-300">
                    <input
                      type="file"
                      id="verification"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="verification" className="cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto mb-3 text-black/20" strokeWidth={1.5} />
                      <p className="text-sm text-black/60">
                        {formData.verificationDoc
                          ? formData.verificationDoc.name
                          : "Upload ID for verification"}
                      </p>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full border border-black/10 hover:bg-black/5 transition-all duration-300"
                  onClick={() => setUserType(null)}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1 rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 hover:scale-[1.02]">
                  Create Account
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-black/60 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-bold underline hover:no-underline transition-all duration-300">
              Sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
