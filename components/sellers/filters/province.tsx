"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSellerFilters } from "@/lib/hooks/use-seller-filters";

const PROVINCES = [
  "Jawa Barat",
  "Jawa Timur",
  "DI Yogyakarta",
  "Bali",
];

export function SellerProvinceFilter() {
  const { provinces, setFilter } = useSellerFilters();

  const handleProvinceChange = (province: string, checked: boolean) => {
    const newProvinces = checked
      ? [...provinces, province]
      : provinces.filter((p) => p !== province);
    setFilter('provinces', newProvinces);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Provinces</h3>
      <div className="space-y-2">
        {PROVINCES.map((province) => (
          <div key={province} className="flex items-center space-x-2">
            <Checkbox
              id={province}
              checked={provinces.includes(province)}
              onCheckedChange={(checked) => handleProvinceChange(province, checked as boolean)}
            />
            <Label htmlFor={province}>{province}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}