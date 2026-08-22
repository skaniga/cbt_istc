-- ============================================================
-- FITUR LANJUTAN IPE 2025: SKEMA & SEED DATA
-- 1. Tahapan Seleksi (Multi-stage)
-- 2. Seed Dokumen
-- 3. Seed Sarana Prasarana (Venues)
-- 4. Seed Arsip (Annual Events)
-- ============================================================

-- ============================================================
-- 1. SKEMA: TAHAPAN SELEKSI
-- ============================================================
CREATE TABLE IF NOT EXISTS public.selection_stages (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_tahap      text        NOT NULL,
  urutan          integer     NOT NULL,
  deskripsi       text,
  aktif           boolean     DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.participant_stages (
  id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  peserta_id      uuid        REFERENCES public.participants(id) ON DELETE CASCADE,
  stage_id        uuid        REFERENCES public.selection_stages(id) ON DELETE CASCADE,
  status          text        DEFAULT 'pending' CHECK (status IN ('pending','passed','failed')),
  nilai           integer,
  bukti_url       text,
  keterangan      text,
  updated_at      timestamptz DEFAULT now(),
  UNIQUE(peserta_id, stage_id)
);

-- Hapus data tahap seleksi lama jika ada
DELETE FROM public.participant_stages;
DELETE FROM public.selection_stages;

-- Insert Tahapan Standar
INSERT INTO public.selection_stages (nama_tahap, urutan, deskripsi)
VALUES
  ('Tahap 1: Ujian Teori (CBT)', 1, 'Ujian pilihan ganda dasar fotografi.'),
  ('Tahap 2: Pengumpulan Portofolio', 2, 'Peserta mengunggah 3 karya foto terbaik dengan tema yang ditentukan.'),
  ('Tahap 3: Wawancara Juri', 3, 'Sesi wawancara online dengan dewan juri internasional.');


-- ============================================================
-- 2. SEED DATA: DOKUMEN STANDAR PENYELENGGARAAN
-- ============================================================
DELETE FROM public.documents;

INSERT INTO public.documents (judul, jenis, tahun, file_url, file_size, deskripsi, publik)
VALUES
  ('Petunjuk Teknis (Juknis) IPE 2025', 'juknis', 2025, 'https://example.com/docs/juknis_ipe_2025.pdf', 2500000, 'Dokumen panduan teknis pelaksanaan lomba, syarat peserta, dan tata cara pendaftaran.', true),
  ('Standar Operasional Prosedur (SOP)', 'sop', 2025, 'https://example.com/docs/sop_ipe_2025.pdf', 1800000, 'SOP panitia dalam menyelenggarakan kegiatan IPE.', false),
  ('Proposal Kegiatan IPE 2025', 'proposal', 2025, 'https://example.com/docs/proposal_ipe_2025.pdf', 5200000, 'Proposal resmi untuk sponsorship dan perizinan.', false),
  ('SK Susunan Panitia & Dewan Juri', 'sk', 2025, 'https://example.com/docs/sk_panitia_2025.pdf', 800000, 'Surat Keputusan pengangkatan panitia dan dewan juri internasional.', true),
  ('Tata Tertib Peserta', 'tata_tertib', 2025, 'https://example.com/docs/tatib_peserta.pdf', 500000, 'Aturan yang mengikat seluruh peserta selama lomba berlangsung.', true),
  ('Pedoman Penilaian & Kriteria Juri', 'pedoman_juri', 2025, 'https://example.com/docs/pedoman_juri_2025.pdf', 1200000, 'Matriks penilaian yang digunakan juri untuk menilai karya foto peserta.', false),
  ('Berita Acara Pelaksanaan IPE 2025', 'berita_acara', 2025, 'https://example.com/docs/berita_acara_2025.pdf', 900000, 'Dokumen resmi serah terima dan laporan pelaksanaan lomba.', false),
  ('Berita Acara Seleksi Tahap 1', 'berita_acara', 2025, 'https://example.com/docs/ba_seleksi_tahap1_2025.pdf', 850000, 'Dokumen resmi penetapan hasil seleksi tahap 1 (CBT).', false),
  ('Surat Keputusan Pemenang IPE 2025', 'sk', 2025, 'https://example.com/docs/sk_pemenang_2025.pdf', 750000, 'SK resmi pengumuman daftar pemenang.', true);


-- ============================================================
-- 3. SEED DATA: SARANA PRASARANA (VENUES)
-- ============================================================
DELETE FROM public.venues;

INSERT INTO public.venues (nama, jenis, deskripsi, lokasi, kapasitas, foto_url, denah_url, aktif)
VALUES
  ('Exhibition Main Hall', 'venue', 'Aula utama pameran karya foto finalis.', 'Gedung Kesenian, Lantai 1', 500, ARRAY['https://images.unsplash.com/photo-1531259124976-1b154868f7d9?q=80&w=800'], 'https://example.com/denah/main_hall.png', true),
  ('Ruang Ujian CBT Terpusat', 'venue', 'Laboratorium komputer untuk ujian teori peserta lokal.', 'Gedung IT, Lantai 3', 100, ARRAY['https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800'], 'https://example.com/denah/lab_cbt.png', true),
  ('Panel Pameran Premium', 'peralatan', 'Papan display foto dengan pencahayaan spot LED.', 'Gudang Logistik', null, ARRAY['https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800'], null, true),
  ('Kamera Cadangan DSLR & Lensa', 'peralatan', 'Unit kamera cadangan untuk peserta jika terjadi kendala teknis pada alat mereka.', 'Ruang Panitia', null, ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800'], null, true),
  ('Lounge Peserta & Juri', 'fasilitas', 'Area istirahat, diskusi, dan konsumsi.', 'Area Sayap Barat', 50, ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800'], null, true);


-- ============================================================
-- 4. SEED DATA: ARSIP (ANNUAL EVENTS HISTORY)
-- Asumsi data tahun 2025 sudah diinsert oleh seed_peserta_2025.sql
-- Kita tambahkan sejarah tahun-tahun sebelumnya
-- ============================================================

INSERT INTO public.annual_events (tahun, tema, deskripsi, tanggal_mulai, tanggal_selesai, jumlah_peserta, status, flyer_url, dokumentasi_url)
VALUES
  (2023, 'Monochrome Masterpiece', 'Eksplorasi warna hitam putih dalam kehidupan urban.', '2023-04-10', '2023-04-24', 120, 'arsip', 'https://example.com/arsip/flyer_2023.jpg', ARRAY['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800']),
  (2024, 'Nature in Motion', 'Mengabadikan dinamika alam liar dan lingkungan.', '2024-05-01', '2024-05-15', 185, 'arsip', 'https://example.com/arsip/flyer_2024.jpg', ARRAY['https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800'])
ON CONFLICT (tahun) DO NOTHING;
