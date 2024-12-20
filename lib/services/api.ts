import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/lib/config/api';
import { AUTH_CONFIG } from '@/lib/config/constants';
import Cookies from 'js-cookie';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: true, // Important for cookies
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = Cookies.get(AUTH_CONFIG.TOKEN_KEY);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      Cookies.remove(AUTH_CONFIG.TOKEN_KEY);
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Generic API methods
export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};
