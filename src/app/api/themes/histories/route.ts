import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';
import {
  HISTORY_DEFAULT_PAGE,
  HISTORY_DEFAULT_PAGE_SIZE,
  getDateParam,
  getPositiveIntegerParam,
  getSnapshotTypeParam,
} from '@/src/shared/lib/history-query-params';

import {createThemeApiErrorResponse} from '../_lib/theme-route-error';

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
            page: getPositiveIntegerParam(
              searchParams,
              'page',
              HISTORY_DEFAULT_PAGE
            ),
            size: getPositiveIntegerParam(
              searchParams,
              'size',
              HISTORY_DEFAULT_PAGE_SIZE
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
