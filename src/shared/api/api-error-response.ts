import 'server-only';

import {NextResponse} from 'next/server';

import {normalizeApiError} from './api-error';

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
