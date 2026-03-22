import { useParams, Link } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { mockBusinesses, mockProducts, mockServices } from "../../data/mockData";
import { useReviews } from "../../context/ReviewContext";

const mockReviews = [
  { id: "r1", author: "john_doe",    rating: 5, text: "Absolutely amazing! Best in town.", date: "2026-03-10" },
  { id: "r2", author: "sarah_smith", rating: 4, text: "Great experience, will come back.", date: "2026-03-12" },
  { id: "r3", author: "mike_jones",  rating: 3, text: "Decent but could be better.",        date: "2026-03-14" },
  { id: "r4", author: "emma_wilson", rating: 5, text: "Loved everything about it!",         date: "2026-03-16" },
  { id: "r5", author: "alex_tan",    rating: 2, text: "Not what I expected.",               date: "2026-03-18" },
];

export default function BusinessProfile() {
  const { id } = useParams();
  const business = mockBusinesses.find((b) => b.id === id);
  const { reviews: userReviews } = useReviews();

  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!business) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p>Business not found</p>
      </div>
    );
  }

  const businessProducts = mockProducts.filter((p) => p.businessId === id);
  const businessServices = mockServices.filter((s) => s.businessId === id);

  // Combine mock reviews with any user-submitted reviews for this business's products/services
  const businessItemIds = [
    ...businessProducts.map(p => p.id),
    ...businessServices.map(s => s.id),
  ];
  const combinedReviews = [
    ...mockReviews,
    ...userReviews
      .filter(r => businessItemIds.includes(r.id))
      .map(r => ({ ...r, author: "you" })),
  ];

  const sortedReviews = useMemo(() => {
    return [...combinedReviews].sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest")  return a.rating - b.rating;
      if (sortBy === "oldest")  return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date); // newest
    });
  }, [sortBy, userReviews]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Business Header */}
      <div className="mb-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="col-span-1">
            <img
              src={business.image}
              alt={business.name}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="col-span-2">
            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-5xl font-bold tracking-tighter leading-tight">{business.name}</h1>
              {business.verified && (
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-lg text-black/60 mb-6">{business.description}</p>
            <div className="flex items-center gap-6 mb-6">
              <button
                onClick={() => setReviewsOpen(true)}
                className="flex items-center gap-2 hover:underline"
              >
                <Star className="w-5 h-5 fill-black" />
                <span className="font-medium">{business.rating}</span>
                <span className="text-black/40">({business.reviews} reviews)</span>
              </button>
              {business.verified && (
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Business</span>
                </div>
              )}
            </div>
            <div className="flex items-start gap-2 text-black/60">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{business.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products and Services */}
      <Tabs defaultValue="products">
        <TabsList className="bg-black/5 p-2 rounded-full mb-8">
          <TabsTrigger value="products">
            Products ({businessProducts.length})
          </TabsTrigger>
          <TabsTrigger value="services">
            Services ({businessServices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {businessProducts.length === 0 ? (
            <Card className="p-12 text-center text-black/40">
              No products available
            </Card>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {businessProducts.map((product) => (
                <Link key={product.id} to={`/customer/product/${product.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${product.price}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-black" />
                          {product.rating}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          {businessServices.length === 0 ? (
            <Card className="p-12 text-center text-black/40">
              No services available
            </Card>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {businessServices.map((service) => (
                <Link key={service.id} to={`/customer/service/${service.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-1">{service.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${service.price}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3 h-3 fill-black" />
                          {service.rating}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reviews Dialog */}
      <Dialog open={reviewsOpen} onOpenChange={setReviewsOpen}>
        <DialogContent className="rounded-3xl p-8 max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl tracking-tight">Reviews</DialogTitle>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-black" />
              <span className="font-semibold">{business.rating}</span>
              <span className="text-sm text-black/40">· {business.reviews} reviews</span>
            </div>
          </DialogHeader>

          <div className="mt-4 mb-4 shrink-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-xl w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="highest">Highest rated</SelectItem>
                <SelectItem value="lowest">Lowest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-y-auto flex-1 space-y-4 pr-1">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border border-black/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">@{review.author}</span>
                  <span className="text-xs text-black/40">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4"
                      fill={review.rating >= star ? "#000" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                {review.text && <p className="text-sm text-black/60 leading-relaxed">{review.text}</p>}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
