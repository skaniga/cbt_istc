'use client';

export default function AdminLoading() {
  return (
    <div style={{ width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
      
      {/* Header Skeleton */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            width: '240px',
            height: '32px',
            borderRadius: '6px',
            background: 'var(--border, #e0deda)',
            marginBottom: '0.5rem',
            animation: 'adminPulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            width: '380px',
            maxWidth: '80%',
            height: '16px',
            borderRadius: '4px',
            background: 'var(--border, #e0deda)',
            opacity: 0.6,
            animation: 'adminPulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Filter Bar Skeleton */}
      <div
        className="card"
        style={{
          background: '#fff',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          borderRadius: '8px',
          border: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div
                style={{
                  width: '80px',
                  height: '12px',
                  borderRadius: '3px',
                  background: '#e8e6e2',
                  marginBottom: '0.5rem',
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '36px',
                  borderRadius: '6px',
                  background: '#f3f2ee',
                  animation: 'adminPulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div
        className="card"
        style={{
          background: '#fff',
          padding: 0,
          borderRadius: '8px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}
      >
        {/* Table Header */}
        <div
          style={{
            display: 'flex',
            padding: '1rem 1.25rem',
            background: 'var(--bg-deep, #141721)',
            gap: '1.5rem',
          }}
        >
          {['10%', '35%', '15%', '15%', '15%', '10%'].map((w, idx) => (
            <div
              key={idx}
              style={{
                width: w,
                height: '14px',
                borderRadius: '3px',
                background: 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Shimmering Rows */}
        <div style={{ padding: '0.5rem 0' }}>
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div
              key={row}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 1.25rem',
                gap: '1.5rem',
                borderBottom: '1px solid var(--border, #eee)',
                animation: 'adminPulse 1.5s ease-in-out infinite',
                animationDelay: `${row * 0.1}s`,
              }}
            >
              <div style={{ width: '10%', height: '14px', borderRadius: '3px', background: '#eceae5' }} />
              <div style={{ width: '35%', height: '14px', borderRadius: '3px', background: '#eceae5' }} />
              <div style={{ width: '15%', height: '14px', borderRadius: '3px', background: '#eceae5' }} />
              <div style={{ width: '15%', height: '14px', borderRadius: '3px', background: '#eceae5' }} />
              <div style={{ width: '15%', height: '14px', borderRadius: '3px', background: '#eceae5' }} />
              <div style={{ width: '10%', height: '24px', borderRadius: '4px', background: '#eceae5' }} />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes adminPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>

    </div>
  )
}
