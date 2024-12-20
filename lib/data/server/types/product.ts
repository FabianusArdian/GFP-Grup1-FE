import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '../constants';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  type: ProductType;
  images: string[];
  rating: number;
  sellerId: string;
  createdAt: Date;
}

export type ProductId = Product['id'];
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
export type ProductType = typeof PRODUCT_TYPES[number];