'use client'

import { useState } from 'react'
import { updatePemenangUrls } from './actions'

export default function PemenangClient({ initialWinners }: { initialWinners: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await updatePemenangUrls(id, formData)

    if (result.error) {
      alert(result.error)
    } else {
      setEditingId(null)
    }
    setLoading(false)
  }

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Penghargaan & Pemenang</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Kelola data pemenang, bukti hadiah, dan dokumentasi penyerahan.</p>
      </div>

      <div className="card" style={{ background: '#fff', padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-deep)', color: 'var(--fg)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Tahun</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Peringkat</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Nama Pemenang</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Apresiasi</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Bukti & Dokumentasi</th>
                <th style={{ padding: '1rem', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialWinners && initialWinners.length > 0 ? (
                initialWinners.map((w) => {
                  const isEditing = editingId === w.id

                  if (isEditing) {
                    return (
                      <tr key={w.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                        <td colSpan={6} style={{ padding: '1.5rem' }}>
                          <form onSubmit={(e) => handleSave(e, w.id)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Edit Data: {w.nama_pemenang} (Juara {w.peringkat})</h3>
                            
                            <div>
                              <label className="label-text">URL Bukti Hadiah</label>
                              <input type="text" name="bukti_hadiah_url" className="input" defaultValue={w.bukti_hadiah_url || ''} placeholder="https://..." />
                            </div>
                            
                            <div>
                              <label className="label-text">URL Dokumentasi Penyerahan</label>
                              <input type="text" name="dokumentasi_penyerahan_url" className="input" defaultValue={w.dokumentasi_penyerahan_url || ''} placeholder="https://..." />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                              <button type="submit" className="btn btn--primary" disabled={loading}>
                                {loading ? 'Menyimpan...' : 'Simpan'}
                              </button>
                              <button type="button" className="btn btn--secondary" onClick={() => setEditingId(null)} disabled={loading}>
                                Batal
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    )
                  }

                  return (
                    <tr key={w.id} style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{w.tahun}</td>
                      <td style={{ padding: '1rem', color: 'var(--brass)', fontWeight: 600, fontSize: '1.1rem' }}>
                        {w.peringkat === 1 ? '🥇' : w.peringkat === 2 ? '🥈' : w.peringkat === 3 ? '🥉' : w.peringkat}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600 }}>{w.nama_pemenang}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>{w.participants?.nomor_peserta}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>{w.apresiasi}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {w.bukti_hadiah_url ? (
                            <a href={w.bukti_hadiah_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1e8e3e', textDecoration: 'underline', fontSize: '0.8rem' }}>✓ Bukti Hadiah</a>
                          ) : (
                            <span style={{ color: 'var(--muted-fg)', fontSize: '0.8rem' }}>- Bukti Hadiah</span>
                          )}
                          {w.dokumentasi_penyerahan_url ? (
                            <a href={w.dokumentasi_penyerahan_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1e8e3e', textDecoration: 'underline', fontSize: '0.8rem' }}>✓ Dokumentasi</a>
                          ) : (
                            <span style={{ color: 'var(--muted-fg)', fontSize: '0.8rem' }}>- Dokumentasi</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button 
                          className="btn btn--secondary" 
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          onClick={() => setEditingId(w.id)}
                        >
                          Edit URL
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--muted-fg)' }}>
                    Belum ada data pemenang.
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
