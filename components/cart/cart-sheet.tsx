"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";
import { useUserStore } from "@/lib/stores/user-store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CartHeader } from "./cart-header";
import { CartItem } from "./cart-item";
import { CartFooter } from "./cart-footer";

export function CartSheet() {
  const { 
    items, 
    selectedItems,
    removeItem, 
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    unselectAllItems,
    getSelectedTotal
  } = useCart();
  const { currentUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout",
      });
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (currentUser.role === "seller") {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Sellers cannot make purchases. Please use a consumer account.",
      });
      return;
    }

    if (selectedItems.length === 0) {
      toast({
        variant: "destructive",
        title: "No Items Selected",
        description: "Please select items to proceed with checkout",
      });
      return;
    }
    
    router.push("/checkout");
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectAllItems();
    } else {
      unselectAllItems();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex h-full flex-col">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <CartHeader 
                itemCount={items.length}
                selectedCount={selectedItems.length}
                onSelectAll={handleSelectAll}
              />
              <ScrollArea className="flex-1 -mx-6 px-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      isSelected={selectedItems.includes(item.id)}
                      onSelect={toggleItemSelection}
                      onRemove={removeItem}
                      onUpdateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              </ScrollArea>
              <CartFooter 
                selectedTotal={getSelectedTotal()}
                isDisabled={selectedItems.length === 0}
                userRole={currentUser?.role}
                onCheckout={handleCheckout}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}