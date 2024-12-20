import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId) => {
        set((state) => ({ items: [...state.items, productId] }));
        toast.success('Added to wishlist');
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId)
        }));
        toast.success('Removed from wishlist');
      },
      
      toggleItem: (productId) => {
        const hasItem = get().hasItem(productId);
        if (hasItem) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },
      
      hasItem: (productId) => {
        return get().items.includes(productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);