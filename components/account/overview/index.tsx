"use client";

import { Card } from "@/components/ui/card";
import { useAccountData } from "@/lib/hooks/use-account-data";
import { AccountStats } from "./stats";
import { RecentOrders } from "./recent-orders";
import { WishlistPreview } from "./wishlist-preview";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomerOverview() {
  const { profile, orders, addresses, paymentMethods, isLoading } = useAccountData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Account Overview</h1>
      
      <AccountStats 
        totalOrders={orders.length}
        totalAddresses={addresses.length}
        totalPaymentMethods={paymentMethods.length}
      />
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <RecentOrders orders={orders.slice(0, 3)} />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
          <WishlistPreview />
        </Card>
      </div>
    </div>
  );
}
