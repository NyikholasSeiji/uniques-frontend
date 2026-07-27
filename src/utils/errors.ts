import axios from "axios";

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string>;
}

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const data = error.response?.data;
    if (data?.errors) {
      const firstFieldError = Object.values(data.errors)[0];
      if (firstFieldError) return firstFieldError;
    }
    if (data?.message) return data.message;
  }
  return fallback;
};
