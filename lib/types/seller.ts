export interface Seller {
  id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  location: string;
  province: Province;
  category: SellerCategory;
  joinedDate: string; // ISO date string from API
  totalProducts: number;
  badges?: string[]; // Make badges optional
}

export type SellerId = Seller['id'];

export type SellerCategory = 
  | 'Farmers'
  | 'Bakers'
  | 'Butchers'
  | 'Dairy Producers'
  | 'Fishmongers'
  | 'Beverages';

export type Province = 
  | 'Jawa Barat'
  | 'Jawa Timur'
  | 'DI Yogyakarta'
  | 'Bali';

export interface SellerFilters {
  minRating?: number;
  categories?: string[];
  provinces?: string[];
  search?: string;
}
