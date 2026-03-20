import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import { mockBusinesses, mockProducts, mockServices } from "../../data/mockData";

export default function BusinessProfile() {
  const { id } = useParams();
  const business = mockBusinesses.find((b) => b.id === id);

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
              <h1 className="text-4xl">{business.name}</h1>
              {business.verified && (
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-lg text-gray-600 mb-6">{business.description}</p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-black" />
                <span className="font-medium">{business.rating}</span>
                <span className="text-gray-500">({business.reviews} reviews)</span>
              </div>
              {business.verified && (
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Business</span>
                </div>
              )}
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{business.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products and Services */}
      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">
            Products ({businessProducts.length})
          </TabsTrigger>
          <TabsTrigger value="services">
            Services ({businessServices.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {businessProducts.length === 0 ? (
            <Card className="p-12 text-center text-gray-500">
              No products available
            </Card>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {businessProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/customer/product/${product.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
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
            <Card className="p-12 text-center text-gray-500">
              No services available
            </Card>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {businessServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/customer/service/${service.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
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
    </div>
  );
}