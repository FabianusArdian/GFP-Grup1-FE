"use client";

import { create } from 'zustand';

export interface SellerFilterState {
  minRating: number;
  categories: string[];
  provinces: string[];
  search: string;
}

interface SellerFilterStore extends SellerFilterState {
  setFilter: <K extends keyof SellerFilterState>(key: K, value: SellerFilterState[K]) => void;
  resetFilters: () => void;
}

const initialState: SellerFilterState = {
  minRating: 0,
  categories: [],
  provinces: [],
  search: '',
};

export const useSellerFilters = create<SellerFilterStore>((set) => ({
  ...initialState,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetFilters: () => set(initialState),
}));