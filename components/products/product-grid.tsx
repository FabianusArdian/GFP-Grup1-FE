"use client";

import { ProductCard } from "./product-card";
import { useFilters } from "@/lib/hooks/use-filters";
import { products } from "@/lib/data/client/products";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";

export function ProductGrid() {
  const { priceRange, categories, types, minRating, search } = useFilters();

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesType = types.length === 0 || types.includes(product.type);
    const matchesRating = product.rating >= minRating;
    const matchesSearch = search === '' || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesPrice && matchesCategory && matchesType && matchesRating && matchesSearch;
  });

  const { 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    paginateItems,
    itemsPerPage 
  } = usePagination({
    totalItems: filteredProducts.length,
  });

  const paginatedProducts = paginateItems(filteredProducts);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
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