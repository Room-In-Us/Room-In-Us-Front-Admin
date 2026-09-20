import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS} from '@/src/shared/api';
import {normalizeApiError} from '@/src/shared/api/api-error';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

type ThemeDetailRouteContext = {
  params: Promise<{
    themeId: string;
  }>;
};

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

const isPositiveInteger = (value: string) => {
  const numericValue = Number(value);

  return Number.isInteger(numericValue) && numericValue > 0;
};

export async function DELETE(
  request: NextRequest,
  {params}: ThemeDetailRouteContext
) {
  const {themeId} = await params;

  if (!isPositiveInteger(themeId)) {
    return NextResponse.json(
      {
        code: 'INVALID_THEME_ID',
        message: '올바른 테마 ID가 아닙니다.',
      },
      {
        status: 400,
      }
    );
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
    return createApiErrorResponse(error);
  }
}
