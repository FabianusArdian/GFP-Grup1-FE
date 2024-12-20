```typescript
import axios from './axios';
import { Seller } from '@/lib/types/seller';

export const sellerApi = {
  getSellers: async (filters?: Record<string, any>) => {
    const response = await axios.get('/sellers', { params: filters });
    return response.data;
  },

  getSeller: async (id: string) => {
    const response = await axios.get(`/sellers/${id}`);
    return response.data;
  },

  getSellerProducts: async (id: string) => {
    const response = await axios.get(`/sellers/${id}/products`);
    return response.data;
  },

  updateProfile: async (data: Partial<Seller>) => {
    const response = await axios.put('/sellers/profile', data);
    return response.data;
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axios.post('/sellers/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
```