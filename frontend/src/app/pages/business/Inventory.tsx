import { useState, useRef } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Calendar } from "../../components/ui/calendar";
import { Edit, Trash2, GripVertical, Plus, X } from "lucide-react";
import { mockProducts, mockServices, categories } from "../../data/mockData";
import { format, isSameDay } from "date-fns";

const TIME_SLOTS = [
  "6:00 AM","7:00 AM","8:00 AM","9:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM",
  "6:00 PM","7:00 PM","8:00 PM","9:00 PM","10:00 PM","11:00 PM","12:00 AM",
];

type Listing = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  timeslots: Record<string, string[]> | string[];
  quantity?: number;
};

// ── Schedule rows ─────────────────────────────────────────────────────────────

function ListingSchedule({ timeslots, label }: { timeslots: Record<string, string[]> | string[]; label: string }) {
  const schedule: Record<string, string[]> = Array.isArray(timeslots) ? {} : timeslots;
  const entries = Object.entries(schedule).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mt-4 pt-4 border-t border-black/5">
      <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">{label}</p>
      {entries.length === 0 ? (
        <p className="text-sm text-black/30">No schedule set</p>
      ) : (
        <div className="space-y-2">
          {entries.map(([dateKey, slots]) => (
            <div key={dateKey} className="flex items-center gap-4">
              <span className="text-xs font-semibold text-black/50 w-24 shrink-0">
                {format(new Date(dateKey + "T00:00:00"), "MMM d, yyyy")}
              </span>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <span key={slot} className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium text-black/70">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Edit dialog ───────────────────────────────────────────────────────────────

function EditDialog({
  item,
  type,
  open,
  onClose,
  onSave,
}: {
  item: Listing;
  type: "product" | "service";
  open: boolean;
  onClose: () => void;
  onSave: (updated: Listing) => void;
}) {
  const [fields, setFields] = useState({
    name: item.name,
    description: item.description,
    category: item.category,
    price: String(item.price),
    quantity: String(item.quantity ?? ""),
  });

  const initSchedule: Record<string, string[]> = Array.isArray(item.timeslots) ? {} : { ...item.timeslots };
  const [schedule, setSchedule] = useState<Record<string, string[]>>(initSchedule);
  const [pickerDate, setPickerDate] = useState<Date | undefined>(undefined);

  const datesWithSlots = Object.keys(schedule).map((k) => new Date(k + "T00:00:00"));

  const toggleSlot = (date: Date, slot: string) => {
    const key = format(date, "yyyy-MM-dd");
    setSchedule((prev) => {
      const current = prev[key] ?? [];
      const updated = current.includes(slot) ? current.filter((s) => s !== slot) : [...current, slot];
      if (updated.length === 0) { const { [key]: _, ...rest } = prev; return rest; }
      return { ...prev, [key]: updated };
    });
  };

  const removeDate = (dateKey: string) => {
    const { [dateKey]: _, ...rest } = schedule;
    setSchedule(rest);
    if (pickerDate && format(pickerDate, "yyyy-MM-dd") === dateKey) setPickerDate(undefined);
  };

  const handleSave = () => {
    onSave({
      ...item,
      name: fields.name,
      description: fields.description,
      category: fields.category,
      price: parseFloat(fields.price) || item.price,
      quantity: fields.quantity ? parseInt(fields.quantity) : item.quantity,
      timeslots: schedule,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-black/5 p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tighter">Edit Listing</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Name */}
          <div>
            <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 block">Name</Label>
            <Input value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })}
              className="bg-black/5 border-none rounded-xl" />
          </div>

          {/* Description */}
          <div>
            <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 block">Description</Label>
            <Textarea value={fields.description} onChange={(e) => setFields({ ...fields, description: e.target.value })}
              rows={3} className="bg-black/5 border-none rounded-xl resize-none" />
          </div>

          {/* Category + Price row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 block">Category</Label>
              <Select value={fields.category} onValueChange={(v) => setFields({ ...fields, category: v })}>
                <SelectTrigger className="bg-black/5 border-none rounded-xl h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-black/5 rounded-3xl">
                  {(categories as string[]).filter((c) => c !== "All").map((c) => (
                    <SelectItem key={c} value={c} className="rounded-xl">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 block">Price ($)</Label>
              <Input type="number" min="0" step="0.01" value={fields.price}
                onChange={(e) => setFields({ ...fields, price: e.target.value })}
                className="bg-black/5 border-none rounded-xl" />
            </div>
          </div>

          {/* Quantity (products only) */}
          {type === "product" && (
            <div>
              <Label className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2 block">Quantity</Label>
              <Input type="number" min="1" value={fields.quantity}
                onChange={(e) => setFields({ ...fields, quantity: e.target.value })}
                className="bg-black/5 border-none rounded-xl" />
            </div>
          )}

          {/* Schedule */}
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">
              {type === "product" ? "Collection Schedule" : "Service Schedule"}
            </p>

            {/* Existing date rows */}
            {Object.entries(schedule).sort(([a], [b]) => a.localeCompare(b)).map(([dateKey, slots]) => (
              <div key={dateKey} className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold text-black/50 w-24 shrink-0">
                  {format(new Date(dateKey + "T00:00:00"), "MMM d, yyyy")}
                </span>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {slots.map((slot) => (
                    <span key={slot} className="px-2.5 py-1 bg-black/5 rounded-full text-xs font-medium text-black/70">
                      {slot}
                    </span>
                  ))}
                </div>
                <button onClick={() => removeDate(dateKey)}
                  className="text-black/20 hover:text-black/50 transition-colors shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Add date section */}
            <div className="mt-4 p-4 bg-black/3 rounded-2xl border border-black/5">
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/30 mb-3">Add date & slots</p>
              <div className="grid grid-cols-[auto_1fr] gap-6">
                <Calendar
                  mode="single"
                  selected={pickerDate}
                  onSelect={setPickerDate}
                  className="rounded-xl !p-0"
                  modifiers={{ hasSlots: datesWithSlots }}
                  components={{
                    DayContent: ({ date }) => {
                      const has = datesWithSlots.some((d) => isSameDay(d, date));
                      return (
                        <div className="relative flex flex-col items-center">
                          <span>{date.getDate()}</span>
                          {has && <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black/50" />}
                        </div>
                      );
                    },
                  }}
                />
                <div>
                  {pickerDate ? (
                    <>
                      <p className="text-xs font-semibold text-black/40 mb-2">
                        {format(pickerDate, "MMM d, yyyy")}
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {TIME_SLOTS.map((slot) => {
                          const key = format(pickerDate, "yyyy-MM-dd");
                          const selected = (schedule[key] ?? []).includes(slot);
                          return (
                            <button key={slot} type="button" onClick={() => toggleSlot(pickerDate, slot)}
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                                selected ? "bg-black text-white" : "bg-black/5 text-black/60 hover:bg-black/10"
                              }`}>
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-black/30 mt-4">Select a date to add slots</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button type="button" onClick={onClose}
            className="flex-1 rounded-full border border-black/10 bg-transparent text-black hover:bg-black/5">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}
            className="flex-1 rounded-full bg-black text-white hover:bg-black/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Inventory page ───────────────────────────────────────────────────────

export default function Inventory() {
  const [products, setProducts] = useState(mockProducts.slice(0, 3) as Listing[]);
  const [services, setServices] = useState(mockServices.slice(0, 2) as Listing[]);
  const [editingItem, setEditingItem] = useState<{ item: Listing; type: "product" | "service" } | null>(null);

  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggingIn, setDraggingIn] = useState<"product" | "service" | null>(null);

  const handleDelete = (id: string, type: "product" | "service") => {
    if (type === "product") setProducts(products.filter((p) => p.id !== id));
    else setServices(services.filter((s) => s.id !== id));
  };

  const handleSave = (updated: Listing, type: "product" | "service") => {
    if (type === "product") setProducts(products.map((p) => p.id === updated.id ? updated : p));
    else setServices(services.map((s) => s.id === updated.id ? updated : s));
  };

  const handleDragStart = (index: number, type: "product" | "service") => {
    dragIndex.current = index;
    setDraggingIn(type);
  };
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDrop = (dropIndex: number, type: "product" | "service") => {
    const from = dragIndex.current;
    if (from === null || from === dropIndex) { setDragOverIndex(null); return; }
    if (type === "product") {
      const next = [...products];
      const [moved] = next.splice(from, 1);
      next.splice(dropIndex, 0, moved);
      setProducts(next);
    } else {
      const next = [...services];
      const [moved] = next.splice(from, 1);
      next.splice(dropIndex, 0, moved);
      setServices(next);
    }
    dragIndex.current = null;
    setDragOverIndex(null);
    setDraggingIn(null);
  };
  const handleDragEnd = () => {
    dragIndex.current = null;
    setDragOverIndex(null);
    setDraggingIn(null);
  };

  const renderCard = (item: Listing, index: number, type: "product" | "service") => (
    <Card
      key={item.id}
      draggable
      onDragStart={() => handleDragStart(index, type)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={() => handleDrop(index, type)}
      onDragEnd={handleDragEnd}
      className={`p-6 border rounded-3xl shadow-sm transition-all duration-200 select-none
        ${draggingIn === type && dragIndex.current === index ? "opacity-40" : "opacity-100"}
        ${draggingIn === type && dragOverIndex === index && dragIndex.current !== index
          ? "border-black scale-[1.01]" : "border-black/5"}
      `}
    >
      <div className="flex items-center gap-6">
        <span className="cursor-grab active:cursor-grabbing text-black/30 hover:text-black/60 transition-colors">
          <GripVertical className="w-5 h-5" />
        </span>
        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
        <div className="flex-1">
          <h3 className="text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-black/60 mb-2">{item.description}</p>
          <div className="flex items-center gap-4 text-sm text-black/40">
            <span>Category: {item.category}</span>
            <span>•</span>
            {type === "product" && item.quantity !== undefined && (
              <><span>Quantity: {item.quantity}</span><span>•</span></>
            )}
            <span>Price: ${item.price}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setEditingItem({ item, type })}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleDelete(item.id, type)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ListingSchedule
        timeslots={item.timeslots}
        label={type === "product" ? "Collection Schedule" : "Service Schedule"}
      />
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Inventory</h1>
        <Link to="/business/create-listing">
          <Button><Plus className="w-4 h-4 mr-2" />Create Listing</Button>
        </Link>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="bg-black/5 p-2 rounded-full mb-8">
          <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            Products ({products.length})
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            Services ({services.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {products.length === 0 ? (
            <Card className="p-16 text-center">
              <h2 className="text-2xl font-bold tracking-tighter mb-2">No products yet</h2>
              <p className="text-black/60 mb-6">Start by creating your first product</p>
              <Link to="/business/create-listing"><Button>Create Product</Button></Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {products.map((p, i) => renderCard(p, i, "product"))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          {services.length === 0 ? (
            <Card className="p-16 text-center">
              <h2 className="text-2xl font-bold tracking-tighter mb-2">No services yet</h2>
              <p className="text-black/60 mb-6">Start by creating your first service</p>
              <Link to="/business/create-listing"><Button>Create Service</Button></Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {services.map((s, i) => renderCard(s, i, "service"))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {editingItem && (
        <EditDialog
          item={editingItem.item}
          type={editingItem.type}
          open
          onClose={() => setEditingItem(null)}
          onSave={(updated) => handleSave(updated, editingItem.type)}
        />
      )}
    </div>
  );
}
