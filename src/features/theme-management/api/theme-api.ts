import {
  API_ENDPOINTS,
  buildApiPath,
  getBrowserApi,
  type AdminApiTypes,
} from '@/src/shared/api';

import type {Theme, ThemeStatus} from '../model/theme';

type GetThemeListParams = {
  keyword?: string;
  page: number;
  size: number;
};

type ThemeListResult = {
  themes: Theme[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
};

type DeleteThemeParams = {
  themeId: Theme['id'];
};

type ApiThemeStatus = NonNullable<
  AdminApiTypes.GetThemeListResponse['themeStatus']
>;
type ApiThemeGenre = NonNullable<
  AdminApiTypes.GetThemeListResponse['detailedGenreList']
>[number];

const themeStatusMap = {
  OPEN_SOON: 'upcoming',
  NEW_OPEN: 'new',
  NORMAL: 'operating',
  RENEWAL: 'renovation',
  CLOSING_SOON: 'closing',
  CLOSED: 'closed',
} satisfies Record<ApiThemeStatus, ThemeStatus>;

const themeGenreLabelMap = {
  ACTION: '액션',
  ADULT: '성인',
  ADVENTURE: '어드벤처',
  ARCADE: '아케이드',
  COMIC: '코믹',
  DETECTIVE: '추리',
  DRAMA: '드라마',
  ESCAPE: '탈출',
  ETC: '기타',
  FAIRY_TALE: '동화',
  FANTASY: '판타지',
  HISTORY: '역사',
  HORROR: '호러',
  MYSTERY: '미스터리',
  OUTDOOR: '야외',
  PROBLEM: '문제',
  ROMANCE: '로맨스',
  SENTIMENTAL: '서정',
  SF: 'SF',
  SURVIVAL: '생존',
  THRILLER: '스릴러',
} satisfies Record<ApiThemeGenre, string>;

const mapApiThemeStatus = (
  status: AdminApiTypes.GetThemeListResponse['themeStatus']
): ThemeStatus => {
  return status ? themeStatusMap[status] : 'operating';
};

const mapApiThemeGenres = (
  genres: AdminApiTypes.GetThemeListResponse['detailedGenreList']
) => {
  return Array.from(
    new Set(genres?.map((genre) => themeGenreLabelMap[genre]) ?? [])
  );
};

const mapApiTheme = (
  theme: AdminApiTypes.GetThemeListResponse,
  index: number
): Theme => {
  return {
    id: theme.id ?? index + 1,
    storeId: theme.storeId ?? 0,
    storeName: theme.storeName ?? '',
    name: theme.name ?? '',
    status: mapApiThemeStatus(theme.themeStatus),
    difficulty: theme.level ?? 0,
    playTimeMinutes: theme.playTime ?? 0,
    genres: mapApiThemeGenres(theme.detailedGenreList),
    imageUrl: theme.img,
  };
};

const sortThemesById = (themes: Theme[]) => {
  return [...themes].sort((firstTheme, secondTheme) => {
    return firstTheme.id - secondTheme.id;
  });
};

export const getThemeList = async ({
  keyword,
  page,
  size,
}: GetThemeListParams): Promise<ThemeListResult> => {
  const {data} =
    await getBrowserApi().get<AdminApiTypes.PageResponseGetThemeListResponse>(
      buildApiPath(API_ENDPOINTS.themes.root, {
        keyword: keyword?.trim() || undefined,
        page,
        size,
      })
    );

  return {
    themes: sortThemesById(data.contents?.map(mapApiTheme) ?? []),
    page: data.page ?? page,
    size: data.size ?? size,
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    hasNextPage: data.hasNextPage ?? false,
  };
};

export const deleteTheme = async ({
  themeId,
}: DeleteThemeParams): Promise<void> => {
  await getBrowserApi().delete(API_ENDPOINTS.themes.detail(themeId));
};

export type {DeleteThemeParams, GetThemeListParams, ThemeListResult};
