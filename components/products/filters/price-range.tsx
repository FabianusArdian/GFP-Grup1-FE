"use client";

import { Input } from "@/components/ui/input";
import { useFilters } from "@/lib/hooks/use-filters";
import { formatCurrency } from "@/lib/utils/currency";

export function PriceRangeFilter() {
  const { priceRange, setFilter } = useFilters();
  const [minPrice, maxPrice] = priceRange;

  const handlePriceChange = (value: string, isMin: boolean) => {
    const numValue = parseInt(value) || 0;
    setFilter('priceRange', isMin 
      ? [numValue, Math.max(numValue, maxPrice)]
      : [Math.min(minPrice, numValue), numValue]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Price Range</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => handlePriceChange(e.target.value, true)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => handlePriceChange(e.target.value, false)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}