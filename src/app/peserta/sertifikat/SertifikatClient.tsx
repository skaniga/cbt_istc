'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Participant } from '@/lib/types'

export default function SertifikatClient({
  participant,
  namaLomba,
  tahun
}: {
  participant: Participant
  namaLomba: string
  tahun: string
}) {
  const certRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadPdf = async () => {
    if (!certRef.current) return
    setIsGenerating(true)

    try {
      // Tunggu font selesai dimuat agar hasil kanvas sempurna
      await document.fonts.ready

      const canvas = await html2canvas(certRef.current, {
        scale: 3, // Skala lebih tinggi untuk kualitas cetak yang lebih baik
        useCORS: true,
        backgroundColor: '#FAFAF8',
      })

      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      
      // Menggunakan orientasi landscape A4
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

  // Tanggal Hari Ini untuk sertifikat
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Tampilan Sertifikat (Yang akan dikonversi ke PDF) */}
      <div style={{ 
        width: '100%', maxWidth: '1122px', overflowX: 'auto', 
        boxShadow: 'var(--shadow-lg)', marginBottom: '3rem', background: '#FAFAF8'
      }}>
        {/* Hint scroll untuk mobile */}
        <p className="sertifikat-scroll-hint" style={{ 
          display: 'none', fontSize: '0.8rem', color: 'var(--muted-fg)', 
          textAlign: 'center', padding: '0.75rem', background: 'var(--bg-alt)',
          borderBottom: '1px solid var(--border)', fontStyle: 'italic'
        }}>Geser ke kiri/kanan untuk melihat sertifikat lengkap</p>
        <div 
          ref={certRef}
          style={{
            width: '1122px', // Resolusi A4 landscape ~ 297mm (1122px) 
            height: '793px', // Resolusi A4 landscape ~ 210mm (793px)
            background: '#FAFAF8',
            position: 'relative',
            padding: '40px',
            boxSizing: 'border-box'
          }}
        >
          {/* Ornate Border Dalam */}
          <div style={{
            position: 'absolute', inset: '40px',
            border: '2px solid var(--brass)',
            outline: '1px solid var(--brass)',
            outlineOffset: '6px',
            pointerEvents: 'none'
          }}>
            {/* Corner flourishes */}
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: '1px solid var(--brass)' }} />
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: '1px solid var(--brass)' }} />
            <div style={{ position: 'absolute', bottom: '-10px', left: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: '1px solid var(--brass)' }} />
            <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '20px', height: '20px', background: '#FAFAF8', border: '1px solid var(--brass)' }} />
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
            
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--brass)', marginBottom: '2rem' }}>
              CERTIFICATE OF ACHIEVEMENT
            </p>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', fontWeight: 400, color: 'var(--fg)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {participant.nama_lengkap}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
              <span style={{ height: '1px', width: '100px', background: 'var(--brass)' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--muted-fg)' }}>
                Telah berhasil menyelesaikan ujian kompetensi dengan skor <strong>{participant.skor}</strong><br/>
                dan dinyatakan <strong>{participant.lulus ? 'LULUS' : 'SELESAI'}</strong> pada
              </p>
              <span style={{ height: '1px', width: '100px', background: 'var(--brass)' }} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 500, color: 'var(--fg)', marginBottom: '0.5rem' }}>
              {namaLomba} {tahun}
            </h2>

            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--muted-fg)', marginTop: 'auto' }}>
              NOMOR PESERTA: {participant.nomor_peserta} <br/>
              DITERBITKAN: {today}
            </p>

            {/* Wax Seal Imitation */}
            <div style={{
              position: 'absolute', bottom: '4rem', right: '6rem',
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #A83040, var(--crimson) 55%, #6B1A28)',
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
                KETUA PENYELENGGARA
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
        {isGenerating ? 'Menyiapkan PDF...' : 'Unduh Sertifikat (PDF)'}
      </button>

    </div>
  )
}
