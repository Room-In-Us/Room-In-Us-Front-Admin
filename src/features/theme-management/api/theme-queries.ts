import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  createTheme,
  deleteTheme,
  getThemeDetail,
  getThemeHistoryDetail,
  getThemeHistoryList,
  getThemeList,
  restoreThemeHistory,
  updateTheme,
  type CreateThemeParams,
  type DeleteThemeParams,
  type GetThemeDetailParams,
  type GetThemeHistoryDetailParams,
  type GetThemeHistoryListParams,
  type GetThemeListParams,
  type RestoreThemeHistoryParams,
  type ThemeHistoryListResult,
  type ThemeListResult,
  type UpdateThemeParams,
} from './theme-api';

const themeQueryKeys = {
  all: ['themes'] as const,
  detail: (themeId: GetThemeDetailParams['themeId']) =>
    [...themeQueryKeys.all, 'detail', themeId] as const,
  historyDetail: (commitId: GetThemeHistoryDetailParams['commitId']) =>
    [...themeQueryKeys.all, 'history-detail', commitId] as const,
  historyLists: () => [...themeQueryKeys.all, 'history-list'] as const,
  historyList: (params: GetThemeHistoryListParams) =>
    [...themeQueryKeys.historyLists(), params] as const,
  lists: () => [...themeQueryKeys.all, 'list'] as const,
  list: (params: GetThemeListParams) =>
    [...themeQueryKeys.lists(), params] as const,
};

const useThemeListQuery = (params: GetThemeListParams) => {
  return useQuery<ThemeListResult>({
    queryKey: themeQueryKeys.list(params),
    queryFn: () => getThemeList(params),
  });
};

const useThemeDetailQuery = ({themeId}: GetThemeDetailParams) => {
  return useQuery({
    queryKey: themeQueryKeys.detail(themeId),
    queryFn: () => getThemeDetail({themeId}),
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
};

const useThemeHistoryListQuery = (params: GetThemeHistoryListParams) => {
  return useQuery<ThemeHistoryListResult>({
    queryKey: themeQueryKeys.historyList(params),
    queryFn: () => getThemeHistoryList(params),
    placeholderData: (previousData) => previousData,
  });
};

const useThemeHistoryDetailQuery = ({
  commitId,
  enabled,
}: GetThemeHistoryDetailParams & {enabled: boolean}) => {
  return useQuery({
    enabled: enabled && Boolean(commitId),
    queryKey: themeQueryKeys.historyDetail(commitId),
    queryFn: () => getThemeHistoryDetail({commitId}),
    refetchOnWindowFocus: false,
  });
};

const useDeleteThemeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteThemeParams) => deleteTheme(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.historyLists(),
        }),
      ]);
    },
  });
};

const useCreateThemeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateThemeParams) => createTheme(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.historyLists(),
        }),
      ]);
    },
  });
};

const useUpdateThemeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateThemeParams) => updateTheme(params),
    onSuccess: async (_data, {themeId}) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.historyLists(),
        }),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.detail(themeId),
          refetchType: 'none',
        }),
      ]);
    },
  });
};

const useRestoreThemeHistoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: RestoreThemeHistoryParams) =>
      restoreThemeHistory(params),
    onSuccess: async (_data, {commitId}) => {
      await Promise.all([
        queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()}),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.historyLists(),
        }),
        queryClient.invalidateQueries({
          queryKey: themeQueryKeys.historyDetail(commitId),
        }),
      ]);
    },
  });
};

export {
  themeQueryKeys,
  useCreateThemeMutation,
  useDeleteThemeMutation,
  useRestoreThemeHistoryMutation,
  useThemeDetailQuery,
  useThemeHistoryDetailQuery,
  useThemeHistoryListQuery,
  useThemeListQuery,
  useUpdateThemeMutation,
};
