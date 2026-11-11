import { AxiosError } from 'axios';
import type { UseFormSetError, FieldValues, Path } from 'react-hook-form';

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

export const handleServerFieldErrors = <T extends FieldValues>(
  error: AxiosError<ApiErrorResponse> | null | unknown,
  setError: UseFormSetError<T>
) => {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  const serverFieldErrors = axiosError?.response?.data?.errors;

  if (serverFieldErrors && typeof serverFieldErrors === 'object') {
    Object.entries(serverFieldErrors).forEach(([field, message]) => {
      setError(field as Path<T>, {
        type: 'server',
        message,
      });
    });
  }
};
