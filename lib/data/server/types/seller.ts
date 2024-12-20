import { SELLER_CATEGORIES, PROVINCES } from '../constants';

export interface Seller {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  location: string;
  province: Province;
  category: SellerCategory;
  joinedDate: Date;
  totalProducts: number;
  badges: string[];
}

export type SellerId = Seller['id'];
export type SellerCategory = typeof SELLER_CATEGORIES[number];
export type Province = typeof PROVINCES[number];