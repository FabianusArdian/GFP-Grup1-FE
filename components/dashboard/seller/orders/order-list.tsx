"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow, format } from "date-fns";
import { formatCurrency } from "@/lib/utils/currency";
import { OrderDetails } from "./order-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface OrderListProps {
  search: string;
  filter: string;
  onSearchChange: (value: string) => void;
}

const orders = [
  {
    id: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    date: new Date("2024-03-20"),
    total: 250000,
    status: "completed",
    items: [
      {
        id: "1",
        name: "Organic Vegetable Box",
        quantity: 1,
        price: 150000,
      },
      {
        id: "2",
        name: "Free Range Eggs",
        quantity: 2,
        price: 50000,
      },
    ],
    shippingAddress: {
      name: "John Doe",
      phone: "081234567890",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "12345",
    },
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    date: new Date("2024-03-18"),
    total: 175000,
    status: "processing",
    items: [
      {
        id: "3",
        name: "Premium Coffee Beans",
        quantity: 1,
        price: 175000,
      },
    ],
    shippingAddress: {
      name: "Jane Smith",
      phone: "081234567891",
      address: "Jl. Gatot Subroto No. 456",
      city: "Jakarta",
      province: "DKI Jakarta",
      postalCode: "12346",
    },
    paymentMethod: "Bank Transfer",
  },
];

export function OrderList({ search, filter, onSearchChange }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.includes(search) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search orders..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>#{order.id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                </div>
              </TableCell>
              <TableCell>{format(order.date, "dd MMM yyyy")}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "completed" 
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
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog 
        open={selectedOrder !== null} 
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderDetails order={selectedOrder} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}