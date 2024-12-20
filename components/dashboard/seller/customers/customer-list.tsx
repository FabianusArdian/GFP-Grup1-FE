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
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "@/lib/utils/currency";
import { CustomerDetails } from "./customer-details";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CustomerListProps {
  search: string;
  filter: string;
  onSearchChange: (value: string) => void;
}

const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "081234567890",
    totalOrders: 12,
    totalSpent: 2500000,
    lastOrder: new Date("2024-03-20"),
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "081234567891",
    totalOrders: 8,
    totalSpent: 1800000,
    lastOrder: new Date("2024-03-18"),
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "081234567892",
    totalOrders: 5,
    totalSpent: 950000,
    lastOrder: new Date("2024-03-15"),
    status: "inactive",
  },
];

export function CustomerList({ search, filter, onSearchChange }: CustomerListProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || customer.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search customers..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
              <TableCell>
                {formatDistanceToNow(customer.lastOrder, { addSuffix: true })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={customer.status === "active" ? "default" : "secondary"}
                >
                  {customer.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog 
        open={selectedCustomer !== null} 
        onOpenChange={() => setSelectedCustomer(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <CustomerDetails customer={selectedCustomer} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}