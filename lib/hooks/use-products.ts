"use client";

import { useState, useEffect } from 'react';
import { productService } from '@/lib/services/products';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types/product';

export function useProducts(filters?: Record<string, any>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (data: Partial<Product>) => {
    try {
      const newProduct = await productService.createProduct(data);
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      return newProduct;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
      throw error;
    }
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
      const updatedProduct = await productService.updateProduct(id, data);
      setProducts(prev => prev.map(product => 
        product.id === id ? updatedProduct : product
      ));
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      return updatedProduct;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
  };
}