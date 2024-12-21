export type UserRole = 'consumer' | 'seller';

export interface AuthFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends AuthFormData {
  name: string;
  role: UserRole;
  confirmPassword: string;
}

export interface LoginFormData extends AuthFormData {
  role: UserRole;
}