import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import {API_ENDPOINTS} from './api-endpoints';
import {normalizeApiError} from './api-error';

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const REQUEST_TIMEOUT_MS = 10_000;
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
    .post(API_ENDPOINTS.auth.accessToken)
    .then(() => undefined)
    .finally(() => {
      refreshAccessTokenPromise = undefined;
    });

  return refreshAccessTokenPromise;
};

const isRefreshRequest = (config: InternalAxiosRequestConfig | undefined) => {
  return config?.url === API_ENDPOINTS.auth.accessToken;
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
        } catch (refreshError) {
          redirectToLogin();

          throw normalizeApiError(refreshError);
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
