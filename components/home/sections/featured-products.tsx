"use client";

import { useRouter } from "next/navigation";
import { products } from "@/lib/data/client/products";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { getTopRatedProducts } from "@/lib/utils/product";

export function FeaturedProducts() {
  const router = useRouter();
  const featuredProducts = getTopRatedProducts(products);

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
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}