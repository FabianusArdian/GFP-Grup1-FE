import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/lib/config/api';
import { ApiError } from '@/lib/types/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(handleApiError(error));
  }
);

// Error handler
function handleApiError(error: AxiosError): ApiError {
  if (error.response) {
    return {
      message: error.response.data.message || 'An error occurred',
      errors: error.response.data.errors,
      status: error.response.status,
    };
  }
  return {
    message: error.message || 'Network error',
    status: 0,
  };
}

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

  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};