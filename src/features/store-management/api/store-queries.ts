import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  createStore,
  deleteStore,
  getStoreDetail,
  getStoreList,
  updateStore,
  type CreateStoreParams,
  type DeleteStoreParams,
  type GetStoreDetailParams,
  type GetStoreListParams,
  type StoreDetailResult,
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

const useCreateStoreMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateStoreParams) => createStore(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: storeQueryKeys.lists()});
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
};
