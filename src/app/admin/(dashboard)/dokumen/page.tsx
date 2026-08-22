import { createClient } from '@/lib/supabase/server'
import DokumenClient from './DokumenClient'

export const revalidate = 0

export default async function AdminDokumenPage() {
  const supabase = await createClient()

  // Fetch Documents
  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .order('tahun', { ascending: false })
    .order('jenis', { ascending: true })

  if (error) {
    console.error('Error fetching documents:', error)
  }

  return (
    <DokumenClient initialDocuments={documents || []} />
  )
}
