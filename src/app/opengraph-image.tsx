import { ImageResponse } from 'next/og'

// ─── OG Image Configuration ──────────────────────────────────
export const runtime = 'edge'
export const alt = 'International Science and Technology Competitions 2025'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Auto-generated Open Graph image
 * Accessible at: https://istcompetition.my/opengraph-image
 * Used as fallback OG image for all pages
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1208 50%, #0d0a04 100%)',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background ornamental border */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(201,169,98,0.3)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '32px',
            border: '1px solid rgba(201,169,98,0.15)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              fontFamily: 'serif',
              fontSize: '14px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A962',
              marginBottom: '8px',
            }}
          >
            2025 · Official Platform
          </div>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #C9A962, transparent)',
              display: 'flex',
            }}
          />

          {/* Main Title */}
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#F5F2E8',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            International Science &
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#C9A962',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Technology Competitions
          </div>

          {/* Divider */}
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #C9A962, transparent)',
              display: 'flex',
              marginTop: '8px',
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: 'rgba(245,242,232,0.6)',
              letterSpacing: '0.1em',
              marginTop: '8px',
            }}
          >
            Matematika · IPA · Robotic · Technology
          </div>

          {/* Domain */}
          <div
            style={{
              fontSize: '16px',
              color: 'rgba(201,169,98,0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '16px',
            }}
          >
            istcompetition.my
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
