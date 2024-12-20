import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { accountService } from '@/lib/services/account';
import type { User } from '@/lib/types/user';
import type { Address } from '@/lib/types/address';
import type { Order } from '@/lib/types/order';
import type { PaymentMethod } from '@/lib/types/payment';

interface AccountData {
  profile: User | null;
  addresses: Address[];
  orders: Order[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  error: Error | null;
}

export function useAccountData() {
  const [data, setData] = useState<AccountData>({
    profile: null,
    addresses: [],
    orders: [],
    paymentMethods: [],
    isLoading: true,
    error: null
  });

  const { toast } = useToast();

  const fetchAccountData = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));

      const [profile, addresses, orders, paymentMethods] = await Promise.all([
        accountService.getProfile(),
        accountService.getAddresses(),
        accountService.getOrders(),
        accountService.getPaymentMethods()
      ]);

      setData({
        profile,
        addresses,
        orders,
        paymentMethods,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Failed to fetch account data:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error as Error
      }));
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load account data"
      });
    }
  };

  // CRUD operations for addresses
  const addAddress = async (address: Partial<Address>) => {
    try {
      const newAddress = await accountService.addAddress(address);
      setData(prev => ({
        ...prev,
        addresses: [...prev.addresses, newAddress]
      }));
      toast({
        title: "Success",
        description: "Address added successfully"
      });
      return newAddress;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add address"
      });
      throw error;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await accountService.deleteAddress(id);
      setData(prev => ({
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== id)
      }));
      toast({
        title: "Success",
        description: "Address deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete address"
      });
      throw error;
    }
  };

  // CRUD operations for payment methods
  const addPaymentMethod = async (method: Partial<PaymentMethod>) => {
    try {
      const newMethod = await accountService.addPaymentMethod(method);
      setData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, newMethod]
      }));
      toast({
        title: "Success",
        description: "Payment method added successfully"
      });
      return newMethod;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add payment method"
      });
      throw error;
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await accountService.deletePaymentMethod(id);
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
    fetchAccountData();
  }, []);

  return {
    ...data,
    addAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod,
    refresh: fetchAccountData
  };
}
