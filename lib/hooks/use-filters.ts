"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  types: string[];
  minRating: number;
  search: string;
}

interface FilterStore extends FilterState {
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  priceRange: [0, 1000000],
  categories: [],
  types: [],
  minRating: 0,
  search: '',
};

export const useFilters = create<FilterStore>()(
  persist(
    (set) => ({
      ...initialState,
      setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
      resetFilters: () => set(initialState),
    }),
    {
      name: 'product-filters',
    }
  )
);