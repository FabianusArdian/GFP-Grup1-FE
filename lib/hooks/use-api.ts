"use client";

import { useState } from 'react';
import { ApiError } from '@/lib/types/api';
import { handleApiError } from '@/lib/utils/api';
import { showErrorToast } from '@/lib/utils/error';

interface UseApiOptions {
  showErrors?: boolean;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (promise: Promise<T>): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await promise;
      setData(result);
      return result;
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError);
      
      if (options.showErrors !== false) {
        showErrorToast(apiError);
      }
      
      options.onError?.(apiError);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    execute,
    setData,
  };
}
