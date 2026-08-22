'use client'

import { useFormStatus } from 'react-dom'
import { toggleAksesUjian, manualKeepAlive } from './actions'

export function ToggleAksesForm({ currentStatus }: { currentStatus: string }) {
  const { pending } = useFormStatus()
  const isAksesTerbuka = currentStatus === 'true'

  return (
    <form action={() => toggleAksesUjian(currentStatus)}>
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
    <form action={manualKeepAlive}>
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
