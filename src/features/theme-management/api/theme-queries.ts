import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  createTheme,
  deleteTheme,
  getThemeList,
  type CreateThemeParams,
  type DeleteThemeParams,
  type GetThemeListParams,
  type ThemeListResult,
} from './theme-api';

const themeQueryKeys = {
  all: ['themes'] as const,
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

export {
  themeQueryKeys,
  useCreateThemeMutation,
  useDeleteThemeMutation,
  useThemeListQuery,
};
