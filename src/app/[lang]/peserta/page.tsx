import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import PesertaClient from './PesertaClient'

export const revalidate = 0 // Selalu dinamis

export default async function PesertaDashboard() {
  const session = await getSession()
  if (!session) redirect('/login')

  const supabase = await createClient()

  // Ambil data peserta
  const { data: participant } = await supabase
    .from('participants')
    .select('*')
    .eq('id', session.pesertaId)
    .single()

  if (!participant) redirect('/login')

  // Ambil semua config yang dibutuhkan dalam satu query
  const { data: configs } = await supabase
    .from('system_config')
    .select('kunci, nilai')
    .in('kunci', ['akses_ujian_terbuka', 'batas_soal', 'durasi_ujian_menit', 'nilai_lulus', 'rilis_hasil'])

  const configMap: Record<string, string> = {}
  configs?.forEach(c => { configMap[c.kunci] = c.nilai })

  const isAksesTerbuka = configMap['akses_ujian_terbuka'] === 'true'
  const batasSoal = configMap['batas_soal'] || '50'
  const durasiMenit = configMap['durasi_ujian_menit'] || '90'
  const nilaiLulus = configMap['nilai_lulus'] || '70'
  const rilisHasil = configMap['rilis_hasil'] === 'true'

  // Cek status ujian (exam_sessions)
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  return (
    <PesertaClient
      participant={participant}
      examSession={examSession}
      isAksesTerbuka={isAksesTerbuka}
      batasSoal={batasSoal}
      durasiMenit={durasiMenit}
      nilaiLulus={nilaiLulus}
      rilisHasil={rilisHasil}
    />
  )
}
