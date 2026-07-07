import { QueryClient } from "@tanstack/react-query";

import { ApiError, toastApiError } from "@/lib/api/api-errors";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && error.code === "offline") {
            return false;
          }
          return failureCount < 2;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
      },
      mutations: {
        retry: false,
        networkMode: "always",
        onError: (error) => {
          toastApiError(error);
        },
      },
    },
  });
}
