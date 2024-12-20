import { apiService } from '../api';
import { API_ENDPOINTS } from '@/lib/config/api';
import { AUTH_CONFIG } from '@/lib/config/constants';
import type { LoginFormValues } from '@/lib/validations/auth';
import type { AuthResponse } from '@/lib/types/auth';
import Cookies from 'js-cookie';

export async function login(data: LoginFormValues): Promise<AuthResponse> {
  try {
    // Send login request to backend
    const response = await apiService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN, 
      data
    );
    
    // Store auth token in HTTP-only cookie
    if (response.token) {
      Cookies.set(AUTH_CONFIG.TOKEN_KEY, response.token, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }
    
    return response;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
}
