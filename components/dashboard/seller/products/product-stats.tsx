"use client";

import { Card } from "@/components/ui/card";
import { Package, ShoppingBag, TrendingUp, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";

const stats = [
  {
    title: "Total Products",
    value: "45",
    change: "+24%",
    icon: Package,
  },
  {
    title: "Total Sales",
    value: "156",
    change: "+12%",
    icon: ShoppingBag,
  },
  {
    title: "Revenue",
    value: formatCurrency(12500000),
    change: "+16%",
    icon: TrendingUp,
  },
  {
    title: "Low Stock",
    value: "8",
    change: "-5%",
    icon: AlertTriangle,
  },
];

export function ProductStats() {
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