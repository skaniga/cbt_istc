'use client'

import { useState, useEffect } from 'react'
import { saveAnswer, finishExam } from './actions'

type Question = {
  id: string
  pertanyaan: string
  pilihan_a: string
  pilihan_b: string
  pilihan_c: string
  pilihan_d: string
}

type AnswerMap = Record<string, string>

export default function CbtClient({
  examSessionId,
  questions,
  initialAnswers,
  endTimeStr
}: {
  examSessionId: string
  questions: Question[]
  initialAnswers: AnswerMap
  endTimeStr: string // ISO string of when the exam ends
}) {
  const [answers, setAnswers] = useState<AnswerMap>(initialAnswers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isFinishing, setIsFinishing] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  // Timer logic
  useEffect(() => {
    const endTime = new Date(endTimeStr).getTime()
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = endTime - now
      
      if (diff <= 0) {
        clearInterval(interval)
        setTimeLeft(0)
        handleFinish() // Auto finish
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTimeStr])

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
  if (!currentQ) return <div>Data soal tidak tersedia.</div>

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Mobile Nav Toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setNavOpen(!navOpen)}
            style={{ display: 'none', padding: '0.5rem', background: 'var(--border)', borderRadius: '4px' }}
          >
            ☰ Soal
          </button>
          <span className="label" style={{ margin: 0 }}>Soal {currentIndex + 1} dari {questions.length}</span>
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
              {currentQ.pertanyaan}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['A', 'B', 'C', 'D'].map(opt => {
                const text = currentQ[`pilihan_${opt.toLowerCase()}` as keyof Question]
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
              ← Sebelumnya
            </button>
            
            {isLastQuestion ? (
              <button 
                className="btn btn--primary" 
                style={{ background: 'var(--crimson)', color: '#fff', textShadow: 'none' }}
                onClick={() => {
                  if (confirm('Apakah Anda yakin ingin menyelesaikan ujian? Anda tidak dapat mengubah jawaban setelah ini.')) {
                    handleFinish()
                  }
                }}
                disabled={isFinishing}
              >
                {isFinishing ? 'Menyimpan...' : 'Selesai Ujian'}
              </button>
            ) : (
              <button 
                className="btn btn--primary" 
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Selanjutnya →
              </button>
            )}
          </div>
        </div>

        {/* Sidebar (Grid Soal) */}
        <aside className={`cbt-sidebar ${navOpen ? 'cbt-sidebar--open' : ''}`}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <p className="label">Navigasi Soal</p>
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
