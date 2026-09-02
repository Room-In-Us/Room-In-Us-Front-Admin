import 'server-only';

const trimEnvValue = (value: string | undefined) => value?.trim();

export const getServerEnv = () => {
  return {
    adminApiBaseUrl: trimEnvValue(process.env.ADMIN_API_BASE_URL)?.replace(
      /\/+$/,
      ''
    ),
  };
};
