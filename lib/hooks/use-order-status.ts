"use client";

import { useState } from 'react';
import { useOrderStore } from '@/lib/stores/order-store';
import { OrderStatus } from '@/lib/types/order';
import { useToast } from '@/hooks/use-toast';

export function useOrderStatus(orderId: string) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateOrderStatus, getOrderHistory } = useOrderStore();
  const { toast } = useToast();

  const handleStatusUpdate = async (newStatus: OrderStatus, note?: string) => {
    try {
      setIsUpdating(true);
      updateOrderStatus(orderId, newStatus, note);
      
      toast({
        title: "Status updated",
        description: `Order #${orderId} has been marked as ${newStatus}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    updateStatus: handleStatusUpdate,
    getHistory: () => getOrderHistory(orderId),
  };
}