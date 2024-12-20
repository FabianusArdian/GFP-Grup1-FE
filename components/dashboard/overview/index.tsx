"use client";

import { Card } from "@/components/ui/card";
import { DashboardStats } from "./stats";
import { RecentOrders } from "./recent-orders";
import { TopProducts } from "./top-products";

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <DashboardStats />
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <RecentOrders />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <TopProducts />
        </Card>
      </div>
    </div>
  );
}