import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  createTheme,
  deleteTheme,
  getThemeDetail,
  getThemeList,
  updateTheme,
  type CreateThemeParams,
  type DeleteThemeParams,
  type GetThemeDetailParams,
  type GetThemeListParams,
  type ThemeListResult,
  type UpdateThemeParams,
} from './theme-api';

const themeQueryKeys = {
  all: ['themes'] as const,
  detail: (themeId: GetThemeDetailParams['themeId']) =>
    [...themeQueryKeys.all, 'detail', themeId] as const,
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

const useDeleteThemeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteThemeParams) => deleteTheme(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()});
    },
  });
};

const useCreateThemeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateThemeParams) => createTheme(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: themeQueryKeys.lists()});
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
          queryKey: themeQueryKeys.detail(themeId),
          refetchType: 'none',
        }),
      ]);
    },
  });
};

export {
  themeQueryKeys,
  useCreateThemeMutation,
  useDeleteThemeMutation,
  useThemeDetailQuery,
  useThemeListQuery,
  useUpdateThemeMutation,
};
