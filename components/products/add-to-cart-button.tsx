"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";
import { useUserStore } from "@/lib/stores/user-store";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { currentUser } = useUserStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
      });
      return;
    }

    if (currentUser.role === "seller") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Sellers cannot add items to cart",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  // Hide button completely for sellers
  if (currentUser?.role === "seller") {
    return null;
  }

  return (
    <Button 
      size="sm" 
      variant="secondary"
      className="text-xs px-2 h-8 gap-1.5" 
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-3.5 w-3.5" />
      Add to Cart
    </Button>
  );
}