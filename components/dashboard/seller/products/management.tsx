"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductList } from "./product-list";
import { ProductForm } from "./product-form";
import { ProductFilters } from "./product-filters";
import { ProductStats } from "./product-stats";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductManagement() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <ProductStats />

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64">
          <ProductFilters 
            filter={filter} 
            onFilterChange={setFilter} 
          />
        </aside>
        
        <div className="flex-1">
          <Card className="p-6">
            <ProductList 
              search={search}
              filter={filter}
              onSearchChange={setSearch}
            />
          </Card>
        </div>
      </div>

      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSuccess={() => setIsAddingProduct(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}