"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { OrderList } from "./order-list";
import { OrderFilters } from "./order-filters";
import { OrderStats } from "./order-stats";

export function OrderManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Orders</h1>
      
      <OrderStats />

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64">
          <OrderFilters 
            filter={filter} 
            onFilterChange={setFilter} 
          />
        </aside>
        
        <div className="flex-1">
          <Card className="p-6">
            <OrderList 
              search={search}
              filter={filter}
              onSearchChange={setSearch}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}