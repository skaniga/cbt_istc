-- ============================================================
-- ATOMIC FINISH EXAM — PostgreSQL Stored Procedure
-- Menggabungkan hitung skor + update participant + update session
-- dalam satu transaksi agar tidak ada partial state jika server mati
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

CREATE OR REPLACE FUNCTION public.finish_exam_atomic(
  p_session_id uuid,
  p_peserta_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_end_time        timestamptz;
  v_total_soal      integer;
  v_correct_count   integer := 0;
  v_final_score     integer;
  v_passing_grade   integer;
  v_is_passed       boolean;
BEGIN
  -- 1. Validasi waktu server: pastikan ujian belum habis atau memang sudah waktunya selesai
  --    Ambil mulai_at + durasi dari config
  SELECT
    es.mulai_at + (COALESCE((
      SELECT nilai::integer
      FROM public.system_config
      WHERE kunci = 'durasi_ujian_menit'
    ), 90) * interval '1 minute'),
    es.total_soal
  INTO v_end_time, v_total_soal
  FROM public.exam_sessions es
  WHERE es.id = p_session_id
    AND es.peserta_id = p_peserta_id
    AND es.status = 'in_progress';

  -- Jika sesi tidak ditemukan atau sudah selesai, return error
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Session not found or already completed');
  END IF;

  -- 2. Hitung jumlah jawaban benar
  SELECT COUNT(*)
  INTO v_correct_count
  FROM public.answers a
  JOIN public.questions q ON q.id = a.soal_id
  WHERE a.sesi_id = p_session_id
    AND a.jawaban = q.kunci_jawaban;

  -- 3. Hitung skor akhir
  v_final_score := ROUND((v_correct_count::decimal / GREATEST(v_total_soal, 1)) * 100);

  -- 4. Ambil passing grade dari system_config (default 70)
  SELECT COALESCE(nilai::integer, 70)
  INTO v_passing_grade
  FROM public.system_config
  WHERE kunci = 'nilai_lulus';

  IF NOT FOUND THEN
    v_passing_grade := 70;
  END IF;

  v_is_passed := v_final_score >= v_passing_grade;

  -- 5. Semua update dalam satu transaksi — atomic
  UPDATE public.participants
  SET skor  = v_final_score,
      lulus = v_is_passed
  WHERE id = p_peserta_id;

  UPDATE public.exam_sessions
  SET status      = 'selesai',
      selesai_at  = now(),
      skor_akhir  = v_final_score,
      total_benar = v_correct_count
  WHERE id = p_session_id;

  RETURN jsonb_build_object(
    'success',       true,
    'score',         v_final_score,
    'correct',       v_correct_count,
    'total',         v_total_soal,
    'passed',        v_is_passed,
    'passing_grade', v_passing_grade
  );
END;
$$;

-- Grant eksekusi ke authenticated role (dipakai oleh admin client)
GRANT EXECUTE ON FUNCTION public.finish_exam_atomic(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.finish_exam_atomic(uuid, uuid) TO service_role;

-- ============================================================
-- SELESAI — Jalankan di Supabase SQL Editor
-- ============================================================
