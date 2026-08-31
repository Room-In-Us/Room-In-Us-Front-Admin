import {
  API_ENDPOINTS,
  getBrowserApi,
  type AdminApiTypes,
} from '@/src/shared/api';

type LoginResult = Pick<AdminApiTypes.PostLoginResponse, 'adminId'>;

export const loginAdmin = async (
  credentials: AdminApiTypes.PostLoginRequest
) => {
  const {data} = await getBrowserApi().post<LoginResult>(
    API_ENDPOINTS.auth.login,
    credentials
  );

  return data;
};
