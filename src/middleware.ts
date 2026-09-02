import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'id', 'ms']
// International competition — default ke EN jika bahasa tidak dikenali
const defaultLocale = 'en'

/**
 * Deteksi locale terbaik dari:
 * 1. Cookie `NEXT_LOCALE` (pilihan user sebelumnya)
 * 2. Accept-Language header browser
 * 3. Fallback ke defaultLocale ('en')
 */
function detectLocale(request: NextRequest): string {
  // 1. Cek cookie preferensi user
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Parse Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  
  // Format: "en-US,en;q=0.9,id;q=0.8,ms;q=0.7"
  const preferred = acceptLang
    .split(',')
    .map(part => {
      const [lang, q] = part.trim().split(';q=')
      return {
        lang: lang.trim().toLowerCase(),
        q: q ? parseFloat(q) : 1.0,
      }
    })
    .sort((a, b) => b.q - a.q)

  for (const { lang } of preferred) {
    // Exact match: 'en', 'id', 'ms'
    if (locales.includes(lang)) return lang
    // Prefix match: 'en-US' → 'en', 'ms-MY' → 'ms', 'id-ID' → 'id'
    const prefix = lang.split('-')[0]
    if (locales.includes(prefix)) return prefix
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip api, _next, admin, certificate verifier, static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/certificate') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Cek apakah pathname sudah ada locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect ke locale yang terdeteksi
  const locale = detectLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
