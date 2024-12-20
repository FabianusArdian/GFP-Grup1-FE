import { apiService } from '../api';
import { API_ENDPOINTS } from '@/lib/config/api';
import { AUTH_CONFIG } from '@/lib/config/constants';
import { useUserStore } from '@/lib/stores/user-store';
import { useCart } from '@/lib/hooks/use-cart';
import Cookies from 'js-cookie';

export async function logout(): Promise<void> {
  try {
    // Call backend logout endpoint
    await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Clear auth data regardless of API response
    clearAuthData();
  }
}

function clearAuthData(): void {
  // Remove auth cookie
  Cookies.remove(AUTH_CONFIG.TOKEN_KEY);
  
  // Reset stores
  const { clearUser } = useUserStore.getState();
  const { clearCart } = useCart.getState();
  
  clearUser();
  clearCart();
  
  // Clear other auth-related storage
  localStorage.removeItem('cart-storage');
  localStorage.removeItem('wishlist-storage');
}
