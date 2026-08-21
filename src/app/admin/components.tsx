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
          ? 'Memproses...' 
          : isAksesTerbuka ? 'Tutup Akses Ujian' : 'Buka Akses Ujian'
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
        {pending ? 'Menyimpan log...' : 'Trigger Keep Alive (Ping DB)'}
      </button>
    </form>
  )
}
