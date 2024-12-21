"use client";

import { SellerHeader } from "./seller-header";
import { ProductGrid } from "./product-grid";
import { SellerProductFilters } from "./product-filters";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";
import { getSellerProducts } from "@/lib/utils/seller";
import type { Seller } from "@/lib/data/server/types/seller";

interface SellerProductsProps {
  seller: Seller;
}

export function SellerProducts({ seller }: SellerProductsProps) {
  const { priceRange, categories, types, minRating, search } = useSellerProductFilters();
  const allSellerProducts = getSellerProducts(seller.id);
  
  const filteredProducts = allSellerProducts.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesType = types.length === 0 || types.includes(product.type);
    const matchesRating = product.rating >= minRating;
    const matchesSearch = search === '' || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesPrice && matchesCategory && matchesType && matchesRating && matchesSearch;
  });

  return (
    <>
      <SellerHeader seller={seller} />
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64">
          <SellerProductFilters />
        </aside>
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </>
  );
}