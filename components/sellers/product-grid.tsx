"use client";

import { ProductCard } from "@/components/products/product-card";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/ui/pagination";
import type { Product } from "@/lib/data/server/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    paginateItems,
    itemsPerPage 
  } = usePagination({
    totalItems: products.length,
  });

  const paginatedProducts = paginateItems(products);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Produk</h2>
        <p className="text-muted-foreground">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, products.length)} dari {products.length} produk
        </p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Belum ada produk dari penjual ini.</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}