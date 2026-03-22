import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";

export default function BusinessSettings() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    businessName: user?.businessName || "",
    email: user?.email || "",
    address: "123 Main Street, Downtown",
    description: "Quality products and services for our community",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Password changed successfully");
    setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Account</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Settings</h1>
      </div>

      {/* Business Information */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold tracking-tighter mb-8">Business Information</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
              Business Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
              Business Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300 resize-none"
            />
          </div>
          <Button type="submit" className="rounded-full bg-black text-white hover:bg-black/90 py-6 px-8 transition-all duration-300 hover:scale-[1.02]">
            Save Changes
          </Button>
        </form>
      </Card>

      {/* Password Settings */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold tracking-tighter mb-8">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <Label htmlFor="currentPassword" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
            />
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300"
            />
          </div>
          <Button type="submit" className="rounded-full bg-black text-white hover:bg-black/90 py-6 px-8 transition-all duration-300 hover:scale-[1.02]">
            Update Password
          </Button>
        </form>
      </Card>

      {/* Notification Settings */}
      <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold tracking-tighter mb-8">Notification Preferences</h2>
        <div className="space-y-6">
          {[
            { label: "New Orders", desc: "Get notified when you receive new orders", defaultChecked: true },
            { label: "New Reviews", desc: "Receive notifications for customer reviews", defaultChecked: true },
            { label: "Performance Reports", desc: "Weekly summary of your business performance", defaultChecked: false },
            { label: "Marketing Tips", desc: "Receive tips to grow your business", defaultChecked: false },
          ].map(({ label, desc, defaultChecked }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-black/40 mt-0.5">{desc}</p>
              </div>
              <input type="checkbox" defaultChecked={defaultChecked} className="w-5 h-5 accent-black" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
