import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { Upload, X, Package, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { format, isSameDay } from "date-fns";
import { categories } from "../../data/mockData";

const TIME_SLOTS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
  "12:00 AM",
];

export default function CreateListing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const listingType = searchParams.get("type") as "product" | "service" | null;
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [dateSlots, setDateSlots] = useState<Record<string, string[]>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages([...images, ...Array.from(e.target.files)]);
  };

  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSlot = (date: Date, slot: string) => {
    const key = format(date, "yyyy-MM-dd");
    setDateSlots((prev) => {
      const current = prev[key] ?? [];
      const updated = current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot];
      if (updated.length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: updated };
    });
  };

  const datesWithSlots = Object.keys(dateSlots).map((d) => new Date(d));

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
        <div className="grid grid-cols-2 gap-6">
          <button
            className="aspect-square bg-black/5 rounded-3xl border-2 border-transparent hover:border-black transition-all duration-300 group flex items-center justify-start px-12"
            onClick={() => navigate("/business/create-listing?type=product")}
          >
            <div className="text-left">
              <Package className="w-14 h-14 text-black/30 mb-8 group-hover:text-black/50 transition-colors" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Physical item</p>
              <p className="text-4xl font-bold tracking-tighter">Product</p>
            </div>
          </button>
          <button
            className="aspect-square border-2 border-black/8 rounded-3xl hover:border-black transition-all duration-300 group flex items-center justify-start px-12"
            onClick={() => navigate("/business/create-listing?type=service")}
          >
            <div className="text-left">
              <Sparkles className="w-14 h-14 text-black/30 mb-8 group-hover:text-black/50 transition-colors" strokeWidth={1.5} />
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Appointment based</p>
              <p className="text-4xl font-bold tracking-tighter">Service</p>
            </div>
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

          {/* Schedule */}
          <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold tracking-tighter mb-1">
              {listingType === "product" ? "Collection Schedule" : "Service Schedule"}
            </h2>
            <p className="text-xs text-black/40 mb-6">Select dates and available time slots</p>

            <div className="grid grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">Pick a date</p>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl"
                  modifiers={{ hasSlots: datesWithSlots }}
                  components={{
                    DayContent: ({ date }) => {
                      const hasSlots = datesWithSlots.some((d) => isSameDay(d, date));
                      return (
                        <div className="relative flex flex-col items-center">
                          <span>{date.getDate()}</span>
                          {hasSlots && (
                            <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black" />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </div>

              {/* Time slots */}
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">
                  {selectedDate ? `Times for ${format(selectedDate, "MMM d, yyyy")}` : "Select a date first"}
                </p>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const key = format(selectedDate, "yyyy-MM-dd");
                      const isSelected = (dateSlots[key] ?? []).includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleSlot(selectedDate, slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                            isSelected
                              ? "bg-black text-white"
                              : "bg-black/5 text-black/60 hover:bg-black/10"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-black/20 text-sm">
                    No date selected
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            {Object.keys(dateSlots).length > 0 && (
              <div className="mt-8 pt-6 border-t border-black/5">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">Selected slots</p>
                <div className="space-y-3">
                  {Object.entries(dateSlots)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([dateKey, slots]) => (
                      <div key={dateKey} className="flex items-start gap-4">
                        <span className="text-sm font-bold w-28 shrink-0">
                          {format(new Date(dateKey + "T00:00:00"), "MMM d, yyyy")}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {slots.map((slot) => (
                            <span
                              key={slot}
                              className="inline-flex items-center gap-1 bg-black/5 text-black/70 text-xs font-semibold px-3 py-1 rounded-full"
                            >
                              {slot}
                              <button
                                type="button"
                                onClick={() => toggleSlot(new Date(dateKey + "T00:00:00"), slot)}
                                className="text-black/30 hover:text-black ml-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="button" onClick={() => navigate(-1)} className="flex-1 rounded-full border border-black/10 bg-transparent text-black hover:bg-black/5">
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
