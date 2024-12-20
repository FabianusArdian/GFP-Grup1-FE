"use client";

import { formatCurrency } from "@/lib/utils/currency";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CustomerDetailsProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: number;
    lastOrder: Date;
    status: string;
  };
}

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

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
          <p>{customer.name}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
            {customer.status}
          </Badge>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
          <p>{customer.email}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
          <p>{customer.phone}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Total Orders</h3>
          <p>{customer.totalOrders}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Total Spent</h3>
          <p>{formatCurrency(customer.totalSpent)}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}