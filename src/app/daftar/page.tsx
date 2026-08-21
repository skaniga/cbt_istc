'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { registerParticipant } from './actions'

export default function DaftarPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{ nomor_peserta: string, nama: string } | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await registerParticipant(formData)
      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        setSuccessData(result.data)
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
        <div className="container container--narrow">
          
          <div className="card ornate-frame" style={{ maxWidth: '32rem', margin: '0 auto' }}>
            
            {successData ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '4rem', height: '4rem', borderRadius: '50%', 
                  background: 'var(--brass)', color: 'var(--on-brass)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem', fontSize: '2rem'
                }}>
                  ✓
                </div>
                <h2 style={{ marginBottom: '1rem' }}>Pendaftaran Berhasil</h2>
                <p style={{ color: 'var(--muted-fg)', marginBottom: '1.5rem' }}>
                  Selamat bergabung, <strong>{successData.nama}</strong>.<br/>
                  Berikut adalah Nomor Peserta Anda:
                </p>
                <div style={{ 
                  background: 'var(--bg-alt)', border: '1px dashed var(--brass)', 
                  padding: '1rem', borderRadius: '4px', marginBottom: '2rem',
                  fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.1em',
                  color: 'var(--fg)'
                }}>
                  {successData.nomor_peserta}
                </div>
                <p style={{ color: 'var(--muted-fg)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Simpan Nomor Peserta ini dengan baik. Gunakan bersama <strong>kata sandi</strong> Anda untuk masuk ke sistem ujian.
                </p>
                <Link href="/login" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Lanjut ke Halaman Login
                </Link>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <p className="label" style={{ marginBottom: '0.5rem' }}>Pendaftaran Peserta</p>
                  <h2>Bergabung Sekarang</h2>
                </div>

                {error && (
                  <div style={{ 
                    padding: '1rem', background: '#FFF3F3', border: '1px solid #FFCDCD', 
                    color: '#D8000C', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div>
                    <label htmlFor="nama_lengkap" className="label-text">Nama Lengkap</label>
                    <input type="text" id="nama_lengkap" name="nama_lengkap" className="input" required placeholder="Sesuai identitas resmi" />
                  </div>

                  <div>
                    <label htmlFor="no_passport" className="label-text">No Passport / ID</label>
                    <input type="text" id="no_passport" name="no_passport" className="input" required placeholder="Nomor identitas" />
                  </div>

                  <button type="submit" className="btn btn--primary" style={{ marginTop: '1rem', width: '100%' }} disabled={loading}>
                    {loading ? 'Memproses...' : 'Daftar Sekarang'}
                  </button>

                  <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                    Sudah punya akun? <Link href="/login" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>Login di sini</Link>
                  </p>
                </form>
              </>
            )}

          </div>
        </div>
      </main>
    </>
  )
}
