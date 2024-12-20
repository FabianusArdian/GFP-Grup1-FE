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
import { Edit2, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import Image from "next/image";

interface ProductListProps {
  search: string;
  filter: string;
  onSearchChange: (value: string) => void;
}

const products = [
  {
    id: "1",
    name: "Organic Vegetable Box",
    description: "Fresh organic vegetables from local farms",
    price: 150000,
    stock: 50,
    category: "Fresh Produce",
    type: "premium",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400",
    status: "active",
  },
  // Add more sample products...
];

export function ProductList({ search, filter, onSearchChange }: ProductListProps) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || product.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{product.category}</Badge>
              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant={product.status === "active" ? "default" : "secondary"}
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}