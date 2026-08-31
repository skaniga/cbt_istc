-- ================================================================
-- Migration: Tambah kolom kategori ke tabel participants
-- Jalankan di Supabase SQL Editor
-- ================================================================

ALTER TABLE public.participants
  ADD COLUMN IF NOT EXISTS kategori TEXT DEFAULT NULL;

-- Contoh nilai: 'Environmental Technology' | 'Smart Robotics' | 'Science In Action' | 'Mathematic'

COMMENT ON COLUMN public.participants.kategori IS 'Bidang kompetisi yang dipilih peserta saat mendaftar';
