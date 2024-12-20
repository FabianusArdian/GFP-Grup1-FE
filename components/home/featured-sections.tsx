"use client";

import { useEffect } from 'react';
import { useApi } from '@/lib/hooks';
import { productService, sellerService } from '@/lib/services';
import { FeaturedProducts } from "./sections/featured-products";
import { FeaturedShops } from "./sections/featured-shops";
import type { Product } from '@/lib/types/product';
import type { Seller } from '@/lib/types/seller';

export function FeaturedSections() {
  const {
    data: products,
    isLoading: productsLoading,
    execute: fetchProducts
  } = useApi<Product[]>();

  const {
    data: sellers,
    isLoading: sellersLoading,
    execute: fetchSellers
  } = useApi<Seller[]>();

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchProducts(productService.getProducts({ sort: 'rating', limit: 3 })),
        fetchSellers(sellerService.getSellers({ sort: 'rating', limit: 3 }))
      ]);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-16">
      {/* <FeaturedShops sellers={sellers || []} isLoading={sellersLoading} />
      <FeaturedProducts products={products || []} isLoading={productsLoading} /> */}
    </div>
  );
}