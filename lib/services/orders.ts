"use client";

import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Order } from '@/lib/types/order';

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    return apiService.get(API_ENDPOINTS.ORDERS.LIST);
  },

  getOrder: async (id: string): Promise<Order> => {
    return apiService.get(API_ENDPOINTS.ORDERS.DETAIL(id));
  },

  createOrder: async (data: Partial<Order>): Promise<Order> => {
    return apiService.post(API_ENDPOINTS.ORDERS.CREATE, data);
  },

  updateOrderStatus: async (id: string, status: string, note?: string): Promise<Order> => {
    return apiService.put(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), { status, note });
  },
};