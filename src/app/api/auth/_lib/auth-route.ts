import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

import {ApiError, normalizeApiError} from '@/src/shared/api/api-error';
import {AUTH_COOKIE_NAMES, AUTH_COOKIE_PATHS} from '@/src/shared/auth';

interface AuthTokenPair {
  accessToken?: string;
  refreshToken?: string;
}

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
} as const;

const getCookieStore = () => {
  return cookies();
};

const createMissingTokenError = () => {
  return new ApiError({
    message: '인증 토큰 응답이 올바르지 않습니다.',
    status: 502,
    type: 'server',
  });
};

export const setAuthCookies = async ({
  accessToken,
  refreshToken,
}: AuthTokenPair) => {
  if (!accessToken || !refreshToken) {
    throw createMissingTokenError();
  }

  const cookieStore = await getCookieStore();

  cookieStore.set(AUTH_COOKIE_NAMES.accessToken, accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    path: AUTH_COOKIE_PATHS.accessToken,
  });
  cookieStore.set(AUTH_COOKIE_NAMES.refreshToken, refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    path: AUTH_COOKIE_PATHS.refreshToken,
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await getCookieStore();

  cookieStore.set(AUTH_COOKIE_NAMES.accessToken, '', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
    path: AUTH_COOKIE_PATHS.accessToken,
  });
  cookieStore.set(AUTH_COOKIE_NAMES.refreshToken, '', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
    path: AUTH_COOKIE_PATHS.refreshToken,
  });
};

export const getRefreshToken = async () => {
  return (await getCookieStore()).get(AUTH_COOKIE_NAMES.refreshToken)?.value;
};

export const createApiErrorResponse = (error: unknown) => {
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
