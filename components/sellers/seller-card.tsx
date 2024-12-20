"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import type { Seller } from '@/lib/types/seller';

interface SellerCardProps {
  seller: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
  const router = useRouter();

  return (
    <Card className="group overflow-hidden">
      <div
        className="h-48 w-full transition-transform group-hover:scale-105"
        style={{
          backgroundImage: `url(${seller.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{seller.name}</h3>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {seller.rating.toFixed(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {seller.description}
          </p>
          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {seller.location}, {seller.province}
          </div>
        </div>
        <Button 
          className="w-full"
          onClick={() => router.push(`/sellers/${seller.id}`)}
        >
          Lihat Produk
        </Button>
      </CardContent>
    </Card>
  );
}
