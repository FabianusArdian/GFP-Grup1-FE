"use client";

import { useState, useEffect } from 'react';
import { SellerHeader } from "./seller-header";
import { ProductGrid } from "./product-grid";
import { SellerProductFilters } from "./product-filters";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";
import { sellerService } from "@/lib/services/sellers";
import { Skeleton } from "@/components/ui/skeleton";
import type { Seller } from '@/lib/types/seller';
import type { Product } from '@/lib/types/product';

interface SellerProductsProps {
  seller: Seller;
}

export function SellerProducts({ seller }: SellerProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { priceRange, categories, types, minRating, search } = useSellerProductFilters();

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
        const data = await sellerService.getSellerProducts(seller.id, filters);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch seller products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [seller.id, priceRange, categories, types, minRating, search]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[200px] w-full" />
        <div className="flex gap-8">
          <Skeleton className="h-[600px] w-64" />
          <div className="flex-1 space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[200px] w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SellerHeader seller={seller} />
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64">
          <SellerProductFilters />
        </aside>
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </>
  );
}
