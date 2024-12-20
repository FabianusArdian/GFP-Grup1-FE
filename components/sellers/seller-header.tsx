"use client";

import { Store, MapPin, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Seller } from "@/lib/types/seller";
import { formatDistanceToNow, parseISO } from "date-fns";
import { id } from "date-fns/locale";

interface SellerHeaderProps {
  seller: Seller;
}

export function SellerHeader({ seller }: SellerHeaderProps) {
  // Safely parse the ISO date string
  const joinedDate = seller.joinedDate ? parseISO(seller.joinedDate) : new Date();

  return (
    <Card className="mb-8 p-6">
      <div className="flex items-start gap-6">
        <div
          className="h-32 w-32 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${seller.image})` }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Store className="h-5 w-5" />
            <h1 className="text-2xl font-bold">{seller.name}</h1>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {seller.rating.toFixed(1)}
            </Badge>
          </div>
          
          <p className="text-muted-foreground mb-4">{seller.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{seller.location}, {seller.province}</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Store className="h-4 w-4" />
              <span>{seller.totalProducts} Produk</span>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>
                Bergabung {formatDistanceToNow(joinedDate, { 
                  locale: id,
                  addSuffix: true 
                })}
              </span>
            </div>
          </div>

          {seller.badges && seller.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {seller.badges.map((badge) => (
                <Badge 
                  key={badge} 
                  variant="outline" 
                  className="flex items-center gap-1"
                >
                  <Award className="h-3 w-3" />
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}