import {NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';

import {createApiErrorResponse, setAuthCookies} from '../_lib/auth-route';

const createBadRequestResponse = (message: string) => {
  return NextResponse.json({message}, {status: 400});
};

const isLoginRequest = (
  value: unknown
): value is AdminApiTypes.PostLoginRequest => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).id === 'string' &&
    typeof (value as Record<string, unknown>).password === 'string'
  );
};

const parseLoginRequest = async (request: Request) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return createBadRequestResponse('Malformed JSON request body.');
  }

  if (!isLoginRequest(body)) {
    return createBadRequestResponse('id and password must be strings.');
  }

  return body;
};

export async function POST(request: Request) {
  const body = await parseLoginRequest(request);

  if (body instanceof Response) {
    return body;
  }

  try {
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
