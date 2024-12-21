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

interface OrderListProps {
  search: string;
  status: string;
}

const orders = [
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

export function OrderList({ search, status }: OrderListProps) {
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.includes(search);
    const matchesStatus = status === "all" || order.status === status;
    return matchesSearch && matchesStatus;
  });

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
        {filteredOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>#{order.id}</TableCell>
            <TableCell>{format(order.date, "dd MMM yyyy")}</TableCell>
            <TableCell>{order.items} items</TableCell>
            <TableCell>{formatCurrency(order.total)}</TableCell>
            <TableCell>
              <Badge
                variant={order.status === "delivered" ? "default" : "secondary"}
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