import { apiService } from './api';
import { API_ENDPOINTS } from '@/lib/config/api';
import { AUTH_CONFIG } from '@/lib/config/constants';
import type { LoginFormValues, RegisterFormValues } from '@/lib/validations/auth';
import type { User } from '@/lib/types/user';

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    
    // Store auth data
    localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, response.token);
    localStorage.setItem(AUTH_CONFIG.USER_KEY, JSON.stringify(response.user));
    
    return response;
  },

  register: async (data: RegisterFormValues): Promise<User> => {
    const response = await apiService.post<User>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response;
  },

  logout: async (): Promise<void> => {
    try {
      await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always clear local storage
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    }
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(AUTH_CONFIG.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
  }
};