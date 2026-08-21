-- ============================================================
-- International Photography Exhibition — Database Schema
-- Dibuat: 2025
-- Jalankan via: Supabase Dashboard → SQL Editor
-- PERINGATAN: Script ini akan menghapus tabel lama terlebih dahulu.
-- ============================================================

-- ============================================================
-- BAGIAN 1: DROP TABEL LAMA (dari project computer-service-shop)
-- ============================================================

DROP TABLE IF EXISTS public.keep_alives         CASCADE;
DROP TABLE IF EXISTS public.annual_events       CASCADE;
DROP TABLE IF EXISTS public.venues              CASCADE;
DROP TABLE IF EXISTS public.winners             CASCADE;
DROP TABLE IF EXISTS public.documents           CASCADE;
DROP TABLE IF EXISTS public.system_config       CASCADE;
DROP TABLE IF EXISTS public.answers             CASCADE;
DROP TABLE IF EXISTS public.exam_sessions       CASCADE;
DROP TABLE IF EXISTS public.questions           CASCADE;
DROP TABLE IF EXISTS public.participants        CASCADE;

-- Tabel lama dari project sebelumnya (computer-service-shop)
DROP TABLE IF EXISTS public.services            CASCADE;
DROP TABLE IF EXISTS public.service_requests    CASCADE;
DROP TABLE IF EXISTS public.customers           CASCADE;
DROP TABLE IF EXISTS public.technicians         CASCADE;
DROP TABLE IF EXISTS public.products            CASCADE;
DROP TABLE IF EXISTS public.orders              CASCADE;
DROP TABLE IF EXISTS public.order_items         CASCADE;
DROP TABLE IF EXISTS public.invoices            CASCADE;
DROP TABLE IF EXISTS public.payments            CASCADE;
DROP TABLE IF EXISTS public.categories          CASCADE;
DROP TABLE IF EXISTS public.brands              CASCADE;
DROP TABLE IF EXISTS public.spare_parts         CASCADE;
DROP TABLE IF EXISTS public.warranties          CASCADE;
DROP TABLE IF EXISTS public.reviews             CASCADE;
DROP TABLE IF EXISTS public.notifications       CASCADE;
DROP TABLE IF EXISTS public.appointments        CASCADE;
DROP TABLE IF EXISTS public.diagnostics         CASCADE;
DROP TABLE IF EXISTS public.profiles            CASCADE;
DROP TABLE IF EXISTS public.todos               CASCADE;
DROP TABLE IF EXISTS public.posts               CASCADE;
DROP TABLE IF EXISTS public.users               CASCADE;

-- ============================================================
-- BAGIAN 2: BUAT TABEL BARU — International Photography Exhibition
-- ============================================================

-- ============================================================
-- 2a. PESERTA
-- Menyimpan data pendaftar lomba fotografi internasional.
-- Nomor peserta digenerate otomatis format: IPE-2025-XXXX
-- ============================================================
CREATE TABLE public.participants (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nomor_peserta text        UNIQUE NOT NULL,           -- e.g. IPE-2025-0001
  nama_lengkap  text        NOT NULL,
  no_passport   text        UNIQUE NOT NULL,
  foto_url      text,
  skor          integer,                               -- diisi setelah ujian selesai
  lulus         boolean     DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2b. BANK SOAL
-- Soal pilihan ganda A-D untuk CBT ujian fotografi.
-- ============================================================
CREATE TABLE public.questions (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nomor_soal    integer     NOT NULL,
  pertanyaan    text        NOT NULL,
  pilihan_a     text        NOT NULL,
  pilihan_b     text        NOT NULL,
  pilihan_c     text        NOT NULL,
  pilihan_d     text        NOT NULL,
  kunci_jawaban text        NOT NULL CHECK (kunci_jawaban IN ('A','B','C','D')),
  kategori      text        NOT NULL DEFAULT 'umum',   -- teknik / estetika / sejarah / umum
  bobot         integer     DEFAULT 2,                 -- poin per soal
  aktif         boolean     DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2c. SESI UJIAN
-- Merekam satu sesi ujian yang diselesaikan oleh peserta.
-- ============================================================
CREATE TABLE public.exam_sessions (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  peserta_id    uuid        REFERENCES public.participants(id) ON DELETE CASCADE,
  mulai_at      timestamptz DEFAULT now(),
  selesai_at    timestamptz,
  skor_akhir    integer     DEFAULT 0,
  total_soal    integer     DEFAULT 50,
  total_benar   integer     DEFAULT 0,
  status        text        DEFAULT 'in_progress' CHECK (status IN ('in_progress','selesai','expired')),
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2d. JAWABAN PESERTA
-- Menyimpan setiap jawaban peserta per soal dalam satu sesi.
-- ============================================================
CREATE TABLE public.answers (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  sesi_id       uuid        REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
  soal_id       uuid        REFERENCES public.questions(id) ON DELETE CASCADE,
  jawaban       text        CHECK (jawaban IN ('A','B','C','D')),
  benar         boolean,
  answered_at   timestamptz DEFAULT now(),
  UNIQUE(sesi_id, soal_id)
);

-- ============================================================
-- 2e. KONFIGURASI SISTEM
-- Key-value store untuk pengaturan global aplikasi.
-- ============================================================
CREATE TABLE public.system_config (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  kunci         text        UNIQUE NOT NULL,
  nilai         text        NOT NULL,
  keterangan    text,
  updated_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2f. DOKUMEN / BERKAS RESMI
-- Juknis, SOP, SK Panitia, Proposal, Tata Tertib, dll.
-- ============================================================
CREATE TABLE public.documents (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  judul         text        NOT NULL,
  jenis         text        NOT NULL,                  -- juknis / sop / sk / proposal / tata_tertib / pedoman_juri
  tahun         integer     NOT NULL DEFAULT 2025,
  file_url      text        NOT NULL,
  file_size     bigint,                                -- bytes
  deskripsi     text,
  publik        boolean     DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2g. PEMENANG & APRESIASI
-- Daftar pemenang per tahun penyelenggaraan.
-- ============================================================
CREATE TABLE public.winners (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  peserta_id      uuid        REFERENCES public.participants(id) ON DELETE SET NULL,
  nama_pemenang   text        NOT NULL,
  peringkat       integer     NOT NULL,                -- 1, 2, 3, dst
  tahun           integer     NOT NULL DEFAULT 2025,
  skor            integer,
  apresiasi       text,                                -- "Medali Emas", "Trofi", "Piagam"
  foto_karya_url  text,
  created_at      timestamptz DEFAULT now()
);

-- ============================================================
-- 2h. SARANA PRASARANA / VENUE
-- Katalog lokasi, peralatan, dan fasilitas pendukung lomba.
-- ============================================================
CREATE TABLE public.venues (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nama          text        NOT NULL,
  jenis         text        NOT NULL,                  -- venue / peralatan / fasilitas
  deskripsi     text,
  lokasi        text,
  kapasitas     integer,
  foto_url      text[],                                -- array URL foto
  denah_url     text,
  aktif         boolean     DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2i. ARSIP PENYELENGGARAAN TAHUNAN
-- Rekap setiap edisi lomba: flyer, daftar pemenang, LPJ, dll.
-- ============================================================
CREATE TABLE public.annual_events (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  tahun         integer     NOT NULL UNIQUE,
  tema          text,
  deskripsi     text,
  tanggal_mulai date,
  tanggal_selesai date,
  jumlah_peserta integer    DEFAULT 0,
  flyer_url     text,
  dokumentasi_url text[],                              -- array URL foto/video
  lpj_url       text,                                  -- Laporan Pertanggungjawaban
  berita_acara_url text,
  status        text        DEFAULT 'aktif' CHECK (status IN ('aktif','selesai','arsip')),
  created_at    timestamptz DEFAULT now()
);

-- ============================================================
-- 2j. KEEP ALIVES — Log ping database (cegah Supabase pause)
-- Dicatat setiap kali GitHub Actions cron atau admin manual ping.
-- ============================================================
CREATE TABLE public.keep_alives (
  id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  check_time    timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  method        text        NOT NULL                   -- 'cron' | 'manual'
);

-- ============================================================
-- BAGIAN 3: ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Aktifkan RLS pada semua tabel
ALTER TABLE public.participants    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.annual_events   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keep_alives     ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------
-- POLICIES: keep_alives — publik read/insert (untuk cron & widget)
-- ----------------------------------------------------------------
CREATE POLICY "keep_alives_select_public"
  ON public.keep_alives FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "keep_alives_insert_public"
  ON public.keep_alives FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ----------------------------------------------------------------
-- POLICIES: system_config — publik read, hanya authenticated write
-- ----------------------------------------------------------------
CREATE POLICY "system_config_select_public"
  ON public.system_config FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "system_config_update_auth"
  ON public.system_config FOR UPDATE
  TO authenticated
  USING (true);

-- ----------------------------------------------------------------
-- POLICIES: questions — publik read (soal ditampilkan ke peserta)
-- ----------------------------------------------------------------
CREATE POLICY "questions_select_public"
  ON public.questions FOR SELECT
  TO anon, authenticated
  USING (aktif = true);

CREATE POLICY "questions_all_auth"
  ON public.questions FOR ALL
  TO authenticated
  USING (true);

-- ----------------------------------------------------------------
-- POLICIES: participants — insert publik (pendaftaran), read/update auth
-- ----------------------------------------------------------------
CREATE POLICY "participants_insert_public"
  ON public.participants FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "participants_select_auth"
  ON public.participants FOR SELECT
  TO authenticated
  USING (true);

-- ----------------------------------------------------------------
-- POLICIES: exam_sessions & answers — authenticated only
-- ----------------------------------------------------------------
CREATE POLICY "exam_sessions_all_auth"
  ON public.exam_sessions FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "answers_all_auth"
  ON public.answers FOR ALL
  TO authenticated
  USING (true);

-- ----------------------------------------------------------------
-- POLICIES: documents — publik read jika publik=true
-- ----------------------------------------------------------------
CREATE POLICY "documents_select_public"
  ON public.documents FOR SELECT
  TO anon, authenticated
  USING (publik = true);

CREATE POLICY "documents_all_auth"
  ON public.documents FOR ALL
  TO authenticated
  USING (true);

-- ----------------------------------------------------------------
-- POLICIES: winners, venues, annual_events — publik read
-- ----------------------------------------------------------------
CREATE POLICY "winners_select_public"
  ON public.winners FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "winners_all_auth"
  ON public.winners FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "venues_select_public"
  ON public.venues FOR SELECT
  TO anon, authenticated
  USING (aktif = true);

CREATE POLICY "venues_all_auth"
  ON public.venues FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "annual_events_select_public"
  ON public.annual_events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "annual_events_all_auth"
  ON public.annual_events FOR ALL
  TO authenticated
  USING (true);

-- ============================================================
-- BAGIAN 4: DATA AWAL (KONFIGURASI SISTEM)
-- ============================================================

INSERT INTO public.system_config (kunci, nilai, keterangan) VALUES
  ('nama_lomba',         'International Photography Exhibition',  'Nama resmi lomba'),
  ('tahun_aktif',        '2025',                                  'Tahun penyelenggaraan aktif'),
  ('akses_ujian_terbuka','false',                                 'Toggle akses ujian peserta: true=terbuka, false=tertutup'),
  ('batas_soal',         '50',                                    'Jumlah soal yang ditampilkan per sesi ujian'),
  ('durasi_ujian_menit', '90',                                    'Durasi ujian dalam menit'),
  ('nilai_lulus',        '70',                                    'Nilai minimum untuk dinyatakan lulus (dari 100)'),
  ('skor_per_soal',      '2',                                     'Poin untuk setiap jawaban benar'),
  ('versi_app',          '1.0.0',                                 'Versi aplikasi saat ini')
ON CONFLICT (kunci) DO UPDATE SET
  nilai      = EXCLUDED.nilai,
  updated_at = now();

-- ============================================================
-- BAGIAN 5: FUNCTION — Generate Nomor Peserta Otomatis
-- Format: IPE-2025-XXXX (incrementing 4 digit)
-- ============================================================
CREATE OR REPLACE FUNCTION public.generate_nomor_peserta()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  tahun_ini text;
  urutan    integer;
  nomor     text;
BEGIN
  tahun_ini := to_char(now(), 'YYYY');
  SELECT COUNT(*) + 1
    INTO urutan
    FROM public.participants
   WHERE nomor_peserta LIKE 'IPE-' || tahun_ini || '-%';
  nomor := 'IPE-' || tahun_ini || '-' || LPAD(urutan::text, 4, '0');
  RETURN nomor;
END;
$$;

-- ============================================================
-- SELESAI
-- Jalankan script ini di: Supabase Dashboard → SQL Editor
-- Lalu konfirmasi ke developer untuk melanjutkan build UI.
-- ============================================================
