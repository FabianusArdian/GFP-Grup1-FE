"use client";

import { useState, useEffect, useCallback } from "react";
import { accountService } from "@/lib/services/account";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/stores/user-store";
import type { User } from "@/lib/types/user";
import type { Address } from "@/lib/types/address";
import type { Order } from "@/lib/types/order";
import type { PaymentMethod } from "@/lib/types/payment";

export function useAccount() {
  const [data, setData] = useState({
    profile: null as User | null,
    addresses: [] as Address[],
    orders: [] as Order[],
    paymentMethods: [] as PaymentMethod[],
    isLoading: true,
  });

  const { toast } = useToast();
  const { currentUser } = useUserStore();

  const fetchData = useCallback(async () => {
    if (!currentUser) return;

    try {
      const [profile, addresses, orders, paymentMethods] = await Promise.all([
        accountService.getProfile(),
        accountService.getAddresses(),
        accountService.getOrders(),
        accountService.getPaymentMethods(),
      ]);

      setData({
        profile,
        addresses,
        orders,
        paymentMethods,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load account data",
      });
      setData((prev) => ({ ...prev, isLoading: false }));
    }
  }, [currentUser, toast]);

  // CRUD operations for addresses
  const addAddress = async (address: Partial<Address>) => {
    try {
      const newAddress = await accountService.addAddress(address);
      setData((prev) => ({
        ...prev,
        addresses: [...prev.addresses, newAddress],
      }));
      toast({
        title: "Success",
        description: "Address added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add address",
      });
      throw error;
    }
  };

  const updateAddress = async (id: string, address: Partial<Address>) => {
    try {
      const updatedAddress = await accountService.updateAddress(id, address);
      setData((prev) => ({
        ...prev,
        addresses: prev.addresses.map((a) =>
          a.id === id ? updatedAddress : a
        ),
      }));
      toast({
        title: "Success",
        description: "Address updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update address",
      });
      throw error;
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await accountService.deleteAddress(id);
      setData((prev) => ({
        ...prev,
        addresses: prev.addresses.filter((a) => a.id !== id),
      }));
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete address",
      });
      throw error;
    }
  };

  // CRUD operations for payment methods
  const addPaymentMethod = async (method: Partial<PaymentMethod>) => {
    try {
      const newMethod = await accountService.addPaymentMethod(method);
      setData((prev) => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, newMethod],
      }));
      toast({
        title: "Success",
        description: "Payment method added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add payment method",
      });
      throw error;
    }
  };

  const updatePaymentMethod = async (
    id: string,
    method: Partial<PaymentMethod>
  ) => {
    try {
      const updatedMethod = await accountService.updatePaymentMethod(
        id,
        method
      );
      setData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.map((m) =>
          m.id === id ? updatedMethod : m
        ),
      }));
      toast({
        title: "Success",
        description: "Payment method updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update payment method",
      });
      throw error;
    }
  };

  const deletePaymentMethod = async (id: string) => {
    try {
      await accountService.deletePaymentMethod(id);
      setData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter((m) => m.id !== id),
      }));
      toast({
        title: "Success",
        description: "Payment method deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete payment method",
      });
      throw error;
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    addAddress,
    updateAddress,
    deleteAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    refresh: fetchData,
  };
}
