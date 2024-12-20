"use client";

import { useEffect } from 'react';
import { SellerCard } from "./seller-card";
import { useSellerFilters } from "@/lib/hooks/use-seller-filters";
import { useSellers } from "@/lib/hooks/use-sellers";
import { Skeleton } from "@/components/ui/skeleton";

export function SellerGrid() {
  const { minRating, categories, provinces, search } = useSellerFilters();
  const { sellers, isLoading, refreshSellers } = useSellers();

  useEffect(() => {
    refreshSellers();
  }, [minRating, categories, provinces, search]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full" />
        ))}
      </div>
    );
  }

  const filteredSellers = sellers.filter((seller) => {
    const matchesRating = seller.rating >= minRating;
    const matchesCategory = categories.length === 0 || categories.includes(seller.category);
    const matchesProvince = provinces.length === 0 || provinces.includes(seller.province);
    const matchesSearch = search === '' || 
      seller.name.toLowerCase().includes(search.toLowerCase()) ||
      seller.description.toLowerCase().includes(search.toLowerCase());

    return matchesRating && matchesCategory && matchesProvince && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Menampilkan {filteredSellers.length} penjual
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}
