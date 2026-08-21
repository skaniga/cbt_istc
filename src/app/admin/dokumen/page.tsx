export const revalidate = 0

export default function AdminDokumenPage() {
  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dokumen & Seleksi</h1>
        <p style={{ color: 'var(--muted-fg)' }}>Manajemen berkas administrasi dan proses seleksi tahap lanjut.</p>
      </div>

      <div className="card" style={{ background: '#fff', textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-alt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
          color: 'var(--brass)', fontSize: '2rem'
        }}>
          📄
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Modul Dalam Pengembangan</h2>
        <p style={{ color: 'var(--muted-fg)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          Fitur untuk mengunggah dokumen persyaratan peserta, mengelola tim seleksi, dan penjadwalan wawancara akan tersedia pada pembaruan sistem berikutnya.
        </p>
        <button className="btn btn--secondary" style={{ marginTop: '2rem' }}>
          Beritahu Saya Jika Sudah Tersedia
        </button>
      </div>
    </div>
  )
}
