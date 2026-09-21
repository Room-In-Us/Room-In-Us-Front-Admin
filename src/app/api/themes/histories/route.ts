import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {createThemeApiErrorResponse} from '../_lib/theme-route-error';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const snapshotTypes = new Set(['INITIAL', 'UPDATE', 'TERMINAL']);

const getPositiveIntegerParam = (
  searchParams: URLSearchParams,
  name: string,
  fallback: number
) => {
  const value = Number(searchParams.get(name));

  return Number.isInteger(value) && value > 0 ? value : fallback;
};

const getDateParam = (searchParams: URLSearchParams, name: string) => {
  const value = searchParams.get(name)?.trim();

  return value || undefined;
};

const getSnapshotTypeParam = (searchParams: URLSearchParams) => {
  const value = searchParams.get('snapshotType')?.trim();

  return value && snapshotTypes.has(value) ? value : undefined;
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data} =
      await serverApi.get<AdminApiTypes.PageResponseGetThemeHistoryListResponse>(
        API_ENDPOINTS.themes.histories,
        {
          maxRedirects: 0,
          params: {
            endDate: getDateParam(searchParams, 'endDate'),
            page: getPositiveIntegerParam(searchParams, 'page', DEFAULT_PAGE),
            size: getPositiveIntegerParam(
              searchParams,
              'size',
              DEFAULT_PAGE_SIZE
            ),
            snapshotType: getSnapshotTypeParam(searchParams),
            startDate: getDateParam(searchParams, 'startDate'),
          },
        }
      );

    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}
