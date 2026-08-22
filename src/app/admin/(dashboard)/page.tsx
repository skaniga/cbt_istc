import { createClient } from '@/lib/supabase/server'
import { ToggleAksesForm, KeepAliveForm } from './components'

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

  // Ambil history keep alive (3 terakhir)
  const { data: keepAlives } = await supabase
    .from('keep_alives')
    .select('created_at, status, details')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Selamat datang di panel kontrol utama IPE.</p>
      </div>

      <div className="admin-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Panel Kontrol Akses Ujian */}
        <div className="card" style={{ background: '#fff' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Kontrol Akses Ujian</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fg)', marginBottom: '0.25rem' }}>Status Ujian Saat Ini:</p>
              <p style={{ 
                fontFamily: 'var(--font-display)', fontSize: '0.9rem', letterSpacing: '0.1em',
                color: isAksesTerbuka ? '#27AE60' : 'var(--crimson)'
              }}>
                {isAksesTerbuka ? 'TERBUKA (PESERTA BISA MULAI)' : 'DITUTUP (TIDAK BISA MULAI)'}
              </p>
            </div>
          </div>
          <ToggleAksesForm currentStatus={aksesTerbuka} />
        </div>

        {/* Panel Ringkasan Data */}
        <div className="card" style={{ background: '#fff' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Ringkasan Data</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted-fg)' }}>Total Peserta Terdaftar</span>
              <strong style={{ fontSize: '1.25rem' }}>{pesertaCount || 0}</strong>
            </div>
            {/* TODO: Lulus / Tidak Lulus jika ada waktu */}
          </div>
        </div>

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
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Waktu Ping</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {keepAlives && keepAlives.length > 0 ? keepAlives.map((log, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--muted-fg)' }}>
                    {new Date(log.created_at).toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                      background: log.status === 'success' ? '#E8F5E9' : '#FFEBEE',
                      color: log.status === 'success' ? '#2E7D32' : '#C62828'
                    }}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--muted-fg)' }}>{log.details || '-'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada log aktivitas.
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
