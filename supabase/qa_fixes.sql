-- ============================================================
-- QA FIXES — Constraint & Index Tambahan
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Pastikan UNIQUE constraint pada peserta_id di exam_sessions
--    Mencegah peserta yang sama membuat lebih dari 1 sesi ujian
--    (race condition saat banyak peserta klik mulai bersamaan)
ALTER TABLE public.exam_sessions
  DROP CONSTRAINT IF EXISTS exam_sessions_peserta_id_unique;

ALTER TABLE public.exam_sessions
  ADD CONSTRAINT exam_sessions_peserta_id_unique UNIQUE (peserta_id);

-- 2. Index untuk lookup exam_sessions by peserta_id (dipakai sering)
CREATE INDEX IF NOT EXISTS idx_exam_sessions_peserta_id
  ON public.exam_sessions (peserta_id);

-- 3. Index untuk lookup answers by sesi_id (dipakai saat finishExam)
CREATE INDEX IF NOT EXISTS idx_answers_sesi_id
  ON public.answers (sesi_id);

-- ============================================================
-- SELESAI — Jalankan di Supabase SQL Editor
-- ============================================================
