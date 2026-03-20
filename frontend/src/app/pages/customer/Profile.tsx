import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Wallet, Star, Pencil, CheckCircle } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useReviews } from "../../context/ReviewContext";
import { useNavigate } from "react-router";
import { mockProducts, mockServices } from "../../data/mockData";

export default function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { reviews, addReview } = useReviews();

  const [reviewTarget, setReviewTarget] = useState<{ id: string; name: string; type: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const purchaseHistory = [
    { ...mockProducts[0], date: "2026-03-15", type: "product" },
    { ...mockServices[0], date: "2026-03-10", type: "service" },
    { ...mockProducts[1], date: "2026-03-05", type: "product" },
  ];

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-8">Profile</h1>

      {/* User Info + Wallet */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="p-8 relative flex flex-col justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full hover:bg-black/5"
            onClick={() => navigate("/customer/settings")}
          >
            <Pencil className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          </Button>
          <div className="flex items-center gap-6 justify-center h-full">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl shrink-0">
              {user?.username?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight mb-1">{user?.username}</h2>
              <p className="text-base text-gray-500 mb-1">{user?.email}</p>
              <p className="text-sm text-gray-400">User since March 2026</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Wallet</h2>
            <Wallet className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-end gap-3 mb-6">
            <p className="text-4xl">${user?.wallet?.toFixed(2) || "0.00"}</p>
            <p className="text-gray-600 pb-1">Available Balance</p>
          </div>
          <div className="flex gap-3">
            <Button>Top Up</Button>
            <Button variant="outline">Withdraw</Button>
          </div>
        </Card>
      </div>

      {/* Purchase History - Products */}
      <div className="mb-8">
        <h2 className="text-2xl mb-6">Product Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "product")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/product/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/product/${item.id}`)}
                    className="font-medium mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-gray-600">{item.businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm" onClick={() => openReview(item.id, item.name, "product")}>
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
        </Card>
      </div>

      {/* Purchase History - Services */}
      <div>
        <h2 className="text-2xl mb-6">Service Purchase History</h2>
        <Card className="divide-y">
          {purchaseHistory
            .filter((item) => item.type === "service")
            .map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <button onClick={() => navigate(`/customer/service/${item.id}`)} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity" />
                </button>
                <div className="flex-1">
                  <button
                    onClick={() => navigate(`/customer/service/${item.id}`)}
                    className="font-medium mb-1 hover:underline text-left"
                  >
                    {item.name}
                  </button>
                  <p className="text-sm text-gray-600">{item.businessName}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium mb-2">${item.price}</p>
                  <Button variant="outline" size="sm" onClick={() => openReview(item.id, item.name, "service")}>
                    <Star className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
        </Card>
      </div>

      {/* My Reviews */}
      {reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl mb-6">My Reviews</h2>
          <Card className="divide-y">
            {reviews.map((review, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => navigate(`/customer/${review.type}/${review.id}`)}
                    className="font-medium hover:underline text-left"
                  >
                    {review.name}
                  </button>
                  <p className="text-sm text-gray-400">{review.date}</p>
                </div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={review.rating >= star ? "#000" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                {review.text && <p className="text-sm text-gray-600">{review.text}</p>}
              </div>
            ))}
          </Card>
        </div>
      )}

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
