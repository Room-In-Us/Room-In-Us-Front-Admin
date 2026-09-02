export const AUTH_COOKIE_NAMES = {
  accessToken: 'roominus_admin_access_token',
  refreshToken: 'roominus_admin_refresh_token',
} as const;

export const AUTH_COOKIE_PATHS = {
  accessToken: '/',
  refreshToken: '/api/auth/access-token',
} as const;
