"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAccountData } from "@/lib/hooks/use-account-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderList } from "./order-list";

export function OrderHistory() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const { orders, isLoading } = useAccountData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(search);
    const matchesStatus = status === "all" || order.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Order History</h1>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <OrderList orders={filteredOrders} />
      </Card>
    </div>
  );
}
