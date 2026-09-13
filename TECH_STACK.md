# 🛠️ Tech Stack & Development Log
**International Science and Technology Competitions (ISTC) — CBT Platform**
*Session: Jumat, 28 Agustus 2026*

---

## 🏗️ Tech Stack

### Frontend
| Layer | Teknologi | Keterangan |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Server Components, Server Actions, `revalidate` |
| Language | **TypeScript** | Strict typing, `noEmit` check sebelum setiap push |
| Styling | **Vanilla CSS** (`globals.css`) | Design system custom — Classical / Academia theme |
| State | **React 19** (`useTransition`, `useRef`, `useState`) | Concurrent features, debounce, optimistic UI |
| Fonts | **Google Fonts** (Cormorant Garamond, Crimson Pro, Cinzel) | Di-load via `<link>` di `layout.tsx` |
| i18n | **Custom LanguageContext** | 3 bahasa: `id`, `en`, `ms` via `TranslationKey` type |

### Backend / Database
| Layer | Teknologi | Keterangan |
|---|---|---|
| BaaS | **Supabase** (PostgreSQL) | Auth, Database, Storage, RPC |
| ORM/Client | **`@supabase/ssr`** | Server-side client dengan cookie adapter |
| Auth Peserta | **Custom JWT** (`jose`) | Signed dengan `SESSION_SECRET` via HTTP-only cookie |
| Auth Admin | **Supabase Auth** | `signInWithPassword`, session dikelola Supabase |
| Storage | **Supabase Buckets** | Gambar hero, about, logo |

### Deployment
| Layer | Teknologi |
|---|---|
| Hosting | **Vercel** (Edge Network) |
| Database | **Supabase** (Singapore region) |
| CI/CD | **GitHub** → Vercel auto-deploy on push |

---

## 🚀 Pekerjaan yang Dilakukan Sore Ini

### 📌 Sesi 1 — Git & Environment Fix

- **`git pull` gagal** karena broken ref `refs/remotes/origin/main`
  - Fix: `rm .git/refs/remotes/origin/main && git fetch --all && git pull`
- Berhasil pull 25 file perubahan dari remote

---

### ⚡ Sesi 2 — Optimasi Login (Performance & Security)

#### 🗄️ Database — [`supabase/optimize_login.sql`](supabase/optimize_login.sql)
```sql
-- Index B-Tree untuk mempercepat query login
CREATE INDEX IF NOT EXISTS idx_participants_nomor_peserta ON public.participants (nomor_peserta);
CREATE INDEX IF NOT EXISTS idx_participants_no_passport   ON public.participants (no_passport);

-- RPC sequential lookup (lebih efisien dari OR condition)
CREATE OR REPLACE FUNCTION public.verify_participant_login(p_identifier text) ...
```
**Dampak:** Query dari O(n) → O(log n). Tidak perlu scan seluruh tabel.

#### 🔐 Security — [`src/lib/session.ts`](src/lib/session.ts)
- **Bug sebelumnya:** JWT signing key memakai `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang ter-expose ke browser
- **Fix:** Ganti ke `SESSION_SECRET` env variable yang private (server-only)

#### ⚡ Client — [`src/app/[lang]/login/page.tsx`](src/app/%5Blang%5D/login/page.tsx)
- Ganti `useState(loading)` manual → **`useTransition`** React
- Tambah **`router.prefetch()`** di `useEffect` → bundle `/peserta` di-download saat login page dimuat
- Input di-disable saat pending untuk cegah double submit

#### 🧹 Bonus TypeScript Fix
- Fix `TS2322` void return type di `components.tsx` (peserta & admin)
- Seluruh `npx tsc --noEmit` bersih ✅

---

### 🛡️ Sesi 3 — Bug & Reliability Fix (CBT Ujian)

#### 🐛 #1 — Race Condition `saveAnswer` — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
**Problem:** Jika peserta klik jawaban cepat-cepat, request bisa sampai out-of-order ke server.
```ts
// Solusi: debounce 400ms per soal menggunakan useRef Map
const pendingSaves = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
```
- Setiap klik baru pada soal yang sama **cancel** pending request sebelumnya
- Saat `finishExam`, semua pending di-**flush** terlebih dahulu

#### 🐛 #2 — Passing Grade Hard-coded — [`supabase/finish_exam_atomic.sql`](supabase/finish_exam_atomic.sql)
**Problem:** `const isPassed = finalScore >= 70` hard-coded, tidak baca `nilai_lulus` dari `system_config`.
```sql
-- Solusi: baca dari DB
SELECT COALESCE(nilai::integer, 70) INTO v_passing_grade
FROM public.system_config WHERE kunci = 'nilai_lulus';
```

#### 🐛 #4 — Atomic `finishExam` — [`supabase/finish_exam_atomic.sql`](supabase/finish_exam_atomic.sql)
**Problem:** 3 operasi terpisah (hitung skor → update participants → update exam_sessions). Jika server mati di tengah, data jadi partial state.
```sql
-- Solusi: PostgreSQL stored procedure SECURITY DEFINER
-- Semua operasi dalam satu transaksi atomik
CREATE OR REPLACE FUNCTION public.finish_exam_atomic(p_session_id uuid, p_peserta_id uuid)
RETURNS jsonb LANGUAGE plpgsql ...
```

#### 🐛 #5 — Validasi Waktu Server — [`ujian/actions.ts`](src/app/%5Blang%5D/peserta/ujian/actions.ts)
**Problem:** `finishExam` bisa dipanggil kapan saja via browser DevTools sebelum waktu habis.
- Validasi `end_time` dari DB sebelum memproses finish
- Toleransi 30 detik untuk network latency
- Log audit jika submit terlalu awal

#### 🛡️ #7 — Error Boundary — [`ExamErrorBoundary.tsx`](src/app/%5Blang%5D/peserta/ujian/ExamErrorBoundary.tsx)
- React class component `getDerivedStateFromError`
- Pesan: *"Jawaban Anda sudah tersimpan di server"*
- Tombol: Reload halaman / Kembali ke dashboard

#### ✨ #8 — Auto-save Indicator — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
```
↑ Menyimpan...  →  ✓ Tersimpan  →  ✗ Gagal simpan
```

#### 🧹 #9 — Hapus `<style jsx>` — [`globals.css`](src/app/globals.css)
- CSS `.cbt-sidebar`, `.mobile-nav-toggle` dipindah ke `globals.css`
- Pattern App Router yang benar

---

### 🎨 Sesi 4 — UI/UX Overhaul

#### #1 · Dashboard Info Panel — [`PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx)
- Grid 3 kolom: **Jumlah Soal** 📋 | **Durasi Ujian** ⏱ | **Nilai Lulus** 🎯
- Data diambil dari `system_config` — dinamis, bukan hard-coded

#### #2 · Status Akses Ditutup — [`PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx)
- Sebelum: teks `Akses Ditutup` polos
- Sesudah: banner dengan border aksen emas, penjelasan situasi + instruksi refresh

#### #3 · Form Daftar — [`daftar/page.tsx`](src/app/%5Blang%5D/daftar/page.tsx)
- `useTransition` menggantikan `useState(loading)`
- Validasi real-time format No. Passport: `PASSPORT_REGEX = /^[A-Z0-9]{6,12}$/`
- Auto-uppercase input saat mengetik
- Tombol submit disabled jika format salah

#### #4 · Progress Bar CBT — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
- Bar tipis 3px di atas halaman, berubah **hijau** saat semua soal terjawab
- Counter `N/50 dijawab` di header dan sidebar

#### #5 · Submit dari Mana Saja — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
- Tombol `⏹ Selesaikan` permanen di **header** dan **footer sidebar**
- Modal konfirmasi menampilkan statistik: soal terjawab vs belum dijawab

#### #6 · Salin Nomor Peserta — [`PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx) + [`daftar/page.tsx`](src/app/%5Blang%5D/daftar/page.tsx)
- Tombol `⎘ Salin` → `✓ Tersalin` satu klik
- Di halaman sukses registrasi: peringatan kuning ⚠️ eksplisit

#### #7 · Animasi Timer Kritis — [`globals.css`](src/app/globals.css)
```css
/* < 5 menit: pulse lambat */
.timer-critical { animation: timerPulse 1.8s ease-in-out infinite; }
/* < 1 menit: pulse cepat + scale */
.timer-urgent   { animation: timerUrgent 0.7s ease-in-out infinite; }
```

#### #9 · Halaman 404 Custom — [`not-found.tsx`](src/app/not-found.tsx)
- Angka `404` besar bergaya Cinzel
- Ornate divider + tombol navigasi — konsisten dengan brand

#### #10 · Loading Skeletons — [`peserta/loading.tsx`](src/app/%5Blang%5D/peserta/loading.tsx) + [`ujian/loading.tsx`](src/app/%5Blang%5D/peserta/ujian/loading.tsx)
- Shimmer animation CSS (`.skeleton` class)
- Placeholder mengikuti layout asli halaman


#### #11 · Accessibility (Aria) — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
```tsx
<button role="radio" aria-checked={isSelected} aria-label={`Pilihan ${opt}: ${text}`}>
```

---

## 📁 File yang Dibuat/Dimodifikasi

### File Baru
| File | Tujuan |
|---|---|
| [`supabase/optimize_login.sql`](supabase/optimize_login.sql) | Index DB + optimasi RPC login |
| [`supabase/finish_exam_atomic.sql`](supabase/finish_exam_atomic.sql) | Stored procedure atomic finish exam |
| [`src/app/[lang]/peserta/ujian/ExamErrorBoundary.tsx`](src/app/%5Blang%5D/peserta/ujian/ExamErrorBoundary.tsx) | React Error Boundary untuk CBT |
| [`src/app/not-found.tsx`](src/app/not-found.tsx) | Halaman 404 custom |
| [`src/app/[lang]/peserta/loading.tsx`](src/app/%5Blang%5D/peserta/loading.tsx) | Loading skeleton dashboard |
| [`src/app/[lang]/peserta/ujian/loading.tsx`](src/app/%5Blang%5D/peserta/ujian/loading.tsx) | Loading skeleton ujian CBT |
| [`src/app/[lang]/peserta/ujian/useExamGuard.ts`](src/app/%5Blang%5D/peserta/ujian/useExamGuard.ts) | Hook: beforeunload + multi-tab + offline queue |
| [`supabase/qa_fixes.sql`](supabase/qa_fixes.sql) | UNIQUE constraint + index tambahan |


### File Dimodifikasi
| File | Perubahan |
|---|---|
| [`src/lib/session.ts`](src/lib/session.ts) | Fix JWT secret key |
| [`.env.local`](.env.local) | Tambah `SESSION_SECRET` |
| [`src/app/[lang]/login/page.tsx`](src/app/%5Blang%5D/login/page.tsx) | `useTransition` + prefetch |
| [`src/app/[lang]/login/actions.ts`](src/app/%5Blang%5D/login/actions.ts) | `.trim()` + komentar optimasi |
| [`src/app/[lang]/peserta/components.tsx`](src/app/%5Blang%5D/peserta/components.tsx) | Fix TS void |
| [`src/app/admin/(dashboard)/components.tsx`](src/app/admin/%28dashboard%29/components.tsx) | Fix TS void |
| [`src/app/[lang]/peserta/ujian/actions.ts`](src/app/%5Blang%5D/peserta/ujian/actions.ts) | Validasi waktu + RPC atomic |
| [`src/app/[lang]/peserta/ujian/CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx) | Debounce, progress bar, submit modal, timer, aria, offline queue, useRef guard |
| [`src/app/[lang]/peserta/ujian/page.tsx`](src/app/%5Blang%5D/peserta/ujian/page.tsx) | Wrap ExamErrorBoundary |
| [`src/app/[lang]/peserta/page.tsx`](src/app/%5Blang%5D/peserta/page.tsx) | Fetch config tambahan |
| [`src/app/[lang]/peserta/PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx) | Info panel, status closed, copy button, auto-refresh, one-time notice |
| [`src/app/[lang]/peserta/PesertaNavbar.tsx`](src/app/%5Blang%5D/peserta/PesertaNavbar.tsx) | Disable language switcher saat ujian, konfirmasi logout |
| [`src/app/[lang]/daftar/page.tsx`](src/app/%5Blang%5D/daftar/page.tsx) | useTransition, validasi passport, copy |
| [`src/app/globals.css`](src/app/globals.css) | CBT CSS, timer animations, skeleton |

---

### 🧪 Sesi 5 — QA User Tester Fixes

Berdasarkan review sebagai **Senior User Tester**, ditemukan dan diperbaiki 10 skenario edge-case kritis:

#### 🔴 #1 · Language Lock Saat Ujian — [`PesertaNavbar.tsx`](src/app/%5Blang%5D/peserta/PesertaNavbar.tsx)
**Problem:** Ganti bahasa di tengah ujian bisa menyebabkan reset state & soal berubah tampilan.
```tsx
const isExamPage = pathname?.includes('/ujian')
<select disabled={isExamPage} style={{ cursor: isExamPage ? 'not-allowed' : 'pointer' }} />
```
- Tooltip muncul: *"🔒 Terkunci selama ujian"*
- Tombol Logout di halaman ujian meminta konfirmasi

---

#### 🔴 #2 · Multi-Tab Detection — [`useExamGuard.ts`](src/app/%5Blang%5D/peserta/ujian/useExamGuard.ts)
**Problem:** Peserta buka ujian di 2 tab → jawaban konflik.
```ts
const channel = new BroadcastChannel('istc_exam_active_tab')
// Tab baru mendapat alert jika tab ujian sudah ada
channel.onmessage = (e) => {
  if (e.data.type === 'TAB_OPEN' && sessionId === examSessionId) {
    alert('⚠️ Ujian sedang dibuka di tab lain!')
  }
}
```

---

#### 🔴 #3 · Offline Queue + Retry — [`useExamGuard.ts`](src/app/%5Blang%5D/peserta/ujian/useExamGuard.ts)
**Problem:** Internet putus → jawaban gagal tersimpan tanpa retry → jawaban hilang.
```ts
// Jawaban gagal → simpan di localStorage
addToQueue(questionId, option)
// Koneksi pulih → retry otomatis
window.addEventListener('online', () => flushQueue())
```
- Banner merah muncul di header saat offline
- Auto-retry saat online kembali
- Flush queue sebelum `finishExam`

---

#### 🔴 #4 · `useRef` Guard Double-Submit — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
**Problem:** Timer habis + peserta klik submit bersamaan → 2 request `finishExam`.  
`useState` tidak cukup karena re-render belum terjadi saat guard dicek.
```ts
// Sebelum: if (isFinishing) return  ← tidak aman
// Sesudah: useRef ← atomic, tidak tergantung render cycle
const isFinishingRef = useRef(false)
if (isFinishingRef.current) return
isFinishingRef.current = true
```

---

#### 🔴 #5 · beforeunload Warning — [`useExamGuard.ts`](src/app/%5Blang%5D/peserta/ujian/useExamGuard.ts)
**Problem:** Peserta tidak sengaja refresh/tutup tab → kehilangan konteks ujian.
```ts
window.addEventListener('beforeunload', (e) => {
  e.preventDefault()
  e.returnValue = 'Ujian sedang berlangsung...'
})
```

---

#### 🟡 #6 · UNIQUE Constraint exam_sessions — [`supabase/qa_fixes.sql`](supabase/qa_fixes.sql)
**Problem:** Tidak ada `UNIQUE(peserta_id)` → race condition saat banyak peserta klik Mulai bersamaan bisa insert duplikat.
```sql
ALTER TABLE public.exam_sessions
  ADD CONSTRAINT exam_sessions_peserta_id_unique UNIQUE (peserta_id);
```

---

#### 🟡 #7 · Auto-Refresh Dashboard — [`PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx)
**Problem:** Peserta harus manual refresh untuk tahu kapan akses dibuka admin.
```ts
// Poll 15 detik — hanya aktif jika akses belum terbuka
const interval = setInterval(() => router.refresh(), 15000)
```

---

#### 🟡 #8 · Notice Ujian Satu Kali — [`PesertaClient.tsx`](src/app/%5Blang%5D/peserta/PesertaClient.tsx)
**Problem:** Tidak ada peringatan eksplisit bahwa ujian hanya bisa dikerjakan sekali saat akses terbuka (hanya ada di banner akses ditutup).
- Banner kuning ⚠️ muncul di atas tombol Mulai Ujian

---

#### 🟡 #9 · Long Text Overflow — [`CbtClient.tsx`](src/app/%5Blang%5D/peserta/ujian/CbtClient.tsx)
**Problem:** Soal dengan teks 500+ kata bisa overflow dan merusak layout.
```tsx
<div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
  <h2 style={{ wordBreak: 'break-word' }}>{soal}</h2>
</div>
```

---

#### 🟡 #10 · Konfirmasi Logout Saat Ujian — [`PesertaNavbar.tsx`](src/app/%5Blang%5D/peserta/PesertaNavbar.tsx)
**Problem:** Klik Logout saat ujian langsung keluar tanpa konfirmasi.
```tsx
onClick={isExamPage ? (e) => {
  if (!confirm('Ujian sedang berlangsung. Yakin ingin logout?')) e.preventDefault()
} : undefined}
```

---

## ⚠️ Tindak Lanjut yang Wajib Dilakukan

> File SQL berikut **harus dijalankan manual** di Supabase Dashboard → SQL Editor:

| # | File | Tujuan |
|---|---|---|
| 1 | [`supabase/optimize_login.sql`](supabase/optimize_login.sql) | Index B-Tree + optimasi RPC login |
| 2 | [`supabase/finish_exam_atomic.sql`](supabase/finish_exam_atomic.sql) | Stored procedure atomic finish exam |
| 3 | [`supabase/qa_fixes.sql`](supabase/qa_fixes.sql) | UNIQUE constraint + index answers/exam_sessions |

> Di **Vercel Dashboard** → Settings → Environment Variables:
- `SESSION_SECRET` — sudah terdaftar ✅

---

## 📊 Git Commits Sore Ini

```
79f4b13  QA fixes: beforeunload, multi-tab, offline queue, useRef guard, language lock...
2dc7bd8  docs: add TECH_STACK.md
87107cf  UX overhaul: info panel, status closed, form validation, progress bar...
a4f3e43  Fix race condition, atomic finish exam, error boundary, save indicator...
bedafde  Optimize login performance, security, and fix TS errors
160a774  (remote) — pulled at awal sesi
```

---

*Dibuat: 28 Agustus 2026 — ISTC CBT Platform Development Session*
*Update: QA Testing session ditambahkan pukul 17:35 WIB*

---

## 🎨 Sesi 6 — Certificate PDF-First Architecture (13 September 2026)

### 🔴 Problem Lama (Root Cause)
Sertifikat punya **dua engine render terpisah**:
- **Preview** → HTML div + CSS (`top: 39%`, `rem`, `transform: scale()`)
- **Download PDF** → HTML5 Canvas 2D (`y: 309`, piksel absolut)

Setiap revisi harus ubah 2 tempat → selalu meleset → buang waktu berjam-jam.

---

### ✅ Solusi — PDF-First Architecture

**Alur baru:**
```
Halaman dibuka
    ↓
Canvas render sekali di background (off-screen)
    ↓
Canvas → JPEG dataURL → <img> sebagai PREVIEW di layar
Canvas → jsPDF Blob → disimpan di memory
    ↓
Klik Download → save Blob yang SAMA (instan, 0 re-render)
```

**Hasilnya: Preview = PDF = identik 100%, mustahil meleset.**

---

### 📌 Arsitektur File — [`SertifikatClient.tsx`](src/app/%5Blang%5D/peserta/sertifikat/SertifikatClient.tsx)

#### Single Source of Truth — `POS` Object (FINAL ✅)
```ts
const POS = {
  certNo     : 200,   // y — Nomor sertifikat
  name       : 309,   // y — Nama peserta
  category   : 400,   // y — Kategori · Level (centered antara "Category" & "as")
  achievement: 445,   // y — 1st Place / penghargaan (di bawah "as" template)
  qr         : 0.77,  // y fraksi H → y≈611, bottom≈696, nempel Muhammad
  qrSize     : 85,    // ukuran QR Code (px)
}
```
> ✅ **Ubah 1 angka = preview DAN PDF berubah serentak. Tidak ada lagi dual-maintenance.**

#### Canvas Dimensions
- `W = 1122`, `H = 793` (landscape A4 px)
- `SCALE = 2` (retina/print-ready, canvas aktual 2244×1586)

#### Font Size Adaptif (Nama Panjang)
```ts
function nameFontSize(len: number): number {
  if (len > 32) return 28
  if (len > 24) return 34
  if (len > 16) return 42
  return 50
}
```

#### State Management
| State | Tipe | Keterangan |
|---|---|---|
| `previewUrl` | `string \| null` | JPEG `data:` URL untuk `<img>` preview |
| `isRendering` | `boolean` | Loading spinner saat canvas render |
| `renderError` | `string \| null` | Pesan error + tombol Retry |
| `pdfBlobRef` | `useRef<Blob>` | Blob PDF disimpan di ref, tidak trigger re-render |

---

### 🔧 Perubahan Teknis

#### Kenapa `<img>` bukan `<iframe>` untuk preview?
`blob:` URL di `<iframe>` diblokir Content Security Policy (CSP) Vercel/browser modern.
`data:` URL dari `canvas.toDataURL()` aman di semua browser (desktop & mobile).

#### Kenapa `useRef` untuk PDF Blob?
PDF Blob tidak perlu masuk ke React state karena tidak perlu trigger re-render.
Cukup disimpan di `useRef`, diakses langsung saat tombol Download diklik.

#### QR Code
Menggunakan library `qrcode` (canvas-based) langsung, bukan `qrcode.react` (SVG React component).
Alasan: canvas render tidak bisa menggunakan React component.

---

### 📦 Dependencies yang Ditambahkan
```bash
npm install   # fix UNMET DEPENDENCY:
# qrcode@^1.5.4
# @types/qrcode@^1.5.6
# qrcode.react@^4.2.0
# framer-motion@^13.2.0
```

---

### 📊 Git Commits Sesi Ini

```
f83248f  fix: achievement naik ke 415, QR 85px turun ke 79.5% nempel Muhammad
11bc6cd  fix: QR naik ke 77% height, achievement nempel as, QR 65px — fix overlap signature
6691386  refactor: PDF-first architecture — canvas blob iframe preview
```

---

### ⚙️ Cara Fine-tune Posisi Teks Sertifikat

Karena Single Source of Truth, cukup edit **satu object** di baris 24–31 `SertifikatClient.tsx`:

```ts
const POS = {
  achievement: 415,   // ← naik = angka kecil, turun = angka besar
  qr         : 0.795, // ← naik = fraksi kecil, turun = fraksi besar
  qrSize     : 85,    // ← besar = angka besar
}
```

Simpan → preview & PDF langsung berubah serentak.

---

*Update: PDF-First Architecture — 13 September 2026 pukul 16:43 WIB*
