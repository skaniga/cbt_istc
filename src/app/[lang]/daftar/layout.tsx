import type { Metadata } from 'next'

const SITE_URL = 'https://istcompetition.my'

// noindex untuk /daftar — biarkan Google tidak mengindex form registrasi
// (opsional — bisa diindex jika ingin muncul di search)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  return {
    title: lang === 'en' ? 'Register — ISTC 2025'
      : lang === 'ms' ? 'Daftar — ISTC 2025'
      : 'Daftar Peserta — ISTC 2025',
    description: lang === 'en'
      ? 'Register for International Science and Technology Competitions 2025. Join the online CBT exam in Math, Science, Robotics & Technology.'
      : 'Daftar sebagai peserta International Science and Technology Competitions 2025. Ikuti ujian CBT daring dan dapatkan sertifikat digital.',
    alternates: {
      canonical: `${SITE_URL}/${lang}/daftar`,
      languages: {
        'id': `${SITE_URL}/id/daftar`,
        'en': `${SITE_URL}/en/daftar`,
        'ms': `${SITE_URL}/ms/daftar`,
      },
    },
  }
}

export default function DaftarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
