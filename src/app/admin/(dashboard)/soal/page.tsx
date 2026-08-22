import { createClient } from '@/lib/supabase/server'

export const revalidate = 0

export default async function AdminSoalPage() {
  const supabase = await createClient()

  // Ambil semua soal
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, nomor_soal, pertanyaan, kunci_jawaban, kategori, bobot, aktif')
    .order('nomor_soal', { ascending: true })

  if (error) {
    console.error('Error fetching questions:', error)
  }

  return (
    <div>
      <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Manajemen Soal</h1>
          <p style={{ color: 'var(--muted-fg)' }}>Kelola daftar bank soal untuk CBT.</p>
        </div>
        <button className="btn btn--primary" style={{ cursor: 'not-allowed', opacity: 0.7 }} title="Segera Hadir">
          + Tambah Soal
        </button>
      </div>

      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600, width: '5%' }}>No.</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '45%' }}>Pertanyaan</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Kunci</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '15%' }}>Kategori</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '10%' }}>Bobot</th>
                <th style={{ padding: '1rem', fontWeight: 600, width: '15%' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {questions && questions.length > 0 ? (
                questions.map((q) => (
                  <tr key={q.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{q.nomor_soal}</td>
                    <td style={{ padding: '1rem', lineHeight: 1.5 }}>
                      {q.pertanyaan.length > 80 ? q.pertanyaan.substring(0, 80) + '...' : q.pertanyaan}
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-display)', color: 'var(--brass)', fontWeight: 600 }}>
                      {q.kunci_jawaban}
                    </td>
                    <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{q.kategori}</td>
                    <td style={{ padding: '1rem' }}>{q.bobot} poin</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600,
                        background: q.aktif ? '#E8F5E9' : '#F5F5F5',
                        color: q.aktif ? '#2E7D32' : 'var(--muted-fg)'
                      }}>
                        {q.aktif ? 'AKTIF' : 'NON-AKTIF'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada soal di database. Silakan gunakan SQL Editor untuk import soal.
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
