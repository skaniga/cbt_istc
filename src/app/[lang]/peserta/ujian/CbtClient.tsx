'use client'

import { useState, useEffect } from 'react'
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
  const [isFinishing, setIsFinishing] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
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
        handleFinish() // Auto finish
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTimeStr, serverTimeStr])

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--:--'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleOptionClick = async (questionId: string, option: string) => {
    // Update UI immediately (Optimistic)
    setAnswers(prev => ({ ...prev, [questionId]: option }))
    
    // Save to server
    await saveAnswer(examSessionId, questionId, option)
  }

  const handleFinish = async () => {
    if (isFinishing) return
    setIsFinishing(true)
    await finishExam(examSessionId)
  }

  const currentQ = questions[currentIndex]
  if (!currentQ) return <div>{t('exam_data_unavailable')}</div>

  // Helper to get translated field based on locale
  const getTranslated = (q: Question, field: 'pertanyaan' | 'pilihan_a' | 'pilihan_b' | 'pilihan_c' | 'pilihan_d') => {
    if (locale === 'en' && q[`${field}_en`]) return q[`${field}_en`];
    if (locale === 'ms' && q[`${field}_ms`]) return q[`${field}_ms`];
    return q[field]; // Fallback to Indonesian
  }

  const isLastQuestion = currentIndex === questions.length - 1
  const isFirstQuestion = currentIndex === 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 5rem)' }}>
      
      {/* Header CBT */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: '5rem', zIndex: 40
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
        
        <div style={{ 
          fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600,
          color: (timeLeft && timeLeft < 300) ? 'var(--crimson)' : 'var(--fg)',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Main Content (Question & Options) */}
        <div style={{ flex: 1, padding: '2rem', maxWidth: '48rem', margin: '0 auto' }}>
          
          <div className="card ornate-frame" style={{ marginBottom: '2rem', minHeight: '300px' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              {getTranslated(currentQ, 'pertanyaan')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['A', 'B', 'C', 'D'].map(opt => {
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

        {/* Sidebar (Grid Soal) */}
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

      <style jsx>{`
        .cbt-sidebar {
          width: 300px;
          border-left: 1px solid var(--border);
          background: var(--bg-alt);
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .mobile-nav-toggle { display: block !important; }
          .cbt-sidebar {
            position: fixed;
            top: 5rem;
            bottom: 0;
            left: 0;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
          }
          .cbt-sidebar--open {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
