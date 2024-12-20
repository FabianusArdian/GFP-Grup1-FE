import { ApiError } from '@/lib/types/api';

export function handleApiError(error: any): ApiError {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data.message || 'An error occurred',
      errors: error.response.data.errors,
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server',
      status: 0,
    };
  } else {
    // Request setup error
    return {
      message: error.message || 'Request failed',
      status: 0,
    };
  }
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
}
