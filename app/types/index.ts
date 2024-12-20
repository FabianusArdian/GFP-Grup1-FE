export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'seller';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  type: 'standard' | 'premium';
  images: string[];
  rating: number;
  sellerId: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
}