# 🔍 SEO Guide — ISTC Platform
**Domain: `https://istcompetition.my`**
*Dibuat: 29 Agustus 2026 — Referensi agar tidak diulangi*

---

## ✅ Status Saat Ini

| Item | Status |
|---|---|
| Domain Verified (GSC) | ✅ Done — via DNS TXT Record |
| sitemap.xml | ✅ Live di `/sitemap.xml` |
| robots.txt | ✅ Live di `/robots.txt` |
| JSON-LD Schema | ✅ Organization + WebSite + Event |
| hreflang (ID/EN/MS) | ✅ Di setiap halaman publik |
| Open Graph + Twitter Card | ✅ Dengan OG Image otomatis |
| noindex halaman private | ✅ `/peserta`, `/login`, `/admin` |
| Submit Sitemap ke GSC | ✅ Submitted |
| Request Indexing | ⏳ Lakukan untuk semua URL publik |
| Google mulai crawl | ⏳ 1–24 jam setelah request |
| Muncul di search results | ⏳ 3–7 hari |

---

## 🚨 Permasalahan yang Ditemukan & Solusinya

### ❌ Problem 1 — Halaman Private Bisa Diindex Google

**Gejala:** Halaman `/peserta`, `/login`, `/admin` tidak ada proteksi dari Google crawler.

**Risiko:**
- Halaman login peserta muncul di Google Search
- Dashboard peserta berpotensi terindeks
- Panel admin bisa ditemukan via Google

**Solusi yang Diimplementasikan:**
```ts
// src/app/[lang]/peserta/layout.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// src/app/[lang]/login/layout.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// src/app/admin/layout.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

**Pelajaran:** Setiap kali menambah route baru yang private, **wajib** tambahkan `layout.tsx` dengan `robots: noindex`.

---

### ❌ Problem 2 — Multi-Bahasa Dianggap Duplicate Content

**Gejala:** Halaman `/id`, `/en`, `/ms` berisi konten yang mirip — Google bisa menganggap duplicate content dan penalti ranking.

**Risiko:**
- Penurunan ranking karena duplicate content penalty
- Google hanya mengindex satu versi bahasa, mengabaikan yang lain
- Hreflang tidak terbaca → traffic salah bahasa

**Solusi yang Diimplementasikan:**
```ts
// Di setiap page.tsx per locale — generateMetadata
alternates: {
  canonical: `https://istcompetition.my/${lang}`,
  languages: {
    'id': 'https://istcompetition.my/id',
    'en': 'https://istcompetition.my/en',
    'ms': 'https://istcompetition.my/ms',
    'x-default': 'https://istcompetition.my/id',
  },
},
```

**Pelajaran:** Setiap halaman publik multi-bahasa **wajib** ada `canonical` + `alternates.languages` + `x-default`.

---

### ❌ Problem 3 — JSON-LD Schema Tidak Lengkap / Format Lama

**Gejala:** Schema Organization menggunakan format lama untuk logo (`"logo": "url"` bukan `ImageObject`).

**Schema yang Salah:**
```json
"logo": "https://istcompetition.my/logo.png"
```

**Schema yang Benar (2024+):**
```json
"logo": {
  "@type": "ImageObject",
  "url": "https://istcompetition.my/logo.png",
  "width": 512,
  "height": 512
}
```

**Pelajaran:** Selalu gunakan format `ImageObject` untuk logo di schema.org. Validasi di [validator.schema.org](https://validator.schema.org).

---

### ❌ Problem 4 — Tidak Ada OG Image

**Gejala:** Saat link ISTC di-share ke WhatsApp/Telegram/LinkedIn, tidak ada preview gambar — hanya teks.

**Dampak:** Click-through rate (CTR) jauh lebih rendah dibanding link dengan preview gambar.

**Solusi yang Diimplementasikan:**
```tsx
// src/app/opengraph-image.tsx — auto-generate via Edge Runtime
export const runtime = 'edge'
export const size = { width: 1200, height: 630 }

// Output: https://istcompetition.my/opengraph-image
// Gambar branded ISTC (background gelap + ornamen emas)
```

**Pelajaran:** Setiap Next.js project **wajib** punya `opengraph-image.tsx` di root `app/`. Cek hasilnya di [opengraph.xyz](https://www.opengraph.xyz).

---

### ❌ Problem 5 — Sitemap "Couldn't Fetch" di GSC

**Gejala:** Setelah submit `sitemap.xml` ke Google Search Console, status muncul *"Couldn't fetch"*.

**Penyebab:** Google mencoba fetch sitemap tepat saat submit — sebelum Vercel selesai deploy atau DNS selesai propagasi.

**Cara Memastikan Sitemap Berfungsi:**
1. Buka langsung di browser: `https://istcompetition.my/sitemap.xml`
2. Jika XML muncul → sitemap OK, GSC hanya perlu retry

**Solusi:**
1. Hapus sitemap lama di GSC (klik ⋮ → Remove)
2. Submit ulang setelah memastikan sitemap accessible di browser
3. Tunggu — GSC akan retry otomatis dalam 24 jam

**Pelajaran:** Selalu buka URL sitemap di browser dulu sebelum troubleshoot GSC. Jangan langsung panik saat status "Couldn't fetch".

---

### ❌ Problem 6 — Verification Code Hilang Jika Layout Dihapus

**Gejala:** Kode Google Search Console verification di-hardcode di `index.html` → hilang jika file diganti.

**Solusi yang Diimplementasikan (2 metode):**

**Metode 1 — DNS TXT Record (Utama):** ✅ Sudah ada di DNS
```
Type: TXT
Name: @
Value: google-site-verification=Z6FF5mD6FyW8ekXHznDpzgilP_5SH4gI21Nfo2LV6II
```
→ Tidak akan hilang walau kode diubah

**Metode 2 — Metadata Next.js (Backup):**
```ts
// src/app/layout.tsx
verification: {
  google: 'Z6FF5mD6FyW8ekXHznDpzgilP_5SH4gI21Nfo2LV6II',
},
```

**Pelajaran:** Selalu gunakan **DNS TXT Record** sebagai metode verifikasi utama — tidak bergantung pada kode. Jangan hapus TXT record dari DNS.

---

## 📁 File SEO yang Dibuat

| File | Fungsi | URL Live |
|---|---|---|
| [`src/app/sitemap.ts`](src/app/sitemap.ts) | Auto-generate sitemap | `/sitemap.xml` |
| [`src/app/robots.ts`](src/app/robots.ts) | Auto-generate robots.txt | `/robots.txt` |
| [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx) | OG image 1200×630 | `/opengraph-image` |
| [`src/app/layout.tsx`](src/app/layout.tsx) | Root metadata + JSON-LD | Semua halaman |
| [`src/app/[lang]/page.tsx`](src/app/%5Blang%5D/page.tsx) | Metadata per locale | `/id`, `/en`, `/ms` |
| [`src/app/[lang]/daftar/layout.tsx`](src/app/%5Blang%5D/daftar/layout.tsx) | Metadata halaman daftar | `/id/daftar`, dll |
| [`src/app/[lang]/login/layout.tsx`](src/app/%5Blang%5D/login/layout.tsx) | noindex login | `/id/login`, dll |
| [`src/app/[lang]/peserta/layout.tsx`](src/app/%5Blang%5D/peserta/layout.tsx) | noindex dashboard | `/id/peserta`, dll |
| [`src/app/admin/layout.tsx`](src/app/admin/layout.tsx) | noindex admin | `/admin/*` |

---

## 📋 Checklist Wajib Saat Menambah Route Baru

> **Copy checklist ini setiap kali membuat halaman baru!**

### Route Publik (boleh diindex)
```
[ ] Tambah generateMetadata() dengan title & description unik
[ ] Tambah canonical URL yang tepat
[ ] Tambah hreflang alternates jika multi-bahasa
[ ] Tambah ke sitemap.ts jika halaman penting
[ ] Test OG preview di opengraph.xyz setelah deploy
```

### Route Private (jangan diindex)
```
[ ] Buat layout.tsx dengan robots: { index: false, follow: false }
[ ] Tambah path ke robots.ts dalam array disallow
[ ] JANGAN tambahkan ke sitemap.ts
```

---

## 🛠️ Tools Validasi SEO

| Tool | Fungsi | URL |
|---|---|---|
| Google Search Console | Monitor indexing & crawl errors | search.google.com/search-console |
| Schema Validator | Validasi JSON-LD | validator.schema.org |
| Rich Results Test | Cek rich snippets | search.google.com/test/rich-results |
| OG Preview | Cek tampilan link share | opengraph.xyz |
| Google PageSpeed | Core Web Vitals | pagespeed.web.dev |
| Mobile-Friendly Test | Cek responsivitas | search.google.com/test/mobile-friendly |

---

## 🔑 Kredensial Penting

| Item | Nilai |
|---|---|
| Domain GSC | `istcompetition.my` |
| Metode Verifikasi | DNS TXT Record (Domain property) |
| Verification Code | `Z6FF5mD6FyW8ekXHznDpzgilP_5SH4gI21Nfo2LV6II` |
| Sitemap URL | `https://istcompetition.my/sitemap.xml` |
| Robots URL | `https://istcompetition.my/robots.txt` |

> ⚠️ **JANGAN HAPUS** TXT Record dari DNS — Google menggunakannya untuk re-verifikasi berkala.

---

## ⏳ Timeline & Ekspektasi

| Milestone | Waktu |
|---|---|
| Google crawl pertama (setelah Request Indexing) | 1–24 jam |
| Muncul di `site:istcompetition.my` | 3–7 hari |
| Favicon/logo muncul di search results | 2–4 minggu |
| Sitelinks muncul | 1–2 bulan |
| Knowledge Panel (jika eligible) | 2–6 bulan |
| Ranking stabil untuk keyword target | 3–6 bulan |

---

## 🔄 Maintenance Rutin yang Disarankan

| Frekuensi | Tugas |
|---|---|
| Setiap deploy besar | Cek GSC Coverage report untuk error baru |
| Setiap bulan | Cek Core Web Vitals di PageSpeed |
| Setiap event baru | Update JSON-LD Event schema di `layout.tsx` |
| Setiap tambah halaman | Jalankan checklist di atas |

---

*Dibuat: 29 Agustus 2026 — ISTC CBT Platform SEO Session*
