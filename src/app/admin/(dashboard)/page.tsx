import { createClient } from '@/lib/supabase/server'
import { ToggleAksesForm, ToggleRilisHasilForm, KeepAliveForm, SettingsForm } from './components'
import GrandFinalistAnnouncement from '@/components/GrandFinalistAnnouncement'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Ambil total peserta
  const { count: pesertaCount } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true })

  // Ambil akses_ujian_terbuka
  const { data: configAkses } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'akses_ujian_terbuka')
    .maybeSingle()
  
  const aksesTerbuka = configAkses?.nilai || 'false'
  const isAksesTerbuka = aksesTerbuka === 'true'

  // Ambil rilis_hasil
  const { data: configRilis } = await supabase
    .from('system_config')
    .select('nilai')
    .eq('kunci', 'rilis_hasil')
    .maybeSingle()

  const rilisHasil = configRilis?.nilai || 'false'
  const isRilisHasil = rilisHasil === 'true'

  // Ambil exam settings (acak_soal, batas_soal)
  const { data: examSettings } = await supabase
    .from('system_config')
    .select('kunci, nilai')
    .in('kunci', ['acak_soal', 'batas_soal'])

  const settingsMap: Record<string, string> = {}
  examSettings?.forEach(c => { settingsMap[c.kunci] = c.nilai })
  const currentAcakSoal  = settingsMap['acak_soal']  ?? 'false'
  const currentBatasSoal = settingsMap['batas_soal'] ?? '50'

  // Ambil history keep alive (3 terakhir)
  const { data: keepAlives } = await supabase
    .from('keep_alives')
    .select('check_time, method')
    .order('check_time', { ascending: false })
    .limit(3)

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Welcome to the main control panel of ISTC.</p>
      </div>

      {/* Pengumuman Resmi Grand Finalis ISTC 2026 */}
      <GrandFinalistAnnouncement defaultExpanded={true} />

      <div className="admin-overview-grid">
        
        {/* Panel Kontrol Akses Ujian */}
        <div className="card" style={{ background: '#fff' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Exam Access Control</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: '0.25rem' }}>Current Exam Status:</p>
              <p style={{ 
                fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.1em',
                color: isAksesTerbuka ? '#27AE60' : 'var(--crimson)'
              }}>
                {isAksesTerbuka ? 'OPEN (PARTICIPANTS CAN START)' : 'CLOSED (CANNOT START)'}
              </p>
            </div>
          </div>
          <ToggleAksesForm currentStatus={aksesTerbuka} />
        </div>

        {/* Panel Kontrol Rilis Hasil */}
        <div className="card" style={{ background: '#fff' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Result Release Control</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: '0.25rem' }}>Score & Certificate Status:</p>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.1em',
                color: isRilisHasil ? '#27AE60' : '#C8941A'
              }}>
                {isRilisHasil ? 'VISIBLE (Scores & certs shown)' : 'HIDDEN (Thank you message only)'}
              </p>
            </div>
          </div>
          <ToggleRilisHasilForm currentStatus={rilisHasil} />
        </div>

        {/* Panel Ringkasan Data */}
        <div className="card" style={{ background: '#fff' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Data Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted-fg)' }}>Total Registered Participants</span>
              <strong style={{ fontSize: '1.25rem' }}>{pesertaCount || 0}</strong>
            </div>
            {/* TODO: Lulus / Tidak Lulus jika ada waktu */}
          </div>
        </div>

      </div>

      {/* Panel Simulasi CBT & Uji Coba Sertifikat (Admin Sandbox) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        
        {/* Card 1: Simulasi CBT */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #1A1A1A 0%, #26211C 100%)',
          color: '#fff',
          border: '1px solid rgba(197, 160, 40, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: 'rgba(39, 174, 96, 0.2)',
                color: '#4ADE80',
                border: '1px solid rgba(39, 174, 96, 0.4)',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                ✓ Mode Aman Terisolasi
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Admin Sandbox</span>
            </div>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              🎯 Simulasi Antarmuka CBT
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Uji coba seluruh alur CBT peserta secara langsung (tampilan soal, timer, navigasi nomor, switch bahasa, dan tombol selesai) tanpa membuka akses peserta umum dan tanpa mengubah data nilai.
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brass)', letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Pilih Bidang Uji Coba:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <Link
                  href="/admin/preview/ujian?kategori=Environmental+Technology"
                  target="_blank"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  🌱 Env. Technology
                </Link>
                <Link
                  href="/admin/preview/ujian?kategori=Smart+Robotics"
                  target="_blank"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  🤖 Smart Robotics
                </Link>
                <Link
                  href="/admin/preview/ujian?kategori=Science+In+Action"
                  target="_blank"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  🔬 Science In Action
                </Link>
                <Link
                  href="/admin/preview/ujian?kategori=Mathematic"
                  target="_blank"
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  📐 Mathematic
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/admin/preview/ujian"
            target="_blank"
            className="btn btn--primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.65rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            Mulai Uji Coba CBT Sekarang →
          </Link>
        </div>

        {/* Card 2: Preview & Verifikasi Sertifikat */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #1C1E24 0%, #151821 100%)',
          color: '#fff',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#60A5FA',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                textTransform: 'uppercase'
              }}>
                ✓ Template & QR Verified
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Digital Certificate</span>
            </div>

            <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              🎓 Sertifikat Digital & Verifikasi
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              Periksa tampilan sertifikat beresolusi tinggi, tata letak nama peserta, nomor seri, QR Code autentikasi publik, dan unduhan file PDF landscape A4.
            </p>

            <div style={{ marginBottom: '1.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '6px' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.35rem' }}>
                Quick Test Verifikasi Publik:
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#93C5FD' }}>
                  /certificate/IPE-2025-0001
                </span>
                <Link
                  href="/certificate/IPE-2025-0001"
                  target="_blank"
                  style={{
                    fontSize: '0.75rem',
                    color: '#fff',
                    textDecoration: 'underline',
                    marginLeft: 'auto',
                  }}
                >
                  Uji QR ↗
                </Link>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              href="/admin/preview/sertifikat"
              target="_blank"
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.65rem',
                background: '#2563EB',
                color: '#fff',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              Lihat Preview Sertifikat →
            </Link>
            <Link
              href="/admin/peserta"
              style={{
                padding: '0.65rem 0.85rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              Daftar Peserta
            </Link>
          </div>
        </div>

      </div>

      {/* Exam Settings */}
      <div className="card" style={{ background: '#fff', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Exam Settings</h2>
        <SettingsForm currentBatasSoal={currentBatasSoal} currentAcakSoal={currentAcakSoal} />
      </div>

      {/* Widget Keep Alive */}
      <div className="card" style={{ background: '#fff', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>Supabase Keep Alive Log</h2>
          <KeepAliveForm />
        </div>
        


        <div style={{ background: 'var(--bg-alt)', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Ping Time</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {keepAlives && keepAlives.length > 0 ? keepAlives.map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--muted-fg)' }}>
                    {new Date(log.check_time).toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                      background: '#E8F5E9',
                      color: '#2E7D32'
                    }}>
                      SUCCESS
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--muted-fg)' }}>Triggered by: {log.method}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    No activity logs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
