"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from "./product-card";
import { useFilters } from "@/lib/hooks/use-filters";
import { productService } from "@/lib/services/products";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types/product";

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { priceRange, categories, types, minRating, search } = useFilters();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const filters = {
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          categories: categories.join(','),
          types: types.join(','),
          minRating,
          search
        };
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [priceRange, categories, types, minRating, search]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {products.length} products
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
