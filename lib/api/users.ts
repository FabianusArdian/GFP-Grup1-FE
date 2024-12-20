```typescript
import axios from './axios';
import { User } from '@/lib/types/user';

export const userApi = {
  getProfile: async () => {
    const response = await axios.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await axios.put('/users/profile', data);
    return response.data;
  },

  getAddresses: async () => {
    const response = await axios.get('/users/addresses');
    return response.data;
  },

  addAddress: async (data: any) => {
    const response = await axios.post('/users/addresses', data);
    return response.data;
  },

  updateAddress: async (id: string, data: any) => {
    const response = await axios.put(`/users/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: string) => {
    const response = await axios.delete(`/users/addresses/${id}`);
    return response.data;
  },

  getWishlist: async () => {
    const response = await axios.get('/users/wishlist');
    return response.data;
  },

  addToWishlist: async (productId: string) => {
    const response = await axios.post(`/users/wishlist/${productId}`);
    return response.data;
  },

  removeFromWishlist: async (productId: string) => {
    const response = await axios.delete(`/users/wishlist/${productId}`);
    return response.data;
  }
};
```