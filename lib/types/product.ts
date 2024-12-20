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
  createdAt: string;
}

export type ProductId = Product['id'];

export type ProductCategory = 
  | 'Fresh Produce'
  | 'Dairy'
  | 'Bakery'
  | 'Beverages'
  | 'Meat & Poultry'
  | 'Condiments'
  | 'Ready to Eat'
  | 'Snacks'
  | 'Breakfast';

export type ProductType = 'standard' | 'premium';

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  types?: string[];
  minRating?: number;
  search?: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  type: ProductType;
  images?: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}
