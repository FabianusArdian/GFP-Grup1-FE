export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'seller';
  createdAt: Date;
  phone: string;
  password: string; // Add password field
}

export interface UserStore {
  users: User[];
  currentUser: User | null;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => User;
  getUserByEmail: (email: string) => User | undefined;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
}