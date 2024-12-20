"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";
import { SellerProductPriceFilter } from "./filters/product-price";
import { SellerProductCategoryFilter } from "./filters/product-category";
import { SellerProductTypeFilter } from "./filters/product-type";
import { SellerProductRatingFilter } from "./filters/product-rating";

export function SellerProductFilters() {
  const { resetFilters } = useSellerProductFilters();

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 lg:px-3"
            onClick={resetFilters}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <SellerProductPriceFilter />
        <SellerProductCategoryFilter />
        <SellerProductTypeFilter />
        <SellerProductRatingFilter />
      </div>
    </Card>
  );
}