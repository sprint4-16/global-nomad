import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('accessToken')?.value;
  const prev = request.nextUrl.host;
  if (request.nextUrl.pathname === '/auth/signin' || request.nextUrl.pathname === '/auth/signup') {
    if (cookie) {
      return NextResponse.redirect(prev);
    }
  }
}

export const config = {
  matcher: ['/auth/signin', '/auth/signup'],
};
