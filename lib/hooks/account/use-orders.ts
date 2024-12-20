"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { orderService } from '@/lib/services/account/orders';
import type { Order } from '@/lib/types/order';

export function useOrders() {
  const [data, setData] = useState<{
    orders: Order[];
    isLoading: boolean;
    error: Error | null;
  }>({
    orders: [],
    isLoading: true,
    error: null
  });

  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));
      const orders = await orderService.getOrders();
      setData({ orders, isLoading: false, error: null });
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setData({ orders: [], isLoading: false, error: error as Error });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load orders"
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    ...data,
    refresh: fetchOrders
  };
}
