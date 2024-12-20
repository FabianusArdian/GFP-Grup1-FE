"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartItem({ 
  item, 
  isSelected, 
  onSelect, 
  onRemove, 
  onUpdateQuantity 
}: CartItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={() => onSelect(item.id)}
        />
      </div>
      <div className="relative h-16 w-16 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.name}</h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {formatCurrency(item.price)}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onUpdateQuantity(item.id, item.quantity + 1)
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}