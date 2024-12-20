"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductList } from "./product-list";
import { ProductForm } from "./product-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductManagement() {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <ProductList />

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