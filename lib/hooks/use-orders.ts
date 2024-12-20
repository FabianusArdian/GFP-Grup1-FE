"use client";

import { useState, useEffect } from 'react';
import { orderService } from '@/lib/services/orders';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/lib/types/order';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch orders",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (data: Partial<Order>) => {
    try {
      const newOrder = await orderService.createOrder(data);
      setOrders(prev => [...prev, newOrder]);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
      return newOrder;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create order",
      });
      throw error;
    }
  };

  const updateOrderStatus = async (id: string, status: string, note?: string) => {
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, status, note);
      setOrders(prev => prev.map(order => 
        order.id === id ? updatedOrder : order
      ));
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
      return updatedOrder;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading,
    createOrder,
    updateOrderStatus,
    refreshOrders: fetchOrders,
  };
}