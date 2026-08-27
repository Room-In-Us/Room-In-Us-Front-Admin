import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import {normalizeApiError} from './api-error';

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const REQUEST_TIMEOUT_MS = 10_000;
const AUTH_ACCESS_TOKEN_PATH = '/auth/access-token';
const LOGIN_PATH = '/login';

let browserApi: AxiosInstance | undefined;
let refreshAccessTokenPromise: Promise<void> | undefined;

const redirectToLogin = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.location.assign(LOGIN_PATH);
};

const refreshAccessToken = (api: AxiosInstance) => {
  refreshAccessTokenPromise ??= api
    .post(AUTH_ACCESS_TOKEN_PATH)
    .then(() => undefined)
    .finally(() => {
      refreshAccessTokenPromise = undefined;
    });

  return refreshAccessTokenPromise;
};

const isRefreshRequest = (config: InternalAxiosRequestConfig | undefined) => {
  return config?.url === AUTH_ACCESS_TOKEN_PATH;
};

export const createBrowserApi = () => {
  const api = axios.create({
    baseURL: '/api',
    timeout: REQUEST_TIMEOUT_MS,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json';

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as
        | RetryableAxiosRequestConfig
        | undefined;

      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isRefreshRequest(originalRequest)
      ) {
        originalRequest._retry = true;

        try {
          await refreshAccessToken(api);

          return api.request(originalRequest);
        } catch {
          redirectToLogin();
        }
      }

      throw normalizeApiError(error);
    }
  );

  return api;
};

export const getBrowserApi = () => {
  browserApi ??= createBrowserApi();

  return browserApi;
};
