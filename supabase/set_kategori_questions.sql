-- ================================================================
-- Migration: Set kolom kategori di tabel questions
-- Jalankan di Supabase SQL Editor SETELAH add_kategori_to_participants.sql
-- ================================================================

-- 1. Pastikan kolom kategori ada di tabel questions
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS kategori TEXT;

-- 2. Set kategori berdasarkan nomor_soal
--    (sesuai seed_soal_2026_en.sql / seed_soal_2026_ms.sql)

UPDATE public.questions
  SET kategori = 'Environmental Technology'
  WHERE nomor_soal BETWEEN 1 AND 50;

UPDATE public.questions
  SET kategori = 'Smart Robotics'
  WHERE nomor_soal BETWEEN 51 AND 100;

UPDATE public.questions
  SET kategori = 'Science In Action'
  WHERE nomor_soal BETWEEN 101 AND 150;

UPDATE public.questions
  SET kategori = 'Mathematic'
  WHERE nomor_soal BETWEEN 151 AND 200;

-- 3. Verifikasi hasil
SELECT kategori, COUNT(*) as jumlah_soal
FROM public.questions
GROUP BY kategori
ORDER BY kategori;
