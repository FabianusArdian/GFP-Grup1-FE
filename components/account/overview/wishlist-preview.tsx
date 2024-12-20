"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils/currency";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { accountService } from "@/lib/services/account";
import { productService } from "@/lib/services/products";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import type { Product } from "@/lib/types/product";

export function WishlistPreview() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Get wishlist product IDs
        const productIds = await accountService.getWishlist();
        
        // Fetch product details for each ID
        const products = await Promise.all(
          productIds.slice(0, 3).map(id => productService.getProduct(id))
        );
        
        setWishlistItems(products.filter((p): p is Product => p !== null));
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your wishlist is empty</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push("/products")}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wishlistItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 border rounded-lg"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-md">
            <Image
              src={item.images[0]}
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
