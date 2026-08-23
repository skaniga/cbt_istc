import { createClient } from '@/lib/supabase/server'
import { AnnualEvent, SystemConfig, toConfigMap } from '@/lib/types'
import LandingContent from '@/components/LandingContent'

// Revalidate setiap 1 jam
export const revalidate = 3600

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
