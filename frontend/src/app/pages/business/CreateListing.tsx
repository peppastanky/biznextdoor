import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { categories } from "../../data/mockData";

export default function CreateListing() {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState<"product" | "service" | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    timeslots: [""],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTimeslot = () => setFormData({ ...formData, timeslots: [...formData.timeslots, ""] });

  const updateTimeslot = (index: number, value: string) => {
    const newTimeslots = [...formData.timeslots];
    newTimeslots[index] = value;
    setFormData({ ...formData, timeslots: newTimeslots });
  };

  const removeTimeslot = (index: number) => {
    setFormData({ ...formData, timeslots: formData.timeslots.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${listingType === "product" ? "Product" : "Service"} listed successfully!`);
    navigate("/business/inventory");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Business</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Create Listing</h1>
      </div>

      {!listingType ? (
        <div className="space-y-4">
          <p className="text-black/60 mb-6">What would you like to list?</p>
          <button
            className="w-full p-8 border border-black/8 rounded-3xl text-left hover:bg-black/5 transition-all duration-300 group"
            onClick={() => setListingType("product")}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Physical item</p>
            <p className="text-2xl font-bold tracking-tighter">Product</p>
          </button>
          <button
            className="w-full p-8 border border-black/8 rounded-3xl text-left hover:bg-black/5 transition-all duration-300 group"
            onClick={() => setListingType("service")}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Appointment based</p>
            <p className="text-2xl font-bold tracking-tighter">Service</p>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold tracking-tighter mb-6">Images</h2>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-2xl" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-square border-2 border-dashed border-black/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-black/20 transition-colors">
                  <Upload className="w-8 h-8 text-black/20 mb-2" />
                  <span className="text-xs text-black/40">Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="p-8 border border-black/5 rounded-3xl shadow-sm space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter">Details</h2>
            <div>
              <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300" />
            </div>
            <div>
              <Label htmlFor="description" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300 resize-none" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-black/5 border-none rounded-xl h-11 focus:ring-2 focus:ring-black/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-black/5 rounded-3xl">
                  {categories.filter((cat) => cat !== "All").map((cat) => (
                    <SelectItem key={cat} value={cat} className="rounded-xl">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {listingType === "product" && (
              <div>
                <Label htmlFor="quantity" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">Quantity Available</Label>
                <Input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} required className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300" />
              </div>
            )}
            <div>
              <Label htmlFor="price" className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3 block">Price ($)</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300" />
            </div>
          </Card>

          {/* Timeslots */}
          <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter">{listingType === "product" ? "Collection Timeslots" : "Available Timeslots"}</h2>
                <p className="text-xs text-black/40 mt-1">e.g. 10:00 AM</p>
              </div>
              <Button type="button" onClick={addTimeslot} className="rounded-full bg-black text-white hover:bg-black/90 px-5">
                Add Slot
              </Button>
            </div>
            <div className="space-y-3">
              {formData.timeslots.map((slot, index) => (
                <div key={index} className="flex gap-3">
                  <Input value={slot} onChange={(e) => updateTimeslot(index, e.target.value)} placeholder="e.g., 10:00 AM" required className="bg-black/5 border-none rounded-xl p-3 focus:ring-2 focus:ring-black/10 transition-all duration-300" />
                  {formData.timeslots.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTimeslot(index)} className="rounded-full hover:bg-black/5">
                      <X className="w-4 h-4 text-black/40" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="button" onClick={() => setListingType(null)} className="flex-1 rounded-full border border-black/10 bg-transparent text-black hover:bg-black/5">
              Back
            </Button>
            <Button type="submit" className="flex-1 rounded-full bg-black text-white hover:bg-black/90 py-6 transition-all duration-300 hover:scale-[1.02]">
              Create Listing
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
