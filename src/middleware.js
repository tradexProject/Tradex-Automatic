import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  if (url.pathname === '/Secure-Entry') {
    const forwarded = request.headers.get('x-forwarded-for');
    const userIP = forwarded ? forwarded.split(',')[0] : request.ip;

    const allowedIps = process.env.ALLOWED_ADMIN_IPS?.split(',') || [];
    
    const adminKey = url.searchParams.get('access');
    const secretKey = process.env.ADMIN_ACCESS_KEY;

    const isIpAllowed = allowedIps.includes(userIP) || userIP === '::1' || userIP === '127.0.0.1';
    const isKeyCorrect = adminKey === secretKey;

    if (!isIpAllowed || !isKeyCorrect) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/Secure-Entry',
};