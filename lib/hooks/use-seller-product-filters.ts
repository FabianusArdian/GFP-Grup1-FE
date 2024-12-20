"use client";

import { create } from 'zustand';
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '@/lib/data/server/constants';

export interface SellerProductFilterState {
  priceRange: [number, number];
  categories: string[];
  types: string[];
  minRating: number;
  search: string;
}

interface SellerProductFilterStore extends SellerProductFilterState {
  setFilter: <K extends keyof SellerProductFilterState>(key: K, value: SellerProductFilterState[K]) => void;
  resetFilters: () => void;
}

const initialState: SellerProductFilterState = {
  priceRange: [0, 1000000], // Updated for IDR range
  categories: [],
  types: [],
  minRating: 0,
  search: '',
};

export const useSellerProductFilters = create<SellerProductFilterStore>((set) => ({
  ...initialState,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set(initialState),
}));