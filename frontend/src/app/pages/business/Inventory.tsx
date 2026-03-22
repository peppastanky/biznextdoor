import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Edit, Trash2, GripVertical, Plus } from "lucide-react";
import { mockProducts, mockServices } from "../../data/mockData";

export default function Inventory() {
  const [products, setProducts] = useState(mockProducts.slice(0, 3));
  const [services, setServices] = useState(mockServices.slice(0, 2));

  const handleDelete = (id: string, type: "product" | "service") => {
    if (type === "product") {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Inventory</h1>
        <Link to="/business/create-listing">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Listing
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="bg-black/5 p-2 rounded-full mb-8">
          <TabsTrigger value="products" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="services" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Services ({services.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {products.length === 0 ? (
            <Card className="p-16 text-center">
              <h2 className="text-2xl font-bold tracking-tighter mb-2">No products yet</h2>
              <p className="text-black/60 mb-6">Start by creating your first product</p>
              <Link to="/business/create-listing">
                <Button>Create Product</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-6">
                    <button className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-black/30" />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-black/60 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-sm text-black/40">
                        <span>Category: {product.category}</span>
                        <span>•</span>
                        <span>Quantity: {product.quantity}</span>
                        <span>•</span>
                        <span>Price: ${product.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(product.id, "product")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-black/60 mb-2">Collection Timeslots:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.timeslots.map((slot, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="services">
          {services.length === 0 ? (
            <Card className="p-16 text-center">
              <h2 className="text-2xl font-bold tracking-tighter mb-2">No services yet</h2>
              <p className="text-black/60 mb-6">Start by creating your first service</p>
              <Link to="/business/create-listing">
                <Button>Create Service</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="p-6 border border-black/5 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-6">
                    <button className="cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-5 h-5 text-black/30" />
                    </button>

                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-24 h-24 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{service.name}</h3>
                      <p className="text-sm text-black/60 mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-black/40">
                        <span>Category: {service.category}</span>
                        <span>•</span>
                        <span>Price: ${service.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(service.id, "service")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-black/60 mb-2">Available Timeslots:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.timeslots.map((slot, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
