-- Tambahkan kolom untuk terjemahan Bahasa Inggris (EN)
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS pertanyaan_en text,
ADD COLUMN IF NOT EXISTS pilihan_a_en text,
ADD COLUMN IF NOT EXISTS pilihan_b_en text,
ADD COLUMN IF NOT EXISTS pilihan_c_en text,
ADD COLUMN IF NOT EXISTS pilihan_d_en text;

-- Tambahkan kolom untuk terjemahan Bahasa Melayu (MS)
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS pertanyaan_ms text,
ADD COLUMN IF NOT EXISTS pilihan_a_ms text,
ADD COLUMN IF NOT EXISTS pilihan_b_ms text,
ADD COLUMN IF NOT EXISTS pilihan_c_ms text,
ADD COLUMN IF NOT EXISTS pilihan_d_ms text;
