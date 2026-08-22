import { createClient } from '@/lib/supabase/server'

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
    <div>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Manajemen Peserta</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Kelola data peserta dan lihat hasil ujian mereka.</p>
        </div>
      </div>

      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>No. Peserta</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Nama Lengkap</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>No Passport / ID</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Tgl Daftar</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Skor</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {participants && participants.length > 0 ? (
                participants.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 600 }}>
                      {p.nomor_peserta}
                    </td>
                    <td style={{ padding: '1rem' }}>{p.nama_lengkap}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-fg)' }}>{p.no_passport}</td>
                    <td style={{ padding: '1rem', color: 'var(--muted-fg)' }}>
                      {new Date(p.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {p.skor !== null ? (
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{p.skor}</span>
                      ) : (
                        <span style={{ color: 'var(--muted-fg)' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {p.skor !== null ? (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                          background: p.lulus ? '#E8F5E9' : '#FFEBEE',
                          color: p.lulus ? '#2E7D32' : '#C62828'
                        }}>
                          {p.lulus ? 'LULUS' : 'TIDAK LULUS'}
                        </span>
                      ) : (
                        <span style={{ 
                          padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                          background: 'var(--bg-alt)', color: 'var(--muted-fg)'
                        }}>
                          BELUM UJIAN
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada peserta yang terdaftar.
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
