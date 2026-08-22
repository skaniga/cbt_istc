import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDokumenPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // Fetch Documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('tahun', { ascending: false })
    .order('jenis', { ascending: true })

  // Fetch Selection Stages
  const { data: stages } = await supabase
    .from('selection_stages')
    .select('*')
    .order('urutan', { ascending: true })

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dokumen & Seleksi</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Manajemen berkas administrasi dan proses seleksi bertingkat.</p>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>
        
        {/* Section: Dokumen Standar */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--brass)', paddingBottom: '0.5rem', display: 'inline-block' }}>
              Dokumen Standar Penyelenggaraan
            </h2>
            <button className="btn" disabled>+ Tambah Dokumen</button>
          </div>
          
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Tahun</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Judul Dokumen</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Jenis</th>
                  <th style={{ padding: '1rem', fontWeight: 600 }}>Akses</th>
                  <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {documents && documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem' }}>{doc.tahun}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600 }}>{doc.judul}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--muted-fg)' }}>{doc.deskripsi}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          background: 'var(--bg-alt)', padding: '0.25rem 0.75rem', 
                          borderRadius: '1rem', fontSize: '0.85rem', textTransform: 'uppercase',
                          fontWeight: 600, color: 'var(--brass)'
                        }}>
                          {doc.jenis.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {doc.publik ? (
                          <span style={{ color: 'green', fontWeight: 600 }}>Publik</span>
                        ) : (
                          <span style={{ color: 'var(--muted-fg)' }}>Internal</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                          Unduh
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                      Belum ada dokumen yang diunggah.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Tingkatan Seleksi */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--brass)', paddingBottom: '0.5rem', display: 'inline-block' }}>
              Tingkatan Seleksi Peserta
            </h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {stages && stages.length > 0 ? (
              stages.map((stage) => (
                <div key={stage.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', background: 'var(--text-main)', color: 'var(--bg-main)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem'
                    }}>
                      {stage.urutan}
                    </div>
                    {stage.aktif ? (
                       <span style={{ background: '#e6f4ea', color: '#1e8e3e', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>AKTIF</span>
                    ) : (
                       <span style={{ background: '#fce8e6', color: '#d93025', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>NON-AKTIF</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{stage.nama_tahap}</h3>
                  <p style={{ color: 'var(--muted-fg)', flexGrow: 1, marginBottom: '1.5rem' }}>{stage.deskripsi}</p>
                  
                  <Link href={`/admin/seleksi/${stage.id}`} className="btn btn--secondary" style={{ textAlign: 'center', width: '100%' }}>
                    Kelola Peserta Tahap {stage.urutan}
                  </Link>
                </div>
              ))
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', gridColumn: '1 / -1' }}>
                <p style={{ color: 'var(--muted-fg)' }}>Belum ada tahapan seleksi yang dikonfigurasi.</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
