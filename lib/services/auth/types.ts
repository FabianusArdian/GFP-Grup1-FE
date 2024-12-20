import type { User } from '@/lib/types/user';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthUtils {
  getCurrentUser: () => User | null;
  isAuthenticated: () => boolean;
}
