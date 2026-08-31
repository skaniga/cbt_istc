'use client'

import { useEffect, useRef, useCallback } from 'react'
import { saveAnswer } from '../ujian/actions'

const OFFLINE_QUEUE_KEY = 'istc_exam_offline_queue'
const EXAM_TAB_KEY = 'istc_exam_active_tab'

type QueuedAnswer = {
  examSessionId: string
  questionId: string
  answer: string
  timestamp: number
}

/**
 * Hook yang menangani:
 * 1. beforeunload warning — cegah peserta tidak sengaja keluar halaman ujian
 * 2. Multi-tab detection — cegah ujian dibuka di lebih dari 1 tab
 * 3. Offline queue + retry — jawaban yang gagal disimpan di localStorage & di-retry saat online
 */
export function useExamGuard(examSessionId: string, isActive: boolean) {
  const tabId = useRef<string>(`tab_${Date.now()}_${Math.random().toString(36).slice(2)}`)
  const isProcessingQueue = useRef(false)

  // ─────────────────────────────────────────────
  // 1. beforeunload — peringatan sebelum menutup/refresh tab
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!isActive) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // Browser modern mengabaikan custom message, tapi tetap menampilkan dialog standar
      e.returnValue = 'Ujian sedang berlangsung. Jika Anda meninggalkan halaman ini, progress Anda mungkin tidak tersimpan.'
      return e.returnValue
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isActive])

  // ─────────────────────────────────────────────
  // 2. Multi-tab detection via BroadcastChannel
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || typeof BroadcastChannel === 'undefined') return

    const channel = new BroadcastChannel(EXAM_TAB_KEY)
    const myTabId = tabId.current

    // Umumkan bahwa tab ini aktif
    channel.postMessage({ type: 'TAB_OPEN', tabId: myTabId, sessionId: examSessionId })

    channel.onmessage = (event) => {
      const { type, tabId: otherTabId, sessionId } = event.data

      // Jika tab lain buka ujian yang sama, tampilkan peringatan
      if (type === 'TAB_OPEN' && otherTabId !== myTabId && sessionId === examSessionId) {
        // Balas bahwa tab ini sudah ada
        channel.postMessage({ type: 'TAB_ALREADY_OPEN', tabId: myTabId, sessionId: examSessionId })

        // Tampilkan peringatan multi-tab
        alert(
          '⚠️ Ujian sedang dibuka di tab lain!\n\n' +
          'Untuk menghindari konflik data jawaban, harap tutup tab ini dan lanjutkan di tab yang sudah ada.'
        )
      }

      if (type === 'TAB_ALREADY_OPEN' && otherTabId !== myTabId && sessionId === examSessionId) {
        alert(
          '⚠️ Ujian sudah dibuka di tab lain!\n\n' +
          'Harap tutup salah satu tab untuk melanjutkan.'
        )
      }
    }

    return () => {
      channel.postMessage({ type: 'TAB_CLOSE', tabId: myTabId })
      channel.close()
    }
  }, [isActive, examSessionId])

  // ─────────────────────────────────────────────
  // 3. Offline queue — simpan jawaban gagal di localStorage
  // ─────────────────────────────────────────────
  const getQueue = useCallback((): QueuedAnswer[] => {
    try {
      const raw = localStorage.getItem(OFFLINE_QUEUE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }, [])

  const addToQueue = useCallback((questionId: string, answer: string) => {
    try {
      const queue = getQueue()
      // Upsert: hapus entry lama untuk soal yang sama, tambah yang baru
      const filtered = queue.filter(q => !(q.examSessionId === examSessionId && q.questionId === questionId))
      filtered.push({ examSessionId, questionId, answer, timestamp: Date.now() })
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(filtered))
    } catch {
      // localStorage bisa penuh di beberapa device — fail silently
    }
  }, [examSessionId, getQueue])

  const removeFromQueue = useCallback((questionId: string) => {
    try {
      const queue = getQueue()
      const filtered = queue.filter(q => !(q.examSessionId === examSessionId && q.questionId === questionId))
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(filtered))
    } catch { /* noop */ }
  }, [examSessionId, getQueue])

  // Retry semua jawaban yang ada di queue
  const flushQueue = useCallback(async () => {
    if (isProcessingQueue.current) return
    isProcessingQueue.current = true

    const queue = getQueue().filter(q => q.examSessionId === examSessionId)
    if (queue.length === 0) { isProcessingQueue.current = false; return }

    for (const item of queue) {
      try {
        const result = await saveAnswer(item.examSessionId, item.questionId, item.answer)
        if (!result?.error) {
          removeFromQueue(item.questionId)
        }
      } catch {
        // Masih offline, coba lagi nanti
      }
    }

    isProcessingQueue.current = false
  }, [examSessionId, getQueue, removeFromQueue])

  // Auto-flush saat koneksi kembali online
  useEffect(() => {
    if (!isActive) return

    const handleOnline = () => {
      console.log('[ExamGuard] Koneksi pulih — retry offline queue...')
      void flushQueue()
    }

    window.addEventListener('online', handleOnline)

    // Coba flush segera jika sudah online (misal: setelah mount ulang)
    if (navigator.onLine) void flushQueue()

    return () => window.removeEventListener('online', handleOnline)
  }, [isActive, flushQueue])

  // Flush queue saat tab akan ditutup
  useEffect(() => {
    if (!isActive) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && navigator.onLine) {
        void flushQueue()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isActive, flushQueue])

  return { addToQueue, removeFromQueue, flushQueue, getQueue }
}
