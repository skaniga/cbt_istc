import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import SertifikatClient from './SertifikatClient'

export const revalidate = 0

export default async function SertifikatPage() {
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

  // Pastikan sudah selesai ujian
  const { data: examSession } = await supabase
    .from('exam_sessions')
    .select('status')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  if (examSession?.status !== 'selesai') {
    redirect('/peserta')
  }

  // Cek apakah peserta adalah pemenang
  const { data: winnerData } = await supabase
    .from('winners')
    .select('peringkat, apresiasi')
    .eq('peserta_id', participant.id)
    .maybeSingle()

  // Ambil metadata dari config
  const { data: configRows } = await supabase
    .from('system_config')
    .select('kunci, nilai')

  const config: Record<string, string> = {}
  configRows?.forEach(row => {
    config[row.kunci] = row.nilai
  })

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 5rem)', background: 'var(--bg-alt)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="label" style={{ marginBottom: '0.5rem' }}>Official Document</p>
          <h1 style={{ fontSize: '2.5rem' }}>Participant Certificate</h1>
        </div>

        <SertifikatClient 
          participant={participant} 
          winnerData={winnerData}
          namaLomba={config['nama_lomba'] || 'International Photography Exhibition'}
          tahun={config['tahun_aktif'] || '2025'}
        />

      </div>
    </div>
  )
}
