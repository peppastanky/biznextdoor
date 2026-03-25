import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Eye, EyeOff, Upload, User, Store } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export default function Registration() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isGoogleFlow = searchParams.get("google") === "true";

  const { login } = useUser();
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    businessName: "",
    address: "",
    verificationDoc: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userType) {
      toast.error("Please select account type");
      return;
    }

    setLoading(true);
    try {
      let uid: string;
      let email: string;

      if (isGoogleFlow) {
        // User already signed in with Google — just save their meta
        const currentUser = auth.currentUser;
        if (!currentUser) {
          // Re-trigger Google sign in to get the user
          const result = await signInWithPopup(auth, googleProvider);
          uid = result.user.uid;
          email = result.user.email || "";
        } else {
          uid = currentUser.uid;
          email = currentUser.email || "";
        }
      } else {
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        uid = result.user.uid;
        email = formData.email;
        await updateProfile(result.user, { displayName: formData.username });
      }

      const newUser = {
        id: uid,
        username: formData.username || email.split("@")[0],
        email,
        type: userType,
        businessName: userType === "business" ? formData.businessName : undefined,
        wallet: userType === "customer" ? 500 : undefined,
        bank: userType === "business" ? 167 : undefined,
      };

      login(newUser);
      toast.success("Account created successfully!");
      navigate(userType === "customer" ? "/customer" : "/business");
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/email-already-in-use") {
        toast.error("An account with this email already exists");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
          <div className="text-center mb-2">
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Create Account</h2>
            {userType && (
              <p className="text-sm font-medium text-black/30 tracking-widest uppercase mt-1">
                {userType === "customer" ? "Customer" : "Business"}
              </p>
            )}
          </div>
          <p className="text-sm text-black/40 text-center mb-8">
            {userType === "customer"
              ? "Discover and book local services"
              : userType === "business"
              ? "Grow your business with BizNextDoor"
              : isGoogleFlow
              ? "Complete your profile to get started"
              : "Join our community today"}
          </p>

          {!userType ? (
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button
                  className="w-full h-20 text-base rounded-2xl bg-black/5 text-black border-2 border-transparent hover:border-black transition-all duration-300 font-semibold tracking-tight"
                  onClick={() => setUserType("customer")}
                >
                  <User className="w-4 h-4 mr-2 inline-block" strokeWidth={1.5} />I'm a Customer
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button
                  className="w-full h-20 text-base rounded-2xl bg-black text-white border-2 border-black hover:opacity-80 transition-all duration-300 font-semibold tracking-tight"
                  onClick={() => setUserType("business")}
                >
                  <Store className="w-4 h-4 mr-2 inline-block" strokeWidth={1.5} />I'm a Business
                </button>
              </motion.div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <span className={`text-xs font-semibold px-4 py-1.5 rounded-full ${userType === "business" ? "bg-black text-white" : "bg-black/8 text-black"}`}>
                  {userType === "customer" ? "Customer" : "Business"}
                </span>
                <button
                  type="button"
                  onClick={() => setUserType(null)}
                  className="text-xs text-black/40 hover:text-black transition-colors duration-200 underline underline-offset-2"
                >
                  Change
                </button>
              </div>

              <div>
                <Label htmlFor="username" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
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

              {!isGoogleFlow && (
                <>
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
                        placeholder="At least 6 characters"
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
                </>
              )}

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
                        {formData.verificationDoc ? formData.verificationDoc.name : "Upload ID for verification"}
                      </p>
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                  {loading ? "Creating..." : "Create Account"}
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
