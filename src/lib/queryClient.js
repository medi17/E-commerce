import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed requests 3 times
      retryDelay: 1000, // Wait 1 second between retries
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep cache for 10 minutes
    },
  },
})