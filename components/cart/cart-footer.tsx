"use client";

import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/utils/currency";

interface CartFooterProps {
  selectedTotal: number;
  isDisabled: boolean;
  userRole?: string | null;
  onCheckout: () => void;
}

export function CartFooter({ 
  selectedTotal, 
  isDisabled, 
  userRole, 
  onCheckout 
}: CartFooterProps) {
  return (
    <SheetFooter className="border-t pt-4">
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Selected Total</span>
          <span>{formatCurrency(selectedTotal)}</span>
        </div>
        <Button 
          className="w-full" 
          onClick={onCheckout}
          disabled={isDisabled}
        >
          {userRole === undefined ? "Login to Checkout" :
           userRole === "seller" ? "Sellers Cannot Purchase" :
           "Proceed to Checkout"}
        </Button>
      </div>
    </SheetFooter>
  );
}