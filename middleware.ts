import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware: set cookie `lang` sedini mungkin agar SSR memakai bahasa yang benar
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();

  // 1) URL override ?lang=id|en
  const urlLang = url.searchParams.get('lang');
  if (urlLang === 'en' || urlLang === 'id') {
    res.cookies.set('lang', urlLang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // 2) Existing cookie
  const cookieLang = req.cookies.get('lang')?.value;
  if (cookieLang === 'en' || cookieLang === 'id') {
    return res;
  }

  // 3) Accept-Language header heuristic
  const accept = (req.headers.get('accept-language') || '').toLowerCase();
  // Simple parse: jika mulai dengan id → id, selain itu → en
  const detected = accept.startsWith('id') ? 'id' : 'en';
  res.cookies.set('lang', detected, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/', '/:path*'],
};
