import { createClient } from '@/lib/supabase/server'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { StartExamForm } from './components'

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
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container container--narrow">
        
        <div style={{ marginBottom: '3rem' }}>
          <p className="label" style={{ marginBottom: '0.5rem' }}>Selamat Datang,</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{participant.nama_lengkap}</h1>
          <p style={{ color: 'var(--muted-fg)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
            {participant.nomor_peserta} • No Passport: {participant.no_passport}
          </p>
        </div>

        <div className="card ornate-frame">
          <div className="peserta-card-inner" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            
            {/* Informasi Utama */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p className="label" style={{ marginBottom: '1rem', color: 'var(--brass)' }}>Status Ujian CBT</p>
              
              {!examSession && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Belum Dimulai</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Ujian terdiri dari 50 soal pilihan ganda dengan durasi 90 menit. 
                    Pastikan koneksi internet Anda stabil sebelum memulai.
                  </p>
                  {isAksesTerbuka ? (
                    <StartExamForm buttonLabel="Mulai Ujian" />
                  ) : (
                    <div style={{ 
                      display: 'inline-block', padding: '0.75rem 1.25rem', 
                      background: 'var(--muted)', borderRadius: '4px',
                      color: 'var(--muted-fg)', fontSize: '0.9rem', fontWeight: 500
                    }}>
                      Akses Ujian Sedang Ditutup
                    </div>
                  )}
                </>
              )}

              {examSession?.status === 'in_progress' && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Sedang Berlangsung</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Anda memiliki sesi ujian yang belum diselesaikan. Waktu terus berjalan.
                  </p>
                  <StartExamForm buttonLabel="Lanjutkan Ujian" />
                </>
              )}

              {examSession?.status === 'selesai' && (
                <>
                  <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Telah Selesai</h2>
                  <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Terima kasih telah menyelesaikan ujian. Anda dapat mengunduh sertifikat digital Anda.
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                      <p className="label">Skor Akhir</p>
                      <p style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: '3.5rem', 
                        lineHeight: 1, color: participant.lulus ? 'var(--fg)' : 'var(--crimson)'
                      }}>
                        {participant.skor ?? 0}
                      </p>
                    </div>
                    <div>
                      <p className="label">Status</p>
                      <p style={{ 
                        fontFamily: 'var(--font-display)', fontSize: '1.25rem', 
                        color: participant.lulus ? 'var(--brass)' : 'var(--muted-fg)',
                        letterSpacing: '0.1em', marginTop: '0.5rem'
                      }}>
                        {participant.lulus ? 'LULUS' : 'TIDAK LULUS'}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '2.5rem' }}>
                    <Link href="/peserta/sertifikat" className="btn btn--primary" style={{ minWidth: '12rem', justifyContent: 'center' }}>
                      Unduh Sertifikat PDF
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Ilustrasi / Dekorasi */}
            <div className="peserta-arch-deco" style={{ 
              width: '180px', height: '240px', background: 'var(--muted)', 
              borderRadius: '40% 40% 0 0 / 20% 20% 0 0', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: 'var(--border-dark)',
              border: '1px solid var(--border)'
            }}>
               <span style={{ fontSize: '4rem', opacity: 0.5 }}>◬</span>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  )
}
