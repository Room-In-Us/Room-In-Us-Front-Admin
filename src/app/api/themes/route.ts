import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {parsePostThemeRequest} from './_lib/theme-request';
import {
  createInvalidThemeRequestResponse,
  createThemeApiErrorResponse,
} from './_lib/theme-route-error';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

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
      await serverApi.get<AdminApiTypes.PageResponseGetThemeListResponse>(
        API_ENDPOINTS.themes.root,
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
    return createThemeApiErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
  const body = parsePostThemeRequest(await request.json().catch(() => null));
  if (!body) return createInvalidThemeRequestResponse();

  try {
    const serverApi = await createServerApi({accessToken});
    const {data} = await serverApi.post<AdminApiTypes.PostThemeResponse>(
      API_ENDPOINTS.themes.root,
      body,
      {
        maxRedirects: 0,
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}
