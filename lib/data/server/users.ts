import { User } from '@/lib/types/user';
import { hashPassword } from '@/lib/utils/auth';

export const initialUsers: User[] = [
  // Consumers
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: hashPassword("password123"), // Add hashed passwords
    role: "consumer",
    createdAt: new Date("2024-01-15"),
    phone: "081234567890",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: hashPassword("password123"),
    role: "consumer",
    createdAt: new Date("2024-02-01"),
    phone: "081234567891",
  },

  // Sellers
  {
    id: "seller1",
    name: "Green Valley Farm",
    email: "contact@greenvalley.com",
    password: hashPassword("password123"),
    role: "seller",
    createdAt: new Date("2023-12-01"),
    phone: "081234567892",
  },
  {
    id: "seller2",
    name: "Artisan Bakery",
    email: "hello@artisanbakery.com",
    password: hashPassword("password123"),
    role: "seller",
    createdAt: new Date("2023-11-15"),
    phone: "081234567893",
  }
];