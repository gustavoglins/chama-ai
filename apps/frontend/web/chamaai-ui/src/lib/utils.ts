import { ApiResponse, ApiResponseStatus } from '@/interfaces/api.interface';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a standardized error response object from a caught error
 * @param error - The caught error object
 * @returns Standardized API error response
 */
export function getErrorObject<T = undefined>(error: unknown): ApiResponse<T> {
  return {
    status: ApiResponseStatus.ERROR,
    code: 500,
    message: (error as Error).message || 'An unexpected error occurred',
    data: undefined as T,
    errors: [{ message: (error as Error).message || 'Unknown error' }],
  };
}
