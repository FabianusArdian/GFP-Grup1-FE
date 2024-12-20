"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const recentOrders = [
  {
    id: "1",
    date: new Date("2024-03-20"),
    total: 250000,
    status: "delivered",
    items: 3,
  },
  {
    id: "2",
    date: new Date("2024-03-18"),
    total: 175000,
    status: "processing",
    items: 2,
  },
  {
    id: "3",
    date: new Date("2024-03-15"),
    total: 320000,
    status: "delivered",
    items: 4,
  },
];

export function RecentOrders() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <p className="font-medium">Order #{order.id}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(order.date, { addSuffix: true })}
            </p>
            <p className="text-sm">{order.items} items</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(order.total)}</p>
            <p className="text-sm capitalize text-muted-foreground">
              {order.status}
            </p>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push("/account/orders")}
      >
        View All Orders
      </Button>
    </div>
  );
}