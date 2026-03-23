import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Wallet, MapPin, CheckCircle2, Star } from "lucide-react";
import { useUser } from "../../context/UserContext";

const mockReviews = [
  { id: "r1", author: "john_doe",    rating: 5, text: "Absolutely amazing! Best in town.",              date: "2026-03-10" },
  { id: "r2", author: "sarah_smith", rating: 4, text: "Great experience, will come back.",              date: "2026-03-12" },
  { id: "r3", author: "mike_jones",  rating: 5, text: "Super fresh and delicious. Highly recommend!",   date: "2026-03-14" },
  { id: "r4", author: "emma_wilson", rating: 4, text: "Lovely products, fast service.",                 date: "2026-03-16" },
  { id: "r5", author: "lisa_tan",    rating: 5, text: "Will definitely order again. Perfect quality.",   date: "2026-03-18" },
];

export default function BusinessProfilePage() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Open reviews dialog if URL contains ?reviews=open
  useEffect(() => {
    if (searchParams.get("reviews") === "open") setReviewsOpen(true);
  }, [searchParams]);

  const sorted = [...mockReviews].sort((a, b) => {
    if (sortBy === "newest")  return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest")  return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest")  return a.rating - b.rating;
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Account</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Business Profile</h1>
      </div>

      {/* Business Info */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl">
            {user?.businessName?.[0].toUpperCase() || user?.username?.[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl">{user?.businessName || "My Business"}</h2>
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-black/60 mb-3">@{user?.username}</p>
            <p className="text-black/60 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              123 Main Street, Downtown
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t">
          <div>
            <p className="text-sm text-black/60 mb-1">Rating</p>
            <p className="text-2xl">4.8 ⭐</p>
          </div>
          <div>
            <p className="text-sm text-black/60 mb-1">Total Reviews</p>
            <button
              onClick={() => setReviewsOpen(true)}
              className="text-2xl font-semibold hover:underline underline-offset-4 transition-all"
            >
              {mockReviews.length}
            </button>
          </div>
          <div>
            <p className="text-sm text-black/60 mb-1">Verified Business</p>
            <p className="text-2xl">Yes</p>
          </div>
        </div>
      </Card>

      {/* Bank */}
      <Card className="p-8 mb-6 border border-black/5 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Bank</h2>
          <Wallet className="w-6 h-6 text-black/30" />
        </div>
        <div className="flex items-end gap-3 mb-6">
          <p className="text-4xl">${user?.bank?.toFixed(2) || "0.00"}</p>
          <p className="text-black/60 pb-1">Available Balance</p>
        </div>
        <Button>Withdraw Funds</Button>
      </Card>

      {/* Transaction History */}
      <div>
        <h2 className="text-2xl font-bold tracking-tighter mb-6">Recent Transactions</h2>
        <Card className="divide-y">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Order Payment</p>
              <p className="text-sm text-black/60">Chocolate Cake - @john_doe</p>
              <p className="text-sm text-black/40 mt-1">March 18, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$35.00</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Service Payment</p>
              <p className="text-sm text-black/60">Gel Manicure - @sarah_smith</p>
              <p className="text-sm text-black/40 mt-1">March 17, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$40.00</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Order Payment</p>
              <p className="text-sm text-black/60">Croissants - @mike_jones</p>
              <p className="text-sm text-black/40 mt-1">March 16, 2026</p>
            </div>
            <p className="text-lg font-medium text-green-600">+$12.00</p>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium mb-1">Withdrawal</p>
              <p className="text-sm text-black/60">Transfer to bank account</p>
              <p className="text-sm text-black/40 mt-1">March 15, 2026</p>
            </div>
            <p className="text-lg font-medium text-red-600">-$500.00</p>
          </div>
        </Card>
      </div>

      {/* Reviews Dialog */}
      <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
        <DialogContent className="rounded-3xl p-8 max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold tracking-tighter">All Reviews</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between mt-2 mb-4">
            <p className="text-sm text-black/40">{mockReviews.length} reviews</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-black/5 border-none rounded-xl h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-black/5">
                <SelectItem value="newest"  className="rounded-xl">Newest first</SelectItem>
                <SelectItem value="oldest"  className="rounded-xl">Oldest first</SelectItem>
                <SelectItem value="highest" className="rounded-xl">Highest rated</SelectItem>
                <SelectItem value="lowest"  className="rounded-xl">Lowest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-y-auto flex-1 space-y-4 pr-1">
            {sorted.map((review) => (
              <div key={review.id} className="border border-black/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">@{review.author}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-black" : "fill-black/10"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-black/70 leading-relaxed">{review.text}</p>
                <p className="text-[10px] uppercase tracking-widest text-black/30 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
