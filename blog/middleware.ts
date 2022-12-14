// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // console.log('-------------------', request);
  // console.log('-------------------', request.nextUrl);
  // console.log('+++++++++++++++++++', request.url);
  // return NextResponse.redirect(new URL('/404', request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/:path*',
};
