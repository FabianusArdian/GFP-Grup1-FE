"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/hooks/use-cart";
import { formatCurrency } from "@/lib/utils/currency";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/user-store";
import Image from "next/image";

const VOUCHERS = {
  "WELCOME10": { discount: 0.1, description: "10% off" },
  "SAVE20": { discount: 0.2, description: "20% off" },
  "SPECIAL25": { discount: 0.25, description: "25% off" },
};

export function OrderSummary() {
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const { getSelectedItems, getSelectedTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { currentUser } = useUserStore();

  const selectedItems = getSelectedItems();
  const subtotal = getSelectedTotal();
  const shipping = 15000;
  const discount = appliedVoucher ? subtotal * VOUCHERS[appliedVoucher as keyof typeof VOUCHERS].discount : 0;
  const grandTotal = subtotal + shipping - discount;

  const handleApplyVoucher = () => {
    if (voucher in VOUCHERS) {
      setAppliedVoucher(voucher);
      toast({
        title: "Voucher applied",
        description: `${VOUCHERS[voucher as keyof typeof VOUCHERS].description} has been applied`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid voucher",
        description: "Please enter a valid voucher code",
      });
    }
    setVoucher("");
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    try {
      // Clear the cart
      clearCart();

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "Your order will be delivered soon.",
      });

      // Redirect to orders page
      router.push("/account/orders");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to place order. Please try again.",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {/* Selected Cart Items */}
        <div className="space-y-4">
          {selectedItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter voucher code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value.toUpperCase())}
          />
          <Button onClick={handleApplyVoucher}>Apply</Button>
        </div>

        {/* Order Details */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </div>
          {appliedVoucher && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({VOUCHERS[appliedVoucher as keyof typeof VOUCHERS].description})</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={handlePlaceOrder}
          disabled={selectedItems.length === 0}
        >
          Place Order
        </Button>
      </div>
    </Card>
  );
}