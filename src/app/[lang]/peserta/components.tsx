'use client'

import { useFormStatus } from 'react-dom'
import { startExam } from './actions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  const { t } = useLanguage()
  
  return (
    <button type="submit" className="btn btn--primary" disabled={pending} style={{ minWidth: '12rem', justifyContent: 'center' }}>
      {pending ? t('btn_processing') : label}
    </button>
  )
}

export function StartExamForm({ buttonLabel = "Mulai Ujian" }: { buttonLabel?: string }) {
  return (
    <form action={() => { void startExam() }}>
      <SubmitButton label={buttonLabel} />
    </form>
  )
}