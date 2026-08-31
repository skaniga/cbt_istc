'use client'

import { useFormStatus } from 'react-dom'
import { useState } from 'react'
import { toggleAksesUjian, manualKeepAlive, saveSettings } from './actions'

export function ToggleAksesForm({ currentStatus }: { currentStatus: string }) {
  const { pending } = useFormStatus()
  const isAksesTerbuka = currentStatus === 'true'

  return (
    <form action={() => { void toggleAksesUjian(currentStatus) }}>
      <button 
        type="submit" 
        className="btn" 
        disabled={pending}
        style={{ 
          background: isAksesTerbuka ? 'var(--crimson)' : '#27AE60',
          color: '#fff',
          textShadow: 'none',
          minWidth: '12rem',
          justifyContent: 'center'
        }}
      >
        {pending 
          ? 'Processing...' 
          : isAksesTerbuka ? 'Close Exam Access' : 'Open Exam Access'
        }
      </button>
    </form>
  )
}

export function KeepAliveForm() {
  const { pending } = useFormStatus()

  return (
    <form action={() => { void manualKeepAlive() }}>
      <button 
        type="submit" 
        className="btn btn--secondary" 
        disabled={pending}
      >
        {pending ? 'Saving log...' : 'Trigger Keep Alive (Ping DB)'}
      </button>
    </form>
  )
}

export function SettingsForm({ 
  currentBatasSoal, 
  currentAcakSoal 
}: { 
  currentBatasSoal: string
  currentAcakSoal: string 
}) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [msg, setMsg]       = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('saving')
    setMsg('')
    const fd = new FormData(e.currentTarget)
    const result = await saveSettings(fd)
    if (result?.error) {
      setStatus('error')
      setMsg(result.error)
    } else {
      setStatus('saved')
      setMsg('Settings saved successfully!')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-fg)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
          Number of Questions to Display
        </label>
        <input
          type="number"
          name="batas_soal"
          min={1}
          max={50}
          defaultValue={currentBatasSoal || '50'}
          className="input"
          style={{ width: '6rem' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-fg)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
          Randomize Questions
        </label>
        <select
          name="acak_soal"
          defaultValue={currentAcakSoal === 'true' ? 'true' : 'false'}
          className="input"
          style={{ width: '8rem' }}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <button
          type="submit"
          className="btn btn--secondary"
          disabled={status === 'saving'}
          style={{ whiteSpace: 'nowrap' }}
        >
          {status === 'saving' ? 'Saving...' : 'Save Settings'}
        </button>
        {msg && (
          <p style={{ fontSize: '0.8rem', color: status === 'error' ? 'var(--crimson)' : '#27AE60' }}>
            {msg}
          </p>
        )}
      </div>
    </form>
  )
}
