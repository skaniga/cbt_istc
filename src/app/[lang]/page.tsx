import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { AnnualEvent, SystemConfig, toConfigMap } from '@/lib/types'
import LandingContent from '@/components/LandingContent'

// Revalidate setiap 1 jam
export const revalidate = 3600

const SITE_URL = 'https://istcompetition.my'

// ─── Metadata per bahasa (hreflang + canonical per locale) ──────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  const titles: Record<string, string> = {
    id: 'International Science and Technology Competitions 2025 — Beranda',
    en: 'International Science and Technology Competitions 2025 — Home',
    ms: 'International Science and Technology Competitions 2025 — Laman Utama',
  }

  const descriptions: Record<string, string> = {
    id: 'Platform CBT resmi ISTC 2025. Daftar, ikuti ujian daring Matematika, IPA, Robotic & Technology. Dapatkan sertifikat digital internasional.',
    en: 'Official CBT platform for ISTC 2025. Register, take online exams in Math, Science, Robotics & Technology. Get your digital certificate.',
    ms: 'Platform CBT rasmi ISTC 2025. Daftar, ikuti peperiksaan dalam talian Matematik, Sains, Robotik & Teknologi. Dapatkan sijil digital.',
  }

  const locale = lang === 'en' ? 'en_US' : lang === 'ms' ? 'ms_MY' : 'id_ID'

  return {
    title: titles[lang] ?? titles['id'],
    description: descriptions[lang] ?? descriptions['id'],

    // Canonical untuk halaman ini spesifik per bahasa
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        'id': `${SITE_URL}/id`,
        'en': `${SITE_URL}/en`,
        'ms': `${SITE_URL}/ms`,
        'x-default': `${SITE_URL}/id`,
      },
    },

    openGraph: {
      title: titles[lang] ?? titles['id'],
      description: descriptions[lang] ?? descriptions['id'],
      url: `${SITE_URL}/${lang}`,
      locale: locale,
      alternateLocale: ['id_ID', 'en_US', 'ms_MY'].filter(l => l !== locale),
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'International Science and Technology Competitions 2025',
        },
      ],
    },
  }
}

async function getPageData() {
  const supabase = await createClient()

  const [configRes, eventsRes] = await Promise.all([
    supabase.from('system_config').select('*'),
    supabase
      .from('annual_events')
      .select('id, tahun, tema, deskripsi, jumlah_peserta, flyer_url, status')
      .eq('status', 'selesai')
      .order('tahun', { ascending: false })
      .limit(3),
  ])

  const config = toConfigMap((configRes.data as SystemConfig[]) ?? [])
  const events = (eventsRes.data as AnnualEvent[]) ?? []

  return { config, events }
}

export default async function HomePage() {
  const { config, events } = await getPageData()

  return (
    <LandingContent config={config} events={events} />
  )
}
