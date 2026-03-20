import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Star, Heart, MapPin, ShoppingCart, Store } from "lucide-react";
import { mockProducts, mockBusinesses } from "../../data/mockData";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === id);
  const business = mockBusinesses.find((b) => b.id === product?.businessId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product || !business) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p>Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedTimeslot) {
      toast.error("Please select a collection timeslot");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      businessName: product.businessName,
      quantity,
      type: "product",
      timeslot: selectedTimeslot,
    });

    toast.success("Added to cart");
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl mb-2">{product.name}</h1>
              <Link
                to={`/customer/business/${business.id}`}
                className="text-gray-600 hover:underline flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                {product.businessName}
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                className={`w-6 h-6 ${inWishlist ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>

          <p className="text-3xl mb-8">${product.price}</p>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="mb-2">Category</h3>
              <p className="text-gray-600">{product.category}</p>
            </div>

            <div>
              <h3 className="mb-2">Location</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {business.address}
              </p>
            </div>

            <div>
              <h3 className="mb-2">Available Quantity</h3>
              <p className="text-gray-600">{product.quantity} items</p>
            </div>

            <div>
              <h3 className="mb-2">Collection Timeslot</h3>
              <Select value={selectedTimeslot} onValueChange={setSelectedTimeslot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a timeslot" />
                </SelectTrigger>
                <SelectContent>
                  {product.timeslots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setQuantity(Math.min(product.quantity, quantity + 1))
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                handleAddToCart();
                navigate("/customer/cart");
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-3xl mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
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
                <span className="text-sm text-gray-500">{i} days ago</span>
              </div>
              <p className="text-gray-600">
                Excellent product! Highly recommend. The quality exceeded my
                expectations.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}