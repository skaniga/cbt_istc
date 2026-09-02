'use client'

import { useRef, useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Participant } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const GOLD  = '#C8941A'
const TEXT  = '#2C2C2C'
const MUTED = '#7A7A7A'

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
  const certRef      = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [scale, setScale] = useState(1)
  const { t, locale } = useLanguage()

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const aw = containerRef.current.clientWidth
        setScale(aw < 1122 ? aw / 1122 : 1)
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
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 1122,
        height: 793,
        windowWidth: 1122,
        windowHeight: 793,
        onclone: (clonedDoc) => {
          const p = clonedDoc.getElementById('cert-parent')
          if (p) {
            p.style.transform = 'none'
            p.style.transformOrigin = 'unset'
            p.style.marginBottom = '0'
          }
        }
      })
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0,
        pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight())
      pdf.save(`Certificate_ISTC_${participant.nomor_peserta}.pdf`)
    } catch (e) {
      console.error(e)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const isWinner  = !!winnerData
  const certNo    = participant.nomor_peserta ?? '—'
  const verifyUrl = `https://istcompetition.my/certificate/${certNo.replace(/\//g, '-')}`

  // Achievement text
  const achievement = isWinner
    ? (winnerData!.apresiasi ?? '').toUpperCase()
    : t('cert_achievement').toUpperCase()

  // Category label
  const category = participant.kategori ?? ''

  // Localised "awarded to"
  const awardedLabel = locale === 'id' ? 'Sertifikat ini diberikan kepada'
    : locale === 'ms' ? 'Sijil ini dianugerahkan kepada'
    : 'This Certificate is awarded to'

  return (
    <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', overflowX:'hidden' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@600;700&family=Cormorant+SC:wght@700&display=swap');
        @font-face {
          font-family: 'Glacial Indifference';
          src: url('/fonts/GlacialIndifference-Regular.woff') format('woff');
          font-weight: 400;
        }
        @font-face {
          font-family: 'Glacial Indifference';
          src: url('/fonts/GlacialIndifference-Bold.woff') format('woff');
          font-weight: 700;
        }
      `}</style>

      <div ref={containerRef} style={{ width:'100%', maxWidth:'1122px', display:'flex', justifyContent:'center', marginBottom:'3rem' }}>
        <div id="cert-parent" style={{
          width:'1122px', height:'793px',
          transform:`scale(${scale})`, transformOrigin:'top center',
          marginBottom: scale < 1 ? `-${793*(1-scale)}px` : '0',
          boxShadow:'0 8px 40px rgba(0,0,0,0.2)',
          transition:'transform 0.2s ease-out',
        }}>
          {/* ── Canva template as background ── */}
          <div ref={certRef} style={{
            width:'1122px', height:'793px',
            backgroundImage: "url('/cert_template.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            position:'relative',
          }}>

            {/* ── Cert Number — just below CERTIFICATE heading ─────── */}
            <div style={{
              position:'absolute', top:'24.5%', left:0, right:0,
              textAlign:'center',
              fontFamily:"'Glacial Indifference', sans-serif",
              fontSize:'0.62rem', fontWeight:400,
              color: MUTED, letterSpacing:'0.28em',
            }}>
              NO. &nbsp;{certNo}
            </div>

            {/* ── Participant Name (Dancing Script, gold) ───────────── */}
            <div style={{
              position:'absolute', top:'37%', left:'8%', right:'8%',
              textAlign:'center',
              fontFamily:"'Dancing Script', cursive",
              fontSize: participant.nama_lengkap.length > 28 ? '2rem'
                      : participant.nama_lengkap.length > 20 ? '2.6rem'
                      : participant.nama_lengkap.length > 14 ? '3rem'
                      : '3.5rem',
              fontWeight:700,
              color: GOLD,
              lineHeight: 1.5,
              paddingBottom: '0.3em',
              wordBreak: 'break-word',
              zIndex: 10,
            }}>
              {participant.nama_lengkap}
            </div>

            {/* ── Category value (Poppins bold) ───────────────────── */}
            {/* Below "Category" label, above "as" label in template */}
            <div style={{
              position:'absolute', top:'50.5%', left:0, right:0,
              textAlign:'center',
              fontFamily:"'Poppins', sans-serif",
              fontSize:'1.05rem', fontWeight:700,
              color: TEXT,
            }}>
              {category}
            </div>

            {/* ── Achievement text (Cormorant SC, gold) ─────────────── */}
            {/* Below "as" label — short text (winner) gets big, long text gets small */}
            <div style={{
              position:'absolute', top:'61%', left:'5%', right:'5%',
              textAlign:'center',
              fontFamily:"'Cormorant SC', serif",
              fontSize: achievement.length <= 12 ? '3rem'
                      : achievement.length <= 18 ? '2rem'
                      : '1.15rem',
              fontWeight:700,
              color: GOLD,
              letterSpacing: achievement.length <= 12 ? '0.08em' : '0.04em',
              lineHeight: 1.1,
            }}>
              {achievement}
            </div>

            {/* ── QR Code — di atas tanda tangan Muhammad Amarjid ── */}
            <div style={{
              position:'absolute', bottom:'16%', left:'50%',
              transform:'translateX(-50%)',
              display:'flex', flexDirection:'column', alignItems:'center',
            }}>
              <QRCodeSVG
                value={verifyUrl}
                size={80}
                fgColor="#3D2B00"
                bgColor="#FAF7F0"
                level="H"
              />
            </div>

          </div>
        </div>
      </div>

      <button onClick={downloadPdf} disabled={isGenerating}
        className="btn btn--primary" style={{ minWidth:'16rem', justifyContent:'center' }}>
        {isGenerating ? t('cert_generating') : t('cert_download')}
      </button>

    </div>
  )
}


