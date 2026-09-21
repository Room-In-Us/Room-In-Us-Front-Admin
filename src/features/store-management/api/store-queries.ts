import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  createStore,
  deleteStore,
  getStoreDetail,
  getStoreHistoryList,
  getStoreList,
  updateStore,
  type CreateStoreParams,
  type DeleteStoreParams,
  type GetStoreDetailParams,
  type GetStoreHistoryListParams,
  type GetStoreListParams,
  type StoreDetailResult,
  type StoreHistoryListResult,
  type StoreListResult,
  type UpdateStoreParams,
} from './store-api';

const storeQueryKeys = {
  all: ['stores'] as const,
  detail: (storeId: GetStoreDetailParams['storeId']) =>
    [...storeQueryKeys.all, 'detail', storeId] as const,
  lists: () => [...storeQueryKeys.all, 'list'] as const,
  list: (params: GetStoreListParams) =>
    [...storeQueryKeys.lists(), params] as const,
  histories: () => [...storeQueryKeys.all, 'histories'] as const,
  historyList: (params: GetStoreHistoryListParams) =>
    [...storeQueryKeys.histories(), params] as const,
};

const useStoreDetailQuery = ({
  enabled,
  fallbackStore,
  storeId,
}: GetStoreDetailParams & {enabled: boolean}) => {
  return useQuery<StoreDetailResult>({
    enabled: enabled && Boolean(storeId),
    queryKey: storeQueryKeys.detail(storeId),
    queryFn: () => getStoreDetail({fallbackStore, storeId}),
    refetchOnWindowFocus: false,
  });
};

const useStoreListQuery = (params: GetStoreListParams) => {
  return useQuery<StoreListResult>({
    queryKey: storeQueryKeys.list(params),
    queryFn: () => getStoreList(params),
    placeholderData: (previousData) => previousData,
  });
};

const useStoreHistoryListQuery = (params: GetStoreHistoryListParams) => {
  return useQuery<StoreHistoryListResult>({
    queryKey: storeQueryKeys.historyList(params),
    queryFn: () => getStoreHistoryList(params),
    placeholderData: (previousData) => previousData,
  });
};

const useCreateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateStoreParams) => createStore(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: storeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: storeQueryKeys.histories(),
        }),
      ]);
    },
  });
};

const useDeleteStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteStoreParams) => deleteStore(params),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: storeQueryKeys.lists()}),
        queryClient.removeQueries({
          queryKey: storeQueryKeys.detail(variables.storeId),
        }),
        queryClient.invalidateQueries({
          queryKey: storeQueryKeys.histories(),
        }),
      ]);
    },
  });
};

const useUpdateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateStoreParams) => updateStore(params),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: storeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: storeQueryKeys.detail(variables.storeId),
        }),
        queryClient.invalidateQueries({
          queryKey: storeQueryKeys.histories(),
        }),
      ]);
    },
  });
};

export {
  storeQueryKeys,
  useCreateStoreMutation,
  useDeleteStoreMutation,
  useStoreDetailQuery,
  useStoreListQuery,
  useUpdateStoreMutation,
  useStoreHistoryListQuery,
};
