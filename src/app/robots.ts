import type { MetadataRoute } from 'next'

const SITE_URL = 'https://istcompetition.my'

/**
 * robots.txt otomatis via Next.js App Router
 * Accessible di: https://istcompetition.my/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Semua crawler — izinkan halaman publik
        userAgent: '*',
        allow: [
          '/',
          '/id',
          '/en',
          '/ms',
          '/id/daftar',
          '/en/daftar',
          '/ms/daftar',
          '/id/arsip',
          '/en/arsip',
          '/ms/arsip',
        ],
        // Blokir halaman private — tidak perlu diindex Google
        disallow: [
          '/id/peserta',
          '/en/peserta',
          '/ms/peserta',
          '/id/login',
          '/en/login',
          '/ms/login',
          '/admin',
          '/api',
        ],
      },
      {
        // GPTBot (OpenAI) — boleh crawl konten publik
        userAgent: 'GPTBot',
        allow: ['/', '/id', '/en', '/ms'],
        disallow: ['/admin', '/id/peserta', '/en/peserta', '/ms/peserta'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
