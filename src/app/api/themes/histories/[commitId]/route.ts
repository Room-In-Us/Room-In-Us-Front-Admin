import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS, type AdminApiTypes} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {createThemeApiErrorResponse} from '../../_lib/theme-route-error';

type ThemeHistoryRouteContext = {
  params: Promise<{
    commitId: string;
  }>;
};

const createInvalidCommitIdResponse = () =>
  NextResponse.json(
    {code: 'INVALID_COMMIT_ID', message: '올바른 히스토리 ID가 아닙니다.'},
    {status: 400}
  );

export async function GET(
  request: NextRequest,
  {params}: ThemeHistoryRouteContext
) {
  const {commitId} = await params;

  if (!commitId.trim()) {
    return createInvalidCommitIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data} =
      await serverApi.get<AdminApiTypes.GetThemeHistoryDetailResponse>(
        API_ENDPOINTS.themes.historyDetail(commitId),
        {maxRedirects: 0}
      );

    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}
