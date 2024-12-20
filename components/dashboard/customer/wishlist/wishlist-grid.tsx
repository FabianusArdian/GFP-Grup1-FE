"use client";

import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";

interface WishlistGridProps {
  search: string;
}

const wishlistItems = [
  {
    id: "1",
    name: "Organic Vegetable Box",
    description: "Fresh organic vegetables from local farms",
    price: 150000,
    stock: 50,
    category: "Fresh Produce",
    type: "premium",
    images: ["https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400"],
    rating: 4.8,
    sellerId: "1",
  },
  // Add more wishlist items...
];

export function WishlistGrid({ search }: WishlistGridProps) {
  const filteredItems = wishlistItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item) => (
        <div key={item.id} className="relative group">
          <ProductCard product={item} />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}