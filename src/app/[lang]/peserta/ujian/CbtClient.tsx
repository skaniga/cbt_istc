'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { saveAnswer, finishExam } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

type Question = {
  id: string
  pertanyaan: string
  pilihan_a: string
  pilihan_b: string
  pilihan_c: string
  pilihan_d: string
  pertanyaan_en?: string
  pilihan_a_en?: string
  pilihan_b_en?: string
  pilihan_c_en?: string
  pilihan_d_en?: string
  pertanyaan_ms?: string
  pilihan_a_ms?: string
  pilihan_b_ms?: string
  pilihan_c_ms?: string
  pilihan_d_ms?: string
}

type AnswerMap = Record<string, string>

// Status indikator untuk auto-save feedback (#8)
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export default function CbtClient({
  examSessionId,
  questions,
  initialAnswers,
  endTimeStr,
  serverTimeStr
}: {
  examSessionId: string
  questions: Question[]
  initialAnswers: AnswerMap
  endTimeStr: string
  serverTimeStr: string
}) {
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isFinishing, setIsFinishing] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle') // #8 save indicator

  // #1 Race condition fix: debounce per-question menggunakan ref Map
  // Menyimpan pending timeout ID untuk setiap question ID
  const pendingSaves = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const { t, locale } = useLanguage()

  // Timer logic
  useEffect(() => {
    const endTime = new Date(endTimeStr).getTime()
    const serverTimeOnLoad = new Date(serverTimeStr).getTime()
    const localTimeOnLoad = new Date().getTime()
    const timeDelta = serverTimeOnLoad - localTimeOnLoad
    
    const interval = setInterval(() => {
      const nowLocal = new Date().getTime()
      const nowServer = nowLocal + timeDelta
      const diff = endTime - nowServer
      
      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
        handleFinish() // Auto finish saat waktu habis
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTimeStr, serverTimeStr])

  // Cleanup semua pending debounce saat component unmount
  useEffect(() => {
    const map = pendingSaves.current
    return () => {
      map.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--:--'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // #1 Debounced save — mencegah race condition jika peserta klik cepat-cepat
  // Hanya request TERAKHIR yang dikirim ke server setelah 400ms tidak ada klik lagi
  const debouncedSave = useCallback((questionId: string, option: string) => {
    // Cancel pending save untuk soal yang sama jika ada
    const existing = pendingSaves.current.get(questionId)
    if (existing) clearTimeout(existing)

    // Set save status ke 'saving' segera
    setSaveStatus('saving')

    // Jadwalkan save baru
    const timeout = setTimeout(async () => {
      pendingSaves.current.delete(questionId)
      const result = await saveAnswer(examSessionId, questionId, option)
      
      // #8 Update save indicator berdasarkan hasil
      if (result?.error) {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 1500)
      }
    }, 400) // 400ms debounce

    pendingSaves.current.set(questionId, timeout)
  }, [examSessionId])

  const handleOptionClick = (questionId: string, option: string) => {
    // Update UI segera (Optimistic)
    setAnswers(prev => ({ ...prev, [questionId]: option }))
    // Kirim ke server dengan debounce — mencegah race condition
    debouncedSave(questionId, option)
  }

  const handleFinish = async () => {
    if (isFinishing) return
    setIsFinishing(true)

    // Flush semua pending debounce sebelum finish
    pendingSaves.current.forEach(timeout => clearTimeout(timeout))
    pendingSaves.current.clear()

    await finishExam(examSessionId)
  }

  const currentQ = questions[currentIndex]
  if (!currentQ) return <div>{t('exam_data_unavailable')}</div>

  // Helper untuk mendapat teks soal berdasarkan bahasa aktif
  const getTranslated = (q: Question, field: 'pertanyaan' | 'pilihan_a' | 'pilihan_b' | 'pilihan_c' | 'pilihan_d') => {
    if (locale === 'en' && q[`${field}_en`]) return q[`${field}_en`]
    if (locale === 'ms' && q[`${field}_ms`]) return q[`${field}_ms`]
    return q[field]
  }

  const isLastQuestion = currentIndex === questions.length - 1
  const isFirstQuestion = currentIndex === 0

  // #8 Save indicator label & color
  const saveIndicator = {
    idle:   { text: '',           color: 'transparent' },
    saving: { text: '↑ Menyimpan...', color: 'var(--muted-fg)' },
    saved:  { text: '✓ Tersimpan',    color: '#27AE60' },
    error:  { text: '✗ Gagal simpan', color: 'var(--crimson)' },
  }[saveStatus]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 5rem)' }}>
      
      {/* Header CBT */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: '5rem', zIndex: 40
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Mobile Nav Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
          >
            ☰ {t('exam_question')}
          </button>
          <span className="label" style={{ margin: 0 }}>{t('exam_question')} {currentIndex + 1} {t('exam_of')} {questions.length}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* #8 Auto-save indicator */}
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: saveIndicator.color,
            transition: 'color 0.3s ease',
            minWidth: '8rem',
            textAlign: 'right'
          }}>
            {saveIndicator.text}
          </span>

          {/* Timer */}
          <div style={{ 
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600,
            color: (timeLeft && timeLeft < 300) ? 'var(--crimson)' : 'var(--fg)',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Main Content (Question & Options) */}
        <div className="cbt-main-content" style={{ flex: 1, padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
          
          <div className="card ornate-frame" style={{ marginBottom: '2rem', minHeight: '300px' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              {getTranslated(currentQ, 'pertanyaan')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(['A', 'B', 'C', 'D'] as const).map(opt => {
                const fieldName = `pilihan_${opt.toLowerCase()}` as 'pilihan_a' | 'pilihan_b' | 'pilihan_c' | 'pilihan_d'
                const text = getTranslated(currentQ, fieldName)
                const isSelected = answers[currentQ.id] === opt
                
                return (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(currentQ.id, opt)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '1rem',
                      padding: '1rem', textAlign: 'left',
                      border: `1.5px solid ${isSelected ? 'var(--brass)' : 'var(--border)'}`,
                      borderRadius: '4px',
                      background: isSelected ? 'rgba(201,169,98,0.08)' : 'var(--bg)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ 
                      width: '2rem', height: '2rem', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: isSelected ? 'var(--brass)' : 'var(--bg-alt)',
                      color: isSelected ? 'var(--on-brass)' : 'var(--muted-fg)',
                      fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600
                    }}>
                      {opt}
                    </span>
                    <span style={{ fontSize: '1.1rem', marginTop: '0.1rem', color: isSelected ? 'var(--fg)' : 'var(--muted-fg)' }}>
                      {text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <button 
              className="btn btn--secondary" 
              disabled={isFirstQuestion}
              onClick={() => setCurrentIndex(prev => prev - 1)}
            >
              ← {t('exam_prev')}
            </button>
            
            {isLastQuestion ? (
              <button 
                className="btn btn--primary" 
                style={{ background: 'var(--crimson)', color: '#fff', textShadow: 'none' }}
                onClick={() => {
                  if (confirm(t('exam_confirm_submit'))) {
                    handleFinish()
                  }
                }}
                disabled={isFinishing}
              >
                {isFinishing ? t('exam_saving') : t('exam_submit')}
              </button>
            ) : (
              <button 
                className="btn btn--primary" 
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                {t('exam_next')} →
              </button>
            )}
          </div>
        </div>

        {/* Sidebar (Grid Soal) — #9 CSS class pakai globals.css */}
        <aside className={`cbt-sidebar ${navOpen ? 'cbt-sidebar--open' : ''}`}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <p className="label">{t('exam_nav')}</p>
          </div>
          <div style={{ 
            padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem',
            overflowY: 'auto', maxHeight: 'calc(100vh - 12rem)'
          }}>
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id]
              const isActive = i === currentIndex

              let bg = 'var(--bg)'
              let border = 'var(--border)'
              let color = 'var(--muted-fg)'

              if (isActive) {
                bg = 'var(--brass)'
                border = 'var(--brass)'
                color = 'var(--on-brass)'
              } else if (isAnswered) {
                bg = 'var(--bg-deep)'
                border = 'var(--brass-light)'
                color = 'var(--fg)'
              }

              return (
                <button
                  key={q.id}
                  onClick={() => { setCurrentIndex(i); setNavOpen(false) }}
                  style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bg, border: `1px solid ${border}`, borderRadius: '4px',
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: color,
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Mobile Overlay */}
        {navOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setNavOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45 }}
          />
        )}

      </div>
    </div>
  )
}
