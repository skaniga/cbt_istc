'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { Participant } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'

// ────────────────────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH — semua posisi dalam piksel pada canvas 1122 × 793
//  Preview   = iframe yang menampilkan PDF blob yang sama
//  Download  = save PDF blob yang sama — mustahil beda!
// ────────────────────────────────────────────────────────────────────────────
const W      = 1122
const H      = 793
const SCALE  = 2          // Resolusi 2× (Retina / Print-ready)
const GOLD   = '#C8941A'
const TEXT   = '#2C2C2C'
const MUTED  = '#7A7A7A'

// ── Posisi teks (dalam koordinat canvas 1122 × 793) ─────────────────────────
const POS = {
  certNo     : 200,   // y — Nomor sertifikat
  name       : 309,   // y — Nama peserta
  category   : 400,   // y — Kategori · Level (centered antara "Category" & "as")
  achievement: 445,   // y — Penghargaan (naik 5px dari 450)
  qr         : 0.77,  // y fraksi H → y≈611, bottom≈696, nempel Muhammad ~700
  qrSize     : 85,    // ukuran QR
}

// ── Font size adaptif berdasarkan panjang teks ───────────────────────────────
function nameFontSize(len: number): number {
  if (len > 32) return 28
  if (len > 24) return 34
  if (len > 16) return 42
  return 50
}

function achFontSize(len: number): number {
  if (len <= 12) return 48
  if (len <= 18) return 32
  return 18
}

// ────────────────────────────────────────────────────────────────────────────

export default function SertifikatClient({
  participant,
  namaLomba,
  tahun,
  winnerData,
  namaKetua,
  jabatanKetua,
}: {
  participant  : Participant
  namaLomba    : string
  tahun        : string
  winnerData  ?: { peringkat: number; apresiasi: string } | null
  namaKetua   ?: string
  jabatanKetua?: string
}) {
  const { t, locale } = useLanguage()

  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null)  // JPEG untuk <img>
  const [isRendering,  setIsRendering]  = useState(true)
  const [renderError,  setRenderError]  = useState<string | null>(null)
  const pdfBlobRef    = useRef<Blob | null>(null)

  // ── Data sertifikat ────────────────────────────────────────────────────────
  const certNo      = participant.nomor_peserta ?? '—'
  const verifyUrl   = `https://istcompetition.my/certificate/${certNo.replace(/\//g, '-')}`
  const namaUpper   = participant.nama_lengkap.toUpperCase()
  const isWinner    = !!winnerData
  const category    = participant.kategori || 'International Science & Technology'

  // Level: "INTERMEDIATE" → "Intermediate" (huruf awal kapital saja)
  const level = isWinner && winnerData?.apresiasi
    ? winnerData.apresiasi.split(' - ')[1]?.trim() ?? ''
    : ''
  const levelDisplay = level
    ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
    : ''

  // Kategori: hilangkan dot ·, pakai Level Intermediate
  const categoryLine = levelDisplay
    ? `${category}  Level ${levelDisplay}`
    : category

  // No. Sertifikat: IPE-2026-0030 → 030-ISTC-2026 (hilangkan IPE, balik urutan)
  const certNoDisplay = (() => {
    const parts = certNo.split('-')
    if (parts.length >= 3 && parts[0] === 'IPE') {
      const year = parts[1]
      const num  = parseInt(parts[2], 10).toString().padStart(3, '0')
      return `${num}-ISTC-${year}`
    }
    return certNo
  })()

  // Achievement: "1st Place" saja (hilangkan " - INTERMEDIATE")
  const achievementText = isWinner
    ? (winnerData!.apresiasi?.split(' - ')[0] ?? '').trim()  // "1st Place"
    : t('cert_achievement')
  const peringkat = winnerData?.peringkat ?? 0
  const ordSuffix = peringkat === 1 ? 'st' : peringkat === 2 ? 'nd' : peringkat === 3 ? 'rd' : 'th'

  // ── Core: render canvas → jsPDF → blob URL ─────────────────────────────────
  const generatePdf = useCallback(async () => {
    setIsRendering(true)
    setRenderError(null)

    try {
      // 1. Tunggu semua font siap (Google Fonts + custom woff)
      await document.fonts.ready

      // 2. Buat canvas off-screen beresolusi tinggi
      const canvas     = document.createElement('canvas')
      canvas.width     = W * SCALE
      canvas.height    = H * SCALE
      const ctx        = canvas.getContext('2d')!
      ctx.scale(SCALE, SCALE)

      // 3. Gambar background template
      const bg = new Image()
      bg.crossOrigin = 'anonymous'
      await new Promise<void>((res, rej) => {
        bg.onload  = () => res()
        bg.onerror = () => rej(new Error('Gagal memuat cert_template.png'))
        bg.src     = '/cert_template.png'
      })
      ctx.drawImage(bg, 0, 0, W, H)

      ctx.textAlign    = 'center'
      ctx.textBaseline = 'top'

      // 4. Nomor sertifikat — format: 030-ISTC-2026
      ctx.font      = `400 13px "Glacial Indifference", sans-serif`
      ctx.fillStyle = MUTED
      ctx.fillText(`NO.  ${certNoDisplay}`, W / 2, POS.certNo)

      // 5. Nama peserta
      const namePx  = nameFontSize(namaUpper.length)
      ctx.font      = `700 ${namePx}px "Poppins", sans-serif`
      ctx.fillStyle = GOLD
      ctx.fillText(namaUpper, W / 2, POS.name)

      // 6. Kategori Level (tanpa dot ·)
      ctx.font      = '700 15px "Poppins", sans-serif'
      ctx.fillStyle = TEXT
      ctx.fillText(categoryLine, W / 2, POS.category)

      // 7. Penghargaan — "1ˢᵗ Place" dengan superscript ordinal
      if (isWinner && peringkat > 0) {
        const mainPx = 42
        const supPx  = Math.round(mainPx * 0.50)
        const base   = `${peringkat}`
        const rest   = ' Place'

        ctx.fillStyle  = GOLD
        ctx.textAlign  = 'left'

        ctx.font = `700 ${mainPx}px "Cormorant SC", serif`
        const baseW = ctx.measureText(base).width
        const restW = ctx.measureText(rest).width
        ctx.font = `700 ${supPx}px "Cormorant SC", serif`
        const supW  = ctx.measureText(ordSuffix).width

        const totalW = baseW + supW + restW
        const startX = W / 2 - totalW / 2

        // Gambar angka ("1")
        ctx.font = `700 ${mainPx}px "Cormorant SC", serif`
        ctx.fillText(base, startX, POS.achievement)

        // Gambar suffix superscript ("st") — lebih kecil, naik 28%
        ctx.font = `700 ${supPx}px "Cormorant SC", serif`
        ctx.fillText(ordSuffix, startX + baseW, POS.achievement - mainPx * 0.28)

        // Gambar " Place"
        ctx.font = `700 ${mainPx}px "Cormorant SC", serif`
        ctx.fillText(rest, startX + baseW + supW, POS.achievement)

        ctx.textAlign = 'center'
      } else {
        const achPx = achFontSize(achievementText.length)
        ctx.font      = `700 ${achPx}px "Cormorant SC", serif`
        ctx.fillStyle = GOLD
        ctx.fillText(achievementText.toUpperCase(), W / 2, POS.achievement)
      }

      // 8. QR Code
      try {
        const QRLib     = (await import('qrcode')).default
        const qrDataUrl = await QRLib.toDataURL(verifyUrl, {
          width : POS.qrSize * SCALE,
          margin: 1,
          color : { dark: '#3D2B00', light: '#FAF7F0' },
          errorCorrectionLevel: 'H',
        })
        const qrImg = new Image()
        await new Promise<void>(res => { qrImg.onload = () => res(); qrImg.src = qrDataUrl })
        const qrY = H * POS.qr
        ctx.drawImage(qrImg, W / 2 - POS.qrSize / 2, qrY, POS.qrSize, POS.qrSize)
      } catch {
        /* QR opsional — skip jika library tidak tersedia */
      }

      // 9. Canvas → jsPDF Blob
      const { jsPDF } = await import('jspdf')
      const pdf       = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      const pageW     = pdf.internal.pageSize.getWidth()
      const pageH     = pdf.internal.pageSize.getHeight()
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.97), 'JPEG',
        0, 0, pageW, pageH,
      )

      // 10. Simpan PDF blob untuk download
      const pdfBlob  = pdf.output('blob')
      pdfBlobRef.current = pdfBlob

      // 11. Preview: ambil JPEG langsung dari canvas — tidak ada CSP issue
      //     canvas.toDataURL() menghasilkan data: URL, bukan blob:, aman di semua browser
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      const jpegUrl  = canvas.toDataURL('image/jpeg', 0.97)
      setPreviewUrl(jpegUrl)

    } catch (err) {
      console.error(err)
      setRenderError(err instanceof Error ? err.message : 'Gagal membuat sertifikat')
    } finally {
      setIsRendering(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certNo, namaUpper, categoryLine, achievementText, verifyUrl]) // previewUrl intentionally excluded

  // Generate PDF saat komponen mount
  useEffect(() => {
    generatePdf()
    // cleanup: previewUrl adalah data: URL, tidak perlu revoke
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Deteksi iOS (iPhone / iPad) ────────────────────────────────────────────
  const isIOS = () =>
    typeof navigator !== 'undefined' &&
    /iP(hone|ad|od)/i.test(navigator.userAgent)

  // ── Download: Web Share API di iOS, blob download di browser lain ─────────
  const downloadPdf = async () => {
    if (!pdfBlobRef.current) return
    const safeCertNo = (participant.nomor_peserta || 'document').replace(/[/\\?%*:|"><]/g, '-')
    const fileName   = `Certificate_ISTC_${safeCertNo}.pdf`

    // iOS Safari: gunakan Web Share API agar muncul share sheet native
    // → user bisa pilih "Save to Files", AirDrop, dll
    if (isIOS() && navigator.canShare) {
      const file = new File([pdfBlobRef.current], fileName, { type: 'application/pdf' })
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: fileName })
          return
        } catch (err) {
          // User membatalkan share sheet — tidak perlu fallback
          if ((err as DOMException)?.name === 'AbortError') return
        }
      }
    }

    // Desktop / Android / browser lain: download biasa
    const a  = document.createElement('a')
    a.href   = URL.createObjectURL(pdfBlobRef.current)
    a.download = fileName
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 10_000)
  }

  // ── Label bahasa ────────────────────────────────────────────────────────────
  const labelLoading  = locale === 'id' ? 'Membuat sertifikat…'
    : locale === 'ms' ? 'Menjana sijil…'
    : 'Generating certificate…'
  const labelRetry    = locale === 'id' ? 'Coba Lagi'
    : locale === 'ms' ? 'Cuba Lagi'
    : 'Retry'
  const labelDownload = t('cert_download')
  const labelNote     = locale === 'id' ? 'Pratinjau Sertifikat'
    : locale === 'ms' ? 'Pratonton Sijil'
    : 'Certificate Preview'

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Google Fonts — dimuat di head agar document.fonts.ready bisa deteksi */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Cormorant+SC:wght@700&display=swap');
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

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

        {/* ── Loading State ── */}
        {isRendering && (
          <div style={{
            width: '100%', maxWidth: '1122px',
            aspectRatio: '1122 / 793',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #fdf8ee 0%, #f5edda 100%)',
            borderRadius: '8px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            gap: '1rem',
          }}>
            <div style={{
              width: '56px', height: '56px',
              border: '4px solid #e9d8a6',
              borderTop: `4px solid ${GOLD}`,
              borderRadius: '50%',
              animation: 'cert-spin 0.9s linear infinite',
            }} />
            <p style={{ color: MUTED, fontFamily: 'Georgia, serif', fontSize: '1rem' }}>
              {labelLoading}
            </p>
            <style>{`
              @keyframes cert-spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}

        {/* ── Error State ── */}
        {renderError && !isRendering && (
          <div style={{
            width: '100%', maxWidth: '1122px',
            aspectRatio: '1122 / 793',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#fff5f5',
            borderRadius: '8px', border: '1px solid #feb2b2',
            gap: '1rem',
          }}>
            <p style={{ color: '#c53030', fontSize: '1rem' }}>⚠️ {renderError}</p>
            <button onClick={generatePdf} className="btn btn--primary">
              {labelRetry}
            </button>
          </div>
        )}

        {/* ── Preview: <img> dari JPEG canvas — aman di semua browser, tidak kena CSP ── */}
        {previewUrl && !isRendering && (
          <>
            <p style={{
              color: MUTED, fontSize: '0.78rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', margin: 0,
            }}>
              📄 {labelNote}
            </p>
            <img
              src={previewUrl}
              alt="Certificate Preview"
              style={{
                width: '100%', maxWidth: '1122px',
                display: 'block',
                boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                objectFit: 'contain',
              }}
            />
          </>
        )}

        {/* ── Tombol Download ── */}
        <button
          onClick={downloadPdf}
          disabled={isRendering || !pdfBlobRef.current}
          className="btn btn--primary"
          style={{ minWidth: '16rem', justifyContent: 'center' }}
        >
          {isRendering ? labelLoading : labelDownload}
        </button>

      </div>
    </>
  )
}
