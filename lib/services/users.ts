"use client";

import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { User } from '@/lib/types/user';

export const userService = {
  getProfile: async (): Promise<User> => {
    return apiService.get(API_ENDPOINTS.USERS.PROFILE);
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiService.put(API_ENDPOINTS.USERS.PROFILE, data);
  },

  getAddresses: async (): Promise<any[]> => {
    return apiService.get(API_ENDPOINTS.USERS.ADDRESSES);
  },

  addAddress: async (data: any): Promise<any> => {
    return apiService.post(API_ENDPOINTS.USERS.ADDRESSES, data);
  },
};