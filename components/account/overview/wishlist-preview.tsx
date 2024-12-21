"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const wishlistItems = [
  {
    id: "1",
    name: "Organic Vegetable Box",
    price: 150000,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    name: "Premium Coffee Beans",
    price: 125000,
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    name: "Artisan Sourdough Bread",
    price: 85000,
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=400",
  },
];

export function WishlistPreview() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 border rounded-lg"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-primary">{formatCurrency(item.price)}</p>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/account/wishlist")}
      >
        View Wishlist
      </Button>
    </div>
  );
}