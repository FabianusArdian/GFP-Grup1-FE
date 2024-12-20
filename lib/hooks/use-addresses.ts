"use client";

import { useState, useEffect } from 'react';
import { addressService } from '@/lib/services/address';
import { useToast } from '@/hooks/use-toast';
import type { Address } from '@/lib/types/address';

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAddresses = async () => {
    try {
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch addresses",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (data: Partial<Address>) => {
    try {
      const newAddress = await addressService.addAddress(data);
      setAddresses(prev => [...prev, newAddress]);
      toast({
        title: "Success",
        description: "Address added successfully",
      });
      return newAddress;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add address",
      });
      throw error;
    }
  };

  const updateAddress = async (id: string, data: Partial<Address>) => {
    try {
      const updatedAddress = await addressService.updateAddress(id, data);
      setAddresses(prev => prev.map(addr => 
        addr.id === id ? updatedAddress : addr
      ));
      toast({
        title: "Success",
        description: "Address updated successfully",
      });
      return updatedAddress;
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
      await addressService.deleteAddress(id);
      setAddresses(prev => prev.filter(addr => addr.id !== id));
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

  const setDefaultAddress = async (id: string) => {
    try {
      await addressService.setDefaultAddress(id);
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      })));
      toast({
        title: "Success",
        description: "Default address updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update default address",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    refreshAddresses: fetchAddresses,
  };
}