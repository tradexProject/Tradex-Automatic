import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  if (url.pathname === '/Secure-Entry') {
    const adminKey = url.searchParams.get('access');
    const secretKey = process.env.ADMIN_ACCESS_KEY;

    if (!secretKey || adminKey !== secretKey) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/Secure-Entry',
};
