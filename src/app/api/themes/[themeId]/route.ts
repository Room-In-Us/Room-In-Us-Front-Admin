import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {parsePatchThemeRequest} from '../_lib/theme-request';
import {
  createInvalidThemeRequestResponse,
  createThemeApiErrorResponse,
} from '../_lib/theme-route-error';

type ThemeDetailRouteContext = {
  params: Promise<{
    themeId: string;
  }>;
};

const isPositiveInteger = (value: string) => {
  const numericValue = Number(value);

  return Number.isInteger(numericValue) && numericValue > 0;
};

const createInvalidThemeIdResponse = () =>
  NextResponse.json(
    {code: 'INVALID_THEME_ID', message: '올바른 테마 ID가 아닙니다.'},
    {status: 400}
  );

export async function GET(
  request: NextRequest,
  {params}: ThemeDetailRouteContext
) {
  const {themeId} = await params;
  if (!isPositiveInteger(themeId)) return createInvalidThemeIdResponse();

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
  try {
    const serverApi = await createServerApi({accessToken});
    const {data} = await serverApi.get<AdminApiTypes.GetThemeDetailResponse>(
      API_ENDPOINTS.themes.detail(themeId),
      {maxRedirects: 0}
    );
    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  {params}: ThemeDetailRouteContext
) {
  const {themeId} = await params;
  if (!isPositiveInteger(themeId)) return createInvalidThemeIdResponse();

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;
  const body = parsePatchThemeRequest(await request.json().catch(() => null));
  if (!body) return createInvalidThemeRequestResponse();

  try {
    const serverApi = await createServerApi({accessToken});
    const {data, status} = await serverApi.patch(
      API_ENDPOINTS.themes.detail(themeId),
      body,
      {maxRedirects: 0}
    );
    if (status === 204 || data === undefined || data === '') {
      return new NextResponse(null, {status: 204});
    }
    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  {params}: ThemeDetailRouteContext
) {
  const {themeId} = await params;

  if (!isPositiveInteger(themeId)) {
    return createInvalidThemeIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data, status} = await serverApi.delete(
      API_ENDPOINTS.themes.detail(themeId),
      {
        maxRedirects: 0,
      }
    );

    if (status === 204 || data === undefined || data === '') {
      return new NextResponse(null, {status: 204});
    }

    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}
