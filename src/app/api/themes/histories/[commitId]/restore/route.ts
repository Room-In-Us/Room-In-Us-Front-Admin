import {NextRequest, NextResponse} from 'next/server';

import {API_ENDPOINTS} from '@/src/shared/api';
import {createServerApi} from '@/src/shared/api/server-client';
import {AUTH_COOKIE_NAMES} from '@/src/shared/auth';

import {createThemeApiErrorResponse} from '../../../_lib/theme-route-error';

type ThemeHistoryRestoreRouteContext = {
  params: Promise<{
    commitId: string;
  }>;
};

const createInvalidCommitIdResponse = () =>
  NextResponse.json(
    {code: 'INVALID_COMMIT_ID', message: '올바른 히스토리 ID가 아닙니다.'},
    {status: 400}
  );

export async function PATCH(
  request: NextRequest,
  {params}: ThemeHistoryRestoreRouteContext
) {
  const {commitId} = await params;

  if (!commitId.trim()) {
    return createInvalidCommitIdResponse();
  }

  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  try {
    const serverApi = await createServerApi({accessToken});
    const {data, status} = await serverApi.patch(
      API_ENDPOINTS.themes.restoreHistory(commitId),
      undefined,
      {maxRedirects: 0}
    );

    if (status === 204 || data === undefined || data === '') {
      return new NextResponse(null, {status: 204});
    }

    return NextResponse.json(data);
  } catch (error) {
    return createThemeApiErrorResponse(error);
  }
}
