"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/user-store";
import { useCart } from "@/lib/hooks/use-cart";
import { Card } from "@/components/ui/card";
import { OrderSummary } from "./order-summary";
import { ShippingForm } from "./shipping-form";
import { PaymentForm } from "./payment-form";

export function CheckoutPage() {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const { items } = useCart();

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (currentUser.role === "seller") {
      router.push("/");
      return;
    }

    if (items.length === 0) {
      router.push("/products");
    }
  }, [currentUser, items.length, router]);

  if (!currentUser || currentUser.role === "seller" || items.length === 0) {
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <ShippingForm />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <PaymentForm />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}