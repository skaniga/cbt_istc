-- ============================================================
-- SEED DATA: Bank Soal Ujian Fotografi (50 Soal) MULTILINGUAL
-- ============================================================

-- 1. Tambahkan kolom untuk terjemahan Bahasa Inggris (EN)
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS pertanyaan_en text,
ADD COLUMN IF NOT EXISTS pilihan_a_en text,
ADD COLUMN IF NOT EXISTS pilihan_b_en text,
ADD COLUMN IF NOT EXISTS pilihan_c_en text,
ADD COLUMN IF NOT EXISTS pilihan_d_en text;

-- 2. Tambahkan kolom untuk terjemahan Bahasa Melayu (MS)
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS pertanyaan_ms text,
ADD COLUMN IF NOT EXISTS pilihan_a_ms text,
ADD COLUMN IF NOT EXISTS pilihan_b_ms text,
ADD COLUMN IF NOT EXISTS pilihan_c_ms text,
ADD COLUMN IF NOT EXISTS pilihan_d_ms text;

-- 3. Hapus data lama dan masukkan data baru
DELETE FROM public.questions;

INSERT INTO public.questions (
  nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d,
  pertanyaan_en, pilihan_a_en, pilihan_b_en, pilihan_c_en, pilihan_d_en,
  pertanyaan_ms, pilihan_a_ms, pilihan_b_ms, pilihan_c_ms, pilihan_d_ms,
  kunci_jawaban, kategori
) VALUES
(1, 'Apa fungsi utama dari aperture (bukaan) pada lensa kamera?', 'Mengatur seberapa cepat rana menutup', 'Mengatur jumlah cahaya yang masuk dan kedalaman ruang (depth of field)', 'Mengubah warna cahaya menjadi hitam putih', 'Menyimpan metadata foto',
    'What is the main function of the aperture on a camera lens?', 'To control how fast the shutter closes', 'To control the amount of light entering and the depth of field', 'To change the light color to black and white', 'To save photo metadata',
    'Apakah fungsi utama bukaan (aperture) pada kanta kamera?', 'Mengawal kelajuan pengatup ditutup', 'Mengawal jumlah cahaya yang masuk dan kedalaman ruang (depth of field)', 'Menukar warna cahaya kepada hitam putih', 'Menyimpan metadata foto',
    'B', 'teknik'),

(2, 'Manakah dari ISO berikut yang paling sensitif terhadap cahaya?', 'ISO 100', 'ISO 400', 'ISO 800', 'ISO 3200',
    'Which of the following ISO settings is the most sensitive to light?', 'ISO 100', 'ISO 400', 'ISO 800', 'ISO 3200',
    'Antara tetapan ISO berikut, yang manakah paling sensitif terhadap cahaya?', 'ISO 100', 'ISO 400', 'ISO 800', 'ISO 3200',
    'D', 'teknik'),

(3, 'Apa itu "Rule of Thirds" dalam komposisi fotografi?', 'Aturan di mana foto harus dicetak dalam 3 ukuran', 'Aturan membagi frame menjadi 9 bagian untuk menempatkan subjek', 'Aturan menggunakan 3 warna utama saja', 'Aturan memotret 3 objek dalam satu frame',
    'What is the "Rule of Thirds" in photography composition?', 'A rule where photos must be printed in 3 sizes', 'A rule dividing the frame into 9 parts to place the subject', 'A rule using only 3 main colors', 'A rule of shooting 3 objects in one frame',
    'Apakah "Rule of Thirds" dalam komposisi fotografi?', 'Peraturan di mana gambar mesti dicetak dalam 3 saiz', 'Peraturan membahagikan bingkai kepada 9 bahagian untuk meletakkan subjek', 'Peraturan menggunakan 3 warna utama sahaja', 'Peraturan merakam 3 objek dalam satu bingkai',
    'B', 'estetika'),

(4, 'Kecepatan rana (shutter speed) yang sangat lambat (misal 5 detik) paling cocok digunakan untuk:', 'Memotret balapan mobil', 'Memotret air terjun agar terlihat lembut/halus', 'Memotret potret wajah tajam', 'Memotret anak-anak bermain',
    'A very slow shutter speed (e.g., 5 seconds) is best used for:', 'Shooting car races', 'Shooting waterfalls to make them look soft/smooth', 'Shooting sharp facial portraits', 'Shooting children playing',
    'Kelajuan pengatup (shutter speed) yang sangat perlahan (cth. 5 saat) paling sesuai digunakan untuk:', 'Merakam perlumbaan kereta', 'Merakam air terjun agar kelihatan lembut/halus', 'Merakam potret wajah yang tajam', 'Merakam kanak-kanak bermain',
    'B', 'teknik'),

(5, 'Format file gambar mana yang menyimpan data mentah tanpa kompresi, memberikan fleksibilitas tertinggi saat diedit?', 'JPEG', 'PNG', 'RAW', 'GIF',
    'Which image file format stores uncompressed raw data, providing the highest flexibility during editing?', 'JPEG', 'PNG', 'RAW', 'GIF',
    'Format fail imej manakah yang menyimpan data mentah tanpa mampatan, memberikan fleksibiliti tertinggi semasa disunting?', 'JPEG', 'PNG', 'RAW', 'GIF',
    'C', 'umum'),

(6, 'Siapa tokoh yang dikenal luas atas sistem "Zone System" dalam fotografi film?', 'Ansel Adams', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Steve McCurry',
    'Who is widely known for the "Zone System" in film photography?', 'Ansel Adams', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Steve McCurry',
    'Siapakah tokoh yang dikenali meluas untuk "Zone System" dalam fotografi filem?', 'Ansel Adams', 'Henri Cartier-Bresson', 'Annie Leibovitz', 'Steve McCurry',
    'A', 'sejarah'),

(7, 'Focal length lensa 50mm pada sensor full-frame sering disebut sebagai:', 'Lensa Ultra-Wide', 'Lensa Normal (Standard)', 'Lensa Telephoto', 'Lensa Makro',
    'A 50mm focal length lens on a full-frame sensor is often referred to as a:', 'Ultra-Wide Lens', 'Normal (Standard) Lens', 'Telephoto Lens', 'Macro Lens',
    'Jarak fokus kanta 50mm pada penderia full-frame sering dirujuk sebagai:', 'Kanta Ultra-Lebar', 'Kanta Normal (Standard)', 'Kanta Telefoto', 'Kanta Makro',
    'B', 'teknik'),

(8, 'Dalam segitiga eksposur (exposure triangle), ketiga elemen utamanya adalah:', 'Aperture, Shutter Speed, ISO', 'Contrast, Brightness, Saturation', 'White Balance, Tint, Temperature', 'Highlight, Shadow, Midtone',
    'In the exposure triangle, the three main elements are:', 'Aperture, Shutter Speed, ISO', 'Contrast, Brightness, Saturation', 'White Balance, Tint, Temperature', 'Highlight, Shadow, Midtone',
    'Dalam segi tiga dedahan (exposure triangle), ketiga-tiga elemen utamanya ialah:', 'Bukaan, Kelajuan Pengatup, ISO', 'Kontras, Kecerahan, Ketepuan', 'Imbangan Putih, Tona, Suhu', 'Sorotan, Bayang-bayang, Tona Tengah',
    'A', 'teknik'),

(9, 'Istilah "Bokeh" berasal dari bahasa Jepang yang berarti:', 'Tajam', 'Kabur (Blur) pada latar belakang', 'Terang benderang', 'Gelap gulita',
    'The term "Bokeh" comes from Japanese which means:', 'Sharp', 'Blur in the background', 'Brightly lit', 'Pitch black',
    'Istilah "Bokeh" berasal daripada bahasa Jepun yang bermaksud:', 'Tajam', 'Kabur (Blur) pada latar belakang', 'Sangat terang', 'Sangat gelap',
    'B', 'estetika'),

(10, 'White Balance digunakan dalam kamera digital untuk:', 'Membuat foto menjadi hitam putih', 'Menetralkan warna agar putih terlihat benar-benar putih', 'Menambah kontras pada gambar', 'Menyeimbangkan kecerahan layar',
    'White Balance is used in digital cameras to:', 'Make photos black and white', 'Neutralize colors so white looks truly white', 'Increase contrast in the image', 'Balance screen brightness',
    'Imbangan Putih digunakan dalam kamera digital untuk:', 'Menjadikan gambar hitam putih', 'Meneutralkan warna supaya putih kelihatan benar-benar putih', 'Meningkatkan kontras pada imej', 'Mengimbangkan kecerahan skrin',
    'B', 'teknik'),

(11, 'Kamera pertama yang sukses secara komersial dan diperkenalkan oleh George Eastman pada tahun 1888 dinamakan:', 'Leica', 'Hasselblad', 'Kodak', 'Polaroid',
    'The first commercially successful camera introduced by George Eastman in 1888 was named:', 'Leica', 'Hasselblad', 'Kodak', 'Polaroid',
    'Kamera pertama yang berjaya secara komersial dan diperkenalkan oleh George Eastman pada tahun 1888 dinamakan:', 'Leica', 'Hasselblad', 'Kodak', 'Polaroid',
    'C', 'sejarah'),

(12, 'Lensa makro paling ideal digunakan untuk memotret:', 'Pemandangan gunung', 'Detail kecil seperti serangga atau perhiasan', 'Pertandingan sepak bola dari jauh', 'Foto grup besar',
    'A macro lens is ideally used for shooting:', 'Mountain landscapes', 'Small details like insects or jewelry', 'Football matches from afar', 'Large group photos',
    'Kanta makro paling ideal digunakan untuk merakam:', 'Pemandangan gunung', 'Butiran kecil seperti serangga atau perhiasan', 'Perlawanan bola sepak dari jauh', 'Gambar kumpulan yang besar',
    'B', 'umum'),

(13, 'Apa efek dari menggunakan aperture besar (angka f-stop kecil, seperti f/1.8)?', 'Latar belakang sangat fokus', 'Latar belakang menjadi blur (Depth of Field sempit)', 'Gambar menjadi lebih gelap', 'ISO otomatis naik',
    'What is the effect of using a large aperture (small f-stop number, like f/1.8)?', 'Background is very in focus', 'Background becomes blurred (narrow Depth of Field)', 'Image becomes darker', 'ISO automatically increases',
    'Apakah kesan menggunakan bukaan besar (nombor f-stop kecil, seperti f/1.8)?', 'Latar belakang sangat fokus', 'Latar belakang menjadi kabur (Kedalaman Ruang sempit)', 'Imej menjadi lebih gelap', 'ISO naik secara automatik',
    'B', 'teknik'),

(14, 'Jenis pencahayaan yang paling diminati untuk potret karena kelembutannya disebut:', 'Hard Light', 'Soft Light', 'Direct Sunlight', 'Flashlight',
    'The type of lighting most favored for portraits due to its softness is called:', 'Hard Light', 'Soft Light', 'Direct Sunlight', 'Flashlight',
    'Jenis pencahayaan yang paling diminati untuk potret kerana kelembutannya dipanggil:', 'Cahaya Keras', 'Cahaya Lembut', 'Cahaya Matahari Langsung', 'Lampu Suluh',
    'B', 'estetika'),

(15, '"Golden Hour" dalam fotografi mengacu pada waktu:', 'Tepat pukul 12 siang', 'Sesaat setelah matahari terbit dan sebelum terbenam', 'Tengah malam', 'Pukul 10 pagi',
    '"Golden Hour" in photography refers to the time:', 'Exactly at 12 noon', 'Shortly after sunrise and before sunset', 'Midnight', '10 AM',
    '"Golden Hour" dalam fotografi merujuk kepada waktu:', 'Tepat pukul 12 tengah hari', 'Sejurus selepas matahari terbit dan sebelum matahari terbenam', 'Tengah malam', 'Pukul 10 pagi',
    'B', 'estetika'),

(16, 'Apa nama teknik fotografi di mana subjek utama berupa siluet hitam dengan latar belakang yang sangat terang?', 'High Key', 'Low Key', 'Silhouette', 'HDR',
    'What is the photography technique where the main subject is a black silhouette against a very bright background?', 'High Key', 'Low Key', 'Silhouette', 'HDR',
    'Apakah nama teknik fotografi di mana subjek utama berupa siluet hitam dengan latar belakang yang sangat terang?', 'Kunci Tinggi', 'Kunci Rendah', 'Siluet', 'HDR',
    'C', 'estetika'),

(17, 'Fungsi dari filter ND (Neutral Density) pada lensa adalah:', 'Mengubah warna foto menjadi biru', 'Melindungi lensa dari goresan', 'Mengurangi jumlah cahaya yang masuk tanpa mengubah warna', 'Membuat efek bintang pada lampu',
    'The function of an ND (Neutral Density) filter on a lens is to:', 'Change the photo color to blue', 'Protect the lens from scratches', 'Reduce the amount of light entering without changing color', 'Create a star effect on lights',
    'Fungsi penapis ND (Neutral Density) pada kanta adalah:', 'Menukar warna gambar menjadi biru', 'Melindungi kanta daripada calar', 'Mengurangkan jumlah cahaya yang masuk tanpa mengubah warna', 'Mencipta kesan bintang pada lampu',
    'C', 'teknik'),

(18, 'Kapan foto berwarna pertama (color photograph) yang permanen dibuat?', '1861 oleh James Clerk Maxwell', '1935 oleh Kodak', '1990 oleh Adobe', '1800 oleh Thomas Wedgwood',
    'When was the first permanent color photograph made?', '1861 by James Clerk Maxwell', '1935 by Kodak', '1990 by Adobe', '1800 by Thomas Wedgwood',
    'Bilakah gambar berwarna pertama (color photograph) yang kekal dihasilkan?', '1861 oleh James Clerk Maxwell', '1935 oleh Kodak', '1990 oleh Adobe', '1800 oleh Thomas Wedgwood',
    'A', 'sejarah'),

(19, 'Histogram pada kamera digital berguna untuk:', 'Melihat resolusi gambar', 'Melihat distribusi tonal (kecerahan) gambar', 'Mengecek sisa memori', 'Mengatur timer',
    'The histogram on a digital camera is useful for:', 'Viewing image resolution', 'Viewing the tonal distribution (brightness) of the image', 'Checking remaining memory', 'Setting the timer',
    'Histogram pada kamera digital berguna untuk:', 'Melihat resolusi imej', 'Melihat taburan tona (kecerahan) imej', 'Menyemak baki memori', 'Menetapkan pemasa',
    'B', 'teknik'),

(20, 'Teknik menggerakkan kamera mengikuti subjek yang bergerak sambil menekan rana disebut:', 'Zooming', 'Panning', 'Tilting', 'Dodging',
    'The technique of moving the camera following a moving subject while pressing the shutter is called:', 'Zooming', 'Panning', 'Tilting', 'Dodging',
    'Teknik menggerakkan kamera mengikut subjek yang bergerak sambil menekan pengatup dipanggil:', 'Mengezum', 'Menyorot (Panning)', 'Menyenget (Tilting)', 'Mengelak (Dodging)',
    'B', 'teknik'),

(21, 'Lensa dengan focal length 14mm-24mm termasuk kategori:', 'Lensa Standar', 'Lensa Telephoto', 'Lensa Ultra-Wide', 'Lensa Fix',
    'A lens with a focal length of 14mm-24mm belongs to the category:', 'Standard Lens', 'Telephoto Lens', 'Ultra-Wide Lens', 'Prime Lens',
    'Kanta dengan jarak fokus 14mm-24mm tergolong dalam kategori:', 'Kanta Standard', 'Kanta Telefoto', 'Kanta Ultra-Lebar', 'Kanta Perdana',
    'C', 'teknik'),

(22, 'Dalam fotografi jurnalistik, prinsip utama yang harus dipegang adalah:', 'Merekam kejadian secara jujur tanpa manipulasi konten', 'Membuat foto seindah mungkin dengan Photoshop', 'Selalu menggunakan model', 'Harus berwarna hitam putih',
    'In photojournalism, the main principle to uphold is:', 'Recording events honestly without content manipulation', 'Making photos as beautiful as possible with Photoshop', 'Always using models', 'Must be black and white',
    'Dalam fotografi kewartawanan, prinsip utama yang mesti dipegang ialah:', 'Merakam kejadian secara jujur tanpa manipulasi kandungan', 'Membuat gambar seindah mungkin dengan Photoshop', 'Sentiasa menggunakan model', 'Mesti berwarna hitam putih',
    'A', 'umum'),

(23, 'Jika hasil foto Anda memiliki banyak "noise" atau bintik-bintik kasar, kemungkinan penyebab terbesarnya adalah:', 'Shutter speed terlalu cepat', 'Aperture terlalu kecil', 'ISO terlalu tinggi', 'Lensa kurang bersih',
    'If your photo has a lot of "noise" or grainy spots, the most likely cause is:', 'Shutter speed is too fast', 'Aperture is too small', 'ISO is too high', 'Lens is not clean',
    'Jika gambar anda mempunyai banyak "noise" atau bintik-bintik kasar, kemungkinan punca utamanya ialah:', 'Kelajuan pengatup terlalu pantas', 'Bukaan terlalu kecil', 'ISO terlalu tinggi', 'Kanta kurang bersih',
    'C', 'teknik'),

(24, 'Bapak foto jurnalisme modern yang mempopulerkan konsep "The Decisive Moment" adalah:', 'Robert Capa', 'Henri Cartier-Bresson', 'Richard Avedon', 'Sebastião Salgado',
    'The father of modern photojournalism who popularized the concept of "The Decisive Moment" is:', 'Robert Capa', 'Henri Cartier-Bresson', 'Richard Avedon', 'Sebastião Salgado',
    'Bapa foto kewartawanan moden yang mempopularkan konsep "The Decisive Moment" ialah:', 'Robert Capa', 'Henri Cartier-Bresson', 'Richard Avedon', 'Sebastião Salgado',
    'B', 'sejarah'),

(25, 'Mode pemotretan "Aperture Priority" (biasanya A atau Av pada kamera) berarti:', 'Kamera mengatur semuanya secara otomatis', 'Fotografer mengatur aperture, kamera mengatur shutter speed', 'Fotografer mengatur shutter speed, kamera mengatur aperture', 'Fotografer harus memfokuskan lensa secara manual',
    'The "Aperture Priority" shooting mode (usually A or Av on cameras) means:', 'The camera sets everything automatically', 'The photographer sets the aperture, the camera sets the shutter speed', 'The photographer sets the shutter speed, the camera sets the aperture', 'The photographer must focus the lens manually',
    'Mod penggambaran "Aperture Priority" (biasanya A atau Av pada kamera) bermaksud:', 'Kamera menetapkan semuanya secara automatik', 'Jurugambar menetapkan bukaan, kamera menetapkan kelajuan pengatup', 'Jurugambar menetapkan kelajuan pengatup, kamera menetapkan bukaan', 'Jurugambar mesti memfokus kanta secara manual',
    'B', 'teknik'),

(26, 'Tujuan utama menggunakan reflektor saat memotret potret di luar ruangan adalah:', 'Menutupi lensa dari hujan', 'Memantulkan cahaya untuk mengisi bayangan gelap pada wajah subjek', 'Menambah kontras pada langit', 'Mengubah warna pakaian subjek',
    'The main purpose of using a reflector when shooting outdoor portraits is to:', 'Cover the lens from rain', 'Bounce light to fill in dark shadows on the subject''s face', 'Add contrast to the sky', 'Change the color of the subject''s clothes',
    'Tujuan utama menggunakan pemantul semasa merakam potret di luar ruangan adalah untuk:', 'Menutup kanta daripada hujan', 'Memantulkan cahaya untuk mengisi bayangan gelap pada wajah subjek', 'Menambah kontras pada langit', 'Menukar warna pakaian subjek',
    'B', 'teknik'),

(27, 'File gambar berformat PNG mendukung fitur utama yang tidak dimiliki JPEG, yaitu:', 'Ukuran file lebih kecil', 'Transparansi latar belakang (Alpha Channel)', 'Merekam video pendek', 'Metadata GPS yang lebih akurat',
    'PNG format image files support a key feature that JPEG does not have, which is:', 'Smaller file size', 'Background transparency (Alpha Channel)', 'Recording short videos', 'More accurate GPS metadata',
    'Fail imej berformat PNG menyokong ciri utama yang tidak dimiliki oleh JPEG, iaitu:', 'Saiz fail yang lebih kecil', 'Ketelusan latar belakang (Saluran Alpha)', 'Merakam video pendek', 'Metadata GPS yang lebih tepat',
    'B', 'umum'),

(28, 'Berapa jarak fokus terdekat yang umumnya dimiliki lensa makro sejati?', '1 meter', '1:1 pembesaran (reproduction ratio)', 'Tak terhingga', '50 centimeter',
    'What is the closest focusing distance generally found on a true macro lens?', '1 meter', '1:1 magnification (reproduction ratio)', 'Infinity', '50 centimeters',
    'Berapakah jarak fokus terdekat yang biasanya dimiliki oleh kanta makro sejati?', '1 meter', '1:1 pembesaran (nisbah pembiakan)', 'Tiada had', '50 sentimeter',
    'B', 'teknik'),

(29, 'Teknik fotografi "Light Painting" biasanya membutuhkan:', 'Shutter speed yang sangat cepat', 'Flash eksternal yang banyak', 'Shutter speed lambat (long exposure) di tempat gelap', 'Lensa telephoto super panjang',
    'The "Light Painting" photography technique usually requires:', 'A very fast shutter speed', 'Multiple external flashes', 'A slow shutter speed (long exposure) in a dark place', 'A super long telephoto lens',
    'Teknik fotografi "Light Painting" biasanya memerlukan:', 'Kelajuan pengatup yang sangat pantas', 'Banyak denyar luaran', 'Kelajuan pengatup perlahan (pendedahan panjang) di tempat gelap', 'Kanta telefoto super panjang',
    'C', 'estetika'),

(30, 'Kamera Mirrorless berbeda dengan DSLR utamanya dalam hal:', 'Tidak menggunakan memori card', 'Tidak menggunakan cermin pantul di dalam bodi kamera', 'Tidak bisa ganti lensa', 'Hanya bisa merekam video',
    'Mirrorless cameras differ from DSLRs primarily in that they:', 'Do not use memory cards', 'Do not use a reflex mirror inside the camera body', 'Cannot change lenses', 'Can only record video',
    'Kamera Mirrorless berbeza daripada DSLR terutamanya dalam aspek:', 'Tidak menggunakan kad memori', 'Tidak menggunakan cermin pantulan di dalam badan kamera', 'Tidak boleh menukar kanta', 'Hanya boleh merakam video',
    'B', 'umum'),

(31, 'Garis bayangan keras yang tajam menunjukkan jenis cahaya:', 'Soft Light', 'Hard Light', 'Diffused Light', 'Ambient Light',
    'Sharp, hard shadow lines indicate what type of light?', 'Soft Light', 'Hard Light', 'Diffused Light', 'Ambient Light',
    'Garis bayangan keras yang tajam menunjukkan jenis cahaya:', 'Cahaya Lembut', 'Cahaya Keras', 'Cahaya Teresap', 'Cahaya Ambien',
    'B', 'estetika'),

(32, 'Pengertian Megapixel adalah:', 'Satu miliar pixel', 'Satu juta pixel', 'Seribu pixel', 'Ukuran fisik sensor kamera',
    'The meaning of Megapixel is:', 'One billion pixels', 'One million pixels', 'One thousand pixels', 'Physical size of the camera sensor',
    'Pengertian Megapixel ialah:', 'Satu bilion piksel', 'Satu juta piksel', 'Seribu piksel', 'Saiz fizikal penderia kamera',
    'B', 'teknik'),

(33, 'Untuk menghindari foto goyang (blur) saat memotret dengan tangan menggunakan lensa 200mm (full-frame), shutter speed minimum amannya adalah sekitar:', '1/10 detik', '1/50 detik', '1/200 detik atau lebih cepat', '5 detik',
    'To avoid blurry photos when shooting handheld with a 200mm lens (full-frame), a safe minimum shutter speed is around:', '1/10 second', '1/50 second', '1/200 second or faster', '5 seconds',
    'Untuk mengelakkan gambar goyang (kabur) semasa merakam menggunakan tangan dengan kanta 200mm (full-frame), kelajuan pengatup minimum yang selamat adalah sekitar:', '1/10 saat', '1/50 saat', '1/200 saat atau lebih pantas', '5 saat',
    'C', 'teknik'),

(34, 'Adobe Lightroom utamanya digunakan fotografer untuk:', 'Membuat animasi 3D', 'Manajemen katalog foto dan pengeditan warna/eksposur (Color Grading)', 'Membuat desain logo', 'Mengedit video durasi panjang',
    'Adobe Lightroom is primarily used by photographers for:', 'Creating 3D animations', 'Photo catalog management and color/exposure editing (Color Grading)', 'Creating logo designs', 'Editing long-duration videos',
    'Adobe Lightroom terutamanya digunakan oleh jurugambar untuk:', 'Mencipta animasi 3D', 'Pengurusan katalog gambar dan penyuntingan warna/dedahan (Color Grading)', 'Mencipta reka bentuk logo', 'Menyunting video berdurasi panjang',
    'B', 'umum'),

(35, 'Gaya fotografi jalanan (Street Photography) paling sering menggunakan lensa:', 'Telephoto 400mm', 'Super Wide 10mm', 'Prime 35mm atau 50mm', 'Makro 100mm',
    'The Street Photography style most often uses lenses:', '400mm Telephoto', '10mm Super Wide', '35mm or 50mm Prime', '100mm Macro',
    'Gaya fotografi jalanan (Street Photography) paling kerap menggunakan kanta:', 'Telefoto 400mm', 'Super Lebar 10mm', 'Perdana 35mm atau 50mm', 'Makro 100mm',
    'C', 'umum'),

(36, 'Format sensor APS-C (Crop Sensor) memiliki crop factor sekitar berapa dibandingkan Full Frame?', 'Tidak ada bedanya', '1.5x - 1.6x', '2.0x', '0.5x',
    'An APS-C sensor format (Crop Sensor) has a crop factor of about what compared to Full Frame?', 'No difference', '1.5x - 1.6x', '2.0x', '0.5x',
    'Format penderia APS-C (Crop Sensor) mempunyai faktor tanaman sekitar berapa berbanding Full Frame?', 'Tiada beza', '1.5x - 1.6x', '2.0x', '0.5x',
    'B', 'teknik'),

(37, 'Apa singkatan dari HDR dalam fotografi?', 'High Definition Resolution', 'High Dynamic Range', 'Hyper Digital Ratio', 'High Density RAM',
    'What does HDR stand for in photography?', 'High Definition Resolution', 'High Dynamic Range', 'Hyper Digital Ratio', 'High Density RAM',
    'Apakah singkatan HDR dalam fotografi?', 'High Definition Resolution', 'High Dynamic Range', 'Hyper Digital Ratio', 'High Density RAM',
    'B', 'teknik'),

(38, 'Di manakah letak sensor gambar pada kamera digital?', 'Di dalam lensa', 'Di belakang cermin / tirai rana', 'Di dalam kartu memori', 'Di layar LCD',
    'Where is the image sensor located in a digital camera?', 'Inside the lens', 'Behind the mirror / shutter curtain', 'Inside the memory card', 'In the LCD screen',
    'Di manakah penderia imej terletak pada kamera digital?', 'Di dalam kanta', 'Di belakang cermin / tirai pengatup', 'Di dalam kad memori', 'Pada skrin LCD',
    'B', 'teknik'),

(39, 'Efek "Red Eye" pada foto manusia biasanya disebabkan oleh:', 'Kurang tidur', 'Pantulan cahaya flash pada retina mata yang kaya pembuluh darah', 'Salah setting white balance', 'Lensa berjamur',
    'The "Red Eye" effect in human photos is usually caused by:', 'Lack of sleep', 'Reflection of flash light on the blood-rich retina of the eye', 'Wrong white balance setting', 'Moldy lens',
    'Kesan "Mata Merah" (Red Eye) pada gambar manusia biasanya disebabkan oleh:', 'Kurang tidur', 'Pantulan cahaya denyar pada retina mata yang kaya dengan saluran darah', 'Tetapan imbangan putih yang salah', 'Kanta berkulat',
    'B', 'umum'),

(40, 'Memotret dengan "Leading Lines" bertujuan untuk:', 'Menambah warna pada foto', 'Mengarahkan mata penikmat foto menuju subjek utama', 'Membuat foto menjadi persegi', 'Menghindari distorsi lensa',
    'Shooting with "Leading Lines" aims to:', 'Add color to the photo', 'Direct the viewer''s eye towards the main subject', 'Make the photo square', 'Avoid lens distortion',
    'Merakam dengan "Leading Lines" bertujuan untuk:', 'Menambah warna pada gambar', 'Mengarahkan mata pemerhati gambar ke arah subjek utama', 'Menjadikan gambar segi empat sama', 'Mengelakkan herotan kanta',
    'B', 'estetika'),

(41, 'Polarizer filter paling berguna untuk:', 'Membuat efek bintang pada malam hari', 'Menghilangkan pantulan pada air/kaca dan membirukan langit', 'Menurunkan shutter speed', 'Mengubah foto menjadi sephia',
    'A polarizer filter is most useful for:', 'Creating a star effect at night', 'Removing reflections on water/glass and deepening blue skies', 'Lowering shutter speed', 'Turning the photo into sepia',
    'Penapis polarizer paling berguna untuk:', 'Mencipta kesan bintang pada waktu malam', 'Menghilangkan pantulan pada air/kaca dan membirukan langit', 'Menurunkan kelajuan pengatup', 'Menukar gambar menjadi sepia',
    'B', 'teknik'),

(42, '"Depth of Field" (DoF) ditentukan oleh tiga faktor utama, yaitu:', 'Aperture, Focal Length, dan Jarak ke Subjek', 'ISO, Shutter Speed, dan Baterai', 'Flash, Reflektor, dan Tripod', 'Megapixel, Format File, dan Sensor',
    '"Depth of Field" (DoF) is determined by three main factors, which are:', 'Aperture, Focal Length, and Distance to Subject', 'ISO, Shutter Speed, and Battery', 'Flash, Reflector, and Tripod', 'Megapixel, File Format, and Sensor',
    '"Kedalaman Ruang" (DoF) ditentukan oleh tiga faktor utama, iaitu:', 'Bukaan, Jarak Fokus, dan Jarak ke Subjek', 'ISO, Kelajuan Pengatup, dan Bateri', 'Denyar, Pemantul, dan Tripod', 'Megapiksel, Format Fail, dan Penderia',
    'A', 'teknik'),

(43, 'Foto pertama yang pernah terekam sejarah (View from the Window at Le Gras) dibuat pada tahun 1826 oleh:', 'Louis Daguerre', 'Joseph Nicéphore Niépce', 'Thomas Edison', 'Guglielmo Marconi',
    'The first photograph ever recorded in history (View from the Window at Le Gras) was made in 1826 by:', 'Louis Daguerre', 'Joseph Nicéphore Niépce', 'Thomas Edison', 'Guglielmo Marconi',
    'Gambar pertama yang pernah direkodkan dalam sejarah (View from the Window at Le Gras) dibuat pada tahun 1826 oleh:', 'Louis Daguerre', 'Joseph Nicéphore Niépce', 'Thomas Edison', 'Guglielmo Marconi',
    'B', 'sejarah'),

(44, 'Mode M (Manual) pada kamera memberikan fotografer kendali penuh atas:', 'Hanya Fokus Lensa', 'Hanya Kecerahan Layar', 'Aperture, Shutter Speed, dan ISO', 'Hanya Flash',
    'M (Manual) mode on a camera gives the photographer full control over:', 'Only Lens Focus', 'Only Screen Brightness', 'Aperture, Shutter Speed, and ISO', 'Only Flash',
    'Mod M (Manual) pada kamera memberi jurugambar kawalan penuh ke atas:', 'Hanya Fokus Kanta', 'Hanya Kecerahan Skrin', 'Bukaan, Kelajuan Pengatup, dan ISO', 'Hanya Denyar',
    'C', 'teknik'),

(45, 'Teknik HDR biasanya membutuhkan:', 'Satu foto gelap', 'Tiga atau lebih foto dengan eksposur berbeda (under, normal, over) yang digabungkan', 'Lensa yang sangat mahal', 'Kamera tahan air',
    'The HDR technique usually requires:', 'One dark photo', 'Three or more photos with different exposures (under, normal, over) combined together', 'A very expensive lens', 'A waterproof camera',
    'Teknik HDR biasanya memerlukan:', 'Satu gambar gelap', 'Tiga atau lebih gambar dengan dedahan berbeza (kurang, normal, lebih) yang digabungkan', 'Kanta yang sangat mahal', 'Kamera kalis air',
    'B', 'teknik'),

(46, 'Sudut pengambilan gambar dari bawah melihat ke atas subjek disebut:', 'Bird Eye View', 'Worm Eye View (Low Angle)', 'Eye Level', 'High Angle',
    'The angle of shooting from below looking up at the subject is called:', 'Bird Eye View', 'Worm Eye View (Low Angle)', 'Eye Level', 'High Angle',
    'Sudut pengambilan gambar dari bawah melihat ke atas subjek dipanggil:', 'Pandangan Mata Burung', 'Pandangan Mata Cacing (Sudut Rendah)', 'Aras Mata', 'Sudut Tinggi',
    'B', 'estetika'),

(47, 'Lampu kilat (Flash) yang diarahkan ke langit-langit alih-alih langsung ke wajah subjek disebut teknik:', 'Direct Flash', 'Bounce Flash', 'Fill Flash', 'Strobe Flash',
    'A flash directed at the ceiling instead of directly at the subject''s face is a technique called:', 'Direct Flash', 'Bounce Flash', 'Fill Flash', 'Strobe Flash',
    'Lampu denyar (Flash) yang diarahkan ke siling dan bukan terus ke wajah subjek dipanggil teknik:', 'Denyar Langsung', 'Denyar Pantulan (Bounce)', 'Denyar Pengisi', 'Denyar Strob',
    'B', 'teknik'),

(48, 'File berformat TIFF biasanya digunakan untuk:', 'Bagi hasil cepat ke WhatsApp', 'Pencetakan kualitas tinggi (Lossless)', 'Membuat stiker', 'Video Timelapse',
    'TIFF format files are usually used for:', 'Quick sharing to WhatsApp', 'High-quality printing (Lossless)', 'Making stickers', 'Timelapse Video',
    'Fail berformat TIFF biasanya digunakan untuk:', 'Perkongsian pantas ke WhatsApp', 'Pencetakan kualiti tinggi (Tanpa Kehilangan)', 'Membuat pelekat', 'Video Timelapse',
    'B', 'umum'),

(49, 'Apa itu "Aberasi Kromatik" (Chromatic Aberration) pada lensa?', 'Lensa yang bisa berubah warna', 'Viñet hitam di sudut gambar', 'Viñet putih di tengah gambar', 'Garis pinggiran warna (biasanya ungu/hijau) pada tepi subjek yang kontras',
    'What is "Chromatic Aberration" in a lens?', 'A lens that can change color', 'Black vignette in the corners of the image', 'White vignette in the middle of the image', 'Color fringing (usually purple/green) on the edges of contrasting subjects',
    'Apakah "Aberasi Kromatik" (Chromatic Aberration) pada kanta?', 'Kanta yang boleh berubah warna', 'Vignet hitam pada sudut gambar', 'Vignet putih di tengah gambar', 'Garisan pinggiran warna (biasanya ungu/hijau) pada tepi subjek yang kontras',
    'D', 'teknik'),

(50, 'Prinsip desain di mana subjek diletakkan dengan bobot visual yang sama di sisi kiri dan kanan disebut:', 'Asimetris', 'Simetris', 'Rule of Odds', 'Negative Space',
    'The design principle where the subject is placed with equal visual weight on the left and right sides is called:', 'Asymmetrical', 'Symmetrical', 'Rule of Odds', 'Negative Space',
    'Prinsip reka bentuk di mana subjek diletakkan dengan bobot visual yang sama di sisi kiri dan kanan dipanggil:', 'Asimetri', 'Simetri', 'Rule of Odds', 'Ruang Negatif',
    'B', 'estetika');
