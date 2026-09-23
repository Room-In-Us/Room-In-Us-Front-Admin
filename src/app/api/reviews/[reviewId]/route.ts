import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {normalizeApiError} from '@/src/shared/api/api-error';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

type ReviewDetailRouteContext = {
  params: Promise<{
    reviewId: string;
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

const createInvalidReviewIdResponse = () => {
  return NextResponse.json(
    {
      code: 'INVALID_REVIEW_ID',
      message: '올바른 후기 ID가 아닙니다.',
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
  {params}: ReviewDetailRouteContext
) {
  const {reviewId} = await params;

  if (!isPositiveInteger(reviewId)) {
    return createInvalidReviewIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});

    const {data} =
      await serverApi.get<AdminApiTypes.GetThemeReviewDetailResponse>(
        API_ENDPOINTS.reviews.detail(reviewId),
        {
          maxRedirects: 0,
        }
      );

    return NextResponse.json(data);
  } catch (error) {
    return createApiErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  {params}: ReviewDetailRouteContext
) {
  const {reviewId} = await params;

  if (!isPositiveInteger(reviewId)) {
    return createInvalidReviewIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});

    const {data, status} = await serverApi.delete(
      API_ENDPOINTS.reviews.detail(reviewId),
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
