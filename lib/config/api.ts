export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    PROFILE: '/users/profile',
    ADDRESSES: '/users/addresses',
    ORDERS: '/users/orders',
    WISHLIST: '/users/wishlist',
    PAYMENT_METHODS: '/users/payment-methods',
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    FEATURED: '/products/featured',
    CATEGORIES: '/products/categories',
  },
  SELLERS: {
    LIST: '/sellers',
    DETAIL: (id: string) => `/sellers/${id}`,
    PRODUCTS: (id: string) => `/sellers/${id}/products`,
  },
};
