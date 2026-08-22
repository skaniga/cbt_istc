'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Participant } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function SertifikatClient({
  participant,
  namaLomba,
  tahun,
  winnerData
}: {
  participant: Participant
  namaLomba: string
  tahun: string
  winnerData?: { peringkat: number, apresiasi: string } | null
}) {
  const certRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { t } = useLanguage()

  const downloadPdf = async () => {
    if (!certRef.current) return
    setIsGenerating(true)

    try {
      await document.fonts.ready

      const canvas = await html2canvas(certRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: '#FAFAF8',
      })

      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      
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
      alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.')
    } finally {
      setIsGenerating(false)
    }
  }

  const today = new Date(participant.created_at || new Date('2025-03-15')).toLocaleDateString('id-ID', {
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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ 
        width: '100%', maxWidth: '1122px', overflowX: 'auto', 
        boxShadow: 'var(--shadow-lg)', marginBottom: '3rem', background: '#FAFAF8'
      }}>
        <p className="sertifikat-scroll-hint" style={{ 
          display: 'none', fontSize: '0.8rem', color: 'var(--muted-fg)', 
          textAlign: 'center', padding: '0.75rem', background: 'var(--bg-alt)',
          borderBottom: '1px solid var(--border)', fontStyle: 'italic'
        }}>Geser ke kiri/kanan untuk melihat sertifikat lengkap</p>
        
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
                    {t('cert_desc_passed')} <strong>{participant.lulus ? t('dashboard_passed') : t('dashboard_failed')}</strong> pada
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

            {/* Wax Seal Imitation */}
            <div style={{
              position: 'absolute', bottom: '4rem', right: '6rem',
              width: '100px', height: '100px', borderRadius: '50%',
              background: isWinner ? `radial-gradient(circle at 35% 35%, ${accentColor}, ${primaryColor} 55%, #000)` : 'radial-gradient(circle at 35% 35%, #A83040, var(--crimson) 55%, #6B1A28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600
            }}>
              IPE
            </div>

            {/* Tanda Tangan */}
            <div style={{ position: 'absolute', bottom: '4rem', left: '6rem', textAlign: 'center' }}>
              <div style={{ 
                fontFamily: 'cursive', fontSize: '2.5rem', color: 'var(--fg)', 
                opacity: 0.8, marginBottom: '0.5rem', transform: 'rotate(-5deg)'
              }}>
                Committee
              </div>
              <div style={{ width: '150px', height: '1px', background: 'var(--fg)', margin: '0 auto 0.5rem' }} />
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted-fg)' }}>
                {t('cert_chairman')}
              </p>
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
