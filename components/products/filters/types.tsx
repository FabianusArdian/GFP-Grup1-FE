"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFilters } from "@/lib/hooks/use-filters";

const PRODUCT_TYPES = ["standard", "premium"];

export function TypesFilter() {
  const { types, setFilter } = useFilters();

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...types, type.toLowerCase()]
      : types.filter((t) => t !== type.toLowerCase());
    setFilter('types', newTypes);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Product Type</h3>
      <div className="space-y-2">
        {PRODUCT_TYPES.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={type}
              checked={types.includes(type)}
              onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
            />
            <Label htmlFor={type} className="capitalize">
              {type}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}