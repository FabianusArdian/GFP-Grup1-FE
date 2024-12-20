import type { Product } from "@/lib/data/server/types/product";
import { ProductDetails } from "@/components/products/product-details";
import { ProductPageHeader } from "@/components/products/product-page-header";

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  return (
    <>
      <ProductPageHeader productName={product.name} />
      <ProductDetails product={product} />
    </>
  );
}