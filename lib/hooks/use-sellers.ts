"use client";

import { useState, useEffect } from 'react';
import { sellerService } from '@/lib/services/sellers';
import { useToast } from '@/hooks/use-toast';
import type { Seller } from '@/lib/types/seller';
import type { Product } from '@/lib/types/product';

export function useSellers(filters?: Record<string, any>) {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchSellers = async () => {
    try {
      const data = await sellerService.getSellers(filters);
      setSellers(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch sellers",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSellerProducts = async (sellerId: string): Promise<Product[]> => {
    try {
      return await sellerService.getSellerProducts(sellerId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch seller products",
      });
      throw error;
    }
  };

  const updateSellerProfile = async (data: Partial<Seller>) => {
    try {
      const updatedSeller = await sellerService.updateProfile(data);
      setSellers(prev => prev.map(seller => 
        seller.id === updatedSeller.id ? updatedSeller : seller
      ));
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return updatedSeller;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return {
    sellers,
    isLoading,
    getSellerProducts,
    updateSellerProfile,
    refreshSellers: fetchSellers,
  };
}