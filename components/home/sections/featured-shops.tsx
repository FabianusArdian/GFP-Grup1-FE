"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Star, MapPin, Award } from "lucide-react";
import { getTopRatedSellers } from "@/lib/utils/seller";

export function FeaturedShops() {
  const router = useRouter();
  const featuredShops = getTopRatedSellers();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Toko Unggulan</h2>
          <p className="text-muted-foreground mt-1">
            Toko terpercaya dengan rating tertinggi dari pelanggan kami
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push('/sellers')}>
          Lihat semua toko →
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredShops.map((shop) => (
          <Card key={shop.id} className="group overflow-hidden">
            <div
              className="h-48 w-full transition-transform group-hover:scale-105"
              style={{
                backgroundImage: `url(${shop.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <h3 className="font-semibold">{shop.name}</h3>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {shop.rating.toFixed(1)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {shop.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {shop.location}, {shop.province}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shop.badges.map((badge) => (
                  <Badge key={badge} variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
              <Button 
                className="w-full"
                onClick={() => router.push(`/sellers/${shop.id}`)}
              >
                Lihat Produk
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}