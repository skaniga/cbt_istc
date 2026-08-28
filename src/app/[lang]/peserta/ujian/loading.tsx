// Loading skeleton untuk halaman ujian CBT (#10)
export default function UjianLoading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 5rem)' }}>

      {/* Progress bar placeholder */}
      <div style={{ height: '3px', background: 'var(--border)' }} />

      {/* Header skeleton */}
      <div style={{
        padding: '0.875rem 1.5rem', background: 'var(--bg-alt)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div className="skeleton" style={{ width: '10rem', height: '1rem' }} />
        <div className="skeleton" style={{ width: '7rem', height: '1.5rem' }} />
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Soal skeleton */}
        <div style={{ flex: 1, padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
          <div className="card" style={{ marginBottom: '2rem', minHeight: '300px' }}>
            <div className="skeleton" style={{ width: '90%', height: '1.5rem', marginBottom: '1rem' }} />
            <div className="skeleton" style={{ width: '70%', height: '1.5rem', marginBottom: '2.5rem' }} />
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                display: 'flex', gap: '1rem', padding: '1rem',
                border: '1.5px solid var(--border)', borderRadius: '4px',
                marginBottom: '1rem', alignItems: 'center',
              }}>
                <div className="skeleton" style={{ width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0 }} />
                <div className="skeleton" style={{ flex: 1, height: '1rem' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton — hidden on mobile */}
        <div className="cbt-sidebar" style={{ padding: '1.5rem' }}>
          <div className="skeleton" style={{ width: '6rem', height: '0.75rem', marginBottom: '1.5rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: '1', borderRadius: '4px' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
