import {useQuery} from '@tanstack/react-query';

import {
  getStoreList,
  type GetStoreListParams,
  type StoreListResult,
} from './store-api';

const storeQueryKeys = {
  all: ['stores'] as const,
  lists: () => [...storeQueryKeys.all, 'list'] as const,
  list: (params: GetStoreListParams) =>
    [...storeQueryKeys.lists(), params] as const,
};

const useStoreListQuery = (params: GetStoreListParams) => {
  return useQuery<StoreListResult>({
    queryKey: storeQueryKeys.list(params),
    queryFn: () => getStoreList(params),
    placeholderData: (previousData) => previousData,
  });
};

export {storeQueryKeys, useStoreListQuery};
