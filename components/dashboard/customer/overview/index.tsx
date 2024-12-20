"use client";

import { Card } from "@/components/ui/card";
import { RecentOrders } from "./recent-orders";
import { AccountStats } from "./stats";
import { WishlistPreview } from "./wishlist-preview";

export function CustomerOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Account Overview</h1>
      
      <AccountStats />
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <RecentOrders />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
          <WishlistPreview />
        </Card>
      </div>
    </div>
  );
}