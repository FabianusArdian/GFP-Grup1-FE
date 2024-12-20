"use client";

import { useState, useCallback } from 'react';
import { handleAsyncError } from '@/lib/utils/error';

interface UseAsyncOptions {
  onError?: (error: any) => void;
  errorMessage?: string;
}

export function useAsync<T extends (...args: any[]) => Promise<any>>(
  asyncFunction: T,
  options: UseAsyncOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      try {
        setIsLoading(true);
        return await asyncFunction(...args);
      } catch (error) {
        options.onError?.(error);
        handleAsyncError(error, options.errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, options]
  );

  return {
    execute,
    isLoading,
  };
}
