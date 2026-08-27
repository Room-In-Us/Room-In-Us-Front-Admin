import {NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {ApiError} from '@/src/shared/api/api-error';
import {createServerApi} from '@/src/shared/api/server-client';

import {
  createApiErrorResponse,
  getRefreshToken,
  setAuthCookies,
} from '../_lib/auth-route';

const createMissingRefreshTokenError = () => {
  return new ApiError({
    message: '리프레시 토큰이 없습니다.',
    status: 401,
    type: 'auth',
  });
};

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw createMissingRefreshTokenError();
    }

    const serverApi = await createServerApi({accessToken: refreshToken});
    const {data} = await serverApi.get<AdminApiTypes.GetAccessTokenResponse>(
      API_ENDPOINTS.auth.accessToken,
      {maxRedirects: 0}
    );

    await setAuthCookies(data);

    return new NextResponse(null, {status: 204});
  } catch (error) {
    return createApiErrorResponse(error);
  }
}
