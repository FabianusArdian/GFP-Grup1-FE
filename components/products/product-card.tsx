"use client";

import { Product } from "@/lib/data/server/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ProductImage } from "./product-image";
import { ProductRating } from "./product-rating";
import { ProductPrice } from "./product-price";
import { AddToCartButton } from "./add-to-cart-button";
import { WishlistButton } from "./wishlist-button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer" 
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <ProductImage
        src={product.images[0]}
        alt={product.name}
        type={product.type}
        className="h-48 w-full"
      />
      <WishlistButton productId={product.id} />
      <CardContent className="p-6">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">{product.name}</h3>
            <ProductRating rating={product.rating} />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={product.type === 'premium' ? 'default' : 'secondary'} className="text-xs">
              {product.type === 'premium' ? 'Premium' : 'Standard'}
            </Badge>
            <Badge variant="outline" className="text-xs">{product.category}</Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <ProductPrice price={product.price} />
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}