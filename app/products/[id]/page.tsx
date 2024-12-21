import { products } from "@/lib/data/server/products";
import { ProductPageContent } from "@/components/products/product-page-content";
import { BaseLayout } from "@/components/layout/base-layout";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string }
}

export default function ProductPage({ params }: Props) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <BaseLayout>
      <ProductPageContent product={product} />
    </BaseLayout>
  );
}

// Required for static export
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}