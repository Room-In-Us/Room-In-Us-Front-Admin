import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {normalizeApiError} from '@/src/shared/api/api-error';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {
  HISTORY_DEFAULT_PAGE,
  HISTORY_DEFAULT_PAGE_SIZE,
  getDateParam,
  getPositiveIntegerParam,
  getSnapshotTypeParam,
} from '@/src/shared/lib/history-query-params';

const createApiErrorResponse = (error: unknown) => {
  console.error('Store API request failed', error);

  const upstreamStatus = normalizeApiError(error).status;

  const status =
    typeof upstreamStatus === 'number' &&
    Number.isInteger(upstreamStatus) &&
    upstreamStatus >= 400 &&
    upstreamStatus <= 599
      ? upstreamStatus
      : 500;

  return NextResponse.json(
    {
      code: 'STORE_API_ERROR',
      message: '매장 요청을 처리하지 못했습니다.',
    },
    {status}
  );
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});

    const {data} =
      await serverApi.get<AdminApiTypes.PageResponseGetStoreHistoryListResponse>(
        API_ENDPOINTS.stores.histories,
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
    return createApiErrorResponse(error);
  }
}
