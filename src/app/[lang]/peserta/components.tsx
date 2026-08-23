'use client'

import { useFormStatus } from 'react-dom'
import { startExam } from './actions'

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  
  return (
    <button type="submit" className="btn btn--primary" disabled={pending} style={{ minWidth: '12rem', justifyContent: 'center' }}>
      {pending ? 'Memproses...' : label}
    </button>
  )
}

export function StartExamForm({ buttonLabel = "Mulai Ujian" }: { buttonLabel?: string }) {
  return (
    <form action={startExam}>
      <SubmitButton label={buttonLabel} />
    </form>
  )
}
