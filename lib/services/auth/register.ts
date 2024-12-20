import { apiService } from '../api';
import { API_ENDPOINTS } from '@/lib/config/api';
import type { RegisterFormValues } from '@/lib/validations/auth';
import type { User } from '@/lib/types/user';

export async function register(data: RegisterFormValues): Promise<User> {
  try {
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;
    
    // Send registration request to backend
    const response = await apiService.post<User>(
      API_ENDPOINTS.AUTH.REGISTER, 
      registerData
    );
    
    return response;
  } catch (error: any) {
    // Enhance error message
    const message = error.response?.data?.message || 'Registration failed';
    throw new Error(message);
  }
}
