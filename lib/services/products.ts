import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Product } from '@/lib/types/product';

export const productService = {
  getProducts: async (filters?: Record<string, any>): Promise<Product[]> => {
    try {
      const response = await apiService.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST, { 
        params: filters 
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  },

  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const response = await apiService.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id));
      return response;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      return null;
    }
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiService.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST, {
        params: {
          featured: true,
          limit: 3
        }
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      return [];
    }
  }
};
