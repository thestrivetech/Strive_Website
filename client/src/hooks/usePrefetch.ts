import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

/**
 * Hook for prefetching queries on route hover/focus
 * Optimizes navigation by preloading data before user clicks
 */
export function usePrefetch() {
  const queryClient = useQueryClient();

  const prefetchQuery = useCallback(
    (queryKey: string[], queryFn?: () => Promise<any>) => {
      // Only prefetch if data is not already in cache
      if (!queryClient.getQueryData(queryKey)) {
        queryClient.prefetchQuery({
          queryKey,
          queryFn,
          staleTime: 5 * 60 * 1000, // 5 minutes
        });
      }
    },
    [queryClient]
  );

  // Prefetch user data for authenticated routes
  const prefetchUserData = useCallback(() => {
    prefetchQuery(['/api/user'], async () => {
      const response = await fetch('/api/user', { credentials: 'include' });
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to fetch user data');
    });
  }, [prefetchQuery]);

  // Prefetch portfolio data
  const prefetchPortfolio = useCallback(() => {
    prefetchQuery(['/api/portfolio'], async () => {
      const response = await fetch('/api/portfolio', { credentials: 'include' });
      if (response.ok) {
        return response.json();
      }
      // Return static data if API not available
      return null;
    });
  }, [prefetchQuery]);

  // Prefetch resources data
  const prefetchResources = useCallback(() => {
    prefetchQuery(['/api/resources'], async () => {
      const response = await fetch('/api/resources', { credentials: 'include' });
      if (response.ok) {
        return response.json();
      }
      return null;
    });
  }, [prefetchQuery]);

  // Prefetch solutions data
  const prefetchSolutions = useCallback(() => {
    prefetchQuery(['/api/solutions'], async () => {
      const response = await fetch('/api/solutions', { credentials: 'include' });
      if (response.ok) {
        return response.json();
      }
      return null;
    });
  }, [prefetchQuery]);

  return {
    prefetchUserData,
    prefetchPortfolio,
    prefetchResources,
    prefetchSolutions,
    prefetchQuery,
  };
}

/**
 * Route-based prefetching configuration
 * Maps routes to their prefetch functions
 */
export const ROUTE_PREFETCH_MAP = {
  '/dashboard': 'prefetchUserData',
  '/portfolio': 'prefetchPortfolio',
  '/resources': 'prefetchResources',
  '/solutions': 'prefetchSolutions',
} as const;