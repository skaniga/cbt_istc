import { createClient } from '@/lib/supabase/server'
import SoalClient from './SoalClient'

export const revalidate = 0

export default async function AdminSoalPage() {
  const supabase = await createClient()

  // Ambil semua soal
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori, bobot, aktif')
    .order('nomor_soal', { ascending: true })

  if (error) {
    console.error('Error fetching questions:', error)
  }

  return (
    <SoalClient initialQuestions={questions || []} />
  )
}
