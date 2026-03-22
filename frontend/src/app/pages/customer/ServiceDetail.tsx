import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Star, Heart, MapPin, Calendar, Store } from "lucide-react";
import { mockServices, mockBusinesses } from "../../data/mockData";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import DateTimePicker from "../../components/DateTimePicker";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const service = mockServices.find((s) => s.id === id);
  const business = mockBusinesses.find((b) => b.id === service?.businessId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service || !business) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p>Service not found</p>
      </div>
    );
  }

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    addToCart({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.image,
      businessName: service.businessName,
      quantity: 1,
      type: "service",
      timeslot: `${selectedDate} ${selectedTime}`,
    });

    toast.success("Service added to cart");
  };

  const inWishlist = isInWishlist(service.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 gap-12 mb-16">
        {/* Service Image */}
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Service Details */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter mb-2">{service.name}</h1>
              <Link
                to={`/customer/business/${business.id}`}
                className="text-black/60 hover:underline flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                {service.businessName}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleWishlist(service.id)}
            >
              <Heart
                className={`w-6 h-6 ${inWishlist ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black" />
              <span className="font-medium">{service.rating}</span>
            </div>
            <span className="text-black/30">|</span>
            <span className="text-black/60">{service.reviews} reviews</span>
          </div>

          <p className="text-3xl mb-8">${service.price}</p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-black/60">{service.description}</p>
            </div>

            <div>
              <h3 className="mb-2">Category</h3>
              <p className="text-black/60">{service.category}</p>
            </div>

            <div>
              <h3 className="mb-2">Location</h3>
              <p className="text-black/60 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {business.address}
              </p>
            </div>

            <div>
              <h3 className="mb-3">Appointment Date & Time</h3>
              <DateTimePicker
                timeslots={service.timeslots}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelect={(date, time) => { setSelectedDate(date); setSelectedTime(time); }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleBook}>
              <Calendar className="w-5 h-5 mr-2" />
              Book Service
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                handleBook();
                navigate("/customer/cart");
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-3xl font-bold tracking-tighter mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 border border-black/5 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={`https://images.unsplash.com/photo-${1494790108377 + i}?w=100`}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Customer {i}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-black" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-black/40">{i} days ago</span>
              </div>
              <p className="text-black/60">
                Amazing service! Very professional and exceeded expectations. Will
                definitely book again.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}