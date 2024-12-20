"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus, StatusHistoryEntry } from '@/lib/types/order';
import { generateId } from '@/lib/utils/id';

interface OrderStore {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderHistory: (orderId: string) => StatusHistoryEntry[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      updateOrderStatus: (orderId, status, note) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order;

            const historyEntry: StatusHistoryEntry = {
              id: generateId(),
              status,
              timestamp: new Date(),
              note,
              updatedBy: "Admin", // In a real app, get from auth context
            };

            return {
              ...order,
              status,
              statusHistory: [...order.statusHistory, historyEntry],
            };
          }),
        }));
      },

      getOrderHistory: (orderId) => {
        const order = get().orders.find((o) => o.id === orderId);
        return order?.statusHistory || [];
      },
    }),
    {
      name: 'order-storage',
    }
  )
);