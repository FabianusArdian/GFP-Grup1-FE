"use client";

import { useSellerFilters } from "@/lib/hooks/use-seller-filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DISTANCE_OPTIONS = [
  { value: 5, label: "Within 5km" },
  { value: 10, label: "Within 10km" },
  { value: 20, label: "Within 20km" },
];

export function SellerDistanceFilter() {
  const { maxDistance, setFilter } = useSellerFilters();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Distance</h3>
      <Select
        value={maxDistance.toString()}
        onValueChange={(value) => setFilter('maxDistance', parseInt(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select maximum distance" />
        </SelectTrigger>
        <SelectContent>
          {DISTANCE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}