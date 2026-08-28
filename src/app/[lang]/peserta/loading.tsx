// Loading skeleton untuk halaman dashboard peserta (#10)
export default function PesertaLoading() {
  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container container--narrow">

        {/* Header skeleton */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="skeleton" style={{ width: '8rem', height: '0.75rem', marginBottom: '0.75rem' }} />
          <div className="skeleton" style={{ width: '18rem', height: '2.5rem', marginBottom: '0.75rem' }} />
          <div className="skeleton" style={{ width: '14rem', height: '0.875rem' }} />
        </div>

        {/* Info cards skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              background: 'var(--bg-alt)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '1.25rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div className="skeleton" style={{ width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: '5rem', height: '0.6rem', marginBottom: '0.5rem' }} />
                <div className="skeleton" style={{ width: '3.5rem', height: '1.5rem' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Card utama skeleton */}
        <div className="card" style={{ padding: '2rem' }}>
          <div className="skeleton" style={{ width: '6rem', height: '0.6rem', marginBottom: '1.25rem' }} />
          <div className="skeleton" style={{ width: '13rem', height: '1.75rem', marginBottom: '1rem' }} />
          <div className="skeleton" style={{ width: '100%', height: '0.9rem', marginBottom: '0.5rem' }} />
          <div className="skeleton" style={{ width: '80%', height: '0.9rem', marginBottom: '2rem' }} />
          <div className="skeleton" style={{ width: '10rem', height: '2.75rem', borderRadius: '4px' }} />
        </div>

      </div>
    </div>
  )
}
