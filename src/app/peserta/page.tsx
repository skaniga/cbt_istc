import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import PesertaClient from './PesertaClient'

export const revalidate = 0 // Selalu dinamis

export default async function PesertaDashboard() {
  const session = await getSession()
  if (!session) redirect('/login')

  const supabase = await createClient()

  // 1. Ambil data peserta
  const { data: participant } = await supabase
    .from('participants')
    .select('*')
    .eq('id', session.pesertaId)
    .single()

  if (!participant) {
    redirect('/login')
  }

  // 2. Cek status ujian (exam_sessions)
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  // 3. Cek apakah ujian sedang dibuka
  const { data: configAccess } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'akses_ujian_terbuka')
    .maybeSingle()
    
  const isAksesTerbuka = configAccess?.nilai === 'true'

  return (
    <PesertaClient 
      participant={participant} 
      examSession={examSession} 
      isAksesTerbuka={isAksesTerbuka} 
    />
  )
}
