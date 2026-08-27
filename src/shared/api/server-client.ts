import 'server-only';

import axios, {type AxiosInstance} from 'axios';
import {cookies} from 'next/headers';

import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';
import {getServerEnv} from '@/src/shared/config/server-env';

import {createApiConfigurationError, normalizeApiError} from './api-error';

interface CreateServerApiOptions {
  accessToken?: string;
  includeAccessToken?: boolean;
}

const REQUEST_TIMEOUT_MS = 10_000;

const getHttpsAdminApiBaseUrl = (adminApiBaseUrl: string | undefined) => {
  if (!adminApiBaseUrl) {
    throw createApiConfigurationError('ADMIN_API_BASE_URL is not configured.');
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(adminApiBaseUrl);
  } catch {
    throw createApiConfigurationError(
      'ADMIN_API_BASE_URL must be an absolute https URL.'
    );
  }

  if (parsedUrl.protocol !== 'https:') {
    throw createApiConfigurationError(
      'ADMIN_API_BASE_URL must use the https scheme.'
    );
  }

  return parsedUrl.toString().replace(/\/+$/, '');
};

export const createServerApi = async ({
  accessToken,
  includeAccessToken = true,
}: CreateServerApiOptions = {}): Promise<AxiosInstance> => {
  const {adminApiBaseUrl} = getServerEnv();
  const resolvedAdminApiBaseUrl = getHttpsAdminApiBaseUrl(adminApiBaseUrl);

  const cookieAccessToken =
    includeAccessToken && !accessToken
      ? (await cookies()).get(AUTH_COOKIE_NAMES.accessToken)?.value
      : undefined;
  const resolvedAccessToken = accessToken ?? cookieAccessToken;
  const serverApi = axios.create({
    baseURL: resolvedAdminApiBaseUrl,
    timeout: REQUEST_TIMEOUT_MS,
  });

  serverApi.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json';

    if (includeAccessToken && resolvedAccessToken) {
      config.headers.Authorization = `Bearer ${resolvedAccessToken}`;
    }

    return config;
  });

  serverApi.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error))
  );

  return serverApi;
};
