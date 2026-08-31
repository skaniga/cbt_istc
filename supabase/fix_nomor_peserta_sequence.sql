-- ================================================================
-- Fix: Ganti generate_nomor_peserta dari COUNT(*)+1 ke SEQUENCE
-- COUNT(*)+1 tidak atomic → race condition saat concurrent registration
-- SEQUENCE di PostgreSQL atomic & thread-safe by design
--
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ================================================================

-- 1. Hitung jumlah peserta saat ini untuk set start value sequence
DO $$
DECLARE
  current_count integer;
BEGIN
  SELECT COUNT(*) INTO current_count FROM public.participants;
  
  -- Buat sequence mulai dari jumlah peserta yang sudah ada + 1
  EXECUTE format(
    'CREATE SEQUENCE IF NOT EXISTS public.seq_nomor_peserta START %s',
    GREATEST(current_count + 1, 1)
  );
  
  -- Jika sequence sudah ada, pastikan nilainya minimal = current_count + 1
  IF current_count > 0 THEN
    PERFORM setval('public.seq_nomor_peserta', current_count, false);
  END IF;
END $$;

-- 2. Ganti fungsi generate_nomor_peserta menggunakan sequence
CREATE OR REPLACE FUNCTION public.generate_nomor_peserta()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tahun_ini text;
  urutan    bigint;
  nomor     text;
BEGIN
  tahun_ini := to_char(now(), 'YYYY');
  -- nextval() ATOMIC — tidak akan pernah return nilai yang sama untuk 2 concurrent call
  urutan    := nextval('public.seq_nomor_peserta');
  nomor     := 'IPE-' || tahun_ini || '-' || LPAD(urutan::text, 4, '0');
  RETURN nomor;
END;
$$;

-- 3. Pastikan anon & authenticated bisa panggil fungsi ini
GRANT EXECUTE ON FUNCTION public.generate_nomor_peserta() TO anon;
GRANT EXECUTE ON FUNCTION public.generate_nomor_peserta() TO authenticated;

-- 4. Verifikasi — panggil fungsi 3x, harus dapat 3 nomor berbeda
SELECT generate_nomor_peserta() AS test1;
SELECT generate_nomor_peserta() AS test2;
SELECT generate_nomor_peserta() AS test3;
