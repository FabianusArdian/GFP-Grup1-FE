"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { productService } from "@/lib/services/products";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Package, Clock } from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";
import { formatCurrency } from "@/lib/utils/currency";
import { ProductImage } from "./product-image";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";
import { getStockStatus } from "@/lib/utils/product";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useUserStore } from "@/lib/stores/user-store";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types/product";

interface ProductDetailsProps {
  productId: string;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { currentUser } = useUserStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        router.push('/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-square rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="pt-4 border-t">
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const stockStatus = getStockStatus(product.stock);

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
                    Ditambahkan {formatDistanceToNow(new Date(product.createdAt), { locale: id })} yang lalu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
