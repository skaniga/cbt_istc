import { createClient } from '@/lib/supabase/server'
import PemenangClient from './PemenangClient'

export const revalidate = 0

export default async function AdminPemenangPage() {
  const supabase = await createClient()

  const { data: winners, error } = await supabase
    .from('winners')
    .select(`
      *,
      participants(nomor_peserta)
    `)
    .order('tahun', { ascending: false })
    .order('peringkat', { ascending: true })

  if (error) {
    console.error('Error fetching winners:', error)
  }

  return <PemenangClient initialWinners={winners || []} />
}
