"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";

const CATEGORIES = [
  "Fresh Produce",
  "Meat & Poultry",
  "Dairy",
  "Bakery",
  "Beverages",
];

export function SellerProductCategoryFilter() {
  const { categories, setFilter } = useSellerProductFilters();

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...categories, category]
      : categories.filter((c) => c !== category);
    setFilter('categories', newCategories);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Categories</h3>
      <div className="space-y-2">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={categories.includes(category)}
              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
            />
            <Label htmlFor={category}>{category}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}