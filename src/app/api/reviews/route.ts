import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';
import {createApiErrorResponse} from '@/src/shared/api/api-error-response';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

const reviewSearchTypes = ['REPORTED', 'DELETED'] as const;

type ReviewSearchType = (typeof reviewSearchTypes)[number];

const getPositiveIntegerParam = (
  searchParams: URLSearchParams,
  name: string,
  fallback: number
) => {
  const value = Number(searchParams.get(name));

  return Number.isInteger(value) && value > 0 ? value : fallback;
};

const getSearchTypeParam = (
  searchParams: URLSearchParams
): ReviewSearchType | undefined => {
  const value = searchParams.get('searchType')?.trim();

  if (!value) {
    return undefined;
  }

  return reviewSearchTypes.includes(value as ReviewSearchType)
    ? (value as ReviewSearchType)
    : undefined;
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);

  const page = getPositiveIntegerParam(searchParams, 'page', DEFAULT_PAGE);

  const size = Math.min(
    getPositiveIntegerParam(searchParams, 'size', DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE
  );

  const searchType = getSearchTypeParam(searchParams);

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});

    const {data} =
      await serverApi.get<AdminApiTypes.PageResponseGetThemeReviewListResponse>(
        API_ENDPOINTS.reviews.root,
        {
          maxRedirects: 0,
          params: {
            page,
            size,
            ...(searchType ? {searchType} : {}),
          },
        }
      );

    return NextResponse.json(data);
  } catch (error) {
    return createApiErrorResponse(error);
  }
}
