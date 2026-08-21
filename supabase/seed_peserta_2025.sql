-- ============================================================
-- SEED DATA: International Photography Exhibition 2025
-- 50 Peserta Internasional + Hasil Ujian + Data Juara
-- Jalankan di Supabase SQL Editor
-- PERINGATAN: Hapus data lama peserta sebelum menjalankan ini
-- ============================================================

-- Hapus data lama (urutan penting: cascade)
DELETE FROM public.winners WHERE tahun = 2025;
DELETE FROM public.exam_sessions;
DELETE FROM public.participants;

-- ============================================================
-- BAGIAN 1: INSERT 50 PESERTA (dengan skor ujian teori)
-- Peserta dari berbagai negara, 35 lulus, 15 tidak lulus
-- ============================================================

INSERT INTO public.participants (nomor_peserta, nama_lengkap, no_passport, skor, lulus, created_at)
VALUES
    -- === JUARA (Skor Tertinggi) ===
    ('IPE-2025-0001', 'Haruto Yamamoto',      'JP-A1234567', 98, true,  '2025-03-01 08:00:00+07'),
    ('IPE-2025-0002', 'Priya Krishnaswamy',   'IN-B9876543', 96, true,  '2025-03-01 08:15:00+07'),
    ('IPE-2025-0003', 'Lucas Becker',          'DE-C2345678', 94, true,  '2025-03-01 08:30:00+07'),
    ('IPE-2025-0004', 'Mei Ling Chen',         'CN-D3456789', 92, true,  '2025-03-01 09:00:00+07'),
    ('IPE-2025-0005', 'Anika van der Berg',    'NL-E4567890', 90, true,  '2025-03-01 09:15:00+07'),

    -- === PESERTA LULUS (skor 70–89) ===
    ('IPE-2025-0006', 'Ahmad Fadhilah',        'ID-F5678901', 88, true,  '2025-03-01 09:30:00+07'),
    ('IPE-2025-0007', 'Sofia Petrova',         'RU-G6789012', 87, true,  '2025-03-01 09:45:00+07'),
    ('IPE-2025-0008', 'James Okafor',          'NG-H7890123', 86, true,  '2025-03-01 10:00:00+07'),
    ('IPE-2025-0009', 'Isabella Rossi',        'IT-I8901234', 85, true,  '2025-03-01 10:15:00+07'),
    ('IPE-2025-0010', 'Samuel Osei',           'GH-J9012345', 84, true,  '2025-03-01 10:30:00+07'),
    ('IPE-2025-0011', 'Camille Dubois',        'FR-K0123456', 83, true,  '2025-03-01 10:45:00+07'),
    ('IPE-2025-0012', 'Reza Mahendra',         'ID-L1234567', 82, true,  '2025-03-01 11:00:00+07'),
    ('IPE-2025-0013', 'Yuna Park',             'KR-M2345678', 81, true,  '2025-03-01 11:15:00+07'),
    ('IPE-2025-0014', 'Ethan Williams',        'US-N3456789', 80, true,  '2025-03-01 11:30:00+07'),
    ('IPE-2025-0015', 'Amira Hassan',          'EG-O4567890', 79, true,  '2025-03-01 11:45:00+07'),
    ('IPE-2025-0016', 'Bernardo Alves',        'BR-P5678901', 78, true,  '2025-03-01 12:00:00+07'),
    ('IPE-2025-0017', 'Fatima Al-Rashid',      'AE-Q6789012', 78, true,  '2025-03-01 12:15:00+07'),
    ('IPE-2025-0018', 'Nikolai Volkov',        'RU-R7890123', 77, true,  '2025-03-01 12:30:00+07'),
    ('IPE-2025-0019', 'Siti Rahayu Putri',     'ID-S8901234', 77, true,  '2025-03-01 12:45:00+07'),
    ('IPE-2025-0020', 'Oliver Schmidt',        'DE-T9012345', 76, true,  '2025-03-01 13:00:00+07'),
    ('IPE-2025-0021', 'Chidi Eze',             'NG-U0123456', 76, true,  '2025-03-01 13:15:00+07'),
    ('IPE-2025-0022', 'Layla Nasser',          'SA-V1234567', 75, true,  '2025-03-01 13:30:00+07'),
    ('IPE-2025-0023', 'Mikkel Hansen',         'DK-W2345678', 75, true,  '2025-03-01 13:45:00+07'),
    ('IPE-2025-0024', 'Thanh Nguyen',          'VN-X3456789', 74, true,  '2025-03-01 14:00:00+07'),
    ('IPE-2025-0025', 'Elena Papadopoulos',    'GR-Y4567890', 74, true,  '2025-03-01 14:15:00+07'),
    ('IPE-2025-0026', 'Diego Reyes',           'MX-Z5678901', 73, true,  '2025-03-01 14:30:00+07'),
    ('IPE-2025-0027', 'Yemi Adeleke',          'NG-A6789012', 73, true,  '2025-03-01 14:45:00+07'),
    ('IPE-2025-0028', 'Hana Kimura',           'JP-B7890123', 72, true,  '2025-03-01 15:00:00+07'),
    ('IPE-2025-0029', 'Carlos Mendoza',        'AR-C8901234', 72, true,  '2025-03-01 15:15:00+07'),
    ('IPE-2025-0030', 'Astrid Lindqvist',      'SE-D9012345', 71, true,  '2025-03-01 15:30:00+07'),
    ('IPE-2025-0031', 'Budi Santoso',          'ID-E0123456', 71, true,  '2025-03-01 15:45:00+07'),
    ('IPE-2025-0032', 'Aiko Tanaka',           'JP-F1234568', 70, true,  '2025-03-01 16:00:00+07'),
    ('IPE-2025-0033', 'Kwame Mensah',          'GH-G2345679', 70, true,  '2025-03-01 16:15:00+07'),
    ('IPE-2025-0034', 'Maria Santos',          'PH-H3456780', 70, true,  '2025-03-01 16:30:00+07'),
    ('IPE-2025-0035', 'Luca Ferrari',          'IT-I4567891', 70, true,  '2025-03-01 16:45:00+07'),

    -- === PESERTA TIDAK LULUS (skor di bawah 70) ===
    ('IPE-2025-0036', 'Zara Ahmed',            'PK-J5678902', 68, false, '2025-03-01 17:00:00+07'),
    ('IPE-2025-0037', 'Ryan Christophersen',   'AU-K6789013', 65, false, '2025-03-01 17:15:00+07'),
    ('IPE-2025-0038', 'Nadia Ivanova',         'UA-L7890124', 63, false, '2025-03-01 17:30:00+07'),
    ('IPE-2025-0039', 'Tariq Boutros',         'MA-M8901235', 61, false, '2025-03-01 17:45:00+07'),
    ('IPE-2025-0040', 'Kenji Watanabe',        'JP-N9012346', 60, false, '2025-03-01 18:00:00+07'),
    ('IPE-2025-0041', 'Grace Otieno',          'KE-O0123457', 58, false, '2025-03-01 18:15:00+07'),
    ('IPE-2025-0042', 'Pavel Novak',           'CZ-P1234569', 56, false, '2025-03-01 18:30:00+07'),
    ('IPE-2025-0043', 'Anita Kowalski',        'PL-Q2345670', 55, false, '2025-03-01 18:45:00+07'),
    ('IPE-2025-0044', 'Raj Patel',             'IN-R3456781', 54, false, '2025-03-01 19:00:00+07'),
    ('IPE-2025-0045', 'Xu Wei',                'CN-S4567892', 52, false, '2025-03-01 19:15:00+07'),
    ('IPE-2025-0046', 'Fatou Diallo',          'SN-T5678903', 50, false, '2025-03-01 19:30:00+07'),
    ('IPE-2025-0047', 'Lukas Huber',           'AT-U6789014', 48, false, '2025-03-01 19:45:00+07'),
    ('IPE-2025-0048', 'Wanjiru Kamau',         'KE-V7890125', 46, false, '2025-03-01 20:00:00+07'),
    ('IPE-2025-0049', 'Rodrigo Lima',          'BR-W8901236', 44, false, '2025-03-01 20:15:00+07'),
    ('IPE-2025-0050', 'Dawit Bekele',          'ET-X9012347', 40, false, '2025-03-01 20:30:00+07');

-- ============================================================
-- BAGIAN 2: INSERT SESI UJIAN UNTUK SEMUA PESERTA
-- Statement terpisah agar tidak bergantung pada CTE
-- ============================================================
INSERT INTO public.exam_sessions (
  peserta_id, mulai_at, selesai_at, skor_akhir, total_soal, total_benar, status
)
SELECT
  p.id,
  p.created_at + INTERVAL '10 minutes',
  p.created_at + INTERVAL '100 minutes',
  p.skor,
  50,
  ROUND(p.skor * 50.0 / 100)::integer,
  'selesai'
FROM public.participants p;

-- ============================================================
-- BAGIAN 3: DATA JUARA RESMI IPE 2025
-- Peringkat 1–5 + Kategori Khusus
-- ============================================================
INSERT INTO public.winners (peserta_id, nama_pemenang, peringkat, tahun, skor, apresiasi)
VALUES
  (
    (SELECT id FROM public.participants WHERE nomor_peserta = 'IPE-2025-0001'),
    'Haruto Yamamoto',
    1, 2025, 98,
    'Medali Emas & Trofi Juara Utama'
  ),
  (
    (SELECT id FROM public.participants WHERE nomor_peserta = 'IPE-2025-0002'),
    'Priya Krishnaswamy',
    2, 2025, 96,
    'Medali Perak & Trofi Juara 2'
  ),
  (
    (SELECT id FROM public.participants WHERE nomor_peserta = 'IPE-2025-0003'),
    'Lucas Becker',
    3, 2025, 94,
    'Medali Perunggu & Trofi Juara 3'
  ),
  (
    (SELECT id FROM public.participants WHERE nomor_peserta = 'IPE-2025-0004'),
    'Mei Ling Chen',
    4, 2025, 92,
    'Piagam Penghargaan Harapan I'
  ),
  (
    (SELECT id FROM public.participants WHERE nomor_peserta = 'IPE-2025-0005'),
    'Anika van der Berg',
    5, 2025, 90,
    'Piagam Penghargaan Harapan II'
  );

-- ============================================================
-- BAGIAN 4: UPDATE ANNUAL EVENTS 2025
-- ============================================================
INSERT INTO public.annual_events (
  tahun, tema, deskripsi,
  tanggal_mulai, tanggal_selesai,
  jumlah_peserta, status
)
VALUES (
  2025,
  'Light, Shadow & Soul',
  'Edisi ke-12 International Photography Exhibition mengangkat tema eksplorasi cahaya dan bayangan sebagai jiwa dalam karya fotografi. Diikuti oleh 50 peserta dari 28 negara, kompetisi ini menjadi platform bergengsi bagi fotografer profesional maupun muda berbakat untuk menunjukkan keunggulan teknis dan kepekaan estetika mereka.',
  '2025-03-01',
  '2025-03-15',
  50,
  'selesai'
)
ON CONFLICT (tahun) DO UPDATE
  SET tema             = EXCLUDED.tema,
      deskripsi        = EXCLUDED.deskripsi,
      tanggal_mulai    = EXCLUDED.tanggal_mulai,
      tanggal_selesai  = EXCLUDED.tanggal_selesai,
      jumlah_peserta   = EXCLUDED.jumlah_peserta,
      status           = EXCLUDED.status;

-- ============================================================
-- VERIFIKASI DATA
-- ============================================================
SELECT 'Total Peserta'   AS keterangan, COUNT(*) AS jumlah FROM public.participants
UNION ALL
SELECT 'Peserta Lulus',    COUNT(*) FROM public.participants WHERE lulus = true
UNION ALL
SELECT 'Peserta Tdk Lulus',COUNT(*) FROM public.participants WHERE lulus = false
UNION ALL
SELECT 'Sesi Ujian',       COUNT(*) FROM public.exam_sessions WHERE status = 'selesai'
UNION ALL
SELECT 'Juara Tercatat',   COUNT(*) FROM public.winners WHERE tahun = 2025;
