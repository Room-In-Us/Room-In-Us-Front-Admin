export type ApiPathParamTypes = number | string;
export type ApiSearchParamPrimitiveTypes = boolean | number | string;
export type ApiSearchParamValueTypes =
  | ApiSearchParamPrimitiveTypes
  | null
  | undefined
  | readonly (ApiSearchParamPrimitiveTypes | null | undefined)[];
export type ApiSearchParamsTypes = Record<string, ApiSearchParamValueTypes>;

const encodePathParam = (value: ApiPathParamTypes) => {
  return encodeURIComponent(String(value));
};

export const buildApiPath = (
  pathname: string,
  searchParams?: ApiSearchParamsTypes
) => {
  if (!searchParams) {
    return pathname;
  }

  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];

    values.forEach((item) => {
      if (item === null || item === undefined) {
        return;
      }

      params.append(key, String(item));
    });
  });

  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

export const API_ENDPOINTS = {
  auth: {
    accessToken: '/auth/access-token',
    login: '/auth/login',
  },
  reviews: {
    detail: (reviewId: ApiPathParamTypes) =>
      `/reviews/${encodePathParam(reviewId)}`,
    root: '/reviews',
  },
  stores: {
    detail: (storeId: ApiPathParamTypes) =>
      `/stores/${encodePathParam(storeId)}`,
    histories: '/stores/histories',
    root: '/stores',
  },
  themes: {
    detail: (themeId: ApiPathParamTypes) =>
      `/themes/${encodePathParam(themeId)}`,
    histories: '/themes/histories',
    historyDetail: (commitId: ApiPathParamTypes) =>
      `/themes/histories/${encodePathParam(commitId)}`,
    restoreHistory: (commitId: ApiPathParamTypes) =>
      `/themes/histories/${encodePathParam(commitId)}/restore`,
    root: '/themes',
  },
} as const;
