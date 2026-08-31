-- ================================================================
-- Fix v2: generate_nomor_peserta pakai SEQUENCE yang benar
-- Masalah sebelumnya: setval pakai COUNT(*) bukan MAX(nomor)
-- → bisa conflict dengan nomor yang sudah ada (ada gap)
--
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ================================================================

DO $$
DECLARE
  max_nomor integer;
  tahun_ini text;
BEGIN
  tahun_ini := to_char(now(), 'YYYY');

  -- Cari nomor terbesar yang sudah ada untuk tahun ini
  SELECT COALESCE(
    MAX(CAST(SPLIT_PART(nomor_peserta, '-', 3) AS INTEGER)),
    0
  ) INTO max_nomor
  FROM public.participants
  WHERE nomor_peserta LIKE 'IPE-' || tahun_ini || '-%'
    AND nomor_peserta ~ '^IPE-[0-9]{4}-[0-9]+$';

  RAISE NOTICE 'Max nomor saat ini: %, sequence akan mulai dari: %', max_nomor, max_nomor + 1;

  -- Buat sequence jika belum ada
  CREATE SEQUENCE IF NOT EXISTS public.seq_nomor_peserta;

  -- Set sequence ke max_nomor + 1
  -- setval(name, value, false) → nextval() berikutnya RETURN value tersebut
  PERFORM setval('public.seq_nomor_peserta', max_nomor + 1, false);
END $$;

-- Ganti fungsi dengan SEQUENCE yang benar
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
  -- nextval() ATOMIC — tidak pernah return nilai sama untuk concurrent calls
  urutan    := nextval('public.seq_nomor_peserta');
  nomor     := 'IPE-' || tahun_ini || '-' || LPAD(urutan::text, 4, '0');
  RETURN nomor;
END;
$$;

GRANT EXECUTE ON FUNCTION public.generate_nomor_peserta() TO anon;
GRANT EXECUTE ON FUNCTION public.generate_nomor_peserta() TO authenticated;

-- Verifikasi: 3 call harus dapat 3 nomor BERBEDA dan BARU
SELECT generate_nomor_peserta() AS test1,
       generate_nomor_peserta() AS test2,
       generate_nomor_peserta() AS test3;
