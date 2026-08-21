-- Menambahkan 5 soal dummy untuk keperluan testing CBT
-- Jalankan di Supabase SQL Editor

INSERT INTO public.questions (nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban)
VALUES 
  (1, 'Teknik mengatur lamanya sensor kamera terpapar cahaya disebut?', 'Aperture', 'ISO', 'Shutter Speed', 'White Balance', 'C'),
  (2, 'Lensa dengan sudut pandang sangat luas yang sering menyebabkan distorsi cembung disebut?', 'Telephoto', 'Fisheye', 'Macro', 'Prime', 'B'),
  (3, 'Nilai ISO yang lebih tinggi pada kamera akan menghasilkan foto yang...', 'Lebih gelap dan halus', 'Lebih terang namun rentan noise', 'Lebih tajam dan kontras', 'Lebih blur (bokeh)', 'B'),
  (4, 'Aturan komposisi dimana bidang foto dibagi menjadi 9 bagian yang sama besar disebut?', 'Golden Ratio', 'Rule of Thirds', 'Leading Lines', 'Symmetry', 'B'),
  (5, 'Siapakah tokoh yang dikenal sebagai penemu proses fotografi Daguerreotype?', 'Ansel Adams', 'Louis Daguerre', 'Henri Cartier-Bresson', 'Thomas Edison', 'B')
ON CONFLICT DO NOTHING;
