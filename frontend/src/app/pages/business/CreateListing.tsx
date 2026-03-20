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
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTimeslot = () => {
    setFormData({ ...formData, timeslots: [...formData.timeslots, ""] });
  };

  const updateTimeslot = (index: number, value: string) => {
    const newTimeslots = [...formData.timeslots];
    newTimeslots[index] = value;
    setFormData({ ...formData, timeslots: newTimeslots });
  };

  const removeTimeslot = (index: number) => {
    setFormData({
      ...formData,
      timeslots: formData.timeslots.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${listingType === "product" ? "Product" : "Service"} listed successfully!`);
    navigate("/business/inventory");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-8">Create Listing</h1>

      {!listingType ? (
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">What would you like to list?</p>
          <Button
            variant="outline"
            className="w-full h-20 text-lg"
            onClick={() => setListingType("product")}
          >
            Product
          </Button>
          <Button
            variant="outline"
            className="w-full h-20 text-lg"
            onClick={() => setListingType("service")}
          >
            Service
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <Card className="p-6">
            <Label className="mb-4 block">Images</Label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </Card>

          {/* Basic Info */}
          <Card className="p-6 space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter((cat) => cat !== "All").map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {listingType === "product" && (
              <div>
                <Label htmlFor="quantity">Quantity Available</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </Card>

          {/* Timeslots */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Label>
                {listingType === "product"
                  ? "Collection Timeslots"
                  : "Available Timeslots"}
              </Label>
              <Button type="button" variant="outline" size="sm" onClick={addTimeslot}>
                Add Timeslot
              </Button>
            </div>
            <div className="space-y-3">
              {formData.timeslots.map((slot, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={slot}
                    onChange={(e) => updateTimeslot(index, e.target.value)}
                    placeholder="e.g., 10:00 AM"
                    required
                  />
                  {formData.timeslots.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeslot(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setListingType(null)}
            >
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Create Listing
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
