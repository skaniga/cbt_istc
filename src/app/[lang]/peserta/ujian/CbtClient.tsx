'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { saveAnswer, finishExam } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { TranslationKey } from '@/lib/i18n/translations'
import { useExamGuard } from './useExamGuard'

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
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

// Modal konfirmasi submit (#5)
function SubmitConfirmModal({
  unansweredCount,
  totalCount,
  onConfirm,
  onCancel,
  isFinishing,
  t,
}: {
  unansweredCount: number
  totalCount: number
  onConfirm: () => void
  onCancel: () => void
  isFinishing: boolean
  t: (key: TranslationKey) => string
}) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(28,23,20,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div className="card ornate-frame" style={{ maxWidth: '26rem', width: '100%' }}>
        <p className="label" style={{ marginBottom: '0.75rem', color: unansweredCount > 0 ? 'var(--crimson)' : 'var(--brass)' }}>
          {unansweredCount > 0 ? '⚠ Perhatian' : '✓ Siap Submit'}
        </p>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          {t('exam_confirm_submit')}
        </h3>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem', marginBottom: '1.5rem',
        }}>
          <div style={{ background: 'var(--bg-alt)', padding: '0.875rem', borderRadius: '4px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', lineHeight: 1, color: 'var(--brass)' }}>
              {totalCount - unansweredCount}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>
              Terjawab
            </p>
          </div>
          <div style={{ background: 'var(--bg-alt)', padding: '0.875rem', borderRadius: '4px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', lineHeight: 1, color: unansweredCount > 0 ? 'var(--crimson)' : 'var(--muted-fg)' }}>
              {unansweredCount}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-fg)', marginTop: '0.25rem' }}>
              Belum Dijawab
            </p>
          </div>
        </div>

        {unansweredCount > 0 && (
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-fg)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Masih ada <strong>{unansweredCount} soal</strong> yang belum dijawab. Apakah Anda yakin ingin mengakhiri ujian?
          </p>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn--secondary" onClick={onCancel} style={{ flex: 1, justifyContent: 'center' }} disabled={isFinishing}>
            Kembali
          </button>
          <button
            className="btn btn--primary"
            onClick={onConfirm}
            style={{ flex: 1, justifyContent: 'center', background: 'var(--crimson)', color: '#fff', textShadow: 'none' }}
            disabled={isFinishing}
          >
            {isFinishing ? t('exam_saving') : t('exam_submit')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CbtClient({
  examSessionId,
  questions,
  initialAnswers,
  endTimeStr,
  serverTimeStr,
  kategori
}: {
  examSessionId: string
  questions: Question[]
  initialAnswers: AnswerMap
  endTimeStr: string
  serverTimeStr: string
  kategori?: string
}) {
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [navOpen, setNavOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // ── Guard Refs ──────────────────────────────────────────────────
  // useRef (bukan useState) agar cegah double-submit bahkan sebelum re-render
  const isFinishingRef = useRef(false)
  const [isFinishingDisplay, setIsFinishingDisplay] = useState(false)

  const pendingSaves = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const { t, locale } = useLanguage()

  // Integrasikan guard: beforeunload + multi-tab + offline queue
  const { addToQueue, removeFromQueue, flushQueue } = useExamGuard(examSessionId, true)

  // Progress
  const answeredCount = Object.keys(answers).length
  const progressPct = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  // Timer states
  const isCritical = timeLeft !== null && timeLeft < 300
  const isUrgent = timeLeft !== null && timeLeft < 60

  // ── Online/offline indicator ──────────────────────────────────
  useEffect(() => {
    const setOnline = () => setIsOnline(true)
    const setOffline = () => setIsOnline(false)
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)
    setIsOnline(navigator.onLine)
    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  // ── Timer ──────────────────────────────────────────────────────
  useEffect(() => {
    const endTime = new Date(endTimeStr).getTime()
    const serverTimeOnLoad = new Date(serverTimeStr).getTime()
    const timeDelta = serverTimeOnLoad - Date.now()

    const interval = setInterval(() => {
      const diff = endTime - (Date.now() + timeDelta)
      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
        void handleFinish()
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTimeStr, serverTimeStr])

  useEffect(() => {
    const map = pendingSaves.current
    return () => { map.forEach(timeout => clearTimeout(timeout)) }
  }, [])

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--:--'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // ── Debounced save + offline queue ────────────────────────────
  const debouncedSave = useCallback((questionId: string, option: string) => {
    const existing = pendingSaves.current.get(questionId)
    if (existing) clearTimeout(existing)
    setSaveStatus('saving')

    const timeout = setTimeout(async () => {
      pendingSaves.current.delete(questionId)

      if (!navigator.onLine) {
        // Offline — simpan di antrian lokal, akan di-retry saat online
        addToQueue(questionId, option)
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
        return
      }

      const result = await saveAnswer(examSessionId, questionId, option)
      if (result?.error) {
        // Gagal — masukkan ke offline queue untuk retry
        addToQueue(questionId, option)
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        removeFromQueue(questionId)
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 1500)
      }
    }, 400)

    pendingSaves.current.set(questionId, timeout)
  }, [examSessionId, addToQueue, removeFromQueue])

  const handleOptionClick = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
    debouncedSave(questionId, option)
  }

  // ── Finish exam — useRef guard mencegah double-submit ─────────
  const handleFinish = useCallback(async () => {
    // Guard dengan useRef — aman dari race condition sebelum re-render
    if (isFinishingRef.current) return
    isFinishingRef.current = true
    setIsFinishingDisplay(true)

    // Flush pending debounce
    pendingSaves.current.forEach(timeout => clearTimeout(timeout))
    pendingSaves.current.clear()

    // Flush offline queue sebelum submit
    if (navigator.onLine) await flushQueue()

    await finishExam(examSessionId)
  }, [examSessionId, flushQueue])

  const currentQ = questions[currentIndex]
  if (!currentQ) return <div>{t('exam_data_unavailable')}</div>

  const getTranslated = (q: Question, field: 'pertanyaan' | 'pilihan_a' | 'pilihan_b' | 'pilihan_c' | 'pilihan_d') => {
    if (locale === 'en' && q[`${field}_en`]) return q[`${field}_en`]
    if (locale === 'ms' && q[`${field}_ms`]) return q[`${field}_ms`]
    return q[field]
  }

  const isLastQuestion = currentIndex === questions.length - 1
  const isFirstQuestion = currentIndex === 0
  const unansweredCount = questions.length - answeredCount

  const saveIndicator = {
    idle:   { text: '',               color: 'transparent' },
    saving: { text: '↑ Menyimpan...', color: 'var(--muted-fg)' },
    saved:  { text: '✓ Tersimpan',    color: '#27AE60' },
    error:  { text: isOnline ? '✗ Gagal simpan' : '⚡ Mode Offline', color: 'var(--crimson)' },
  }[saveStatus]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 5rem)' }}>

      {/* Progress bar tipis (#4) */}
      <div style={{ height: '3px', background: 'var(--border)', position: 'sticky', top: '5rem', zIndex: 41 }}>
        <div style={{
          height: '100%',
          width: `${progressPct}%`,
          background: progressPct === 100 ? '#27AE60' : 'linear-gradient(90deg, var(--brass-light), var(--brass))',
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Offline Banner */}
      {!isOnline && (
        <div style={{
          background: 'var(--crimson)', color: '#fff',
          textAlign: 'center', padding: '0.6rem',
          fontFamily: 'var(--font-display)', fontSize: '0.6rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          ⚡ Anda Sedang Offline — Jawaban disimpan sementara dan akan dikirim saat koneksi pulih
        </div>
      )}

      {/* Header CBT */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.875rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 'calc(5rem + 3px)', zIndex: 40, gap: '1rem', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Mobile Nav Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
            style={{ display: 'none', padding: '0.5rem', background: 'var(--border)', borderRadius: '4px' }}
          >
            ☰ {t('exam_question')}
          </button>
          <span className="label" style={{ margin: 0 }}>{t('exam_question')} {currentIndex + 1} {t('exam_of')} {questions.length}</span>
          {kategori && (
            <span style={{
              fontSize: '0.72rem', fontFamily: 'var(--font-display)', letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--brass)',
              background: 'rgba(180,130,60,0.1)', border: '1px solid var(--brass)',
              padding: '0.2rem 0.6rem', borderRadius: '999px',
              display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
            }}>
              {kategori === 'Environmental Technology' ? '🌱' : kategori === 'Smart Robotics' ? '🤖' : kategori === 'Science In Action' ? '🔬' : '📐'}
              {' '}{kategori}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Save indicator */}
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '0.6rem',
            letterSpacing: '0.1em', color: saveIndicator.color,
            transition: 'color 0.3s ease', minWidth: '9rem', textAlign: 'right',
          }}>
            {saveIndicator.text}
          </span>

          {/* Timer (#7) */}
          <div
            className={isCritical ? (isUrgent ? 'timer-urgent' : 'timer-critical') : ''}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600,
              color: isCritical ? 'var(--crimson)' : 'var(--fg)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}
          >
            ⏱ {formatTime(timeLeft)}
          </div>

          {/* Tombol selesaikan — selalu ada (#5) */}
          <button
            className="btn btn--primary"
            style={{
              background: 'var(--crimson)', color: '#fff',
              textShadow: 'none', fontSize: '0.55rem', padding: '0.6rem 1rem',
            }}
            onClick={() => setShowSubmitModal(true)}
            disabled={isFinishingDisplay}
          >
            {isFinishingDisplay ? t('exam_saving') : '⏹ Selesaikan'}
          </button>
        </div>
      </div>

      {/* Modal konfirmasi (#5) */}
      {showSubmitModal && (
        <SubmitConfirmModal
          unansweredCount={unansweredCount}
          totalCount={questions.length}
          onConfirm={() => { setShowSubmitModal(false); void handleFinish() }}
          onCancel={() => setShowSubmitModal(false)}
          isFinishing={isFinishingDisplay}
          t={t}
        />
      )}

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>

        {/* Main Content */}
        <div className="cbt-main-content" style={{ flex: 1, padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>

          <div className="card ornate-frame" style={{ marginBottom: '2rem' }}>
            {/* Soal — maxHeight + scroll untuk teks sangat panjang (#9) */}
            <div style={{
              maxHeight: '40vh', overflowY: 'auto',
              marginBottom: '2rem', paddingRight: '0.5rem',
            }}>
              <h2 style={{ fontSize: '1.4rem', lineHeight: 1.7, wordBreak: 'break-word' }}>
                {getTranslated(currentQ, 'pertanyaan')}
              </h2>
            </div>

            {/* Pilihan jawaban (#11 aria) */}
            <div role="radiogroup" aria-label="Pilihan jawaban" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(['A', 'B', 'C', 'D'] as const).map(opt => {
                const fieldName = `pilihan_${opt.toLowerCase()}` as 'pilihan_a' | 'pilihan_b' | 'pilihan_c' | 'pilihan_d'
                const text = getTranslated(currentQ, fieldName)
                const isSelected = answers[currentQ.id] === opt

                return (
                  <button
                    key={opt}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Pilihan ${opt}: ${text}`}
                    onClick={() => handleOptionClick(currentQ.id, opt)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '1rem',
                      padding: '1rem', textAlign: 'left',
                      border: `1.5px solid ${isSelected ? 'var(--brass)' : 'var(--border)'}`,
                      borderRadius: '4px',
                      background: isSelected ? 'rgba(201,169,98,0.08)' : 'var(--bg)',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      wordBreak: 'break-word', // handle teks panjang pada pilihan (#9)
                    }}
                  >
                    <span style={{
                      width: '2rem', height: '2rem', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%', background: isSelected ? 'var(--brass)' : 'var(--bg-alt)',
                      color: isSelected ? 'var(--on-brass)' : 'var(--muted-fg)',
                      fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600,
                    }}>
                      {opt}
                    </span>
                    <span style={{ fontSize: '1.05rem', marginTop: '0.15rem', color: isSelected ? 'var(--fg)' : 'var(--muted-fg)', lineHeight: 1.6 }}>
                      {text}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Navigasi soal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <button
              className="btn btn--secondary"
              disabled={isFirstQuestion}
              onClick={() => setCurrentIndex(prev => prev - 1)}
            >
              ← {t('exam_prev')}
            </button>

            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--muted-fg)', letterSpacing: '0.1em' }}>
              {currentIndex + 1} / {questions.length}
            </span>

            {isLastQuestion ? (
              <button
                className="btn btn--primary"
                style={{ background: 'var(--crimson)', color: '#fff', textShadow: 'none' }}
                onClick={() => setShowSubmitModal(true)}
                disabled={isFinishingDisplay}
              >
                {isFinishingDisplay ? t('exam_saving') : t('exam_submit')}
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

        {/* Sidebar */}
        <aside className={`cbt-sidebar ${navOpen ? 'cbt-sidebar--open' : ''}`}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <p className="label" style={{ marginBottom: '0.25rem' }}>{t('exam_nav')}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-fg)' }}>
              {answeredCount} / {questions.length} dijawab
            </p>
          </div>

          <div style={{
            padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem',
            overflowY: 'auto', maxHeight: 'calc(100vh - 16rem)',
          }}>
            {questions.map((q, i) => {
              const isAnswered = !!answers[q.id]
              const isActive = i === currentIndex

              let bg = 'var(--bg)'
              let border = 'var(--border)'
              let color = 'var(--muted-fg)'

              if (isActive) { bg = 'var(--brass)'; border = 'var(--brass)'; color = 'var(--on-brass)' }
              else if (isAnswered) { bg = 'var(--bg-deep)'; border = 'var(--brass-light)'; color = 'var(--fg)' }

              return (
                <button
                  key={q.id}
                  onClick={() => { setCurrentIndex(i); setNavOpen(false) }}
                  aria-label={`Soal ${i + 1}${isAnswered ? ' (sudah dijawab)' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bg, border: `1px solid ${border}`, borderRadius: '4px',
                    fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: color,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          {/* Submit dari sidebar (#5) */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)' }}>
            <button
              className="btn btn--primary"
              style={{
                width: '100%', justifyContent: 'center',
                background: 'var(--crimson)', color: '#fff', textShadow: 'none',
              }}
              onClick={() => { setNavOpen(false); setShowSubmitModal(true) }}
              disabled={isFinishingDisplay}
            >
              {isFinishingDisplay ? t('exam_saving') : '⏹ Selesaikan Ujian'}
            </button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {navOpen && (
          <div
            onClick={() => setNavOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45 }}
          />
        )}
      </div>
    </div>
  )
}
