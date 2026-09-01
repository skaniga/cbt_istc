-- ================================================================
-- SOAL BAHASA MELAYU (MS) — UPDATE KOLOM pertanyaan_ms, pilihan_*_ms
-- Jalankan setelah ALTER TABLE add_kolom_multilang.sql
-- ================================================================

-- Tambah kolom kalau belum ada
ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS pertanyaan_ms TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_a_ms  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_b_ms  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_c_ms  TEXT,
  ADD COLUMN IF NOT EXISTS pilihan_d_ms  TEXT;

-- ================================================================
-- BAHAGIAN I: ENVIRONMENTAL TECHNOLOGY (Soal 1-50)
-- ================================================================

UPDATE public.questions SET pertanyaan_ms='Tindakan berikut yang merupakan contoh penerapan prinsip Reduce (mengurangkan sisa) ialah...', pilihan_a_ms='Memproses botol plastik menjadi pasu bunga', pilihan_b_ms='Membawa botol minuman sendiri dari rumah', pilihan_c_ms='Menjual kertas terpakai ke pusat kitar semula', pilihan_d_ms='Menggunakan semula kotak terpakai untuk bekas buku' WHERE nomor_soal=1;

UPDATE public.questions SET pertanyaan_ms='Gas rumah hijau yang paling banyak dihasilkan daripada sisa pembakaran bahan api fosil kenderaan ialah...', pilihan_a_ms='Oksigen', pilihan_b_ms='Karbon dioksida', pilihan_c_ms='Nitrogen', pilihan_d_ms='Wap air' WHERE nomor_soal=2;

UPDATE public.questions SET pertanyaan_ms='Alat pemerangkap tenaga matahari yang menukarkan cahaya matahari secara terus kepada elektrik ialah...', pilihan_a_ms='Kincir angin', pilihan_b_ms='Panel solar (Solar cell)', pilihan_c_ms='Penjana diesel', pilihan_d_ms='Turbin air' WHERE nomor_soal=3;

UPDATE public.questions SET pertanyaan_ms='Pemprosesan sisa daun dan sisa makanan menjadi baja organik dipanggil...', pilihan_a_ms='Pengkomposan', pilihan_b_ms='Kitar semula', pilihan_c_ms='Insinerasi', pilihan_d_ms='Penanaman semula hutan (Reforestasi)' WHERE nomor_soal=4;

UPDATE public.questions SET pertanyaan_ms='Kelebihan utama penggunaan bahan api biogas daripada najis ternakan berbanding bahan api fosil ialah...', pilihan_a_ms='Harganya sangat mahal', pilihan_b_ms='Boleh diperbaharui dan mesra alam', pilihan_c_ms='Mempunyai tekanan gas yang berbahaya', pilihan_d_ms='Menghasilkan asap hitam pekat' WHERE nomor_soal=5;

UPDATE public.questions SET pertanyaan_ms='Proses penyaringan air laut menjadi air tawar yang boleh diminum dipanggil...', pilihan_a_ms='Pengudaraan (Aerasi)', pilihan_b_ms='Penyahmasinan (Desalinasi)', pilihan_c_ms='Eutrofikasi', pilihan_d_ms='Pemejalwapan' WHERE nomor_soal=6;

UPDATE public.questions SET pertanyaan_ms='Plastik biodegradasi merupakan jenis plastik yang lebih mesra alam kerana...', pilihan_a_ms='Tahan terhadap api bersuhu tinggi', pilihan_b_ms='Mudah terurai oleh mikroorganisma tanah', pilihan_c_ms='Tidak boleh berubah bentuk', pilihan_d_ms='Diperbuat daripada petroleum tulen' WHERE nomor_soal=7;

UPDATE public.questions SET pertanyaan_ms='Penanaman semula pokok di kawasan hutan yang gondol untuk menyerap CO2 dipanggil...', pilihan_a_ms='Tanaman selingan', pilihan_b_ms='Penanaman semula hutan (Reforestasi)', pilihan_c_ms='Pengairan', pilihan_d_ms='Sanitasi' WHERE nomor_soal=8;

UPDATE public.questions SET pertanyaan_ms='Contoh sumber tenaga boleh diperbaharui yang memanfaatkan haba dari dalam bumi ialah tenaga...', pilihan_a_ms='Geoterma', pilihan_b_ms='Biojisim', pilihan_c_ms='Nuklear', pilihan_d_ms='Ombak' WHERE nomor_soal=9;

UPDATE public.questions SET pertanyaan_ms='Sistem pertanian menegak di kawasan bandar yang menjimatkan ruang dipanggil...', pilihan_a_ms='Permakultur', pilihan_b_ms='Pertanian Menegak / Vertikultur', pilihan_c_ms='Ekstensifikasi', pilihan_d_ms='Monokultur' WHERE nomor_soal=10;

UPDATE public.questions SET pertanyaan_ms='Salah satu ciri bangunan mesra alam (Green Building) ialah...', pilihan_a_ms='Menggunakan penyaman udara (AC) sepenuhnya sepanjang hari tanpa tingkap', pilihan_b_ms='Mempunyai banyak pengudaraan dan pencahayaan semula jadi', pilihan_c_ms='Seluruh dinding diperbuat daripada kaca tebal yang tertutup', pilihan_d_ms='Menggunakan mentol pijar berkuasa tinggi' WHERE nomor_soal=11;

UPDATE public.questions SET pertanyaan_ms='Istilah untuk sisa barangan elektronik seperti telefon bimbit dan komputer terpakai ialah...', pilihan_a_ms='Sisa organik', pilihan_b_ms='E-waste (Sisa elektronik)', pilihan_c_ms='Sisa klinikal', pilihan_d_ms='Gas toksik' WHERE nomor_soal=12;

UPDATE public.questions SET pertanyaan_ms='Menanam tanaman tanpa medium tanah sebaliknya menggunakan air bernutrien dipanggil...', pilihan_a_ms='Akuaponik', pilihan_b_ms='Hidroponik', pilihan_c_ms='Tut', pilihan_d_ms='Keratan batang' WHERE nomor_soal=13;

UPDATE public.questions SET pertanyaan_ms='Kesan negatif daripada penggunaan beg plastik pakai buang terhadap laut ialah...', pilihan_a_ms='Air laut menjadi lebih masin', pilihan_b_ms='Haiwan marin seperti penyu boleh mati akibat memakan sisa plastik', pilihan_c_ms='Ombak laut menjadi semakin besar', pilihan_d_ms='Terumbu karang membesar terlalu cepat' WHERE nomor_soal=14;

UPDATE public.questions SET pertanyaan_ms='Teknologi pengairan yang menyalurkan air secara perlahan terus ke akar tanaman untuk menjimatkan air ialah pengairan...', pilihan_a_ms='Pemercik (Sprinkler)', pilihan_b_ms='Titisan (Drip irrigation)', pilihan_c_ms='Banjir', pilihan_d_ms='Saluran terbuka' WHERE nomor_soal=15;

UPDATE public.questions SET pertanyaan_ms='Gabungan antara penternakan ikan dan tanaman hidroponik dalam satu sistem dipanggil...', pilihan_a_ms='Aeroponik', pilihan_b_ms='Akuaponik', pilihan_c_ms='Marikultur', pilihan_d_ms='Monokultur' WHERE nomor_soal=16;

UPDATE public.questions SET pertanyaan_ms='Alat yang memanfaatkan tiupan angin untuk memutarkan penjana elektrik dipanggil...', pilihan_a_ms='Anemometer', pilihan_b_ms='Turbin angin', pilihan_c_ms='Barometer', pilihan_d_ms='Pemampat' WHERE nomor_soal=17;

UPDATE public.questions SET pertanyaan_ms='Menggunakan semula botol kaca bekas sirap untuk bekas air minuman sejuk di dalam peti sejuk adalah penerapan prinsip...', pilihan_a_ms='Reduce', pilihan_b_ms='Reuse', pilihan_c_ms='Recycle', pilihan_d_ms='Replace' WHERE nomor_soal=18;

UPDATE public.questions SET pertanyaan_ms='Gas metana yang terhasil dari tapak pelupusan sampah berpunca daripada proses penguraian secara...', pilihan_a_ms='Aerob (memerlukan udara)', pilihan_b_ms='Anaerob (tanpa udara)', pilihan_c_ms='Pembakaran', pilihan_d_ms='Pembekuan' WHERE nomor_soal=19;

UPDATE public.questions SET pertanyaan_ms='Penggunaan lampu jimat tenaga yang paling berkesan pada masa kini ialah jenis lampu...', pilihan_a_ms='Pijar', pilihan_b_ms='LED', pilihan_c_ms='Kalimantang biasa', pilihan_d_ms='Halogen' WHERE nomor_soal=20;

UPDATE public.questions SET pertanyaan_ms='Fenomena kemasukan bahan pencemar ke dalam persekitaran air sehingga menurunkan kualiti air dipanggil...', pilihan_a_ms='Hujan asid', pilihan_b_ms='Pencemaran air', pilihan_c_ms='Pemasidan', pilihan_d_ms='Kesan rumah hijau' WHERE nomor_soal=21;

UPDATE public.questions SET pertanyaan_ms='Kemampuan tumbuhan tertentu dalam menyerap dan membersihkan bahan bertoksik dari tanah dipanggil...', pilihan_a_ms='Bioremediasi', pilihan_b_ms='Fitoremediasi', pilihan_c_ms='Pengoksidaan', pilihan_d_ms='Penapaian' WHERE nomor_soal=22;

UPDATE public.questions SET pertanyaan_ms='Kelebihan utama kenderaan elektrik (Electric Vehicle) berbanding kenderaan petrol ialah...', pilihan_a_ms='Tidak menghasilkan pelepasan gas ekzos secara langsung', pilihan_b_ms='Tidak menggunakan bateri', pilihan_c_ms='Lebih berat dan perlahan', pilihan_d_ms='Memerlukan minyak enjin yang lebih banyak' WHERE nomor_soal=23;

UPDATE public.questions SET pertanyaan_ms='Cara menjimatkan elektrik di rumah yang paling mudah ialah...', pilihan_a_ms='Membiarkan TV terpasang semasa tidur', pilihan_b_ms='Memadamkan lampu dan alat elektronik yang tidak digunakan', pilihan_c_ms='Menyandarkan peti sejuk berhampiran dapur gas', pilihan_d_ms='Menggunakan penyaman udara pada suhu paling sejuk 16 darjah dengan pintu terbuka' WHERE nomor_soal=24;

UPDATE public.questions SET pertanyaan_ms='Penggunaan air basuhan beras untuk menyiram tanaman bertujuan untuk...', pilihan_a_ms='Membunuh tanaman', pilihan_b_ms='Menjimatkan air bersih dan memberikan nutrien kepada tanah', pilihan_c_ms='Membuatkan tanah menjadi keras', pilihan_d_ms='Mengusir serangga dengan cepat' WHERE nomor_soal=25;

UPDATE public.questions SET pertanyaan_ms='Bahan mentah utama pembuatan bioetanol yang sering digunakan ialah tanaman yang mengandungi...', pilihan_a_ms='Gula atau kanji (seperti ubi kayu dan tebu)', pilihan_b_ms='Minyak kelapa', pilihan_c_ms='Kayu keras', pilihan_d_ms='Arang batu' WHERE nomor_soal=26;

UPDATE public.questions SET pertanyaan_ms='Salah satu punca utama berlakunya banjir kilat di kawasan bandar ialah...', pilihan_a_ms='Banyaknya taman bandar', pilihan_b_ms='Berkurangnya kawasan resapan air akibat penutupan konkrit', pilihan_c_ms='Penanaman pokok pembersih udara', pilihan_d_ms='Penggunaan telaga resapan' WHERE nomor_soal=27;

UPDATE public.questions SET pertanyaan_ms='Fungsi penuaian air hujan (Rainwater harvesting) ialah...', pilihan_a_ms='Membiakkan nyamuk', pilihan_b_ms='Menadah air hujan untuk menyiram tanaman dan mencuci kenderaan', pilihan_c_ms='Menjadikan air hujan sebagai sumber elektrik utama', pilihan_d_ms='Mengeringkan perigi penduduk' WHERE nomor_soal=28;

UPDATE public.questions SET pertanyaan_ms='Kerosakan lapisan ozon di atmosfera bumi terutamanya berpunca daripada bahan kimia...', pilihan_a_ms='Karbon monoksida', pilihan_b_ms='CFC (Klorofluorokarbon) daripada alat pendingin lama', pilihan_c_ms='Oksigen', pilihan_d_ms='Nitrogen dioksida' WHERE nomor_soal=29;

UPDATE public.questions SET pertanyaan_ms='Pemprosesan sisa plastik menjadi barangan kraf tangan dipanggil...', pilihan_a_ms='Insinerasi', pilihan_b_ms='Upcycling / Kitar semula kreatif', pilihan_c_ms='Penanaman semula hutan', pilihan_d_ms='Penyulingan' WHERE nomor_soal=30;

UPDATE public.questions SET pertanyaan_ms='Istilah Jejak Karbon (Carbon Footprint) menggambarkan...', pilihan_a_ms='Kesan tapak kaki pada tanah berkarbon', pilihan_b_ms='Jumlah keseluruhan pelepasan gas rumah hijau yang terhasil daripada aktiviti kita', pilihan_c_ms='Keluasan hutan yang ada di sesebuah negara', pilihan_d_ms='Berat arang batu yang dilombong' WHERE nomor_soal=31;

UPDATE public.questions SET pertanyaan_ms='Alat penapis udara yang dipasang di kilang untuk mengurangkan pelepasan habuk halus ialah...', pilihan_a_ms='Penapis air', pilihan_b_ms='Penapis asap / Scrubber', pilihan_c_ms='Pemampat udara', pilihan_d_ms='Penderia angin' WHERE nomor_soal=32;

UPDATE public.questions SET pertanyaan_ms='Mikroplastik berbahaya kepada ekosistem laut kerana...', pilihan_a_ms='Menambah nutrien ikan', pilihan_b_ms='Dimakan oleh haiwan laut dan masuk ke dalam rantai makanan', pilihan_c_ms='Mempercepatkan pertumbuhan terumbu karang', pilihan_d_ms='Mengubah warna air menjadi jernih' WHERE nomor_soal=33;

UPDATE public.questions SET pertanyaan_ms='Tenaga ombak laut memanfaatkan...', pilihan_a_ms='Haba permukaan air', pilihan_b_ms='Pergerakan turun naik permukaan air laut akibat angin', pilihan_c_ms='Kandungan garam air laut', pilihan_d_ms='Kedalaman air laut' WHERE nomor_soal=34;

UPDATE public.questions SET pertanyaan_ms='Hutan paya bakau (mangrove) di pesisir pantai berfungsi untuk...', pilihan_a_ms='Mempercepatkan hakisan pantai', pilihan_b_ms='Mencegah hakisan pantai dan menjadi tempat pembiakan hidupan laut', pilihan_c_ms='Menyerap air laut supaya surut', pilihan_d_ms='Menghasilkan kayu api utama' WHERE nomor_soal=35;

UPDATE public.questions SET pertanyaan_ms='Alat yang mengubah sisa organik isi rumah menjadi gas untuk memasak dipanggil...', pilihan_a_ms='Insinerator', pilihan_b_ms='Pencerna bio (Biodigester)', pilihan_c_ms='Pemampat', pilihan_d_ms='Radiator' WHERE nomor_soal=36;

UPDATE public.questions SET pertanyaan_ms='Bahan api biodiesel diperbuat daripada...', pilihan_a_ms='Minyak petroleum', pilihan_b_ms='Minyak sayuran (seperti kelapa sawit)', pilihan_c_ms='Gas asli cecair', pilihan_d_ms='Cecair arang batu' WHERE nomor_soal=37;

UPDATE public.questions SET pertanyaan_ms='Usaha mengurangkan penggunaan polistirena sebagai bekas makanan dan menggantikannya dengan bekal makanan merupakan tindakan...', pilihan_a_ms='Recycle', pilihan_b_ms='Replace / Ganti', pilihan_c_ms='Refuse', pilihan_d_ms='Rot' WHERE nomor_soal=38;

UPDATE public.questions SET pertanyaan_ms='Sumber kuasa hidroelektrik memanfaatkan...', pilihan_a_ms='Bau air', pilihan_b_ms='Tenaga keupayaan dan kinetik daripada aliran air terjun/empangan', pilihan_c_ms='Kejernihan air', pilihan_d_ms='Suhu sejuk air' WHERE nomor_soal=39;

UPDATE public.questions SET pertanyaan_ms='Konsep bandar pintar yang disepadukan dengan teknologi mesra alam dipanggil...', pilihan_a_ms='Bandar Perindustrian', pilihan_b_ms='Smart & Green City (Bandar Pintar & Hijau)', pilihan_c_ms='Megacity', pilihan_d_ms='Metropolis' WHERE nomor_soal=40;

UPDATE public.questions SET pertanyaan_ms='Gas beracun yang tidak berwarna dan tidak berbau daripada asap pembakaran tidak lengkap kenderaan ialah...', pilihan_a_ms='CO2', pilihan_b_ms='CO (Karbon Monoksida)', pilihan_c_ms='O3', pilihan_d_ms='N2' WHERE nomor_soal=41;

UPDATE public.questions SET pertanyaan_ms='Penggunaan bahan pencuci mesra alam bertujuan supaya...', pilihan_a_ms='Buih melimpah memenuhi sungai', pilihan_b_ms='Mudah terurai dan tidak merosakkan ekosistem sungai', pilihan_c_ms='Pakaian cepat reput', pilihan_d_ms='Air menjadi keruh' WHERE nomor_soal=42;

UPDATE public.questions SET pertanyaan_ms='Kompos cecair yang dihasilkan daripada ekstrak sisa organik dipanggil...', pilihan_a_ms='Baja kimia Urea', pilihan_b_ms='Baja Organik Cecair (POC)', pilihan_c_ms='Racun perosak sintetik', pilihan_d_ms='NPK' WHERE nomor_soal=43;

UPDATE public.questions SET pertanyaan_ms='Kebaikan membina lubang biopori di halaman rumah ialah...', pilihan_a_ms='Tempat membuang plastik', pilihan_b_ms='Meningkatkan resapan air hujan ke dalam tanah dan memproses sisa organik', pilihan_c_ms='Tempat memacak tiang elektrik', pilihan_d_ms='Mengeringkan tanah di sekitarnya' WHERE nomor_soal=44;

UPDATE public.questions SET pertanyaan_ms='Loji Kuasa Tenaga Angin memanfaatkan sumber tenaga...', pilihan_a_ms='Air', pilihan_b_ms='Angin', pilihan_c_ms='Matahari', pilihan_d_ms='Geoterma' WHERE nomor_soal=45;

UPDATE public.questions SET pertanyaan_ms='Hujan asid berlaku apabila asap industri bertindak balas dengan wap air membentuk bahan...', pilihan_a_ms='Asid sulfurik dan asid nitrik', pilihan_b_ms='Garam dapur', pilihan_c_ms='Alkohol', pilihan_d_ms='Ammonia' WHERE nomor_soal=46;

UPDATE public.questions SET pertanyaan_ms='Memproses kertas terpakai menjadi surat khabar atau kadbod semula merupakan proses...', pilihan_a_ms='Reuse', pilihan_b_ms='Recycle', pilihan_c_ms='Reduce', pilihan_d_ms='Repair' WHERE nomor_soal=47;

UPDATE public.questions SET pertanyaan_ms='Komposisi utama sisa isi rumah di rantau ini sebahagian besarnya adalah dalam bentuk...', pilihan_a_ms='Plastik tebal', pilihan_b_ms='Sisa organik/sisa makanan', pilihan_c_ms='Kaca dan logam', pilihan_d_ms='Bateri terpakai' WHERE nomor_soal=48;

UPDATE public.questions SET pertanyaan_ms='Fungsi utama Bumbung Hijau (Green Roof) pada bangunan moden ialah...', pilihan_a_ms='Menambah berat beban bangunan', pilihan_b_ms='Menyerap haba, mengurangkan kesan rumah hijau, dan menadah air hujan', pilihan_c_ms='Tempat meletakkan kenderaan', pilihan_d_ms='Menyimpan barang terpakai' WHERE nomor_soal=49;

UPDATE public.questions SET pertanyaan_ms='Kempen menjimatkan tenaga dengan memadamkan lampu selama 1 jam secara global dikenali sebagai...', pilihan_a_ms='Earth Hour', pilihan_b_ms='Earth Day', pilihan_c_ms='Green Day', pilihan_d_ms='Clean Up Day' WHERE nomor_soal=50;

-- ================================================================
-- BAHAGIAN II: SMART ROBOTICS (Soal 51-100)
-- ================================================================

UPDATE public.questions SET pertanyaan_ms='Bahagian pada robot yang berfungsi menerima maklumat dari persekitaran sekeliling dipanggil...', pilihan_a_ms='Penggerak (Aktuator)', pilihan_b_ms='Penderia (Sensor)', pilihan_c_ms='Pengawal mikro (Mikrokontroler)', pilihan_d_ms='Bateri' WHERE nomor_soal=51;

UPDATE public.questions SET pertanyaan_ms='Penderia yang digunakan oleh robot untuk mengukur jarak halangan menggunakan pantulan gelombang bunyi ialah...', pilihan_a_ms='Penderia LDR', pilihan_b_ms='Penderia Ultrasonik', pilihan_c_ms='Penderia Suhu', pilihan_d_ms='Penderia Sentuh' WHERE nomor_soal=52;

UPDATE public.questions SET pertanyaan_ms='Komponen robot yang bertugas menukar tenaga elektrik kepada pergerakan roda ialah...', pilihan_a_ms='Penderia', pilihan_b_ms='Motor DC / Penggerak (Aktuator)', pilihan_c_ms='Perintang (Resistor)', pilihan_d_ms='LED' WHERE nomor_soal=53;

UPDATE public.questions SET pertanyaan_ms='Papan litar kecil yang bertugas sebagai otak pemproses arahan pada robot dipanggil...', pilihan_a_ms='Transistor', pilihan_b_ms='Pengawal mikro (contoh: Arduino)', pilihan_c_ms='Papan reka (Breadboard)', pilihan_d_ms='Pemuat (Kapasitor)' WHERE nomor_soal=54;

UPDATE public.questions SET pertanyaan_ms='Penderia LDR berubah nilai rintangan elektriknya berdasarkan...', pilihan_a_ms='Suhu udara', pilihan_b_ms='Keamatan cahaya', pilihan_c_ms='Bunyi kuat', pilihan_d_ms='Gegaran tanah' WHERE nomor_soal=55;

UPDATE public.questions SET pertanyaan_ms='Jenis motor yang boleh berputar pada sudut yang sangat tepat (contoh 90 darjah) ialah...', pilihan_a_ms='Motor DC biasa', pilihan_b_ms='Motor Servo', pilihan_c_ms='Dinamo mainan', pilihan_d_ms='Penjana AC' WHERE nomor_soal=56;

UPDATE public.questions SET pertanyaan_ms='Robot Line Follower dapat mengekori garisan di lantai kerana ia mengesan perbezaan warna menggunakan penderia...', pilihan_a_ms='Inframerah / Cahaya', pilihan_b_ms='Bunyi', pilihan_c_ms='Kelembapan', pilihan_d_ms='Gas' WHERE nomor_soal=57;

UPDATE public.questions SET pertanyaan_ms='Komponen penyimpan tenaga elektrik yang menjadi sumber kuasa utama robot ialah...', pilihan_a_ms='Perintang', pilihan_b_ms='Bateri', pilihan_c_ms='Suis', pilihan_d_ms='Diod' WHERE nomor_soal=58;

UPDATE public.questions SET pertanyaan_ms='Penderia PIR (Passive Infrared) pada robot pintar biasanya digunakan untuk mengesan...', pilihan_a_ms='Warna objek', pilihan_b_ms='Pergerakan manusia atau hidupan', pilihan_c_ms='Tahap kebisingan', pilihan_d_ms='Jarak dinding' WHERE nomor_soal=59;

UPDATE public.questions SET pertanyaan_ms='Komponen pembaz (buzzer) pada robot berfungsi untuk...', pilihan_a_ms='Memaparkan imej', pilihan_b_ms='Mengeluarkan bunyi atau nada amaran', pilihan_c_ms='Menggerakkan kaki robot', pilihan_d_ms='Menyerap haba' WHERE nomor_soal=60;

UPDATE public.questions SET pertanyaan_ms='Papan berlubang-lubang yang digunakan untuk merangkai komponen elektronik tanpa perlu memateri dipanggil...', pilihan_a_ms='PCB', pilihan_b_ms='Breadboard / Papan reka', pilihan_c_ms='Papan induk', pilihan_d_ms='Cakera keras' WHERE nomor_soal=61;

UPDATE public.questions SET pertanyaan_ms='Lampu kecil yang biasa digunakan sebagai penunjuk status pada robot dipanggil...', pilihan_a_ms='LDR', pilihan_b_ms='LED', pilihan_c_ms='LCD', pilihan_d_ms='Geganti (Relay)' WHERE nomor_soal=62;

UPDATE public.questions SET pertanyaan_ms='Penderia DHT11 pada projek robotik digunakan untuk mengukur...', pilihan_a_ms='Jarak dan Kelajuan', pilihan_b_ms='Suhu dan Kelembapan udara', pilihan_c_ms='Cahaya dan Warna', pilihan_d_ms='Tekanan air' WHERE nomor_soal=63;

UPDATE public.questions SET pertanyaan_ms='Komponen elektronik yang berfungsi mengehadkan arus elektrik supaya LED tidak terbakar ialah...', pilihan_a_ms='Pemuat (Kapasitor)', pilihan_b_ms='Perintang (Resistor)', pilihan_c_ms='Transistor', pilihan_d_ms='Induktor' WHERE nomor_soal=64;

UPDATE public.questions SET pertanyaan_ms='Robot yang bergerak menggunakan roda dipanggil robot jenis...', pilihan_a_ms='Legged Robot (Robot berkaki)', pilihan_b_ms='Wheeled Robot (Robot beroda)', pilihan_c_ms='Dron', pilihan_d_ms='Humanoid' WHERE nomor_soal=65;

UPDATE public.questions SET pertanyaan_ms='Pemacu motor dipasang di antara pengawal mikro dan motor dengan tujuan...', pilihan_a_ms='Mencantikkan robot', pilihan_b_ms='Mengalirkan arus besar yang diperlukan oleh motor tanpa merosakkan pengawal mikro', pilihan_c_ms='Mengira jumlah langkah', pilihan_d_ms='Mengecas bateri' WHERE nomor_soal=66;

UPDATE public.questions SET pertanyaan_ms='Skrin kecil yang dipasang pada robot untuk memaparkan teks bacaan dipanggil...', pilihan_a_ms='LED', pilihan_b_ms='Paparan LCD', pilihan_c_ms='LDR', pilihan_d_ms='Solenoid' WHERE nomor_soal=67;

UPDATE public.questions SET pertanyaan_ms='Isyarat PWM (Pulse Width Modulation) pada Arduino sering digunakan untuk menetapkan...', pilihan_a_ms='Warna lampu', pilihan_b_ms='Kelajuan putaran motor DC', pilihan_c_ms='Kapasiti memori', pilihan_d_ms='Frekuensi bunyi' WHERE nomor_soal=68;

UPDATE public.questions SET pertanyaan_ms='Penderia sentuh mekanikal berupa suis kecil yang tertekan apabila melanggar dinding dipanggil...', pilihan_a_ms='Suis had / Bump sensor', pilihan_b_ms='Giroskop', pilihan_c_ms='Barometer', pilihan_d_ms='Potensiometer' WHERE nomor_soal=69;

UPDATE public.questions SET pertanyaan_ms='Robot yang dibentuk menyerupai anatomi tubuh manusia dipanggil...', pilihan_a_ms='Manipulator', pilihan_b_ms='Humanoid', pilihan_c_ms='Quadruped', pilihan_d_ms='ROV' WHERE nomor_soal=70;

UPDATE public.questions SET pertanyaan_ms='Lawan kepada penderia yang menerima input, komponen yang menghasilkan keluaran (output) fizikal dipanggil...', pilihan_a_ms='Transduser', pilihan_b_ms='Penggerak (Aktuator)', pilihan_c_ms='Pemproses', pilihan_d_ms='Peranti input' WHERE nomor_soal=71;

UPDATE public.questions SET pertanyaan_ms='Modul wayarles Bluetooth dipasang pada robot agar robot dapat...', pilihan_a_ms='Terbang', pilihan_b_ms='Dikawal secara jarak jauh melalui Telefon Pintar', pilihan_c_ms='Berjalan tanpa bateri', pilihan_d_ms='Mengecas secara automatik' WHERE nomor_soal=72;

UPDATE public.questions SET pertanyaan_ms='Aplikasi/perisian tempat kita menaip kod program untuk dimuat naik ke Arduino dipanggil...', pilihan_a_ms='Microsoft Word', pilihan_b_ms='Arduino IDE', pilihan_c_ms='Corel Draw', pilihan_d_ms='Photoshop' WHERE nomor_soal=73;

UPDATE public.questions SET pertanyaan_ms='Komponen suis elektronik yang digerakkan secara elektromagnetik untuk mengawal arus bervoltan tinggi ialah...', pilihan_a_ms='Diod', pilihan_b_ms='Geganti (Relay)', pilihan_c_ms='Pemuat (Kapasitor)', pilihan_d_ms='Transistor' WHERE nomor_soal=74;

UPDATE public.questions SET pertanyaan_ms='Penderia yang boleh mengukur kecondongan dan keseimbangan robot ialah...', pilihan_a_ms='Penderia Gas', pilihan_b_ms='Giroskop / MPU6050', pilihan_c_ms='Penderia Hujan', pilihan_d_ms='Penderia Api' WHERE nomor_soal=75;

UPDATE public.questions SET pertanyaan_ms='Istilah Autonomous Robot bermaksud robot tersebut...', pilihan_a_ms='Mesti sentiasa dicucuk ke kabel elektrik', pilihan_b_ms='Mampu berfungsi dan membuat keputusan sendiri secara automatik', pilihan_c_ms='Dikawal oleh alat kawalan jauh manual sepenuhnya', pilihan_d_ms='Tidak mempunyai sistem elektronik' WHERE nomor_soal=76;

UPDATE public.questions SET pertanyaan_ms='Kabel-kabel kecil berhujung jarum yang digunakan untuk menyambungkan komponen pada breadboard dipanggil wayar...', pilihan_a_ms='USB', pilihan_b_ms='Pelompat / Jumper (Male/Female)', pilihan_c_ms='Elektrik', pilihan_d_ms='Sepaksi' WHERE nomor_soal=77;

UPDATE public.questions SET pertanyaan_ms='Pin VCC pada modul penderia elektronik lazimnya disambungkan ke kutub...', pilihan_a_ms='Negatif / Bumi (GND)', pilihan_b_ms='Positif (Kuasa +5V atau +3.3V)', pilihan_c_ms='Isyarat digital', pilihan_d_ms='Antena' WHERE nomor_soal=78;

UPDATE public.questions SET pertanyaan_ms='Pin GND pada papan litar robot bermaksud...', pilihan_a_ms='General Node', pilihan_b_ms='Ground / Bumi / Kutub Negatif (0V)', pilihan_c_ms='Green Diode', pilihan_d_ms='Power Input' WHERE nomor_soal=79;

UPDATE public.questions SET pertanyaan_ms='Penderia yang mengesan kehadiran percikan api untuk robot pemadam kebakaran dipanggil...', pilihan_a_ms='Penderia Api (Flame Sensor)', pilihan_b_ms='Penderia Hujan', pilihan_c_ms='Penderia Tanah', pilihan_d_ms='Penderia Bunyi' WHERE nomor_soal=80;

UPDATE public.questions SET pertanyaan_ms='Penderia kelembapan tanah sangat berguna jika diaplikasikan pada projek robotik...', pilihan_a_ms='Robot pencuci cermin', pilihan_b_ms='Robot penyiram tanaman automatik', pilihan_c_ms='Robot penghantar makanan', pilihan_d_ms='Robot bola sepak' WHERE nomor_soal=81;

UPDATE public.questions SET pertanyaan_ms='Bahasa pengaturcaraan yang menjadi asas pengekodan pada Arduino adalah berasaskan bahasa...', pilihan_a_ms='Python', pilihan_b_ms='C / C++', pilihan_c_ms='HTML', pilihan_d_ms='Scratch' WHERE nomor_soal=82;

UPDATE public.questions SET pertanyaan_ms='Dalam program Arduino, blok fungsi loop() berguna untuk...', pilihan_a_ms='Melaksanakan arahan hanya sekali ketika dihidupkan', pilihan_b_ms='Melaksanakan arahan berulang kali secara berterusan', pilihan_c_ms='Menghentikan program', pilihan_d_ms='Memadam kod program' WHERE nomor_soal=83;

UPDATE public.questions SET pertanyaan_ms='Untuk menunda pergerakan robot selama 1 saat pada program Arduino, arahan yang ditulis ialah...', pilihan_a_ms='wait(1);', pilihan_b_ms='delay(1000);', pilihan_c_ms='stop(100);', pilihan_d_ms='pause(10);' WHERE nomor_soal=84;

UPDATE public.questions SET pertanyaan_ms='Roda pelbagai guna di bahagian belakang robot beroda dua yang boleh berputar bebas ke semua arah dipanggil roda...', pilihan_a_ms='Kastor (Castor)', pilihan_b_ms='Offroad', pilihan_c_ms='Rantai', pilihan_d_ms='Tiub dalam' WHERE nomor_soal=85;

UPDATE public.questions SET pertanyaan_ms='Komponen pembahagi voltan boleh ubah yang diputar dengan tangan untuk melaraskan kelantangan/kelajuan ialah...', pilihan_a_ms='Perintang tetap', pilihan_b_ms='Potensiometer', pilihan_c_ms='Diod Zener', pilihan_d_ms='Transformer' WHERE nomor_soal=86;

UPDATE public.questions SET pertanyaan_ms='Kamera pintar yang digunakan oleh robot untuk mengecam bentuk wajah manusia menggunakan teknologi...', pilihan_a_ms='Pengesanan Bunyi', pilihan_b_ms='Penglihatan Komputer (Computer Vision)', pilihan_c_ms='Penderia Haba', pilihan_d_ms='Jarak' WHERE nomor_soal=87;

UPDATE public.questions SET pertanyaan_ms='Penderia yang berfungsi memancarkan sinar inframerah dan menerima pantulannya untuk mengesan objek berhampiran dipanggil...', pilihan_a_ms='Penderia Jarak IR (Proximity IR)', pilihan_b_ms='Penderia Barometer', pilihan_c_ms='Penderia pH', pilihan_d_ms='Penderia Karbon' WHERE nomor_soal=88;

UPDATE public.questions SET pertanyaan_ms='Jenis motor stepper sering digunakan pada mesin Pencetak 3D atau lengan robot kejituan kerana...', pilihan_a_ms='Harganya sangat murah', pilihan_b_ms='Pergerakannya boleh dilaraskan setiap langkah dengan sangat tepat', pilihan_c_ms='Tidak memerlukan elektrik', pilihan_d_ms='Kelajuannya paling tinggi di dunia' WHERE nomor_soal=89;

UPDATE public.questions SET pertanyaan_ms='Lengan robot yang banyak dipasang di kilang pemasangan kereta dipanggil...', pilihan_a_ms='Robot Bipedal', pilihan_b_ms='Lengan Robot / Manipulator', pilihan_c_ms='Dron', pilihan_d_ms='Hoverkraf' WHERE nomor_soal=90;

UPDATE public.questions SET pertanyaan_ms='Penggunaan GPS pada robot pemotong rumput berautonomi berguna untuk...', pilihan_a_ms='Memotong rumput', pilihan_b_ms='Menentukan koordinat lokasi dan navigasi luar bangunan', pilihan_c_ms='Mengukur ketinggian rumput', pilihan_d_ms='Mengecas bateri' WHERE nomor_soal=91;

UPDATE public.questions SET pertanyaan_ms='Komponen penyearah arus elektrik yang hanya membenarkan arus mengalir pada satu arah sahaja ialah...', pilihan_a_ms='Perintang', pilihan_b_ms='Diod', pilihan_c_ms='Pemuat (Kapasitor)', pilihan_d_ms='Induktor' WHERE nomor_soal=92;

UPDATE public.questions SET pertanyaan_ms='Komunikasi data wayarles berasaskan gelombang radio jarak dekat yang ada pada telefon bimbit dan pengawal mikro ialah...', pilihan_a_ms='Wi-Fi dan Bluetooth', pilihan_b_ms='Kabel LAN', pilihan_c_ms='Gentian Optik', pilihan_d_ms='Satelit' WHERE nomor_soal=93;

UPDATE public.questions SET pertanyaan_ms='Untuk membaca isyarat daripada butang tekan pada Arduino, kita menggunakan arahan...', pilihan_a_ms='digitalWrite()', pilihan_b_ms='digitalRead()', pilihan_c_ms='analogWrite()', pilihan_d_ms='serialPrint()' WHERE nomor_soal=94;

UPDATE public.questions SET pertanyaan_ms='Penderia air yang mengesan kehadiran titisan air hujan ialah...', pilihan_a_ms='Penderia Hujan (Rain Sensor)', pilihan_b_ms='Penderia Gas MQ-2', pilihan_c_ms='Penderia Sentuh', pilihan_d_ms='Penderia Warna' WHERE nomor_soal=95;

UPDATE public.questions SET pertanyaan_ms='Struktur arahan logik yang digunakan untuk membuat keputusan pilihan pada robot ialah...', pilihan_a_ms='for', pilihan_b_ms='if - else', pilihan_c_ms='while', pilihan_d_ms='void' WHERE nomor_soal=96;

UPDATE public.questions SET pertanyaan_ms='Robot kapal selam tanpa pemandu dipanggil...', pilihan_a_ms='UAV', pilihan_b_ms='ROV / AUV (Submersible)', pilihan_c_ms='Dron', pilihan_d_ms='AGV' WHERE nomor_soal=97;

UPDATE public.questions SET pertanyaan_ms='Komponen elektronik yang berfungsi menyimpan cas elektrik sementara ialah...', pilihan_a_ms='Perintang', pilihan_b_ms='Pemuat (Kapasitor)', pilihan_c_ms='Transistor', pilihan_d_ms='Suis' WHERE nomor_soal=98;

UPDATE public.questions SET pertanyaan_ms='Fungsi penderia warna pada robot pengasing barang ialah...', pilihan_a_ms='Mengukur berat barang', pilihan_b_ms='Mengesan warna RGB objek', pilihan_c_ms='Mengira jumlah barang', pilihan_d_ms='Memindahkan barang' WHERE nomor_soal=99;

UPDATE public.questions SET pertanyaan_ms='Singkatan bagi teknologi IoT yang menyambungkan peranti robotik ke rangkaian internet ialah...', pilihan_a_ms='Input of Things', pilihan_b_ms='Internet of Things', pilihan_c_ms='Integration of Technology', pilihan_d_ms='Internal of Telecom' WHERE nomor_soal=100;

-- ================================================================
-- BAHAGIAN III: SCIENCE IN ACTION (Soal 101-150)
-- ================================================================

UPDATE public.questions SET pertanyaan_ms='Dalam eksperimen saintifik, faktor yang sengaja diubah oleh pengkaji dipanggil pemboleh ubah...', pilihan_a_ms='Bergerak balas (Terikat)', pilihan_b_ms='Dimanipulasikan (Bebas)', pilihan_c_ms='Dimalarkan (Kontrol)', pilihan_d_ms='Pengganggu' WHERE nomor_soal=101;

UPDATE public.questions SET pertanyaan_ms='Alat ukuran panjang yang mempunyai kejituan sehingga 0.1 mm dan boleh mengukur diameter dalaman botol ialah...', pilihan_a_ms='Pembaris', pilihan_b_ms='Angkup vernier', pilihan_c_ms='Tolok skru mikrometer', pilihan_d_ms='Pita pengukur' WHERE nomor_soal=102;

UPDATE public.questions SET pertanyaan_ms='Apabila larutan asid dicampurkan dengan kertas litmus biru, warna kertas litmus akan bertukar menjadi...', pilihan_a_ms='Merah', pilihan_b_ms='Hijau', pilihan_c_ms='Kuning', pilihan_d_ms='Kekal biru' WHERE nomor_soal=103;

UPDATE public.questions SET pertanyaan_ms='Peristiwa sifat inersia objek (kemampuan mengekalkan keadaan pegun/bergerak) diterangkan dalam...', pilihan_a_ms='Hukum Gerakan Newton Pertama', pilihan_b_ms='Hukum Gerakan Newton Kedua', pilihan_c_ms='Hukum Gerakan Newton Ketiga', pilihan_d_ms='Hukum Pascal' WHERE nomor_soal=104;

UPDATE public.questions SET pertanyaan_ms='Perubahan keadaan jirim daripada pepejal terus menjadi gas tanpa melebur dipanggil...', pilihan_a_ms='Pendidihan / Penyejatan', pilihan_b_ms='Pemejalwapan', pilihan_c_ms='Kondensasi', pilihan_d_ms='Pembekuan' WHERE nomor_soal=105;

UPDATE public.questions SET pertanyaan_ms='Alat makmal berbentuk tabung kaca berskala yang digunakan untuk mengukur isi padu cecair ialah...', pilihan_a_ms='Tabung uji', pilihan_b_ms='Silinder penyukat', pilihan_c_ms='Kelalang kon (Erlenmeyer)', pilihan_d_ms='Penitis' WHERE nomor_soal=106;

UPDATE public.questions SET pertanyaan_ms='Sifat imej yang dibentuk oleh cermin satah ialah...', pilihan_a_ms='Maya, tegak, sama saiz', pilihan_b_ms='Nyata, songsang, dibesarkan', pilihan_c_ms='Maya, songsang, dikecilkan', pilihan_d_ms='Nyata, tegak, dikecilkan' WHERE nomor_soal=107;

UPDATE public.questions SET pertanyaan_ms='Sudu logam yang dimasukkan ke dalam cawan teh panas turut terasa panas. Peristiwa pemindahan haba ini berlaku secara...', pilihan_a_ms='Perolakan (Konveksi)', pilihan_b_ms='Konduksi', pilihan_c_ms='Sinaran (Radiasi)', pilihan_d_ms='Penyejatan (Evaporasi)' WHERE nomor_soal=108;

UPDATE public.questions SET pertanyaan_ms='Jenis zat terlarut dan pelarut pada campuran air gula, yang bertindak sebagai pelarut ialah...', pilihan_a_ms='Gula', pilihan_b_ms='Air', pilihan_c_ms='Campuran air dan gula', pilihan_d_ms='Bekas gelas' WHERE nomor_soal=109;

UPDATE public.questions SET pertanyaan_ms='Organel sel tumbuhan yang mengandungi klorofil untuk fotosintesis ialah...', pilihan_a_ms='Mitokondria', pilihan_b_ms='Kloroplas', pilihan_c_ms='Ribosom', pilihan_d_ms='Nukleus sel' WHERE nomor_soal=110;

UPDATE public.questions SET pertanyaan_ms='Pergerakan molekul air melalui membran separa telap dari larutan cair ke pekat dipanggil...', pilihan_a_ms='Resapan', pilihan_b_ms='Osmosis', pilihan_c_ms='Transpirasi', pilihan_d_ms='Tindakan kapilari' WHERE nomor_soal=111;

UPDATE public.questions SET pertanyaan_ms='Prinsip Archimedes menyatakan bahawa objek yang direndam di dalam cecair akan mengalami daya tujah ke atas yang sama dengan...', pilihan_a_ms='Berat objek di udara', pilihan_b_ms='Berat cecair yang disesarkan oleh objek tersebut', pilihan_c_ms='Isi padu objek sepenuhnya', pilihan_d_ms='Ketumpatan objek' WHERE nomor_soal=112;

UPDATE public.questions SET pertanyaan_ms='Nilai pH untuk larutan yang bersifat neutral (seperti air tulen) ialah...', pilihan_a_ms='0', pilihan_b_ms='7', pilihan_c_ms='14', pilihan_d_ms='1' WHERE nomor_soal=113;

UPDATE public.questions SET pertanyaan_ms='Kaedah pemisahan campuran pasir dan air secara ringkas dengan cara menapis menggunakan kertas turas dipanggil...', pilihan_a_ms='Penyulingan', pilihan_b_ms='Penurasan', pilihan_c_ms='Penghabluran', pilihan_d_ms='Kromatografi' WHERE nomor_soal=114;

UPDATE public.questions SET pertanyaan_ms='Tenaga kinetik dimiliki oleh objek yang sedang...', pilihan_a_ms='Pegun di tempat tinggi', pilihan_b_ms='Bergerak dengan kelajuan tertentu', pilihan_c_ms='Ditekan', pilihan_d_ms='Dipanaskan' WHERE nomor_soal=115;

UPDATE public.questions SET pertanyaan_ms='Unit SI (Sistem Antarabangsa) untuk mengukur suhu ialah...', pilihan_a_ms='Celsius', pilihan_b_ms='Kelvin', pilihan_c_ms='Fahrenheit', pilihan_d_ms='Reaumur' WHERE nomor_soal=116;

UPDATE public.questions SET pertanyaan_ms='Bahagian mata yang berfungsi mengawal kuantiti cahaya yang masuk ke dalam mata ialah...', pilihan_a_ms='Kornea', pilihan_b_ms='Pupil / Iris', pilihan_c_ms='Kanta', pilihan_d_ms='Retina' WHERE nomor_soal=117;

UPDATE public.questions SET pertanyaan_ms='Pergerakan tumbuhan menunduk/tertutupnya daun semalu apabila disentuh dipanggil gerak balas...', pilihan_a_ms='Fototropisme', pilihan_b_ms='Seismonasti / Tigmonasti', pilihan_c_ms='Hidrotropisme', pilihan_d_ms='Geotropisme' WHERE nomor_soal=118;

UPDATE public.questions SET pertanyaan_ms='Kumpulan haiwan yang menyusukan anaknya tergolong dalam kelas...', pilihan_a_ms='Reptilia', pilihan_b_ms='Mamalia', pilihan_c_ms='Burung (Aves)', pilihan_d_ms='Amfibia' WHERE nomor_soal=119;

UPDATE public.questions SET pertanyaan_ms='Bunyi dapat merambat paling laju melalui medium...', pilihan_a_ms='Ruang vakum / hampa udara', pilihan_b_ms='Pepejal (seperti besi)', pilihan_c_ms='Air jernih', pilihan_d_ms='Gas oksigen' WHERE nomor_soal=120;

UPDATE public.questions SET pertanyaan_ms='Mesin ringkas jenis tuas/pengungkit kelas pertama mempunyai kedudukan fulkrum yang berada di...', pilihan_a_ms='Antara beban dan daya', pilihan_b_ms='Di hujung paling kanan', pilihan_c_ms='Di atas beban', pilihan_d_ms='Bebas di mana-mana sahaja' WHERE nomor_soal=121;

UPDATE public.questions SET pertanyaan_ms='Gas yang diperlukan oleh tumbuhan dalam proses fotosintesis ialah...', pilihan_a_ms='Oksigen', pilihan_b_ms='Karbon dioksida (CO2)', pilihan_c_ms='Nitrogen', pilihan_d_ms='Helium' WHERE nomor_soal=122;

UPDATE public.questions SET pertanyaan_ms='Salur darah yang mengalirkan darah kembali menuju ke jantung ialah salur...', pilihan_a_ms='Arteri', pilihan_b_ms='Vena', pilihan_c_ms='Kapilari', pilihan_d_ms='Aorta' WHERE nomor_soal=123;

UPDATE public.questions SET pertanyaan_ms='Tindak balas antara asid dan alkali yang menghasilkan garam dan air dipanggil tindak balas...', pilihan_a_ms='Pengoksidaan', pilihan_b_ms='Peneutralan', pilihan_c_ms='Pembakaran', pilihan_d_ms='Penapaian' WHERE nomor_soal=124;

UPDATE public.questions SET pertanyaan_ms='Cermin yang digunakan di selekoh jalan untuk melihat kenderaan dari arah bertentangan ialah cermin...', pilihan_a_ms='Satah', pilihan_b_ms='Cembung', pilihan_c_ms='Cekung', pilihan_d_ms='Cekung-cembung' WHERE nomor_soal=125;

UPDATE public.questions SET pertanyaan_ms='Enzim amilase (ptialin) di dalam mulut berfungsi menukarkan...', pilihan_a_ms='Protein kepada asid amino', pilihan_b_ms='Kanji (karbohidrat) kepada gula ringkas', pilihan_c_ms='Lemak kepada asid lemak', pilihan_d_ms='Vitamin kepada mineral' WHERE nomor_soal=126;

UPDATE public.questions SET pertanyaan_ms='Simbol bahaya api pada botol bahan kimia makmal menandakan bahan tersebut mudah...', pilihan_a_ms='Meletup', pilihan_b_ms='Terbakar', pilihan_c_ms='Beracun', pilihan_d_ms='Meruap' WHERE nomor_soal=127;

UPDATE public.questions SET pertanyaan_ms='Pembiakan vegetatif buatan dengan cara mengupas kulit batang kemudian dibalut dengan tanah humus dipanggil...', pilihan_a_ms='Keratan batang', pilihan_b_ms='Tut (Mencangkok)', pilihan_c_ms='Tundukan (Merunduk)', pilihan_d_ms='Cantuman (Mengenten)' WHERE nomor_soal=128;

UPDATE public.questions SET pertanyaan_ms='Pasangan bahan yang tergolong sebagai unsur kimia ialah...', pilihan_a_ms='Air dan Garam', pilihan_b_ms='Oksigen (O2) dan Besi (Fe)', pilihan_c_ms='Udara dan Cuka', pilihan_d_ms='Gula dan Sirap' WHERE nomor_soal=129;

UPDATE public.questions SET pertanyaan_ms='Unit SI untuk mengukur Daya ialah...', pilihan_a_ms='Joule', pilihan_b_ms='Newton', pilihan_c_ms='Watt', pilihan_d_ms='Pascal' WHERE nomor_soal=130;

UPDATE public.questions SET pertanyaan_ms='Jasad tegar akan berada dalam keadaan keseimbangan jika jumlah daya yang bertindak ke atasnya bernilai...', pilihan_a_ms='Maksimum', pilihan_b_ms='Sifar', pilihan_c_ms='Infiniti', pilihan_d_ms='Negatif' WHERE nomor_soal=131;

UPDATE public.questions SET pertanyaan_ms='Warna merah pada darah manusia disebabkan oleh kehadiran protein pengikat oksigen yang dipanggil...', pilihan_a_ms='Leukosit', pilihan_b_ms='Hemoglobin', pilihan_c_ms='Trombosit', pilihan_d_ms='Plasma' WHERE nomor_soal=132;

UPDATE public.questions SET pertanyaan_ms='Pemisahan campuran cecair berdasarkan perbezaan takat didih dipanggil...', pilihan_a_ms='Penurasan', pilihan_b_ms='Penyulingan', pilihan_c_ms='Pemejalwapan', pilihan_d_ms='Penyejatan' WHERE nomor_soal=133;

UPDATE public.questions SET pertanyaan_ms='Hukum Ohm merumuskan hubungan antara voltan (V), arus (I), dan rintangan (R) iaitu...', pilihan_a_ms='V = I x R', pilihan_b_ms='V = I / R', pilihan_c_ms='I = V x R', pilihan_d_ms='R = V x I' WHERE nomor_soal=134;

UPDATE public.questions SET pertanyaan_ms='Peristiwa terpisahnya cahaya putih kepada warna pelangi apabila melalui prisma kaca dipanggil...', pilihan_a_ms='Pantulan', pilihan_b_ms='Serakan cahaya (Penyebaran)', pilihan_c_ms='Pembiasan', pilihan_d_ms='Penyerapan' WHERE nomor_soal=135;

UPDATE public.questions SET pertanyaan_ms='Kanta yang digunakan pada cermin mata bagi penghidap rabun jauh (Miopia) ialah kanta...', pilihan_a_ms='Cembung (Positif)', pilihan_b_ms='Cekung (Negatif)', pilihan_c_ms='Berganda', pilihan_d_ms='Satah' WHERE nomor_soal=136;

UPDATE public.questions SET pertanyaan_ms='Tekanan udara diukur menggunakan alat yang dinamakan...', pilihan_a_ms='Termometer', pilihan_b_ms='Barometer', pilihan_c_ms='Higrometer', pilihan_d_ms='Anemometer' WHERE nomor_soal=137;

UPDATE public.questions SET pertanyaan_ms='Bakteria Lactobacillus bulgaricus bermanfaat kepada manusia dalam penghasilan...', pilihan_a_ms='Tempe', pilihan_b_ms='Yogurt', pilihan_c_ms='Roti', pilihan_d_ms='Kicap' WHERE nomor_soal=138;

UPDATE public.questions SET pertanyaan_ms='Perubahan tenaga yang berlaku pada seterika elektrik yang sedang digunakan ialah...', pilihan_a_ms='Tenaga kimia kepada haba', pilihan_b_ms='Tenaga elektrik kepada tenaga haba', pilihan_c_ms='Tenaga kinetik kepada elektrik', pilihan_d_ms='Tenaga cahaya kepada haba' WHERE nomor_soal=139;

UPDATE public.questions SET pertanyaan_ms='Magnet yang dibuat dengan cara melilitkan dawai berarus elektrik pada paku besi dipanggil...', pilihan_a_ms='Magnet kekal', pilihan_b_ms='Elektromagnet', pilihan_c_ms='Aruhan', pilihan_d_ms='Geseran' WHERE nomor_soal=140;

UPDATE public.questions SET pertanyaan_ms='Proses pembentukan sel sperma pada organ pembiakan lelaki berlaku di...', pilihan_a_ms='Ovari', pilihan_b_ms='Testis', pilihan_c_ms='Buah pinggang', pilihan_d_ms='Usus' WHERE nomor_soal=141;

UPDATE public.questions SET pertanyaan_ms='Organ utama sistem respirasi manusia tempat berlakunya pertukaran gas oksigen dan CO2 ialah...', pilihan_a_ms='Perut', pilihan_b_ms='Alveolus (di dalam peparu)', pilihan_c_ms='Tekak / Trakea', pilihan_d_ms='Jantung' WHERE nomor_soal=142;

UPDATE public.questions SET pertanyaan_ms='Sifat imej yang dibentuk oleh mikroskop pada pemerhatian akhir ialah...', pilihan_a_ms='Maya, songsang, dibesarkan', pilihan_b_ms='Nyata, tegak, dikecilkan', pilihan_c_ms='Maya, tegak, sama saiz', pilihan_d_ms='Nyata, songsang, dikecilkan' WHERE nomor_soal=143;

UPDATE public.questions SET pertanyaan_ms='Bahan tulen yang tidak boleh diuraikan lagi kepada bahan lain yang lebih ringkas dipanggil...', pilihan_a_ms='Campuran', pilihan_b_ms='Unsur', pilihan_c_ms='Sebatian', pilihan_d_ms='Larutan' WHERE nomor_soal=144;

UPDATE public.questions SET pertanyaan_ms='Contoh geseran yang memudaratkan dalam kehidupan seharian ialah...', pilihan_a_ms='Geseran brek basikal dengan rim roda', pilihan_b_ms='Geseran antara tayar kereta dan jalan raya', pilihan_c_ms='Geseran komponen enjin kereta yang menyebabkan kehausan', pilihan_d_ms='Geseran kasut dengan lantai agar tidak tergelincir' WHERE nomor_soal=145;

UPDATE public.questions SET pertanyaan_ms='Contoh pemindahan haba secara sinaran (radiasi) ialah...', pilihan_a_ms='Air mendidih apabila dimasak', pilihan_b_ms='Haba sinaran matahari yang sampai ke bumi', pilihan_c_ms='Cawan terasa hangat apabila diisi air panas', pilihan_d_ms='Berlakunya bayu darat dan bayu laut' WHERE nomor_soal=146;

UPDATE public.questions SET pertanyaan_ms='Kerja (W) dalam fizik ditakrifkan sebagai hasil darab antara daya (F) dengan...', pilihan_a_ms='Jisim (m)', pilihan_b_ms='Sesaran (s)', pilihan_c_ms='Masa (t)', pilihan_d_ms='Halaju (v)' WHERE nomor_soal=147;

UPDATE public.questions SET pertanyaan_ms='Unit rintangan elektrik dalam SI ialah...', pilihan_a_ms='Volt', pilihan_b_ms='Ampere', pilihan_c_ms='Ohm', pilihan_d_ms='Watt' WHERE nomor_soal=148;

UPDATE public.questions SET pertanyaan_ms='Susunan tahap organisasi hidupan dari yang terkecil hingga terbesar yang betul ialah...', pilihan_a_ms='Sel -> Tisu -> Organ -> Sistem Organ -> Organisma', pilihan_b_ms='Organ -> Sel -> Tisu -> Organisma', pilihan_c_ms='Tisu -> Sel -> Organ -> Sistem Organ', pilihan_d_ms='Organisma -> Sel -> Tisu -> Organ' WHERE nomor_soal=149;

UPDATE public.questions SET pertanyaan_ms='Penyataan tekaan awal yang perlu diuji kebenarannya melalui eksperimen dipanggil...', pilihan_a_ms='Kesimpulan', pilihan_b_ms='Hipotesis', pilihan_c_ms='Teori', pilihan_d_ms='Data' WHERE nomor_soal=150;

-- ================================================================
-- BAHAGIAN IV: MATHEMATIC (Soal 151-200)
-- ================================================================

UPDATE public.questions SET pertanyaan_ms='Hasil daripada -15 + 8 x (-3) ialah...', pilihan_a_ms='21', pilihan_b_ms='-39', pilihan_c_ms='-69', pilihan_d_ms='39' WHERE nomor_soal=151;

UPDATE public.questions SET pertanyaan_ms='Jika 3x + 7 = 22, maka nilai x ialah...', pilihan_a_ms='3', pilihan_b_ms='5', pilihan_c_ms='7', pilihan_d_ms='15' WHERE nomor_soal=152;

UPDATE public.questions SET pertanyaan_ms='Bentuk termudah bagi 5a - 3b + 2a + 8b ialah...', pilihan_a_ms='7a + 5b', pilihan_b_ms='3a + 11b', pilihan_c_ms='10ab', pilihan_d_ms='7a - 5b' WHERE nomor_soal=153;

UPDATE public.questions SET pertanyaan_ms='Sehelai baju berharga RM 150.00 mendapat diskaun 20%. Harga yang perlu dibayar ialah...', pilihan_a_ms='RM 120.00', pilihan_b_ms='RM 130.00', pilihan_c_ms='RM 135.00', pilihan_d_ms='RM 140.00' WHERE nomor_soal=154;

UPDATE public.questions SET pertanyaan_ms='Nilai daripada akar kuasa dua 169 ialah...', pilihan_a_ms='19', pilihan_b_ms='21', pilihan_c_ms='13', pilihan_d_ms='25' WHERE nomor_soal=155;

UPDATE public.questions SET pertanyaan_ms='Sebuah segi empat sama mempunyai panjang sisi 12 cm. Luas segi empat tersebut ialah...', pilihan_a_ms='48 cm²', pilihan_b_ms='144 cm²', pilihan_c_ms='120 cm²', pilihan_d_ms='240 cm²' WHERE nomor_soal=156;

UPDATE public.questions SET pertanyaan_ms='FSTB (Faktor Sepunya Terbesar) bagi 24 dan 36 ialah...', pilihan_a_ms='6', pilihan_b_ms='12', pilihan_c_ms='18', pilihan_d_ms='72' WHERE nomor_soal=157;

UPDATE public.questions SET pertanyaan_ms='GSTK (Gandaan Sepunya Terkecil) bagi 6 dan 8 ialah...', pilihan_a_ms='12', pilihan_b_ms='24', pilihan_c_ms='48', pilihan_d_ms='16' WHERE nomor_soal=158;

UPDATE public.questions SET pertanyaan_ms='Panjang hipotenus segi tiga bersudut tegak dengan tapak 9 cm dan tinggi 12 cm ialah...', pilihan_a_ms='13 cm', pilihan_b_ms='15 cm', pilihan_c_ms='17 cm', pilihan_d_ms='20 cm' WHERE nomor_soal=159;

UPDATE public.questions SET pertanyaan_ms='Nilai purata (min) bagi markah matematik: 6, 7, 8, 8, 9 ialah...', pilihan_a_ms='7.4', pilihan_b_ms='7.6', pilihan_c_ms='7.8', pilihan_d_ms='8.0' WHERE nomor_soal=160;

UPDATE public.questions SET pertanyaan_ms='Hasil daripada 3/4 + 1/2 ialah...', pilihan_a_ms='4/6', pilihan_b_ms='5/4', pilihan_c_ms='1', pilihan_d_ms='3/8' WHERE nomor_soal=161;

UPDATE public.questions SET pertanyaan_ms='Jika A = {1, 2, 3, 4} dan B = {3, 4, 5, 6}, maka A keratan B ialah...', pilihan_a_ms='{1, 2}', pilihan_b_ms='{3, 4}', pilihan_c_ms='{5, 6}', pilihan_d_ms='{1, 2, 3, 4, 5, 6}' WHERE nomor_soal=162;

UPDATE public.questions SET pertanyaan_ms='Sebiji dadu 6 permukaan dilambung sekali. Kebarangkalian mendapat nombor ganjil ialah...', pilihan_a_ms='1/6', pilihan_b_ms='1/3', pilihan_c_ms='1/2', pilihan_d_ms='2/3' WHERE nomor_soal=163;

UPDATE public.questions SET pertanyaan_ms='Lilitan bulatan yang mempunyai jejari 7 cm ialah (pi = 22/7)...', pilihan_a_ms='22 cm', pilihan_b_ms='44 cm', pilihan_c_ms='154 cm', pilihan_d_ms='88 cm' WHERE nomor_soal=164;

UPDATE public.questions SET pertanyaan_ms='Luas bulatan berjejari 7 cm ialah (pi = 22/7)...', pilihan_a_ms='44 cm²', pilihan_b_ms='154 cm²', pilihan_c_ms='308 cm²', pilihan_d_ms='616 cm²' WHERE nomor_soal=165;

UPDATE public.questions SET pertanyaan_ms='Nilai bagi 2 pangkat 4 ialah...', pilihan_a_ms='8', pilihan_b_ms='12', pilihan_c_ms='16', pilihan_d_ms='32' WHERE nomor_soal=166;

UPDATE public.questions SET pertanyaan_ms='Hasil kembangan daripada (x + 4)(x + 2) ialah...', pilihan_a_ms='x kuasa 2 + 6x + 8', pilihan_b_ms='x kuasa 2 + 8x + 6', pilihan_c_ms='x kuasa 2 + 2x + 8', pilihan_d_ms='x kuasa 2 + 4x + 2' WHERE nomor_soal=167;

UPDATE public.questions SET pertanyaan_ms='Sebuah kereta memerlukan 3 liter petrol untuk perjalanan 45 km. Jarak yang boleh dilalui jika diisi dengan 5 liter petrol ialah...', pilihan_a_ms='60 km', pilihan_b_ms='75 km', pilihan_c_ms='90 km', pilihan_d_ms='100 km' WHERE nomor_soal=168;

UPDATE public.questions SET pertanyaan_ms='Isi padu kubus yang mempunyai panjang sisi 5 cm ialah...', pilihan_a_ms='25 cm³', pilihan_b_ms='100 cm³', pilihan_c_ms='125 cm³', pilihan_d_ms='150 cm³' WHERE nomor_soal=169;

UPDATE public.questions SET pertanyaan_ms='Jika f(x) = 2x + 5, nilai bagi f(3) ialah...', pilihan_a_ms='8', pilihan_b_ms='11', pilihan_c_ms='13', pilihan_d_ms='16' WHERE nomor_soal=170;

UPDATE public.questions SET pertanyaan_ms='Penyelesaian bagi 2x - 4 > 6 ialah...', pilihan_a_ms='x > 5', pilihan_b_ms='x < 5', pilihan_c_ms='x > 1', pilihan_d_ms='x < 1' WHERE nomor_soal=171;

UPDATE public.questions SET pertanyaan_ms='Kecerunan (gradien) garis bagi persamaan y = 3x - 2 ialah...', pilihan_a_ms='-2', pilihan_b_ms='2', pilihan_c_ms='3', pilihan_d_ms='-3' WHERE nomor_soal=172;

UPDATE public.questions SET pertanyaan_ms='Luas segi tiga dengan tapak 10 cm dan tinggi 6 cm ialah...', pilihan_a_ms='60 cm²', pilihan_b_ms='30 cm²', pilihan_c_ms='20 cm²', pilihan_d_ms='15 cm²' WHERE nomor_soal=173;

UPDATE public.questions SET pertanyaan_ms='Median bagi set data yang telah disusun: 3, 5, 7, 8, 9 ialah...', pilihan_a_ms='5', pilihan_b_ms='7', pilihan_c_ms='8', pilihan_d_ms='6' WHERE nomor_soal=174;

UPDATE public.questions SET pertanyaan_ms='Mod bagi kumpulan data: 5, 6, 6, 7, 8, 6, 9 ialah...', pilihan_a_ms='5', pilihan_b_ms='6', pilihan_c_ms='7', pilihan_d_ms='8' WHERE nomor_soal=175;

UPDATE public.questions SET pertanyaan_ms='Skala peta ialah 1 : 100,000. Jika jarak pada peta ialah 5 cm, jarak sebenar ialah...', pilihan_a_ms='5 km', pilihan_b_ms='50 km', pilihan_c_ms='500 m', pilihan_d_ms='50 m' WHERE nomor_soal=176;

UPDATE public.questions SET pertanyaan_ms='Hasil tambah sudut-sudut pedalaman dalam sebuah segi tiga ialah...', pilihan_a_ms='90 darjah', pilihan_b_ms='180 darjah', pilihan_c_ms='270 darjah', pilihan_d_ms='360 darjah' WHERE nomor_soal=177;

UPDATE public.questions SET pertanyaan_ms='Hasil bagi 4 pangkat 3 ialah...', pilihan_a_ms='12', pilihan_b_ms='16', pilihan_c_ms='64', pilihan_d_ms='256' WHERE nomor_soal=178;

UPDATE public.questions SET pertanyaan_ms='Sebuah kuboid mempunyai ukuran panjang 10 cm, lebar 4 cm, dan tinggi 5 cm. Isi padu kuboid tersebut ialah...', pilihan_a_ms='200 cm³', pilihan_b_ms='100 cm³', pilihan_c_ms='19 cm³', pilihan_d_ms='400 cm³' WHERE nomor_soal=179;

UPDATE public.questions SET pertanyaan_ms='Sebutan ke-5 bagi janjang aritmetik 2, 5, 8, 11, ... ialah...', pilihan_a_ms='13', pilihan_b_ms='14', pilihan_c_ms='15', pilihan_d_ms='16' WHERE nomor_soal=180;

UPDATE public.questions SET pertanyaan_ms='Hasil bagi (-4) pangkat 2 ialah...', pilihan_a_ms='-16', pilihan_b_ms='-8', pilihan_c_ms='16', pilihan_d_ms='8' WHERE nomor_soal=181;

UPDATE public.questions SET pertanyaan_ms='Nisbah umur Ani kepada Budi ialah 2 : 3. Jika jumlah umur mereka ialah 20 tahun, umur Budi ialah...', pilihan_a_ms='8 tahun', pilihan_b_ms='12 tahun', pilihan_c_ms='10 tahun', pilihan_d_ms='15 tahun' WHERE nomor_soal=182;

UPDATE public.questions SET pertanyaan_ms='Luas segi empat selari dengan tapak 8 cm dan tinggi 5 cm ialah...', pilihan_a_ms='20 cm²', pilihan_b_ms='40 cm²', pilihan_c_ms='13 cm²', pilihan_d_ms='80 cm²' WHERE nomor_soal=183;

UPDATE public.questions SET pertanyaan_ms='Nilai bagi sudut tegak ialah...', pilihan_a_ms='45 darjah', pilihan_b_ms='90 darjah', pilihan_c_ms='180 darjah', pilihan_d_ms='360 darjah' WHERE nomor_soal=184;

UPDATE public.questions SET pertanyaan_ms='Jika x + 5 = 12, maka nilai 2x ialah...', pilihan_a_ms='7', pilihan_b_ms='14', pilihan_c_ms='10', pilihan_d_ms='24' WHERE nomor_soal=185;

UPDATE public.questions SET pertanyaan_ms='Sekeping syiling dilambung sekali. Kebarangkalian mendapat bahagian Kepala (Angka) ialah...', pilihan_a_ms='1/4', pilihan_b_ms='1/2', pilihan_c_ms='1', pilihan_d_ms='0' WHERE nomor_soal=186;

UPDATE public.questions SET pertanyaan_ms='Perimeter segi empat sama yang mempunyai luas 81 cm² ialah...', pilihan_a_ms='9 cm', pilihan_b_ms='36 cm', pilihan_c_ms='18 cm', pilihan_d_ms='81 cm' WHERE nomor_soal=187;

UPDATE public.questions SET pertanyaan_ms='Hasil bagi 10 pangkat 0 ialah...', pilihan_a_ms='0', pilihan_b_ms='1', pilihan_c_ms='10', pilihan_d_ms='Tidak tertakrif' WHERE nomor_soal=188;

UPDATE public.questions SET pertanyaan_ms='Seorang peniaga membeli barangan berharga RM 50.00 dan menjualnya semula dengan harga RM 60.00. Peratusan keuntungannya ialah...', pilihan_a_ms='10%', pilihan_b_ms='15%', pilihan_c_ms='20%', pilihan_d_ms='25%' WHERE nomor_soal=189;

UPDATE public.questions SET pertanyaan_ms='Bilangan paksi simetri pada bentuk lelayang (layang-layang) ialah sebanyak...', pilihan_a_ms='1', pilihan_b_ms='2', pilihan_c_ms='3', pilihan_d_ms='4' WHERE nomor_soal=190;

UPDATE public.questions SET pertanyaan_ms='Hasil bagi 3 x (4 + 6) - 5 ialah...', pilihan_a_ms='20', pilihan_b_ms='25', pilihan_c_ms='30', pilihan_d_ms='15' WHERE nomor_soal=191;

UPDATE public.questions SET pertanyaan_ms='Panjang pepenjuru satah pada kubus yang mempunyai panjang sisi 6 cm ialah...', pilihan_a_ms='6 akar 2 cm', pilihan_b_ms='6 akar 3 cm', pilihan_c_ms='12 cm', pilihan_d_ms='36 cm' WHERE nomor_soal=192;

UPDATE public.questions SET pertanyaan_ms='Titik koordinat A(3, -5) terletak pada sukuan...', pilihan_a_ms='I', pilihan_b_ms='II', pilihan_c_ms='III', pilihan_d_ms='IV' WHERE nomor_soal=193;

UPDATE public.questions SET pertanyaan_ms='Hasil bagi 2/5 darab 15/4 ialah...', pilihan_a_ms='3/2', pilihan_b_ms='8/75', pilihan_c_ms='3/4', pilihan_d_ms='1' WHERE nomor_soal=194;

UPDATE public.questions SET pertanyaan_ms='Bentuk 2 pangkat 3 darab 2 pangkat 2 jika dipermudahkan akan menjadi...', pilihan_a_ms='2 pangkat 5', pilihan_b_ms='2 pangkat 6', pilihan_c_ms='4 pangkat 5', pilihan_d_ms='4 pangkat 6' WHERE nomor_soal=195;

UPDATE public.questions SET pertanyaan_ms='Sebuah silinder mempunyai jejari 7 cm dan tinggi 10 cm. Luas tapak silinder tersebut ialah...', pilihan_a_ms='154 cm²', pilihan_b_ms='440 cm²', pilihan_c_ms='70 cm²', pilihan_d_ms='308 cm²' WHERE nomor_soal=196;

UPDATE public.questions SET pertanyaan_ms='Dua garis lurus yang selari mempunyai nilai kecerunan yang...', pilihan_a_ms='Bertentangan', pilihan_b_ms='Sama', pilihan_c_ms='Jauh berbeza', pilihan_d_ms='Bernilai sifar' WHERE nomor_soal=197;

UPDATE public.questions SET pertanyaan_ms='Nilai bagi sudut lurus ialah...', pilihan_a_ms='90 darjah', pilihan_b_ms='180 darjah', pilihan_c_ms='270 darjah', pilihan_d_ms='360 darjah' WHERE nomor_soal=198;

UPDATE public.questions SET pertanyaan_ms='Nilai bagi 5 faktorial (5! = 5 x 4 x 3 x 2 x 1) ialah...', pilihan_a_ms='120', pilihan_b_ms='60', pilihan_c_ms='20', pilihan_d_ms='100' WHERE nomor_soal=199;

UPDATE public.questions SET pertanyaan_ms='Bilangan bucu pada bentuk tiga dimensi kubus ialah sebanyak...', pilihan_a_ms='6', pilihan_b_ms='8', pilihan_c_ms='12', pilihan_d_ms='16' WHERE nomor_soal=200;
