import type { Product } from '@/lib/data/server/types/product';

export function getDiscountedPrice(product: Product): number | null {
  if (product.type === "premium") {
    return null;
  }
  return Math.round(product.price * 0.9); // 10% discount for standard products
}

export function getStockStatus(stock: number): {
  label: string;
  color: "default" | "warning" | "destructive";
} {
  if (stock === 0) {
    return { label: "Stok Habis", color: "destructive" };
  }
  if (stock < 10) {
    return { label: "Stok Terbatas", color: "warning" };
  }
  return { label: "Tersedia", color: "default" };
}

export function formatStock(stock: number): string {
  return `${stock} unit${stock !== 1 ? "" : ""}`;
}

export function getTopRatedProducts(products: Product[], limit: number = 3): Product[] {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}