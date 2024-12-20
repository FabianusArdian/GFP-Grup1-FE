// Simple password hashing for demo purposes
// In production, use a proper hashing library like bcrypt
export function hashPassword(password: string): string {
  return btoa(password); // Base64 encoding for demo
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}