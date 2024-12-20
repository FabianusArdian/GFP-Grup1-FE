"use client";

import { Star } from "lucide-react";
import { useSellerProductFilters } from "@/lib/hooks/use-seller-product-filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SellerProductRatingFilter() {
  const { minRating, setFilter } = useSellerProductFilters();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Minimum Rating</h3>
      <Select
        value={minRating.toString()}
        onValueChange={(value) => setFilter('minRating', parseFloat(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select minimum rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">All Ratings</SelectItem>
          {[5, 4, 3, 2, 1].map((rating) => (
            <SelectItem key={rating} value={rating.toString()}>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < rating ? "fill-primary text-primary" : "fill-none text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span>{rating}+ Stars</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}