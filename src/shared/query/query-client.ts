import {QueryClient} from '@tanstack/react-query';

import {isApiError} from '@/src/shared/api/api-error';

const QUERY_STALE_TIME_MS = 30_000;
const MAX_QUERY_RETRY_COUNT = 2;

const shouldRetryQuery = (failureCount: number, error: unknown) => {
  if (failureCount >= MAX_QUERY_RETRY_COUNT) {
    return false;
  }

  if (isApiError(error) && ['auth', 'validation'].includes(error.type)) {
    return false;
  }

  return true;
};

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: shouldRetryQuery,
        staleTime: QUERY_STALE_TIME_MS,
      },
      mutations: {
        retry: false,
      },
    },
  });
};
