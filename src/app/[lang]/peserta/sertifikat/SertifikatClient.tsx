'use client'

import { useRef, useState, useEffect } from 'react'
// html2canvas & jsPDF are lazy-loaded on demand to reduce initial bundle size
import { Participant } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function SertifikatClient({
  participant,
  namaLomba,
  tahun,
  winnerData,
  namaKetua,
  jabatanKetua
}: {
  participant: Participant
  namaLomba: string
  tahun: string
  winnerData?: { peringkat: number, apresiasi: string } | null
  namaKetua?: string
  jabatanKetua?: string
}) {
  const certRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [scale, setScale] = useState(1)
  const { t } = useLanguage()

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth
        const targetWidth = 1122
        if (availableWidth < targetWidth) {
          setScale(availableWidth / targetWidth)
        } else {
          setScale(1)
        }
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const downloadPdf = async () => {
    if (!certRef.current) return
    setIsGenerating(true)

    try {
      await document.fonts.ready

      // Lazy load libraries only when user clicks download
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(certRef.current, {
        scale: 2, // reduced from 3 to avoid mobile memory limits
        useCORS: true,
        backgroundColor: '#FAFAF8',
        onclone: (clonedDoc) => {
          const parent = clonedDoc.getElementById('cert-parent')
          if (parent) {
            parent.style.transform = 'none'
          }
        }
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.9) // slightly compressed for mobile
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Sertifikat_${participant.nomor_peserta}.pdf`)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('An error occurred while generating the PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const today = new Date(participant.created_at || new Date('2025-03-15')).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  // Theme based on winner status
  const isWinner = !!winnerData
  
  let primaryColor = 'var(--brass)'
  let accentColor = 'var(--brass)'
  let certTitle = t('cert_achievement')
  
  if (isWinner) {
    if (winnerData.peringkat === 1) {
      primaryColor = '#D4AF37' // Gold
      accentColor = '#DAA520'
    } else if (winnerData.peringkat === 2) {
      primaryColor = '#C0C0C0' // Silver
      accentColor = '#A9A9A9'
    } else if (winnerData.peringkat === 3) {
      primaryColor = '#CD7F32' // Bronze
      accentColor = '#B87333'
    } else {
      primaryColor = '#4A4A4A' // Harapan (Dark Gray)
      accentColor = '#2B2B2B'
    }
    certTitle = t('cert_excellence')
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      
      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          maxWidth: '1122px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '3rem'
        }}
      >
        <div 
          id="cert-parent"
          style={{
          width: '1122px',
          height: '793px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: scale < 1 ? `-${793 * (1 - scale)}px` : '0',
          boxShadow: 'var(--shadow-lg)',
          background: '#FAFAF8',
          transition: 'transform 0.2s ease-out',
        }}>
          <div 
            ref={certRef}
            style={{
              width: '1122px', 
              height: '793px', 
              background: '#FAFAF8',
              position: 'relative',
              padding: '40px',
              boxSizing: 'border-box'
            }}
          >
          {/* Ornate Border Dalam */}
          <div style={{
            position: 'absolute', inset: '40px',
            border: `2px solid ${primaryColor}`,
            outline: `1px solid ${primaryColor}`,
            outlineOffset: '6px',
            pointerEvents: 'none'
          }}>
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: `1px solid ${primaryColor}` }} />
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: `1px solid ${primaryColor}` }} />
            <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: `1px solid ${primaryColor}` }} />
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: `1px solid ${primaryColor}` }} />
          </div>

          <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
          }}>
            
            {isWinner && (
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: primaryColor }}>
                {winnerData.peringkat === 1 ? '🏆' : winnerData.peringkat === 2 ? '🥈' : winnerData.peringkat === 3 ? '🥉' : '🎖️'}
              </div>
            )}

            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.3em', color: primaryColor, marginBottom: '2rem' }}>
              {certTitle}
            </p>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', fontWeight: 400, color: 'var(--fg)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {participant.nama_lengkap}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
              <span style={{ height: '1px', width: '100px', background: primaryColor }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--muted-fg)' }}>
                {isWinner ? (
                  <>
                    {t('cert_desc_winner')} <strong>{winnerData.apresiasi}</strong><br/>
                    {t('cert_desc_winner2')}
                  </>
                ) : (
                  <>
                    {t('cert_desc_standard')} <strong>{participant.skor}</strong><br/>
                    {t('cert_desc_passed')} <strong>{participant.lulus ? t('dashboard_passed') : t('dashboard_failed')}</strong> on
                  </>
                )}
              </p>
              <span style={{ height: '1px', width: '100px', background: primaryColor }} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {namaLomba} {tahun}
            </h2>

            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--muted-fg)', marginTop: 'auto' }}>
              {t('cert_number')}: {participant.nomor_peserta} <br/>
              {t('cert_issued')}: {today}
            </p>

            {/* Logo ISTC */}
            <div style={{
              position: 'absolute', bottom: '3.5rem', right: '5rem',
              width: '120px', height: '120px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0a0e1a',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              border: `2px solid ${primaryColor}`,
            }}>
              <img src="/logo.png" alt="ISTC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* Tanda Tangan */}
            <div style={{ position: 'absolute', bottom: '4rem', left: '6rem', textAlign: 'center' }}>
              <div style={{ 
                fontFamily: 'cursive', fontSize: '2.5rem', color: 'var(--fg)', 
                opacity: 0.8, marginBottom: '0.5rem', transform: 'rotate(-5deg)'
              }}>
                {namaKetua || 'Committee'}
              </div>
              <div style={{ width: '150px', height: '1px', background: 'var(--fg)', margin: '0 auto 0.5rem' }} />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-fg)' }}>
                {jabatanKetua || t('cert_chairman')}
              </p>
            </div>

          </div>
        </div>
      </div>
      </div>

      <button 
        onClick={downloadPdf} 
        disabled={isGenerating}
        className="btn btn--primary" 
        style={{ minWidth: '16rem', justifyContent: 'center' }}
      >
        {isGenerating ? t('cert_generating') : t('cert_download')}
      </button>

    </div>
  )
}
