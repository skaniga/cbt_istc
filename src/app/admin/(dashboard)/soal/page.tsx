import { createClient } from '@/lib/supabase/server'
import SoalClient from './SoalClient'

export const revalidate = 0

export default async function AdminSoalPage() {
  const supabase = await createClient()

  // Ambil semua soal
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en, pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms, kunci_jawaban, kategori, bobot, aktif')
    .order('nomor_soal', { ascending: true })

  if (error) {
    console.error('Error fetching questions:', error)
  }

  // Ambil config batas soal
  const { data: configBatas } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'batas_soal')
    .maybeSingle()
  const batasSoal = configBatas?.nilai || '50'

  // Ambil config acak soal
  const { data: configAcak } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'acak_soal')
    .maybeSingle()
  const acakSoal = configAcak?.nilai || 'false'

  return (
    <SoalClient 
      initialQuestions={questions || []} 
      initialBatasSoal={batasSoal}
      initialAcakSoal={acakSoal}
    />
  )
}
