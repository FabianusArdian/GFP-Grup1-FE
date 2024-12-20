import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Star className="h-3 w-3 fill-current" />
      {rating}
    </Badge>
  );
}