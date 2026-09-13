-- ============================================================
-- SEED: Winners ISTC 2026
-- Sumber: Hasil ISTC 2026.xlsx + Data Peserta Admin Panel
-- Format apresiasi: "1st/2nd/3rd Place – Advance/Intermediate/Beginner"
-- ============================================================

-- Hapus data winners 2026 yang lama sebelum insert ulang
DELETE FROM winners WHERE tahun = 2026;

INSERT INTO winners (peserta_id, nama_pemenang, peringkat, tahun, skor, apresiasi) VALUES

-- ============================================================
-- CONTOH / TEST: bukancharm (IPE-2026-0070) — Juara 1 Advance
-- ============================================================
('db0ca57e-4baf-4b2f-93bd-5e3ecd0d4138', 'bukancharm',                          1, 2026,  0,  '1st Place - Advance'),

-- ============================================================
-- ENVIRONMENTAL TECHNOLOGY
-- ============================================================

-- ADVANCE
('051c9285-ddf0-457d-8f98-c835eb7f2794', 'FARID RAFFASYA ASSIDIQ',               1, 2026, 90, '1st Place - Advance'),
('b004ff22-3c05-422a-97a2-20d9237cf538', 'ARYA BAGAS SAPUTRA',                   2, 2026, 88, '2nd Place - Advance'),
('9afa4f05-627c-4346-b55b-c1195f29c106', 'AOZORA ATTSANY IMTIHAN',               3, 2026, 88, '3rd Place - Advance'),

-- INTERMEDIATE
('8653778d-77d4-4de9-a5ac-1992ae9e6555', 'FAEYZA ZIDAN EVANDAFFA',               1, 2026, 82, '1st Place - Intermediate'),
('e1a2e575-153c-436c-8b96-a644cf37fc5c', 'PHARADISYA ALZENA DIANDRA',            2, 2026, 70, '2nd Place - Intermediate'),
('b93d25ff-e6b6-40d2-987d-f6fc38d3b1ea', 'FARZAL ATHA ZHAVIER TAFAKKUR',         3, 2026, 70, '3rd Place - Intermediate'),

-- BEGINNER
('9d468a9b-25d1-4432-ba0a-7a07af6f7b68', 'Nabila Shakira Putri',                 1, 2026, 70, '1st Place - Beginner'),
('0b949ed9-7437-4c04-a6d2-1336aeb13bf0', 'GALANG NEAL KALPANA PUTRA PRIYADI',   2, 2026, 66, '2nd Place - Beginner'),
('259e6a49-e039-4977-81db-fb131d2fc09d', 'AYRA SALWA DAFIYA',                    3, 2026, 64, '3rd Place - Beginner'),

-- ============================================================
-- MATHEMATIC
-- ============================================================

-- ADVANCE
('b86b73de-d0f5-49a3-a480-32c9fda0dcd3', 'KAISYA HIRFAZANI DZUHRI',              1, 2026, 72, '1st Place - Advance'),
('ebfb6f43-a62c-4292-a7d0-0ab8da5af4d9', 'Alicia Ismayanti Nurul Fikri',         2, 2026, 64, '2nd Place - Advance'),
('94717c50-e491-4749-b470-fc9376867bd9', 'AMIRA ZAFIRA',                         3, 2026, 56, '3rd Place - Advance'),

-- INTERMEDIATE
('76730650-88d8-48ba-90da-b6bf4e2497f1', 'KAITHLYN BELLVANIA KHANSA',            1, 2026, 52, '1st Place - Intermediate'),
('0822fd96-5781-4899-8b1f-97bb1153b102', 'AISHA NADIRA SANJAYA',                 2, 2026, 52, '2nd Place - Intermediate'),
('37b97b50-d9ec-4d76-9748-ce89ba8177b7', 'ALIYA ZARA SABRINA',                   3, 2026, 50, '3rd Place - Intermediate'),

-- BEGINNER
('b46537c4-f688-4599-bb3b-ed5db2f480ca', 'FARREL VIRENDRA YUWONO',               1, 2026, 42, '1st Place - Beginner'),
('9da853d6-15ea-40cd-b8d4-18e998c5e192', 'NABILA AZZAHRA KURNIAWATI',            2, 2026, 38, '2nd Place - Beginner'),
('ff62a1c3-7a13-4132-92de-d798a1beb9df', 'LARISSA ALYA AMANY',                   3, 2026, 36, '3rd Place - Beginner'),

-- ============================================================
-- SCIENCE IN ACTION
-- ============================================================

-- ADVANCE
('9207ebed-0511-40d2-b3f4-632619a6c2a3', 'JAUNATA AHLA ALISA',                   1, 2026, 82, '1st Place - Advance'),
('9f235a2f-0311-41f7-bbf0-e4967d701658', 'DANISH RAZQA FAEYZA SATRIO',           2, 2026, 74, '2nd Place - Advance'),
('fbb61f4f-8ed2-4c2b-809a-b0918c8c9884', 'ALLYSSA FEBRIYANI AZ ZAHRA',           3, 2026, 62, '3rd Place - Advance'),

-- INTERMEDIATE
('fff329fd-3b6a-4109-ad55-0c642cedddd9', 'Rifan aqila fathan',                   1, 2026, 60, '1st Place - Intermediate'),
('15f9cb84-5645-4643-b546-576edf9850f2', 'DENALI NAILA NAFISHA',                 2, 2026, 54, '2nd Place - Intermediate'),
('cfba4d45-59a6-4be5-bc9c-7d639c368682', 'FIRZA NAJA MUJTAHID',                  3, 2026, 48, '3rd Place - Intermediate'),

-- BEGINNER
('0e8281ba-5e2b-4765-8bbe-44e4bc5668eb', 'KENNISTYA LAVANI MULYADARMA',          1, 2026, 46, '1st Place - Beginner'),
('f9126044-d0af-44d4-a963-603e08f6616b', 'ALFIANDRA KHIBRAN WIJAYA',             2, 2026, 42, '2nd Place - Beginner'),

-- ============================================================
-- SMART ROBOTICS
-- ============================================================

-- ADVANCE
('20255620-5d71-44fc-8be8-88ce22380f58', 'FAISAL RAYAN KURNIAWAN',               1, 2026, 98, '1st Place - Advance'),
('84341815-9642-437f-ac45-a005f35cc83f', 'WISTARADDIPTA ARKAAN ANZAM',           2, 2026, 82, '2nd Place - Advance'),
('51862ea2-f45c-421b-bc07-b3836322c5cc', 'RAIHAN NISA CAHYA RAMADHANI',          3, 2026, 80, '3rd Place - Advance'),

-- INTERMEDIATE
('188eee5c-5f5b-4f60-99f6-7e87c1008c2e', 'IMAM FATHAN AHSAN KUSUMA',             1, 2026, 80, '1st Place - Intermediate'),
('40635a14-314b-4cd2-9f97-5a9f5dda8a43', 'MUHAMMAD YODA NARUTAMA',               2, 2026, 78, '2nd Place - Intermediate'),
('74718b68-bf01-4941-b366-62d22d828feb', 'MUHAMMAD UWAIS HARDIYANTO',            3, 2026, 72, '3rd Place - Intermediate'),

-- BEGINNER
('87deeaad-b418-41d7-bd38-7d38977c16f1', 'MAHARANI AYU ANGGITA',                 1, 2026, 52, '1st Place - Beginner'),
('bfdafc22-e7c5-4ff0-827a-af38a782780a', 'ANDRA GAIZKA ZAIN',                    2, 2026, 52, '2nd Place - Beginner'),
('080ab7dc-50bd-4a11-9931-627fe018ffd5', 'NISITA CAESA TSABITA',                 3, 2026, 50, '3rd Place - Beginner');

-- ============================================================
-- Verifikasi hasil insert
-- ============================================================
SELECT
  p.kategori,
  w.apresiasi,
  w.peringkat,
  w.skor,
  p.nomor_peserta,
  p.nama_lengkap
FROM winners w
JOIN participants p ON p.id = w.peserta_id
WHERE w.tahun = 2026
ORDER BY p.kategori, w.apresiasi, w.peringkat;
