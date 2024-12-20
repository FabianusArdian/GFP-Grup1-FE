import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Seller } from '@/lib/types/seller';
import type { Product } from '@/lib/types/product';

export const sellerService = {
  getSellers: async (filters?: Record<string, any>): Promise<Seller[]> => {
    try {
      const response = await apiService.get<Seller[]>(API_ENDPOINTS.SELLERS.LIST, { 
        params: filters 
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch sellers:', error);
      return [];
    }
  },

  getSeller: async (id: string): Promise<Seller | null> => {
    try {
      const response = await apiService.get<Seller>(API_ENDPOINTS.SELLERS.DETAIL(id));
      return response;
    } catch (error) {
      console.error('Failed to fetch seller:', error);
      return null;
    }
  },

  getSellerProducts: async (id: string, filters?: Record<string, any>): Promise<Product[]> => {
    try {
      const response = await apiService.get<Product[]>(API_ENDPOINTS.SELLERS.PRODUCTS(id), {
        params: filters
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch seller products:', error);
      return [];
    }
  }
};
