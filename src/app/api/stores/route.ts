import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {normalizeApiError} from '@/src/shared/api/api-error';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const createApiErrorResponse = (error: unknown) => {
  const apiError = normalizeApiError(error);

  return NextResponse.json(
    {
      code: apiError.code,
      message: apiError.message,
    },
    {
      status: apiError.status ?? 500,
    }
  );
};

const getPositiveIntegerParam = (
  searchParams: URLSearchParams,
  name: string,
  fallback: number
) => {
  const value = Number(searchParams.get(name));

  return Number.isInteger(value) && value > 0 ? value : fallback;
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const keyword = searchParams.get('keyword')?.trim();
  const page = getPositiveIntegerParam(searchParams, 'page', DEFAULT_PAGE);
  const size = getPositiveIntegerParam(searchParams, 'size', DEFAULT_PAGE_SIZE);
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data} =
      await serverApi.get<AdminApiTypes.PageResponseGetStoreListResponse>(
        API_ENDPOINTS.stores.root,
        {
          maxRedirects: 0,
          params: {
            ...(keyword ? {keyword} : {}),
            page,
            size,
          },
        }
      );

    return NextResponse.json(data);
  } catch (error) {
    return createApiErrorResponse(error);
  }
}
