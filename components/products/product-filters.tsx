"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { PriceRangeFilter } from "./filters/price-range";
import { CategoriesFilter } from "./filters/categories";
import { TypesFilter } from "./filters/types";
import { RatingFilter } from "./filters/rating";
import { useFilters } from "@/lib/hooks/use-filters";

export function ProductFilters() {
  const { resetFilters } = useFilters();

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
        <PriceRangeFilter />
        <CategoriesFilter />
        <TypesFilter />
        <RatingFilter />
      </div>
    </Card>
  );
}