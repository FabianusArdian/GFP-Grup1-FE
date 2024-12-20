"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { CartItem } from '@/types/cart';

interface CartStore {
  items: CartItem[];
  selectedItems: string[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleItemSelection: (id: string) => void;
  selectAllItems: () => void;
  unselectAllItems: () => void;
  clearCart: () => void;
  getSelectedTotal: () => number;
  getSelectedItems: () => CartItem[];
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      selectedItems: [],
      total: 0,
      
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
        
        set({ total: calculateTotal(get().items) });
        toast.success('Added to cart');
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
          total: calculateTotal(state.items.filter((i) => i.id !== id)),
        }));
        toast.success('Removed from cart');
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 0) return;
        
        set((state) => {
          const newItems = quantity === 0 
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
              );
          
          return {
            items: newItems,
            selectedItems: quantity === 0 
              ? state.selectedItems.filter((itemId) => itemId !== id)
              : state.selectedItems,
            total: calculateTotal(newItems),
          };
        });
      },

      toggleItemSelection: (id) => {
        set((state) => ({
          selectedItems: state.selectedItems.includes(id)
            ? state.selectedItems.filter((itemId) => itemId !== id)
            : [...state.selectedItems, id]
        }));
      },

      selectAllItems: () => {
        set((state) => ({
          selectedItems: state.items.map(item => item.id)
        }));
      },

      unselectAllItems: () => {
        set({ selectedItems: [] });
      },

      clearCart: () => {
        set({ items: [], selectedItems: [], total: 0 });
        toast.success('Cart cleared');
      },

      getSelectedTotal: () => {
        const { items, selectedItems } = get();
        return items
          .filter(item => selectedItems.includes(item.id))
          .reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getSelectedItems: () => {
        const { items, selectedItems } = get();
        return items.filter(item => selectedItems.includes(item.id));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}