```typescript
import axios from './axios';
import { Order } from '@/lib/types/order';

export const orderApi = {
  getOrders: async () => {
    const response = await axios.get('/orders');
    return response.data;
  },

  getOrder: async (id: string) => {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  },

  createOrder: async (data: Partial<Order>) => {
    const response = await axios.post('/orders', data);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string, note?: string) => {
    const response = await axios.put(`/orders/${id}/status`, { status, note });
    return response.data;
  }
};
```