export const revalidate = 0

export default function AdminSaranaPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Sarana & Arsip</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Manajemen fasilitas lomba dan arsip acara tahunan.</p>
      </div>

      <div className="card" style={{ background: '#fff', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-alt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
          color: 'var(--brass)', fontSize: '2rem'
        }}>
          🏛️
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sistem Arsip & Fasilitas</h2>
        <p style={{ color: 'var(--muted-fg)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Pusat data untuk mengelola inventaris sarana acara dan riwayat data pemenang (arsip tahunan) sedang dalam tahap integrasi dengan database utama.
        </p>
        <button className="btn btn--secondary" style={{ marginTop: '2rem' }}>
          Beritahu Saya Jika Sudah Tersedia
        </button>
      </div>
    </div>
  )
}
