# 🏛️ International Science and Technology Competitions — CBT Platform

> **Platform Manajemen Ujian Berbasis Web** untuk International Science and Technology Competitions (ISTC) 2026.  
> Dibangun dengan Next.js 14, Supabase, dan desain *Academia / Classical* yang premium.

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

🌐 **Live**: [istcompetition.my](https://istcompetition.my)

---

## 📋 Daftar Isi

1. [Tentang Platform](#tentang-platform)
2. [Fitur Utama](#fitur-utama)
3. [Bidang Kompetisi](#bidang-kompetisi)
4. [Alur Sistem](#alur-sistem)
5. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
6. [Persyaratan Sistem](#persyaratan-sistem)
7. [Instalasi & Setup Awal](#instalasi--setup-awal)
8. [Konfigurasi Database (Supabase)](#konfigurasi-database-supabase)
9. [Panduan Penggunaan — Peserta](#panduan-penggunaan--peserta)
10. [Panduan Penggunaan — Admin / Panitia](#panduan-penggunaan--admin--panitia)
11. [Struktur Proyek](#struktur-proyek)
12. [Peta Halaman (Sitemap)](#peta-halaman-sitemap)
13. [Troubleshooting](#troubleshooting)
14. [FAQ](#faq)

---

## 🎯 Tentang Platform

Platform ISTC CBT dirancang khusus untuk mendukung proses seleksi peserta **International Science and Technology Competitions** secara digital dan efisien. Sistem ini menggantikan ujian konvensional berbasis kertas dengan pengalaman berbasis web yang elegan, aman, dan mudah diakses dari perangkat manapun.

**Desain filosofi**: *Academia / Classical* — menghadirkan nuansa keagungan galeri seni dengan palet warna putih gading, hitam elegan, dan aksen kuningan (*brass*), terinspirasi dari estetika pameran ilmu pengetahuan internasional.

**Multilingual**: Platform mendukung 3 bahasa — **English (EN)**, **Bahasa Indonesia (ID)**, dan **Bahasa Melayu (MS)** — dengan deteksi bahasa browser otomatis saat kunjungan pertama.

---

## ✨ Fitur Utama

### 👥 Untuk Peserta
| Fitur | Deskripsi |
|-------|-----------|
| **Pendaftaran Online** | Daftar dengan Nama Lengkap, No Passport, dan pilih **bidang kompetisi** |
| **Pilih Bidang** | 4 bidang kompetisi tersedia — dipilih saat mendaftar, tidak bisa diubah |
| **Login Sederhana** | Masuk dengan Nomor Peserta + kata sandi universal `ISTC2026` |
| **Dashboard Peserta** | Pantau status ujian & lihat badge bidang kompetisi |
| **CBT Ujian Digital** | Soal difilter otomatis sesuai bidang, timer, auto-save, navigasi grid |
| **Sertifikat PDF Otomatis** | Sertifikat digital premium dengan nama, skor, bidang, dan logo ISTC |
| **Multilingual** | UI tersedia dalam EN / ID / MS, ganti kapan saja via navbar |
| **Mobile Responsive** | Dapat diakses dari HP, tablet, dan laptop |

### 🛡️ Untuk Admin / Panitia
| Fitur | Deskripsi |
|-------|-----------|
| **Login Aman** | Autentikasi berbasis Supabase Auth (email + password) |
| **Toggle Akses Ujian** | Buka/tutup akses ujian peserta dengan satu klik |
| **Manajemen Peserta** | Lihat peserta dengan kolom **Bidang**, Skor, Status; edit nama/passport/bidang |
| **Bank Soal** | Kelola soal per bidang kompetisi — 50 soal per bidang (200 total) |
| **Keep Alive Log** | Monitor keaktifan database Supabase |

---

## 🏆 Bidang Kompetisi

ISTC 2026 memiliki **4 bidang kompetisi**, masing-masing dengan 50 soal khusus:

| Bidang | Ikon | Deskripsi |
|--------|------|-----------|
| **Environmental Technology** | 🌱 | Teknologi lingkungan & keberlanjutan |
| **Smart Robotics** | 🤖 | Robotika & otomasi cerdas |
| **Science In Action** | 🔬 | Sains terapan & eksperimen |
| **Mathematic** | 📐 | Matematika & logika |

> Peserta memilih bidang **saat pendaftaran**. Soal ujian yang ditampilkan akan **otomatis difilter** sesuai bidang yang dipilih.

---

## 🔄 Alur Sistem

```
[PESERTA]                                    [ADMIN]
    │                                            │
    ▼                                            ▼
Mendaftar di /{lang}/daftar            Login di /admin/login
(Nama + No. Passport + Bidang)         (Email + Password Supabase)
    │                                            │
    ▼                                            ▼
Dapat Nomor Peserta              Dashboard Admin terbuka
(format: IPE-2026-XXXX)          ─ Buka/Tutup Akses Ujian
    │                            ─ Lihat Daftar Peserta + Bidang
    ▼                            ─ Edit Data Peserta
Login di /{lang}/login           ─ Kelola Soal per Bidang
(Nomor Peserta + ISTC2026)
    │
    ▼
Dashboard Peserta (/{lang}/peserta)
─ Badge bidang kompetisi
─ Status ujian real-time
─ Mulai / Lanjutkan Ujian
    │
    ▼
Halaman Ujian (/{lang}/peserta/ujian)
─ 50 soal sesuai bidang peserta
─ Jawaban tersimpan otomatis
─ Timer 90 menit hitung mundur
    │
    ▼
Selesai → Skor & Status dihitung
    │
    ▼
Unduh Sertifikat PDF (/{lang}/peserta/sertifikat)
─ Nama, bidang, skor, tanggal, logo ISTC
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
| **Vercel** | — | Deployment & CDN global |

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
git clone https://github.com/krido19/computer-service-shop.git
cd computer-service-shop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File Environment

Buat file `.env.local` di root proyek:

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

Jalankan file SQL berikut di **Supabase Dashboard → SQL Editor** secara **berurutan**:

### Step 1 — Skema Database Utama
```
supabase/seed.sql
```
Membuat semua tabel, RLS policies, fungsi, dan data konfigurasi awal.

### Step 2 — Fix RLS Policies
```
supabase/fix-rls.sql
```

### Step 3 — Fungsi Login & Index
```
supabase/optimize_login.sql
```
Menambahkan RPC `verify_participant_login` dan indexes untuk performa login.

### Step 4 — Tambah Kolom Bidang ke Peserta
```
supabase/add_kategori_to_participants.sql
```
```sql
ALTER TABLE public.participants
  ADD COLUMN IF NOT EXISTS kategori TEXT DEFAULT NULL;
```

### Step 5 — Fix Nomor Peserta (SEQUENCE atomic)
```
supabase/fix_nomor_peserta_sequence.sql
```
Mengganti `COUNT(*)+1` dengan PostgreSQL SEQUENCE untuk mencegah race condition pada registrasi bersamaan.

### Step 6 — Soal Ujian 2026
Pilih sesuai bahasa soal yang diinginkan:
```
supabase/seed_soal_2026.sql      ← Soal Bahasa Indonesia
supabase/seed_soal_2026_en.sql   ← Soal Bahasa Inggris  
supabase/seed_soal_2026_ms.sql   ← Soal Bahasa Melayu
```

### Step 7 — Set Kategori Soal (4 bidang × 50 soal)
```
supabase/set_kategori_questions.sql
```
Membagi 200 soal menjadi 4 bidang kompetisi (50 soal per bidang).

### Step 8 — QA Fixes (Index & Constraint)
```
supabase/qa_fixes.sql
```

### Step 9 — Buat Akun Admin

1. Buka **Supabase Dashboard** → **Authentication** → **Users**
2. Klik **Add User** → **Create New User**
3. Masukkan Email dan Password
4. Gunakan kredensial tersebut untuk login di `/admin/login`

### Verifikasi Database

```sql
-- Cek distribusi soal per bidang
SELECT kategori, COUNT(*) as jumlah_soal
FROM public.questions
GROUP BY kategori
ORDER BY kategori;
-- Expected: 4 baris, masing-masing 50 soal

-- Cek kolom kategori di participants
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'participants' AND column_name = 'kategori';
```

---

## 👤 Panduan Penggunaan — Peserta

### 1️⃣ Pendaftaran (`/{lang}/daftar`)

1. Isi formulir:
   - **Nama Lengkap** — Sesuai identitas resmi
   - **Nomor Passport / ID** — Huruf kapital & angka, 6–12 karakter (contoh: `A1234567`)
2. Pilih **Bidang Kompetisi** (salah satu dari 4 bidang)
3. Klik **"Daftar Sekarang"**
4. Sistem menampilkan **Nomor Peserta** (format: `IPE-2026-XXXX`) — **salin & simpan!**

> 🔑 Bidang kompetisi **tidak dapat diubah** setelah mendaftar.

---

### 2️⃣ Login (`/{lang}/login`)

| Field | Nilai |
|-------|-------|
| **Nomor Peserta / No Passport** | Contoh: `IPE-2026-0001` atau `A1234567` |
| **Kata Sandi** | `ISTC2026` *(universal untuk semua peserta)* |

---

### 3️⃣ Dashboard Peserta (`/{lang}/peserta`)

Menampilkan:
- **Badge bidang kompetisi** yang dipilih saat daftar
- Status ujian saat ini

| Status | Tindakan |
|--------|----------|
| **Belum Dimulai** | Klik "Mulai Ujian" (jika akses dibuka panitia) |
| **Akses Ditutup** | Tunggu pengumuman panitia |
| **Sedang Berlangsung** | Klik "Lanjutkan Ujian" |
| **Selesai** | Lihat skor & unduh sertifikat |

---

### 4️⃣ Mengerjakan Ujian (`/{lang}/peserta/ujian`)

- **50 soal** sesuai bidang kompetisi yang dipilih
- Jawaban tersimpan **otomatis** saat diklik
- **Timer 90 menit** (merah saat < 5 menit)
- Grid navigasi soal (emas = aktif, gelap = dijawab, terang = belum)
- Ujian **otomatis dikumpulkan** saat waktu habis

---

### 5️⃣ Sertifikat (`/{lang}/peserta/sertifikat`)

Sertifikat A4 Landscape berisi:
- Nama peserta, bidang kompetisi, skor, tanggal
- Logo ISTC resmi
- Nomor peserta unik

---

## 🛡️ Panduan Penggunaan — Admin / Panitia

### Cara Akses

Buka `/admin/login` → masukkan Email + Password Supabase Auth.

---

### Dashboard Utama (`/admin`)

- **Buka/Tutup Akses Ujian** — satu klik mengontrol semua peserta
- **Keep Alive** — ping database agar tidak pause (Supabase free tier)

---

### Manajemen Peserta (`/admin/peserta`)

Tabel menampilkan:
- Nomor Peserta · Nama · No Passport · **Bidang** · Skor · Status · Tgl Daftar

**Edit Peserta**: klik ikon edit → ubah Nama, No Passport, atau **Bidang Kompetisi**.

---

### Manajemen Soal (`/admin/soal`)

- Filter soal per **bidang kompetisi**
- Tambah / Edit soal langsung dari UI admin
- Kolom: Nomor · Pertanyaan · Kunci Jawaban · **Kategori/Bidang** · Bobot · Status

---

## 📁 Struktur Proyek

```
computer-service-shop/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout + JSON-LD + Fonts
│   │   ├── globals.css                   # Design system & CSS variables
│   │   ├── not-found.tsx                 # Halaman 404 custom
│   │   ├── robots.ts                     # robots.txt dinamis
│   │   ├── sitemap.ts                    # Sitemap XML dinamis
│   │   ├── opengraph-image.tsx           # OG Image generator
│   │   └── [lang]/                       # Routing multilingual (en/id/ms)
│   │       ├── page.tsx                  # Landing Page per bahasa
│   │       ├── daftar/
│   │       │   ├── page.tsx              # Form Pendaftaran + pilih bidang
│   │       │   ├── actions.ts            # registerParticipant (sequence atomic)
│   │       │   └── layout.tsx            # Metadata pendaftaran
│   │       ├── login/
│   │       │   ├── page.tsx              # Form Login Peserta (multilingual)
│   │       │   ├── actions.ts            # loginParticipant via RPC
│   │       │   └── layout.tsx            # Metadata login (noindex)
│   │       └── peserta/
│   │           ├── layout.tsx            # Layout peserta (auth guard)
│   │           ├── page.tsx              # Dashboard Peserta
│   │           ├── PesertaClient.tsx     # UI dashboard + badge bidang
│   │           ├── PesertaNavbar.tsx     # Navbar area peserta
│   │           ├── components.tsx        # StartExamForm
│   │           ├── actions.ts            # startExam (validasi kategori)
│   │           ├── loading.tsx           # Loading skeleton
│   │           ├── ujian/
│   │           │   ├── page.tsx          # CBT Server Component
│   │           │   ├── CbtClient.tsx     # UI ujian interaktif
│   │           │   ├── actions.ts        # saveAnswer, finishExam (atomic)
│   │           │   ├── useExamGuard.ts   # Hook proteksi sesi ujian
│   │           │   ├── ExamErrorBoundary.tsx # Error boundary CBT
│   │           │   └── loading.tsx       # Loading skeleton ujian
│   │           └── sertifikat/
│   │               ├── page.tsx          # Sertifikat Server Component
│   │               └── SertifikatClient.tsx # Render & download PDF
│   │
│   └── admin/
│       ├── layout.tsx                    # Layout admin (Supabase Auth check)
│       ├── login/                        # Form Login Admin
│       └── (dashboard)/
│           ├── page.tsx                  # Dashboard + toggle ujian
│           ├── components.tsx            # ToggleAksesForm, KeepAlive
│           ├── peserta/
│           │   ├── page.tsx              # Tabel peserta + kolom bidang
│           │   ├── PesertaClient.tsx     # UI tabel + edit modal bidang
│           │   └── actions.ts            # updateParticipant (inkl. kategori)
│           └── soal/
│               ├── page.tsx              # Tabel bank soal
│               └── SoalClient.tsx        # UI soal + filter bidang
│
├── components/
│   ├── Navbar.tsx                        # Navbar publik + language switcher
│   └── LandingContent.tsx                # Landing page multilingual
│
├── lib/
│   ├── session.ts                        # JWT session (jose)
│   ├── types.ts                          # TypeScript interfaces
│   ├── supabase/
│   │   ├── client.ts                     # Supabase Browser Client
│   │   └── server.ts                     # Supabase Server Client
│   └── i18n/
│       ├── LanguageContext.tsx           # Context + cookie locale detection
│       └── translations.ts              # Terjemahan EN/ID/MS
│
├── middleware.ts                         # Auto-detect bahasa browser (Accept-Language)
│
├── public/
│   ├── logo.png                          # Logo ISTC resmi
│   ├── hero.jpg / hero.webp              # Hero image landing
│   ├── Guidelines_ISTC_2026_EN.pdf       # Panduan EN
│   ├── Syllabi_ISTC_2026_EN.pdf          # Silabus EN
│   ├── Panduan_ISTC_2026_MS.pdf          # Panduan MS
│   ├── Silibus_ISTC_2026_MS.pdf          # Silabus MS
│   ├── Juknis_ISTC_2026.pdf              # Juknis ID
│   └── Kisi_Kisi_ISTC_2026.pdf           # Kisi-kisi ID
│
├── supabase/
│   ├── seed.sql                          # Skema DB utama (jalankan pertama)
│   ├── fix-rls.sql                       # RLS policies
│   ├── optimize_login.sql               # RPC login + indexes
│   ├── add_kategori_to_participants.sql  # Kolom bidang ke participants
│   ├── fix_nomor_peserta_sequence.sql    # SEQUENCE atomic (race condition fix)
│   ├── set_kategori_questions.sql        # Distribusi soal per bidang
│   ├── qa_fixes.sql                      # Index & constraint tambahan
│   ├── seed_soal_2026.sql               # 200 soal ID
│   ├── seed_soal_2026_en.sql            # 200 soal EN
│   ├── seed_soal_2026_ms.sql            # 200 soal MS
│   └── finish_exam_atomic.sql           # RPC penyelesaian ujian atomic
│
├── SEO_GUIDE.md                          # Panduan SEO platform
├── TECH_STACK.md                         # Dokumentasi teknis detail
├── .env.local                            # ⚠️ JANGAN di-commit!
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

---

## 🗺️ Peta Halaman (Sitemap)

| URL | Akses | Deskripsi |
|-----|-------|-----------|
| `/` → `/en` atau `/id` atau `/ms` | Publik | Redirect otomatis berdasarkan bahasa browser |
| `/{lang}` | Publik | Landing Page (tentang ISTC, bidang, alur, statistik) |
| `/{lang}/daftar` | Publik | Form pendaftaran + pilih bidang kompetisi |
| `/{lang}/login` | Publik | Login peserta |
| `/{lang}/peserta` | 🔐 Peserta | Dashboard peserta + badge bidang |
| `/{lang}/peserta/ujian` | 🔐 Peserta | Halaman CBT (soal sesuai bidang) |
| `/{lang}/peserta/sertifikat` | 🔐 Peserta | Pratinjau & unduh sertifikat PDF |
| `/admin/login` | Publik | Login admin |
| `/admin` | 🔐 Admin | Dashboard kontrol utama |
| `/admin/peserta` | 🔐 Admin | Manajemen peserta + bidang |
| `/admin/soal` | 🔐 Admin | Bank soal per bidang |

> `{lang}` = `en` / `id` / `ms`

---

## 🔧 Troubleshooting

### ❌ "Gagal menyimpan data pendaftaran"
**Penyebab**: RLS Supabase memblokir insert atau fungsi `generate_nomor_peserta` error.  
**Solusi**:
1. Pastikan `seed.sql` sudah dijalankan lengkap
2. Jalankan `fix_nomor_peserta_sequence.sql` untuk fix race condition pada nomor peserta

---

### ❌ "Nomor peserta atau No Passport tidak ditemukan" saat login
**Penyebab**: RPC `verify_participant_login` belum ada atau registrasi gagal.  
**Solusi**: Jalankan `optimize_login.sql` di Supabase SQL Editor.

---

### ❌ "Kata sandi salah"
Kata sandi universal untuk peserta ISTC 2026 adalah `ISTC2026`.

---

### ❌ "Questions Unavailable" / Soal tidak muncul
**Penyebab**: Kolom `kategori` di tabel `questions` kosong atau soal belum di-seed.  
**Solusi**:
1. Jalankan `seed_soal_2026_en.sql` (atau varian bahasa lain)
2. Jalankan `set_kategori_questions.sql`
3. Verifikasi: `SELECT kategori, COUNT(*) FROM questions GROUP BY kategori` → harus 4 baris × 50

---

### ❌ Halaman blank / Application error di browser
**Penyebab**: Cache `.next` rusak atau merge conflict residue.  
**Solusi**:
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

---

### ❌ Database Supabase timeout
**Penyebab**: Proyek Supabase free tier di-pause setelah 7 hari tidak aktif.  
**Solusi**: Login ke `/admin` → klik **"Trigger Keep Alive"**.

---

## ❓ FAQ

**Q: Apakah peserta bisa mendaftar lebih dari sekali?**  
A: Tidak. Sistem menolak nomor Passport yang sama dengan pesan "sudah terdaftar".

**Q: Bisakah peserta ganti bidang kompetisi setelah mendaftar?**  
A: Tidak bisa sendiri. Admin dapat mengubahnya melalui `/admin/peserta` → Edit.

**Q: Apakah jawaban tersimpan jika browser tiba-tiba tertutup?**  
A: Ya. Setiap jawaban langsung tersimpan ke database. Halaman ujian akan memuat ulang jawaban sebelumnya.

**Q: Berapa lama durasi ujian?**  
A: Default **90 menit**. Dapat diubah via `system_config` di Supabase (`kunci = 'durasi_menit'`).

**Q: Berapa soal per sesi ujian?**  
A: **50 soal** sesuai bidang peserta. Dapat diubah via `system_config` (`kunci = 'jumlah_soal'`).

**Q: Berapa passing grade?**  
A: Default **70** dari 100. Dapat diubah di `src/app/[lang]/peserta/ujian/actions.ts`.

**Q: Bagaimana cara ganti kata sandi universal peserta?**  
A: Ubah nilai `'ISTC2026'` di file `src/app/[lang]/login/actions.ts`.

**Q: Apakah platform ini mendukung multiple admin?**  
A: Ya. Tambahkan user di Supabase Dashboard → Authentication → Users.

**Q: Bagaimana deteksi bahasa otomatis bekerja?**  
A: Middleware membaca header `Accept-Language` dari browser. Jika cocok dengan EN/ID/MS, diarahkan ke bahasa tersebut. Default: EN. Pilihan bahasa disimpan ke cookie 1 tahun.

**Q: Mengapa ada gap pada nomor peserta (misal loncat dari 0057 ke 0061)?**  
A: Normal. Nomor peserta menggunakan PostgreSQL SEQUENCE yang mengonsumsi nilai meskipun saat testing. Gap kecil tidak mempengaruhi fungsi sistem.

---

## 📞 Kontak & Support

Untuk pertanyaan teknis terkait platform ini, hubungi tim pengembang.

---

*International Science and Technology Competitions CBT Platform — Dibuat dengan ❤️ untuk mendukung seleksi peserta yang adil, efisien, dan berkesan.*
