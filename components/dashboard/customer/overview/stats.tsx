"use client";

import { Card } from "@/components/ui/card";
import { ShoppingBag, Heart, MapPin, CreditCard } from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "12",
    icon: ShoppingBag,
  },
  {
    title: "Wishlist Items",
    value: "8",
    icon: Heart,
  },
  {
    title: "Saved Addresses",
    value: "2",
    icon: MapPin,
  },
  {
    title: "Payment Methods",
    value: "3",
    icon: CreditCard,
  },
];

export function AccountStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}