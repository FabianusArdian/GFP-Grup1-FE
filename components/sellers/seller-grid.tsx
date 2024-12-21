"use client";

import { SellerCard } from "./seller-card";
import { useSellerFilters } from "@/lib/hooks/use-seller-filters";
import { sellers } from "@/lib/data/client/sellers";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";

export function SellerGrid() {
  const { minRating, categories, provinces, search } = useSellerFilters();

  const filteredSellers = sellers.filter((seller) => {
    const matchesRating = seller.rating >= minRating;
    const matchesCategory = categories.length === 0 || categories.includes(seller.category);
    const matchesProvince = provinces.length === 0 || provinces.includes(seller.province);
    const matchesSearch = search === '' || 
      seller.name.toLowerCase().includes(search.toLowerCase()) ||
      seller.description.toLowerCase().includes(search.toLowerCase());

    return matchesRating && matchesCategory && matchesProvince && matchesSearch;
  });

  const { 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    paginateItems,
    itemsPerPage 
  } = usePagination({
    totalItems: filteredSellers.length,
  });

  const paginatedSellers = paginateItems(filteredSellers);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredSellers.length)} dari {filteredSellers.length} penjual
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedSellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}