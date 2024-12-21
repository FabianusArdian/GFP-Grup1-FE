import { useUserStore } from '@/lib/stores/user-store';
import { LoginFormValues, RegisterFormValues } from '@/lib/validations/auth';
import { User } from '@/lib/types/user';
import { hashPassword, verifyPassword } from '@/lib/utils/auth';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function register(data: RegisterFormValues): Promise<User> {
  const userStore = useUserStore.getState();
  
  // Check if email already exists
  const existingUser = userStore.getUserByEmail(data.email);
  if (existingUser) {
    throw new AuthError('Email sudah terdaftar');
  }

  // Create new user with hashed password
  const user = userStore.addUser({
    name: data.name,
    email: data.email,
    password: hashPassword(data.password),
    role: data.role,
    phone: "",
  });

  return user;
}

export async function login(data: LoginFormValues): Promise<User> {
  const userStore = useUserStore.getState();
  
  // Find user by email
  const user = userStore.getUserByEmail(data.email);
  if (!user) {
    throw new AuthError('Email atau password salah');
  }

  // Verify role matches
  if (user.role !== data.role) {
    throw new AuthError('Role tidak sesuai');
  }

  // Verify password
  if (!verifyPassword(data.password, user.password)) {
    throw new AuthError('Email atau password salah');
  }

  // Set current user
  userStore.currentUser = user;

  return user;
}

export function logout(): void {
  const userStore = useUserStore.getState();
  userStore.currentUser = null;
}