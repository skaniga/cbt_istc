import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const revalidate = 0

export default async function AdminSaranaPage() {
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

  const { data: venues } = await supabase
    .from('venues')
    .select('*')
    .order('jenis', { ascending: true })

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Sarana & Prasarana</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Katalog lokasi, peralatan, dan fasilitas pendukung acara.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {venues && venues.length > 0 ? (
          venues.map((item) => (
            <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {item.foto_url && item.foto_url.length > 0 && (
                <div style={{ 
                  height: '200px', 
                  backgroundImage: `url(${item.foto_url[0]})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center'
                }} />
              )}
              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{item.nama}</h3>
                  <span style={{ 
                    background: 'var(--bg-alt)', color: 'var(--brass)', 
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {item.jenis}
                  </span>
                </div>
                
                {item.lokasi && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 600 }}>
                    📍 {item.lokasi} {item.kapasitas ? `(Kapasitas: ${item.kapasitas})` : ''}
                  </p>
                )}
                
                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {item.deskripsi}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {item.denah_url && (
                    <a href={item.denah_url} target="_blank" rel="noopener noreferrer" className="btn btn--secondary" style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem' }}>
                      Lihat Denah
                    </a>
                  )}
                  <button className="btn btn--secondary" style={{ flexGrow: 1, fontSize: '0.8rem', padding: '0.5rem' }}>
                    Edit Info
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
             <p style={{ color: 'var(--muted-fg)' }}>Belum ada data sarana/prasarana yang diinput.</p>
          </div>
        )}
      </div>
    </div>
  )
}
