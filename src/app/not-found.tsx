import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Halaman Tidak Ditemukan',
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div>
        {/* Nomor 404 bergaya */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 20vw, 12rem)',
          fontWeight: 400,
          lineHeight: 1,
          color: 'var(--muted)',
          letterSpacing: '-0.04em',
          marginBottom: '-1rem',
          userSelect: 'none',
        }}>
          404
        </p>

        <div className="ornate-divider" style={{ maxWidth: '8rem', margin: '2rem auto' }} aria-hidden="true" />

        <p className="label" style={{ marginBottom: '1rem' }}>Halaman Tidak Ditemukan</p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem', maxWidth: '24rem', margin: '0 auto 1rem' }}>
          Halaman yang Anda cari tidak ada
        </h1>
        <p style={{ color: 'var(--muted-fg)', marginBottom: '2.5rem', maxWidth: '28rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          URL yang Anda masukkan mungkin salah atau halaman ini telah dipindahkan.
          Silakan kembali ke halaman utama.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/id" className="btn btn--primary">
            Kembali ke Beranda
          </Link>
          <Link href="/id/login" className="btn btn--secondary">
            Login Peserta
          </Link>
        </div>
      </div>
    </div>
  )
}
