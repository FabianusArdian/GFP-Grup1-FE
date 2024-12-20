"use client";

import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users 
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "Rp 12.500.000",
    change: "+12%",
    icon: TrendingUp,
  },
  {
    title: "Orders",
    value: "156",
    change: "+8%",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "45",
    change: "+24%",
    icon: Package,
  },
  {
    title: "Customers",
    value: "2,345",
    change: "+16%",
    icon: Users,
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}