"use client";

import { Card } from "@/components/ui/card";
import { ShoppingBag, Heart, MapPin, CreditCard } from "lucide-react";

interface AccountStatsProps {
  totalOrders: number;
  totalAddresses: number;
  totalPaymentMethods: number;
}

export function AccountStats({ 
  totalOrders, 
  totalAddresses, 
  totalPaymentMethods 
}: AccountStatsProps) {
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      icon: ShoppingBag,
    },
    {
      title: "Saved Addresses",
      value: totalAddresses.toString(),
      icon: MapPin,
    },
    {
      title: "Payment Methods",
      value: totalPaymentMethods.toString(),
      icon: CreditCard,
    },
    {
      title: "Wishlist Items",
      value: "0", // Will be implemented with wishlist API
      icon: Heart,
    },
  ];

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
