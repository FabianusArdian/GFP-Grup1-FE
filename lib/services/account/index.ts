import { apiService } from '../api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { User } from '@/lib/types/user';
import type { Address } from '@/lib/types/address';
import type { Order } from '@/lib/types/order';
import type { PaymentMethod } from '@/lib/types/payment';

export const accountService = {
  // Profile
  getProfile: async (): Promise<User> => {
    return apiService.get(API_ENDPOINTS.USERS.PROFILE);
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    return apiService.put(API_ENDPOINTS.USERS.PROFILE, data);
  },

  // Addresses
  getAddresses: async (): Promise<Address[]> => {
    return apiService.get(API_ENDPOINTS.USERS.ADDRESSES);
  },

  addAddress: async (data: Partial<Address>): Promise<Address> => {
    return apiService.post(API_ENDPOINTS.USERS.ADDRESSES, data);
  },

  updateAddress: async (id: string, data: Partial<Address>): Promise<Address> => {
    return apiService.put(`${API_ENDPOINTS.USERS.ADDRESSES}/${id}`, data);
  },

  deleteAddress: async (id: string): Promise<void> => {
    return apiService.delete(`${API_ENDPOINTS.USERS.ADDRESSES}/${id}`);
  },

  // Payment Methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    return apiService.get(API_ENDPOINTS.USERS.PAYMENT_METHODS);
  },

  addPaymentMethod: async (data: Partial<PaymentMethod>): Promise<PaymentMethod> => {
    return apiService.post(API_ENDPOINTS.USERS.PAYMENT_METHODS, data);
  },

  updatePaymentMethod: async (id: string, data: Partial<PaymentMethod>): Promise<PaymentMethod> => {
    return apiService.put(`${API_ENDPOINTS.USERS.PAYMENT_METHODS}/${id}`, data);
  },

  deletePaymentMethod: async (id: string): Promise<void> => {
    return apiService.delete(`${API_ENDPOINTS.USERS.PAYMENT_METHODS}/${id}`);
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    return apiService.get(API_ENDPOINTS.USERS.ORDERS);
  },

  getOrder: async (id: string): Promise<Order> => {
    return apiService.get(`${API_ENDPOINTS.USERS.ORDERS}/${id}`);
  },
};
