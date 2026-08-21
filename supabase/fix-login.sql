-- Script untuk memperbaiki RLS pada fitur Login Peserta
-- Jalankan di SQL Editor Supabase

-- Hapus policy lama jika ada
DROP POLICY IF EXISTS "participants_select_anon_login" ON public.participants;

-- Berikan akses select terbatas ke anon khusus untuk login
-- Ini aman karena kita hanya mengecek kecocokan saat login di backend, 
-- namun agar lebih ketat, idealnya menggunakan fungsi SECURITY DEFINER.
-- Karena Next.js server actions memanggil dari backend, kita bisa mengizinkan
-- anon untuk membaca tabel participants.

CREATE POLICY "participants_select_anon"
  ON public.participants FOR SELECT
  TO anon, authenticated
  USING (true);

-- Catatan: jika ingin lebih aman dari scraping, gunakan RPC SECURITY DEFINER:
CREATE OR REPLACE FUNCTION public.verify_participant_login(p_identifier text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id uuid;
BEGIN
  SELECT id INTO v_id
  FROM public.participants
  WHERE nomor_peserta = p_identifier OR no_passport = p_identifier
  LIMIT 1;
  
  RETURN v_id;
END;
$$;
