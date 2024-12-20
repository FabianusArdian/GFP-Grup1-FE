"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/types/order";

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders yet</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push("/products")}
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <p className="font-medium">Order #{order.id}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
            </p>
            <p className="text-sm">{order.items.length} items</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
            <Badge 
              variant={
                order.status === "delivered" 
                  ? "default" 
                  : order.status === "processing" 
                    ? "secondary" 
                    : "outline"
              }
              className="mt-1"
            >
              {order.status}
            </Badge>
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
