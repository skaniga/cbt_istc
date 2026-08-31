-- ============================================================
-- OPTIMASI LOGIN — Database Indexes & Improved RPC
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Index pada nomor_peserta (sudah ada UNIQUE, tapi pastikan ada index eksplisit)
CREATE INDEX IF NOT EXISTS idx_participants_nomor_peserta
  ON public.participants (nomor_peserta);

-- 2. Index pada no_passport
CREATE INDEX IF NOT EXISTS idx_participants_no_passport
  ON public.participants (no_passport);

-- 3. Index kombinasi untuk query OR yang dipakai verify_participant_login
--    PostgreSQL tidak bisa pakai 2 index sekaligus untuk OR, jadi kita buat
--    fungsi yang lebih efisien dengan UNION semua kemungkinan hasil
CREATE OR REPLACE FUNCTION public.verify_participant_login(p_identifier text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  -- Cari berdasarkan nomor_peserta terlebih dahulu (lebih umum)
  SELECT id INTO v_id
  FROM public.participants
  WHERE nomor_peserta = p_identifier
  LIMIT 1;

  -- Jika tidak ditemukan, cari berdasarkan no_passport
  IF v_id IS NULL THEN
    SELECT id INTO v_id
    FROM public.participants
    WHERE no_passport = p_identifier
    LIMIT 1;
  END IF;

  RETURN v_id;
END;
$$;

-- 4. Revoke akses langsung ke tabel dari anon (fungsi SECURITY DEFINER sudah cukup)
--    Pastikan fungsi bisa dipanggil oleh anon role
GRANT EXECUTE ON FUNCTION public.verify_participant_login(text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_participant_login(text) TO authenticated;

-- ============================================================
-- SELESAI — Indexes akan mempercepat query login secara signifikan
-- ============================================================
