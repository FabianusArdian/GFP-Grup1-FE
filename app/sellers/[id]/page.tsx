"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BaseLayout } from "@/components/layout/base-layout";
import { SellerProducts } from "@/components/sellers/seller-products";
import { sellerService } from "@/lib/services/sellers";
import { Skeleton } from "@/components/ui/skeleton";
import type { Seller } from '@/lib/types/seller';

interface Props {
  params: { id: string }
}

export default function SellerPage({ params }: Props) {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setIsLoading(true);
        const data = await sellerService.getSeller(params.id);
        if (!data) {
          router.push('/sellers');
          return;
        }
        setSeller(data);
      } catch (error) {
        console.error('Failed to fetch seller:', error);
        router.push('/sellers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeller();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <BaseLayout>
        <div className="container py-8">
          <Skeleton className="h-[200px] w-full mb-8" />
          <div className="flex gap-8">
            <Skeleton className="h-[600px] w-64" />
            <div className="flex-1 space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[200px] w-full" />
              ))}
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  if (!seller) return null;

  return (
    <BaseLayout>
      <div className="container py-8">
        <SellerProducts seller={seller} />
      </div>
    </BaseLayout>
  );
}
