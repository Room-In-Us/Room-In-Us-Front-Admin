import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  deleteTheme,
  getThemeList,
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
    placeholderData: (previousData) => previousData,
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

export {themeQueryKeys, useDeleteThemeMutation, useThemeListQuery};
