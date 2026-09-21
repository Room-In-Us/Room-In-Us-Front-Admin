import {NextResponse} from 'next/server';

import {normalizeApiError} from '@/src/shared/api/api-error';

export function createInvalidThemeRequestResponse() {
  return NextResponse.json(
    {
      code: 'INVALID_THEME_REQUEST',
      message: '테마 요청 형식이 올바르지 않습니다.',
    },
    {status: 400}
  );
}

export function createThemeApiErrorResponse(error: unknown) {
  console.error('Theme API request failed', error);
  const upstreamStatus = normalizeApiError(error).status;
  const status =
    upstreamStatus && upstreamStatus >= 400 && upstreamStatus <= 599
      ? upstreamStatus
      : 500;

  return NextResponse.json(
    {code: 'THEME_API_ERROR', message: '테마 요청을 처리하지 못했습니다.'},
    {status}
  );
}
