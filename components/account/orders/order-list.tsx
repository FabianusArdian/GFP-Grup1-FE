"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { format } from "date-fns";
import type { Order } from "@/lib/types/order";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{format(new Date(order.createdAt), "dd MMM yyyy")}</TableCell>
            <TableCell>{order.items.length} items</TableCell>
            <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "delivered" 
                    ? "default" 
                    : order.status === "processing" 
                      ? "secondary" 
                      : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
