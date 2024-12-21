"use client";

import { Product } from "@/lib/data/server/products";
import { sellers } from "@/lib/data/client/sellers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Store, Package, Clock, MapPin, Award } from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";
import { formatCurrency } from "@/lib/utils/currency";
import { useRouter } from "next/navigation";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";
import { getStockStatus } from "@/lib/utils/product";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useUserStore } from "@/lib/stores/user-store";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const seller = sellers.find(s => s.id === product.sellerId);
  const stockStatus = getStockStatus(product.stock);

  if (!seller) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          type={product.type}
          className="aspect-square rounded-lg"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex items-center gap-4">
            <ProductRating rating={product.rating} />
            <Badge variant={stockStatus.color}>{stockStatus.label}</Badge>
          </div>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <ProductPrice price={product.price} className="text-3xl font-bold text-primary" />
              {currentUser?.role !== "seller" && <AddToCartButton product={product} />}
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {product.stock > 0 ? `${product.stock} tersedia` : 'Stok habis'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Ditambahkan {formatDistanceToNow(product.createdAt, { locale: id })} yang lalu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Rest of the component remains the same */}
      </div>
    </div>
  );
}