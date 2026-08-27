import {NextResponse} from 'next/server';

import {clearAuthCookies} from '../_lib/auth-route';

export async function POST() {
  await clearAuthCookies();

  return new NextResponse(null, {status: 204});
}
