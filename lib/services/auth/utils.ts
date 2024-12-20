
import { AUTH_CONFIG } from '@/lib/config/constants';
import type { User } from '@/lib/types/user';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem(AUTH_CONFIG.USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
}
