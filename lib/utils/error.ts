
import { toast } from 'sonner';
import { ApiError } from '@/lib/types/api';

export function showErrorToast(error: ApiError) {
  if (error.errors) {
    // Show validation errors
    Object.entries(error.errors).forEach(([field, messages]) => {
      messages.forEach(message => {
        toast.error(`${field}: ${message}`);
      });
    });
  } else {
    // Show general error
    toast.error(error.message);
  }
}

export function handleAsyncError(error: any, customMessage?: string) {
  console.error(error);
  toast.error(customMessage || 'An error occurred. Please try again.');
}
