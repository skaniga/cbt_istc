# 🏛️ International Photography Exhibition — CBT Platform

> **Platform Manajemen Ujian Berbasis Web** untuk International Photography Exhibition (IPE) 2025.
> Dibangun dengan Next.js 14, Supabase, dan desain *Academia / Classical* yang premium.

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

---

## 📋 Daftar Isi

1. [Tentang Platform](#tentang-platform)
2. [Fitur Utama](#fitur-utama)
3. [Alur Sistem](#alur-sistem)
4. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
5. [Persyaratan Sistem](#persyaratan-sistem)
6. [Instalasi & Setup Awal](#instalasi--setup-awal)
7. [Konfigurasi Database (Supabase)](#konfigurasi-database-supabase)
8. [Panduan Penggunaan — Peserta](#panduan-penggunaan--peserta)
9. [Panduan Penggunaan — Admin / Panitia](#panduan-penggunaan--admin--panitia)
10. [Struktur Proyek](#struktur-proyek)
11. [Peta Halaman (Sitemap)](#peta-halaman-sitemap)
12. [Troubleshooting](#troubleshooting)
13. [FAQ](#faq)

---

## 🎯 Tentang Platform

Platform IPE CBT dirancang khusus untuk mendukung proses seleksi peserta **International Photography Exhibition** secara digital dan efisien. Sistem ini menggantikan ujian konvensional berbasis kertas dengan pengalaman berbasis web yang elegan, aman, dan mudah diakses dari perangkat manapun.

**Desain filosofi**: *Academia / Classical* — menghadirkan nuansa keagungan galeri seni dengan palet warna putih gading, hitam elegan, dan aksen kuningan (*brass*), terinspirasi dari estetika pameran fotografi internasional bertaraf dunia.

---

## ✨ Fitur Utama

### 👥 Untuk Peserta
| Fitur | Deskripsi |
|-------|-----------|
| **Pendaftaran Online** | Daftar cukup dengan Nama Lengkap & Nomor Passport — tanpa kerumitan |
| **Login Sederhana** | Masuk dengan Nomor Peserta + kata sandi universal |
| **Dashboard Peserta** | Pantau status ujian secara real-time dari satu halaman |
| **CBT Ujian Digital** | Antarmuka ujian modern dengan timer, navigasi soal, dan auto-save |
| **Sertifikat PDF Otomatis** | Unduh sertifikat digital ber-desain premium setelah ujian selesai |
| **Mobile Responsive** | Dapat diakses dari HP, tablet, maupun laptop tanpa performa menurun |

### 🛡️ Untuk Admin / Panitia
| Fitur | Deskripsi |
|-------|-----------|
| **Login Aman** | Autentikasi berbasis Supabase Auth (email + password terenkripsi) |
| **Toggle Akses Ujian** | Buka/tutup akses ujian peserta dengan satu klik |
| **Manajemen Peserta** | Lihat semua peserta terdaftar beserta skor dan status kelulusan |
| **Bank Soal** | Kelola dan pratinjau soal-soal yang digunakan dalam ujian |
| **Keep Alive Log** | Monitor keaktifan database Supabase secara visual |

---

## 🔄 Alur Sistem

```
[PESERTA]                            [ADMIN]
    │                                    │
    ▼                                    ▼
Mendaftar di /daftar              Login di /admin/login
(Nama + No. Passport)             (Email + Password Supabase)
    │                                    │
    ▼                                    ▼
Dapat Nomor Peserta          Dashboard Admin terbuka
(contoh: IPE-2025-0001)      ─ Buka/Tutup Akses Ujian
    │                        ─ Lihat Daftar Peserta
    ▼                        ─ Kelola Soal
Login di /login
(Nomor Peserta + Sandi)
    │
    ▼
Dashboard Peserta (/peserta)
─ Jika akses TERBUKA: Mulai Ujian
─ Jika akses TERTUTUP: Tunggu panitia
    │
    ▼
Halaman Ujian (/peserta/ujian)
─ Jawab soal pilihan ganda
─ Navigasi antar soal via grid
─ Jawaban tersimpan otomatis
─ Timer hitung mundur
    │
    ▼
Selesai → Skor & Status dihitung
    │
    ▼
Unduh Sertifikat PDF (/peserta/sertifikat)
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|---------|
| **Next.js** | 14.x | Framework React dengan App Router |
| **TypeScript** | 5.x | Type safety di seluruh kodebase |
| **Supabase** | Latest | Database PostgreSQL + Auth + RLS |
| **jose** | Latest | JWT untuk session peserta (HTTP-only cookie) |
| **html2canvas** | Latest | Render HTML sertifikat menjadi gambar |
| **jsPDF** | Latest | Konversi gambar ke file PDF |
| **Vanilla CSS** | — | Design system tanpa framework CSS eksternal |
| **Google Fonts** | — | Cormorant Garamond, Crimson Pro, Cinzel |

---

## 💻 Persyaratan Sistem

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0`
- **Akun Supabase** (gratis di [supabase.com](https://supabase.com))
- Browser modern (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)

---

## 🚀 Instalasi & Setup Awal

### 1. Clone Repositori

```bash
git clone <url-repositori>
cd computer-service-shop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File Environment

Buat file `.env.local` di root proyek, lalu isi dengan kredensial Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Secret untuk JWT session peserta (bebas, minimal 32 karakter)
SESSION_SECRET=ganti_dengan_string_acak_yang_sangat_panjang_dan_rahasia
```

> ⚠️ **PENTING**: Jangan pernah commit file `.env.local` ke repositori publik.

### 4. Jalankan Server Development

```bash
npm run dev
```

Buka browser dan kunjungi `http://localhost:3000`.

---

## 🗄️ Konfigurasi Database (Supabase)

### Langkah 1: Jalankan Skema Database

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Copy seluruh isi file [`supabase/seed.sql`](./supabase/seed.sql)
3. Paste ke SQL Editor, lalu klik **Run**

> Skrip ini akan membuat semua tabel, RLS policies, fungsi, dan data konfigurasi awal secara otomatis.

### Langkah 2: Aktifkan RLS & Tambah Fungsi Login

Jalankan juga isi file [`supabase/fix-login.sql`](./supabase/fix-login.sql) untuk menambahkan fungsi keamanan login peserta:

```sql
-- Sudah otomatis jika menjalankan seed.sql lengkap.
-- Jika diperlukan secara terpisah, jalankan file ini.
```

### Langkah 3: Tambahkan Soal Ujian

Untuk ujian production, masukkan soal-soal Anda melalui SQL Editor:

```sql
INSERT INTO public.questions (nomor_soal, pertanyaan, pilihan_a, pilihan_b, pilihan_c, pilihan_d, kunci_jawaban, kategori)
VALUES 
  (1, 'Pertanyaan pertama?', 'Opsi A', 'Opsi B', 'Opsi C', 'Opsi D', 'A', 'umum'),
  (2, 'Pertanyaan kedua?',   'Opsi A', 'Opsi B', 'Opsi C', 'Opsi D', 'B', 'teknik');
```

> 💡 Untuk pengujian cepat, gunakan 5 soal contoh di file [`supabase/dummy_soal.sql`](./supabase/dummy_soal.sql).

### Langkah 4: Buat Akun Admin

1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. Klik **Add User** → **Create New User**
3. Masukkan **Email** (misal: `admin@ipe2025.com`) dan **Password** pilihan Anda
4. Gunakan kredensial ini untuk login di `/admin/login`

---

## 👤 Panduan Penggunaan — Peserta

### 1️⃣ Pendaftaran

1. Buka halaman utama dan klik tombol **"Daftar Sekarang"** (atau langsung ke `/daftar`)
2. Isi formulir:
   - **Nama Lengkap** — Sesuai identitas resmi (paspor/KTP)
   - **Nomor Passport / ID** — Nomor identitas unik Anda
3. Klik **"Daftar Sekarang"**
4. Sistem akan menampilkan **Nomor Peserta** Anda (format: `IPE-2025-XXXX`)

> 🔑 **Simpan Nomor Peserta ini!** Anda akan membutuhkannya untuk login.

---

### 2️⃣ Login

1. Buka `/login`
2. Masukkan:
   - **Nomor Peserta / No Passport** — Gunakan salah satu untuk masuk
   - **Kata Sandi** — `123456` *(berlaku sama untuk semua peserta)*
3. Klik **"Masuk Ujian"**

---

### 3️⃣ Dashboard Peserta

Setelah login, Anda akan melihat Dashboard dengan salah satu dari tiga status:

| Status | Tampilan | Tindakan |
|--------|----------|----------|
| **Belum Dimulai** | "Mulai Ujian" tersedia | Klik untuk memulai (jika akses dibuka panitia) |
| **Akses Ditutup** | Pesan "Akses Sedang Ditutup" | Tunggu pengumuman panitia |
| **Sedang Berlangsung** | "Lanjutkan Ujian" | Kembali ke halaman ujian yang belum selesai |
| **Selesai** | Skor + Status Lulus/Tidak | Unduh sertifikat PDF |

---

### 4️⃣ Mengerjakan Ujian

Halaman ujian (`/peserta/ujian`) memiliki tampilan dua panel:

**Panel Kiri/Utama — Soal:**
- Teks soal ditampilkan jelas dengan opsi A, B, C, D
- Klik opsi untuk memilih jawaban (langsung tersimpan otomatis)
- Navigasi dengan tombol **← Sebelumnya** dan **Selanjutnya →**

**Panel Kanan/Navigasi Soal:**
- Grid nomor soal menampilkan warna berbeda:
  - **Emas** = soal yang sedang aktif
  - **Gelap** = sudah dijawab
  - **Terang** = belum dijawab
- Klik nomor berapa saja untuk langsung pindah ke soal tersebut

**Timer:**
- Hitung mundur ditampilkan di pojok kanan atas
- Jika waktu hampir habis (< 5 menit), timer berubah merah
- Saat waktu 0, ujian **otomatis dikumpulkan**

**Di layar HP/Mobile:**
- Tombol **"☰ Soal"** akan membuka laci navigasi dari sisi kiri

> ⚠️ **Jangan tutup tab/browser** saat ujian berlangsung. Jawaban tetap tersimpan, namun timer terus berjalan.

---

### 5️⃣ Mengunduh Sertifikat

1. Setelah ujian selesai, kembali ke Dashboard Peserta
2. Lihat **Skor Akhir** dan **Status** (Lulus / Tidak Lulus)
3. Klik **"Unduh Sertifikat PDF"**
4. Anda akan diarahkan ke halaman pratinjau sertifikat
5. Klik tombol **"Unduh Sertifikat (PDF)"** untuk menyimpan file

> 📄 Sertifikat berformat **A4 Landscape** berdesain elegan, siap dicetak langsung.

---

## 🛡️ Panduan Penggunaan — Admin / Panitia

### Cara Akses

Buka `/admin/login` dan masukkan **Email + Password** akun admin yang dibuat di Supabase Authentication.

---

### Dashboard Utama (`/admin`)

#### Kontrol Akses Ujian
- Melihat status ujian saat ini: **TERBUKA** atau **DITUTUP**
- Klik tombol **"Buka Akses Ujian"** → peserta dapat mulai mengerjakan
- Klik tombol **"Tutup Akses Ujian"** → peserta tidak dapat memulai sesi baru

> 💡 Pastikan Anda membuka akses ujian tepat waktu sesuai jadwal. Peserta yang sudah masuk di sesi ujian tidak akan terpengaruh oleh penutupan akses.

#### Keep Alive Log
- Memantau apakah sistem telah melakukan *ping* ke database secara berkala
- Mencegah database Supabase free tier *pause* setelah 7 hari tidak aktif
- Klik **"Trigger Keep Alive (Ping DB)"** untuk melakukan ping manual

---

### Manajemen Peserta (`/admin/peserta`)

Menampilkan tabel lengkap seluruh peserta dengan kolom:
- **No. Peserta** — Kode unik peserta (format: `IPE-2025-XXXX`)
- **Nama Lengkap** — Nama sesuai identitas
- **No Passport / ID** — Nomor identitas yang digunakan saat daftar
- **Tgl Daftar** — Tanggal pendaftaran
- **Skor** — Hasil ujian (tampil setelah ujian selesai, dalam skala 0–100)
- **Status** — BELUM UJIAN / LULUS / TIDAK LULUS

---

### Manajemen Soal (`/admin/soal`)

Menampilkan daftar semua soal dalam bank soal dengan kolom:
- **No.** — Nomor urut soal
- **Pertanyaan** — Pratinjau teks soal (dipotong jika terlalu panjang)
- **Kunci** — Jawaban benar (A/B/C/D)
- **Kategori** — Klasifikasi soal (teknik / estetika / sejarah / umum)
- **Bobot** — Poin per soal
- **Status** — AKTIF / NON-AKTIF

> 📝 Untuk menambah/mengubah soal, gunakan **Supabase SQL Editor** secara langsung hingga fitur CRUD soal tersedia di versi berikutnya.

---

## 📁 Struktur Proyek

```
computer-service-shop/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing Page (publik)
│   │   ├── layout.tsx            # Root layout + font
│   │   ├── globals.css           # Design system & CSS variables
│   │   ├── daftar/
│   │   │   ├── page.tsx          # Form Pendaftaran Peserta
│   │   │   └── actions.ts        # Server action: registerParticipant
│   │   ├── login/
│   │   │   ├── page.tsx          # Form Login Peserta
│   │   │   └── actions.ts        # Server action: loginParticipant
│   │   ├── peserta/
│   │   │   ├── layout.tsx        # Layout area peserta (navbar)
│   │   │   ├── page.tsx          # Dashboard Peserta
│   │   │   ├── components.tsx    # StartExamForm (client component)
│   │   │   ├── actions.ts        # Server action: startExam
│   │   │   ├── ujian/
│   │   │   │   ├── page.tsx      # Halaman CBT (Server Component)
│   │   │   │   ├── CbtClient.tsx # UI ujian interaktif (Client Component)
│   │   │   │   └── actions.ts    # saveAnswer, finishExam
│   │   │   └── sertifikat/
│   │   │       ├── page.tsx      # Halaman Sertifikat (Server Component)
│   │   │       └── SertifikatClient.tsx # Render & download PDF
│   │   └── admin/
│   │       ├── layout.tsx        # Layout admin (sidebar + auth check)
│   │       ├── page.tsx          # Dashboard Admin
│   │       ├── actions.ts        # logoutAdmin, toggleAkses, keepAlive
│   │       ├── components.tsx    # ToggleAksesForm, KeepAliveForm
│   │       ├── login/
│   │       │   ├── page.tsx      # Form Login Admin
│   │       │   └── actions.ts    # Server action: loginAdmin
│   │       ├── peserta/
│   │       │   └── page.tsx      # Tabel Manajemen Peserta
│   │       ├── soal/
│   │       │   └── page.tsx      # Tabel Bank Soal
│   │       ├── dokumen/
│   │       │   └── page.tsx      # Placeholder: Dokumen & Seleksi
│   │       └── sarana/
│   │           └── page.tsx      # Placeholder: Sarana & Arsip
│   ├── components/
│   │   └── Navbar.tsx            # Komponen Navbar (publik)
│   └── lib/
│       ├── session.ts            # JWT session management (jose)
│       ├── types.ts              # TypeScript interfaces
│       └── supabase/
│           ├── client.ts         # Supabase Browser Client
│           └── server.ts         # Supabase Server Client (async)
├── supabase/
│   ├── seed.sql                  # Skema DB lengkap (jalankan di Supabase)
│   ├── fix-login.sql             # RPC fungsi login (sudah ada di seed.sql)
│   └── dummy_soal.sql            # 5 soal contoh untuk testing
├── .env.local                    # ⚠️ JANGAN di-commit! Kredensial Supabase
├── package.json
└── README.md
```

---

## 🗺️ Peta Halaman (Sitemap)

| URL | Akses | Deskripsi |
|-----|-------|-----------|
| `/` | Publik | Landing Page (tentang IPE, alur, CTA) |
| `/daftar` | Publik | Form pendaftaran peserta baru |
| `/login` | Publik | Login peserta dengan nomor + sandi |
| `/peserta` | 🔐 Peserta | Dashboard peserta (status ujian) |
| `/peserta/ujian` | 🔐 Peserta | Halaman ujian CBT |
| `/peserta/sertifikat` | 🔐 Peserta | Pratinjau & unduh sertifikat PDF |
| `/admin/login` | Publik | Login admin (via Supabase Auth) |
| `/admin` | 🔐 Admin | Dashboard kontrol utama |
| `/admin/peserta` | 🔐 Admin | Tabel manajemen peserta |
| `/admin/soal` | 🔐 Admin | Tabel bank soal ujian |
| `/admin/dokumen` | 🔐 Admin | Modul dokumen (segera hadir) |
| `/admin/sarana` | 🔐 Admin | Modul sarana & arsip (segera hadir) |

---

## 🔧 Troubleshooting

### ❌ "Gagal menyimpan data pendaftaran"
**Penyebab**: RLS (Row Level Security) di Supabase memblokir insert.  
**Solusi**: Pastikan Anda sudah menjalankan `seed.sql` **secara lengkap** di Supabase SQL Editor. File ini sudah mencakup semua policy yang diperlukan.

---

### ❌ "Nomor peserta atau No Passport tidak ditemukan" saat login
**Penyebab 1**: Peserta belum terdaftar (pendaftaran gagal tanpa disadari).  
**Solusi**: Coba daftar ulang di `/daftar`.

**Penyebab 2**: Fungsi RPC `verify_participant_login` belum dibuat.  
**Solusi**: Jalankan `supabase/fix-login.sql` di Supabase SQL Editor.

---

### ❌ "Kata sandi salah"
**Penyebab**: Kata sandi yang dimasukkan bukan `123456`.  
**Solusi**: Gunakan kata sandi universal `123456` untuk semua peserta.

---

### ❌ Halaman ujian menampilkan "Soal Belum Tersedia"
**Penyebab**: Tabel `questions` masih kosong.  
**Solusi**: Jalankan `supabase/dummy_soal.sql` untuk memasukkan soal contoh, atau tambahkan soal production via SQL Editor.

---

### ❌ Database Supabase tidak aktif / timeout
**Penyebab**: Proyek Supabase free tier di-*pause* setelah 7 hari tidak aktif.  
**Solusi**:
1. Login ke panel admin (`/admin`)
2. Klik **"Trigger Keep Alive (Ping DB)"**
3. Atau aktifkan kembali database melalui Supabase Dashboard online

---

### ❌ Build error: module not found `html2canvas` / `jspdf`
**Penyebab**: Dependency belum terinstall.  
**Solusi**:
```bash
npm install html2canvas jspdf
```

---

## ❓ FAQ

**Q: Apakah peserta bisa mendaftar lebih dari sekali?**  
A: Tidak. Sistem akan menolak pendaftaran dengan Nomor Passport yang sama dan menampilkan pesan bahwa identitas tersebut sudah terdaftar.

**Q: Apakah jawaban tersimpan jika browser tiba-tiba tertutup?**  
A: Ya. Setiap kali peserta mengklik jawaban, data langsung disimpan ke database secara otomatis. Saat peserta membuka kembali halaman ujian, jawaban sebelumnya akan dimuat ulang.

**Q: Berapa lama durasi ujian?**  
A: Durasi default adalah **90 menit**. Dapat diubah melalui tabel `system_config` di Supabase (kolom `kunci = 'durasi_menit'`, ubah nilainya).

**Q: Berapa soal yang ditampilkan per sesi ujian?**  
A: Default **50 soal**. Dapat diubah melalui `system_config` (`kunci = 'jumlah_soal'`).

**Q: Berapa passing grade untuk dinyatakan Lulus?**  
A: Passing grade default adalah **70** (dari skala 100). Dapat diubah langsung di kode `src/app/peserta/ujian/actions.ts`, baris `const isPassed = finalScore >= 70`.

**Q: Bagaimana cara mengubah kata sandi universal peserta?**  
A: Ubah nilai `'123456'` di file `src/app/login/actions.ts`:
```typescript
if (password !== '123456') { // Ganti nilai ini
```

**Q: Bisakah admin melihat jawaban detail tiap peserta?**  
A: Belum tersedia di UI admin saat ini. Data mentah jawaban tersimpan di tabel `answers` dan dapat diakses langsung melalui Supabase Dashboard.

**Q: Apakah platform ini mendukung multiple admin?**  
A: Ya. Tambahkan pengguna baru di Supabase Dashboard → Authentication → Users. Semua akun yang terdaftar di sana otomatis mendapat akses admin.

---

## 📞 Kontak & Support

Untuk pertanyaan teknis terkait platform ini, hubungi tim pengembang.

---

*International Photography Exhibition CBT Platform — Dibuat dengan ❤️ untuk mendukung seleksi peserta yang adil, efisien, dan berkesan.*
