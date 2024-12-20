"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { sellers } from "@/lib/data/sellers";
import { SellerProducts } from "./seller-products";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SellerProductsWrapperProps {
  sellerId: string;
}

export function SellerProductsWrapper({ sellerId }: SellerProductsWrapperProps) {
  const router = useRouter();
  const seller = sellers.find(s => s.id === sellerId);

  useEffect(() => {
    if (!seller) {
      router.push("/sellers");
    }
  }, [seller, router]);

  if (!seller) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <SellerProducts seller={seller} />
        </div>
      </main>
      <Footer />
    </div>
  );
}