"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const topProducts = [
  {
    id: "1",
    name: "Organic Vegetable Box",
    price: 150000,
    sold: 156,
    type: "premium",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    name: "Premium Coffee Beans",
    price: 125000,
    sold: 142,
    type: "premium",
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    name: "Artisan Sourdough Bread",
    price: 85000,
    sold: 128,
    type: "standard",
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=400",
  },
];

export function TopProducts() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 p-4 border rounded-lg"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{product.name}</p>
              <Badge variant={product.type === "premium" ? "default" : "secondary"}>
                {product.type}
              </Badge>
            </div>
            <p className="text-sm text-primary mt-1">{formatCurrency(product.price)}</p>
            <p className="text-sm text-muted-foreground">{product.sold} sold</p>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/dashboard/products")}
      >
        Manage Products
      </Button>
    </div>
  );
}