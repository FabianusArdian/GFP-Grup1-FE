"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { paymentService } from '@/lib/services/account/payments';
import type { PaymentMethod } from '@/lib/types/payment';

export function usePayments() {
  const [data, setData] = useState<{
    paymentMethods: PaymentMethod[];
    isLoading: boolean;
    error: Error | null;
  }>({
    paymentMethods: [],
    isLoading: true,
    error: null
  });

  const { toast } = useToast();

  const fetchPaymentMethods = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));
      const paymentMethods = await paymentService.getPaymentMethods();
      setData({ paymentMethods, isLoading: false, error: null });
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
      setData({ paymentMethods: [], isLoading: false, error: error as Error });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load payment methods"
      });
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await paymentService.deletePaymentMethod(id);
      setData(prev => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter(method => method.id !== id)
      }));
      toast({
        title: "Success",
        description: "Payment method deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete payment method"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return {
    ...data,
    deletePaymentMethod,
    refresh: fetchPaymentMethods
  };
}
