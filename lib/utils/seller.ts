import { products } from '@/lib/data/client/products';
import { sellers } from '@/lib/data/client/sellers';
import type { Seller } from '@/lib/data/server/types/seller';
import type { Product } from '@/lib/data/server/types/product';

export function getSellerProducts(sellerId: string): Product[] {
  return products.filter(product => product.sellerId === sellerId);
}

export function getSellerRating(seller: Seller): string {
  return seller.rating.toFixed(1);
}

export function getSellerProductCount(sellerId: string): number {
  return getSellerProducts(sellerId).length;
}

export function getTopRatedSellers(limit: number = 3): Seller[] {
  return [...sellers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getSellerBadgeColor(badge: string): string {
  const colors: Record<string, string> = {
    'Verified': 'bg-blue-100 text-blue-800',
    'Premium Seller': 'bg-purple-100 text-purple-800',
    'Organic Certified': 'bg-green-100 text-green-800',
    'Eco-Friendly': 'bg-emerald-100 text-emerald-800',
    'Quality Guaranteed': 'bg-yellow-100 text-yellow-800',
    'Direct Trade': 'bg-indigo-100 text-indigo-800',
  };
  return colors[badge] || 'bg-gray-100 text-gray-800';
}