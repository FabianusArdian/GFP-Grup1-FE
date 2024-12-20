"use client";

import { ProductDetails } from "@/components/products/product-details";
import { BaseLayout } from "@/components/layout/base-layout";

interface Props {
  params: { id: string }
}

export default function ProductPage({ params }: Props) {
  return (
    <BaseLayout>
      <ProductDetails productId={params.id} />
    </BaseLayout>
  );
}
