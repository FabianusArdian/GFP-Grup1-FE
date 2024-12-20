"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CustomerList } from "./customer-list";
import { CustomerFilters } from "./customer-filters";
import { CustomerStats } from "./customer-stats";

export function CustomerManagement() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Customers</h1>
      
      <CustomerStats />

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64">
          <CustomerFilters 
            filter={filter} 
            onFilterChange={setFilter} 
          />
        </aside>
        
        <div className="flex-1">
          <Card className="p-6">
            <CustomerList 
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