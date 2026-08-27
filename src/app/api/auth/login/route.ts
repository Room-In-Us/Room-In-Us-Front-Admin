import {NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';

import {createApiErrorResponse, setAuthCookies} from '../_lib/auth-route';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminApiTypes.PostLoginRequest;
    const serverApi = await createServerApi({includeAccessToken: false});
    const {data} = await serverApi.post<AdminApiTypes.PostLoginResponse>(
      API_ENDPOINTS.auth.login,
      body
    );

    await setAuthCookies(data);

    return NextResponse.json({
      adminId: data.adminId,
    });
  } catch (error) {
    return createApiErrorResponse(error);
  }
}
