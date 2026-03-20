import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Heart, Star, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { mockProducts, mockServices } from "../../data/mockData";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  const wishlistProducts = mockProducts.filter((p) => wishlist.includes(p.id));
  const wishlistServices = mockServices.filter((s) => wishlist.includes(s.id));

  const allWishlistItems = [...wishlistProducts, ...wishlistServices];

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      businessName: item.businessName,
      quantity: 1,
      type: "timeslots" in item && Array.isArray(item.timeslots) && item.timeslots.length > 0 && typeof item.timeslots[0] === "string" ? "service" : "product",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-8">Wishlist</h1>

      {allWishlistItems.length === 0 ? (
        <Card className="p-16 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Start adding products and services you love
          </p>
          <Link to="/customer/discover">
            <Button>Browse Products & Services</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {allWishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden relative group">
              <button
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>

              <Link to={`/customer/${"timeslots" in item && Array.isArray(item.timeslots) && item.timeslots.length > 0 && typeof item.timeslots[0] === "string" ? "service" : "product"}/${item.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.businessName}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">${item.price}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3 h-3 fill-black" />
                    {item.rating}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
