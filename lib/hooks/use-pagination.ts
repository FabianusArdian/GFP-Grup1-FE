"use client";

import { useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  defaultPage?: number;
}

export function usePagination({ 
  totalItems, 
  itemsPerPage = 9, // Changed to show 9 items per page (3x3 grid)
  defaultPage = 1 
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginateItems = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage: goToPage,
    paginateItems,
    itemsPerPage,
  };
}