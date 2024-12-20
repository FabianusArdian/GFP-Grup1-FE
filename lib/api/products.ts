```typescript
import axios from './axios';
import { Product } from '@/lib/types/product';

export const productApi = {
  getProducts: async (filters?: Record<string, any>) => {
    const response = await axios.get('/products', { params: filters });
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data: Partial<Product>) => {
    const response = await axios.post('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    const response = await axios.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  }
};
```