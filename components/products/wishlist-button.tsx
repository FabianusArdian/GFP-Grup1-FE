"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useUserStore } from "@/lib/stores/user-store";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const { currentUser } = useUserStore();
  const { toggleItem, hasItem } = useWishlist();
  const isInWishlist = hasItem(productId);

  // Hide wishlist button for sellers
  if (currentUser?.role === "seller") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "absolute top-2 right-2 z-10 bg-white/80 hover:bg-white dark:bg-black/80 dark:hover:bg-black",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        toggleItem(productId);
      }}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-colors",
          isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
        )} 
      />
    </Button>
  );
}