import { createClient } from '@/lib/supabase/server'
import ArsipClient from './ArsipClient'

export const revalidate = 0

export default async function AdminArsipPage() {
  const supabase = await createClient()

  const { data: events, error } = await supabase
    .from('annual_events')
    .select('*')
    .order('tahun', { ascending: false })

  if (error) {
    console.error('Error fetching annual events:', error)
  }

  return (
    <ArsipClient initialEvents={events || []} />
  )
}
