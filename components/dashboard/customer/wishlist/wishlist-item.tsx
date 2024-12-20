"use client";

import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import Image from "next/image";
import { useCart } from "@/lib/hooks/use-cart";

interface WishlistItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onRemove: (id: string) => void;
}

export function WishlistItem({ item, onRemove }: WishlistItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(item.price)}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}