import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ArsipClient from './ArsipClient'

export const revalidate = 0

export default async function ArsipPublikPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // Ambil data event
  const { data: events } = await supabase
    .from('annual_events')
    .select('*')
    .order('tahun', { ascending: false })
    
  // Ambil data juara (hanya 3 besar per tahun)
  const { data: winners } = await supabase
    .from('winners')
    .select('*')
    .lte('peringkat', 3)
    .order('tahun', { ascending: false })
    .order('peringkat', { ascending: true })

  // Kelompokkan juara per tahun
  const winnersByYear: Record<number, any[]> = {}
  if (winners) {
    winners.forEach(w => {
      if (!winnersByYear[w.tahun]) winnersByYear[w.tahun] = []
      winnersByYear[w.tahun].push(w)
    })
  }

  return (
    <ArsipClient events={events || []} winnersByYear={winnersByYear} />
  )
}
