import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar as CalendarUI } from "../../components/ui/calendar";
import { Wallet, Package, Calendar, ArrowRight, Star, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { useUser } from "../../context/UserContext";
import { useReviews } from "../../context/ReviewContext";
import { mockProducts, mockServices, mockBusinesses } from "../../data/mockData";
import { motion } from "motion/react";
import { format, isSameDay, parseISO } from "date-fns";

const scheduleItems = [
  { date: "2026-03-22", time: "10:00 AM – 11:00 AM", name: mockServices[0].name, business: mockServices[0].businessName, type: "service", id: mockServices[0].id },
  { date: "2026-03-25", time: "2:00 PM – 3:00 PM",   name: mockServices[1].name, business: mockServices[1].businessName, type: "service", id: mockServices[1].id },
  { date: "2026-03-28", time: "11:30 AM – 12:30 PM", name: mockServices[2].name, business: mockServices[2].businessName, type: "service", id: mockServices[2].id },
  { date: "2026-03-20", time: "9:00 AM – 12:00 PM",  name: mockProducts[0].name, business: mockProducts[0].businessName, type: "collect", id: mockProducts[0].id },
  { date: "2026-03-19", time: "1:00 PM – 5:00 PM",   name: mockProducts[1].name, business: mockProducts[1].businessName, type: "collect", id: mockProducts[1].id },
];

export default function CustomerHome() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { addReview } = useReviews();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [reviewTarget, setReviewTarget] = useState<{ id: string; name: string; type: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  function openReview(id: string, name: string, type: string) {
    setReviewTarget({ id, name, type });
    setRating(0);
    setHoverRating(0);
    setReviewText("");
    setReviewSuccess(false);
  }

  function handleSubmitReview() {
    if (!reviewTarget) return;
    addReview({
      ...reviewTarget,
      rating,
      text: reviewText,
      date: new Date().toISOString().slice(0, 10),
    });
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewTarget(null);
      setReviewSuccess(false);
    }, 1500);
  }

  const recommended = [...mockProducts.slice(0, 3), ...mockServices.slice(0, 2)];

  const dayItems = scheduleItems.filter(item => isSameDay(parseISO(item.date), selectedDate));

  const scheduledDates = scheduleItems.map(item => parseISO(item.date));

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Calendar and Timeline */}
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Schedule</p>
        <h2 className="text-4xl font-bold tracking-tighter leading-tight">Your Calendar</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-6">Calendar</p>
          <CalendarUI
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-xl"
            modifiers={{ scheduled: scheduledDates }}
            components={{
              DayContent: ({ date, ...props }) => {
                const hasItems = scheduledDates.some(d => isSameDay(d, date));
                return (
                  <div className="relative flex flex-col items-center">
                    <span>{date.getDate()}</span>
                    {hasItems && (
                      <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-black" />
                    )}
                  </div>
                );
              },
            }}
          />
        </Card>

        <Card className="col-span-1 md:col-span-2 p-8 border border-black/5 rounded-3xl bg-white shadow-sm">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Schedule</p>
            <h2 className="text-2xl font-bold tracking-tighter">{format(selectedDate, "MMMM dd, yyyy")}</h2>
          </div>

          {dayItems.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-black/30 text-sm">
              Nothing scheduled for this day
            </div>
          ) : (
            <div className="space-y-4">
              {dayItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/customer/${item.type === "service" ? "service" : "product"}/${item.id}`)}
                  className="w-full text-left border border-black/5 p-6 rounded-3xl hover:bg-black/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold">{item.time}</p>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                      item.type === "service" ? "bg-black/10 text-black" : "bg-black text-white"
                    }`}>
                      {item.type === "service" ? "Service" : "Collect"}
                    </span>
                  </div>
                  <p className="text-sm font-bold mb-1">{item.name}</p>
                  <p className="text-sm text-black/40">{item.business}</p>
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Dashboard Cards */}
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Overview</p>
        <h2 className="text-4xl font-bold tracking-tighter leading-tight">At a Glance</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Wallet Balance</p>
                <p className="text-4xl font-bold tracking-tighter">${user?.wallet || 0}</p>
              </div>
              <Wallet className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              Top Up
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Services Booked</p>
                <p className="text-4xl font-bold tracking-tighter">3</p>
              </div>
              <Calendar className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button onClick={() => navigate("/customer/my-orders?tab=services")} variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              View All
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 border border-black/5 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">To Collect</p>
                <p className="text-4xl font-bold tracking-tighter">2</p>
              </div>
              <Package className="w-10 h-10 text-black/20" strokeWidth={1.5} />
            </div>
            <Button onClick={() => navigate("/customer/my-orders?tab=collect")} variant="outline" size="sm" className="w-full rounded-full border-black/10 hover:bg-black/5 transition-all duration-300">
              View All
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Recommended Products & Services */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Curated</p>
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Recommended for You</h2>
          </div>
          <Link to="/customer/discover">
            <Button variant="ghost" className="rounded-full hover:bg-black/5 gap-2 transition-all duration-300">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {recommended.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {(() => {
                const isService = !("quantity" in item);
                return (
                  <Link to={`/customer/${isService ? "service" : "product"}/${item.id}`} className="group block">
                    <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                          isService ? "bg-white/90 text-black" : "bg-black/80 text-white"
                        }`}>
                          {isService ? "Service" : "Product"}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-black/40 mb-3">{item.businessName}</p>
                        <div className="flex items-center justify-between">
                          <p className="font-bold">${item.price}</p>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-3 h-3 fill-black" />
                            <span className="font-bold">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Businesses */}
      <div className="mb-24">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Nearby</p>
            <h2 className="text-4xl font-bold tracking-tighter leading-tight">Businesses Near You</h2>
          </div>
          <Link to="/customer/businesses">
            <Button variant="ghost" className="rounded-full hover:bg-black/5 gap-2 transition-all duration-300">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {mockBusinesses.map((business, i) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/customer/business/${business.id}`} className="group block">
                <Card className="overflow-hidden border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">{business.name}</h3>
                    <p className="text-sm text-black/60 mb-4 line-clamp-2 leading-relaxed">
                      {business.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-black/60">{business.address.split(",")[1]}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-black" />
                        <span className="font-bold">{business.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">History</p>
          <h2 className="text-4xl font-bold tracking-tighter leading-tight">Recent Activity</h2>
        </div>
        <Card className="border border-black/5 rounded-3xl overflow-hidden shadow-sm divide-y divide-black/5">
          {[
            { item: mockProducts[0], type: "product", label: "Purchased from", ago: "2 days ago" },
            { item: mockServices[0], type: "service", label: "Booked at",      ago: "5 days ago" },
            { item: mockProducts[1], type: "product", label: "Purchased from", ago: "1 week ago" },
          ].map(({ item, type, label, ago }) => (
            <div key={item.id} className="p-8 flex items-center gap-6 hover:bg-black/5 transition-all duration-300">
              <button onClick={() => navigate(`/customer/${type}/${item.id}`)} className="shrink-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl hover:opacity-80 transition-opacity" />
              </button>
              <div className="flex-1">
                <button onClick={() => navigate(`/customer/${type}/${item.id}`)} className="font-bold mb-1 hover:underline text-left">
                  {item.name}
                </button>
                <p className="text-sm text-black/60">{label} {item.businessName}</p>
              </div>
              <div className="text-right">
                <p className="font-bold mb-1">${item.price}</p>
                <p className="text-xs text-black/40 uppercase tracking-widest mb-2">{ago}</p>
                <Button variant="outline" size="sm" onClick={() => openReview(item.id, item.name, type)}>
                  <Star className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!reviewTarget} onOpenChange={() => setReviewTarget(null)}>
        <DialogContent className="rounded-3xl p-8 max-w-md">
          {reviewSuccess ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <CheckCircle className="w-12 h-12 text-green-500" strokeWidth={1.5} />
              <p className="text-xl font-semibold">Review sent successfully!</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl tracking-tight">Leave a Review</DialogTitle>
                {reviewTarget && <p className="text-sm text-gray-500 mt-1">{reviewTarget.name}</p>}
              </DialogHeader>
              <div className="flex gap-2 my-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className="w-8 h-8 transition-colors"
                      fill={(hoverRating || rating) >= star ? "#000" : "none"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full border border-black/10 rounded-xl p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black/20"
              />
              <div className="flex gap-3 mt-2">
                <Button onClick={handleSubmitReview} disabled={rating === 0} className="flex-1">
                  Submit Review
                </Button>
                <Button variant="outline" onClick={() => setReviewTarget(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}