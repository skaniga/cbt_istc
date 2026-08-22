import { createClient } from '@/lib/supabase/server'
import SaranaClient from './SaranaClient'

export const revalidate = 0

export default async function AdminSaranaPage() {
  const supabase = await createClient()

  const { data: venues, error } = await supabase
    .from('venues')
    .select('*')
    .order('jenis', { ascending: true })

  if (error) {
    console.error('Error fetching venues:', error)
  }

  return (
    <SaranaClient initialVenues={venues || []} />
  )
}
