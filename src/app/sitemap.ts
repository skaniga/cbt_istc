import type { MetadataRoute } from 'next'

const SITE_URL = 'https://istcompetition.my'
const LOCALES = ['id', 'en', 'ms'] as const

/**
 * Sitemap otomatis — Next.js App Router
 * Hanya halaman PUBLIK yang dimasukkan.
 * Halaman /peserta, /admin, /login TIDAK dimasukkan (private).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ─── Halaman publik per bahasa ────────────────────────────────
  const publicRoutes = [
    {
      path: '',           // Beranda: /id, /en, /ms
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/daftar',    // Halaman registrasi
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/arsip',     // Arsip event tahun lalu
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
  ]

  const entries: MetadataRoute.Sitemap = []

  // Buat entry untuk setiap kombinasi locale × route
  for (const locale of LOCALES) {
    for (const route of publicRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        // hreflang alternates — Google menggunakan ini untuk multi-bahasa
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${SITE_URL}/${l}${route.path}`])
          ),
        },
      })
    }
  }

  return entries
}
