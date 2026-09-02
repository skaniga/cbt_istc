import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface Props {
  params: { id: string }
}

export default async function CertificateVerifyPage({ params }: Props) {
  const supabase = await createClient()
  const rawId = decodeURIComponent(params.id)

  // Try exact match first, then with slashes replacing hyphens
  const slashId = rawId.replace(/-/g, '/')
  const { data: participant } = await supabase
    .from('participants')
    .select('nama_lengkap, nomor_peserta, kategori, created_at')
    .or(`nomor_peserta.eq.${rawId},nomor_peserta.eq.${slashId}`)
    .maybeSingle()

  const valid = !!participant

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Certificate Verification — ISTC 2026</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Poppins', sans-serif;
            background: #f7f4ef;
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 2rem;
          }
          .card {
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 32px rgba(0,0,0,0.10);
            padding: 3rem 2.5rem;
            max-width: 480px;
            width: 100%;
            text-align: center;
            border-top: 5px solid #C8941A;
          }
          .logo { width: 72px; height: 72px; object-fit: contain; margin-bottom: 1.25rem; }
          .badge {
            display: inline-flex; align-items: center; gap: .5rem;
            padding: .4rem 1.2rem; border-radius: 999px;
            font-size: .75rem; font-weight: 700; letter-spacing: .08em;
            margin-bottom: 1.5rem;
          }
          .badge.valid   { background: #e8f5e9; color: #2e7d32; }
          .badge.invalid { background: #fdecea; color: #b71c1c; }
          h1 { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #1a1a1a; margin-bottom: .5rem; }
          .subtitle { color: #7a7a7a; font-size: .875rem; margin-bottom: 2rem; }
          .info-row {
            display: flex; justify-content: space-between; align-items: flex-start;
            padding: .75rem 0; border-bottom: 1px solid #f0ebe1;
            text-align: left; gap: 1rem;
          }
          .info-row:last-child { border-bottom: none; }
          .info-label { font-size: .7rem; text-transform: uppercase; letter-spacing: .1em; color: #9a8a70; font-weight: 600; flex-shrink: 0; }
          .info-value { font-size: .95rem; color: #1a1a1a; font-weight: 600; text-align: right; }
          .gold { color: #C8941A; }
          .footer { margin-top: 2rem; font-size: .75rem; color: #aaa; }
          .icon { font-size: 3rem; margin-bottom: .75rem; }
        `}</style>
      </head>
      <body>
        <div className="card">
          <img src="/Logo_KOP_gold.png" alt="ISTC Logo" className="logo" />

          {valid ? (
            <>
              <div className="badge valid">✓ &nbsp;CERTIFICATE VERIFIED</div>
              <h1>Valid Certificate</h1>
              <p className="subtitle">This certificate is officially issued by ISTC 2026.</p>

              <div style={{ marginTop: '1.5rem' }}>
                <div className="info-row">
                  <span className="info-label">Full Name</span>
                  <span className="info-value gold">{participant!.nama_lengkap}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Cert Number</span>
                  <span className="info-value">{participant!.nomor_peserta}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Category</span>
                  <span className="info-value">{participant!.kategori ?? '—'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Event</span>
                  <span className="info-value">ISTC 2026 — Kuala Lumpur</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Event Date</span>
                  <span className="info-value">September 10, 2026</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="badge invalid">✗ &nbsp;NOT FOUND</div>
              <div className="icon">⚠️</div>
              <h1>Certificate Not Found</h1>
              <p className="subtitle">
                No certificate matches the ID <strong style={{ color: '#C8941A' }}>{rawId}</strong>.<br />
                The certificate may be invalid or the ID is incorrect.
              </p>
            </>
          )}

          <p className="footer">
            International Science and Technology Competition 2026<br />
            <a href="https://istcompetition.my" style={{ color: '#C8941A', textDecoration: 'none' }}>istcompetition.my</a>
          </p>
        </div>
      </body>
    </html>
  )
}
