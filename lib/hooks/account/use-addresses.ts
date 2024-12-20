"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addressService } from '@/lib/services/account/addresses';
import type { Address } from '@/lib/types/address';

export function useAddresses() {
  const [data, setData] = useState<{
    addresses: Address[];
    isLoading: boolean;
    error: Error | null;
  }>({
    addresses: [],
    isLoading: true,
    error: null
  });

  const { toast } = useToast();

  const fetchAddresses = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true }));
      const addresses = await addressService.getAddresses();
      setData({ addresses, isLoading: false, error: null });
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      setData({ addresses: [], isLoading: false, error: error as Error });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load addresses"
      });
    }
  };

  const addAddress = async (address: Partial<Address>) => {
    try {
      const newAddress = await addressService.addAddress(address);
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
      await addressService.deleteAddress(id);
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

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    ...data,
    addAddress,
    deleteAddress,
    refresh: fetchAddresses
  };
}
