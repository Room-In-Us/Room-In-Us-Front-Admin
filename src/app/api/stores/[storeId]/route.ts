import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';
import {createApiErrorResponse} from '@/src/shared/api/api-error-response';

type StoreDetailRouteContext = {
  params: Promise<{
    storeId: string;
  }>;
};

const createInvalidStoreIdResponse = () => {
  return NextResponse.json(
    {
      code: 'INVALID_STORE_ID',
      message: '올바른 매장 ID가 아닙니다.',
    },
    {
      status: 400,
    }
  );
};

const isPositiveInteger = (value: string) => {
  return /^[1-9]\d*$/.test(value);
};

export async function GET(
  request: NextRequest,
  {params}: StoreDetailRouteContext
) {
  const {storeId} = await params;

  if (!isPositiveInteger(storeId)) {
    return createInvalidStoreIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data} = await serverApi.get<AdminApiTypes.GetStoreInfoResponse>(
      API_ENDPOINTS.stores.detail(storeId),
      {
        maxRedirects: 0,
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return createApiErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  {params}: StoreDetailRouteContext
) {
  const {storeId} = await params;

  if (!isPositiveInteger(storeId)) {
    return createInvalidStoreIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const body = (await request.json()) as AdminApiTypes.PatchStoreRequest;
    const serverApi = await createServerApi({accessToken});
    const {data, status} = await serverApi.patch(
      API_ENDPOINTS.stores.detail(storeId),
      body,
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

export async function DELETE(
  request: NextRequest,
  {params}: StoreDetailRouteContext
) {
  const {storeId} = await params;

  if (!isPositiveInteger(storeId)) {
    return createInvalidStoreIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data, status} = await serverApi.delete(
      API_ENDPOINTS.stores.detail(storeId),
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
