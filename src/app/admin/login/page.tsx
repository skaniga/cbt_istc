'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { loginAdmin } from './actions'

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await loginAdmin(formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'System error occurred')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', background: 'var(--bg-alt)' }}>
        <div className="container container--narrow">
          
          <div className="card ornate-frame" style={{ maxWidth: '28rem', margin: '0 auto', background: 'var(--bg)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p className="label" style={{ marginBottom: '0.5rem', color: 'var(--brass)' }}>Administrator</p>
              <h2>Admin Login</h2>
              <p style={{ color: 'var(--muted-fg)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Committee access only.
              </p>
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
                <label htmlFor="email" className="label-text">Admin Email</label>
                <input type="email" id="email" name="email" className="input" required placeholder="admin@example.com" />
              </div>

              <div>
                <label htmlFor="password" className="label-text">Password</label>
                <input type="password" id="password" name="password" className="input" required />
              </div>

              <button type="submit" className="btn btn--primary" style={{ marginTop: '1.5rem', width: '100%' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Enter Dashboard'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted-fg)' }}>
                Not an admin? <Link href="/login" style={{ color: 'var(--brass)', textDecoration: 'underline' }}>Login as Participant</Link>
              </div>

            </form>

          </div>
        </div>
      </main>
    </>
  )
}
