import {AxiosError, isAxiosError} from 'axios';

import type {AdminApiTypes} from './index';

export type ApiErrorCategoryTypes =
  | 'auth'
  | 'configuration'
  | 'network'
  | 'server'
  | 'unknown'
  | 'validation';

interface ApiErrorOptions {
  cause?: unknown;
  code?: number | string;
  details?: unknown;
  message: string;
  status?: number;
  type: ApiErrorCategoryTypes;
}

export class ApiError extends Error {
  code?: number | string;
  details?: unknown;
  status?: number;
  type: ApiErrorCategoryTypes;

  constructor({cause, code, details, message, status, type}: ApiErrorOptions) {
    super(message, {cause});
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.status = status;
    this.type = type;
  }
}

const DEFAULT_API_ERROR_MESSAGE = 'API 요청을 처리하지 못했습니다.';

const getErrorType = (status: number): ApiErrorCategoryTypes => {
  if (status === 401 || status === 403) {
    return 'auth';
  }

  if (status >= 400 && status < 500) {
    return 'validation';
  }

  return 'server';
};

const isErrorResponse = (
  value: unknown,
): value is AdminApiTypes.ErrorResponse => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const createApiConfigurationError = (message: string) => {
  return new ApiError({
    message,
    type: 'configuration',
  });
};

export const normalizeApiError = (error: unknown) => {
  if (isApiError(error)) {
    return error;
  }

  if (isAxiosError(error)) {
    return normalizeAxiosError(error);
  }

  return new ApiError({
    cause: error,
    message: '알 수 없는 오류가 발생했습니다.',
    type: 'unknown',
  });
};

const normalizeAxiosError = (error: AxiosError) => {
  const status = error.response?.status;
  const responseBody = error.response?.data;
  const errorResponse = isErrorResponse(responseBody) ? responseBody : undefined;

  if (status) {
    return new ApiError({
      cause: error,
      code: errorResponse?.code,
      details: responseBody,
      message:
        errorResponse?.message ?? error.message ?? DEFAULT_API_ERROR_MESSAGE,
      status,
      type: getErrorType(status),
    });
  }

  return new ApiError({
    cause: error,
    message: error.message || DEFAULT_API_ERROR_MESSAGE,
    type: 'network',
  });
};
