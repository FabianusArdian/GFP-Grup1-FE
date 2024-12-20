"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductDetails } from "@/components/products/product-details";
import { products } from "@/lib/data/products";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProductDetailsWrapperProps {
  productId: string;
}

export function ProductDetailsWrapper({ productId }: ProductDetailsWrapperProps) {
  const router = useRouter();
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    if (!product) {
      router.push("/products");
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <ProductDetails product={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
}