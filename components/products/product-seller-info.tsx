"use client";

import { Seller } from "@/lib/data/server/sellers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Star, MapPin, Award } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductSellerInfoProps {
  seller: Seller;
}

export function ProductSellerInfo({ seller }: ProductSellerInfoProps) {
  const router = useRouter();

  return (
    <Card 
      className="p-6 cursor-pointer hover:bg-accent"
      onClick={() => router.push(`/sellers/${seller.id}`)}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <span className="font-medium">{seller.name}</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            {seller.rating}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{seller.location}, {seller.province}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {seller.badges.map((badge) => (
            <Badge key={badge} variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}