-- 1. Insert nilai awal (fallback) ke tabel system_config
INSERT INTO public.system_config (kunci, nilai, keterangan)
VALUES 
  ('hero_image_url', '/hero.webp', 'URL gambar utama (hero) di halaman depan'),
  ('about_image_url', '/hero.webp', 'URL gambar pada bagian Tentang/Galeri')
ON CONFLICT (kunci) DO NOTHING;

-- 2. Pastikan ada bucket bernama "public" di Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Kebijakan (Policy) agar publik dapat MELIHAT (Download) gambar
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT
USING (bucket_id = 'public');

DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'public' 
);

DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'public' 
);
