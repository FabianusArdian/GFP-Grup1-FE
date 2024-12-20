"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/lib/services/products";
import type { Product } from "@/lib/types/product";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getProducts({ featured: 'true' });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Produk Unggulan</h2>
          <p className="text-muted-foreground mt-1">
            Produk terbaik dengan rating tertinggi dari para penjual kami
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push('/products')}>
          Lihat semua produk →
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
