'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary khusus untuk halaman ujian CBT.
 * Jika terjadi error React di tengah ujian, peserta tidak kehilangan konteks
 * dan mendapat opsi untuk reload halaman (jawaban sudah tersimpan di server).
 */
export default class ExamErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ExamErrorBoundary] Caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
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
          <div className="card ornate-frame" style={{ maxWidth: '32rem', padding: '3rem' }}>
            <p className="label" style={{ marginBottom: '1rem', color: 'var(--crimson)' }}>
              System Error
            </p>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>
              Terjadi Gangguan Sistem
            </h2>
            <p style={{ color: 'var(--muted-fg)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Jawaban Anda yang sudah dijawab <strong>telah tersimpan di server</strong> dan tidak akan hilang.
              Silakan muat ulang halaman untuk melanjutkan ujian.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn--primary"
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
              >
                Muat Ulang Halaman
              </button>
              <button
                className="btn btn--secondary"
                onClick={() => { window.location.href = '/peserta' }}
              >
                Kembali ke Dashboard
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '2rem', textAlign: 'left' }}>
                <summary style={{ fontSize: '0.8rem', cursor: 'pointer', color: 'var(--muted-fg)' }}>
                  Error Details (dev only)
                </summary>
                <pre style={{
                  fontSize: '0.75rem', overflow: 'auto', marginTop: '0.5rem',
                  padding: '1rem', background: 'var(--bg-alt)', borderRadius: '4px',
                  color: 'var(--crimson)'
                }}>
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
