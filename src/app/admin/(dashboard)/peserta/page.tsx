import { createClient } from '@/lib/supabase/server'
import PesertaClient from './PesertaClient'

export const revalidate = 0

export default async function AdminPesertaPage() {
  const supabase = await createClient()

  // Ambil semua peserta diurutkan berdasarkan pendaftaran terbaru
  const { data: participants, error } = await supabase
    .from('participants')
    .select('id, nomor_peserta, nama_lengkap, no_passport, skor, lulus, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching participants:', error)
  }

  return (
    <PesertaClient initialParticipants={participants || []} />
  )
}
