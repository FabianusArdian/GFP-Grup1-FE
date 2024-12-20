"use client";

import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { Address } from '@/lib/types/address';

export const addressService = {
  getAddresses: async (): Promise<Address[]> => {
    return apiService.get(`${API_ENDPOINTS.USERS.ADDRESSES}`);
  },

  addAddress: async (data: Partial<Address>): Promise<Address> => {
    return apiService.post(`${API_ENDPOINTS.USERS.ADDRESSES}`, data);
  },

  updateAddress: async (id: string, data: Partial<Address>): Promise<Address> => {
    return apiService.put(`${API_ENDPOINTS.USERS.ADDRESSES}/${id}`, data);
  },

  deleteAddress: async (id: string): Promise<void> => {
    return apiService.delete(`${API_ENDPOINTS.USERS.ADDRESSES}/${id}`);
  },

  setDefaultAddress: async (id: string): Promise<void> => {
    return apiService.put(`${API_ENDPOINTS.USERS.ADDRESSES}/${id}/default`);
  },
};