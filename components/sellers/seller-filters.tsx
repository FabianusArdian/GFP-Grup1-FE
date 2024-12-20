"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { SellerRatingFilter } from "./filters/rating";
import { SellerCategoriesFilter } from "./filters/categories";
import { SellerProvinceFilter } from "./filters/province";
import { useSellerFilters } from "@/lib/hooks/use-seller-filters";

export function SellerFilters() {
  const { resetFilters } = useSellerFilters();

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
        <SellerRatingFilter />
        <SellerCategoriesFilter />
        <SellerProvinceFilter />
      </div>
    </Card>
  );
}