# TASK.md — International Science and Technology Competitions CBT Platform

## STATUS SAAT INI
**Sesi**: 1 (Setup & Foundation)
**Tanggal Mulai**: 2026-08-22

---

## FASE SETUP

- [x] Baca file konteks (PANDUAN_SISTEM.md, MEMORY.md, TASK.md) — tidak ada, mulai dari awal
- [x] Rangkum pemahaman dalam 3 poin → Dikonfirmasi user
- [x] Buat `implementation_plan.md` → Disetujui user
- [x] Buat `TASK.md` ini
- [/] Bersihkan repo lama (hapus backend/, frontend/, package.json root, DEVELOPMENT.md)
- [ ] Setup Next.js 14 (App Router) di root repo
- [ ] Setup konfigurasi Supabase (client + server)
- [ ] Setup design system (globals.css, tokens, font imports)
- [ ] Buat skema DB + seed.sql → LAPOR → tunggu user jalankan
- [ ] Buat GitHub Actions Keep Alive workflow
- [ ] Buat file konteks: PANDUAN_SISTEM.md, MEMORY.md

---

## FASE FITUR (Satu per satu, lapor setelah selesai)

- [x] **Fitur 1**: Landing Page (publik, desain Academia/Classical putih-hitam, premium)
- [x] **Fitur 2**: Halaman Pendaftaran Peserta (/daftar)
- [x] **Fitur 3**: Halaman Login Peserta (/login)
- [x] **Fitur 4**: Dashboard Peserta + Course (/peserta)
- [x] **Fitur 5**: Halaman CBT Ujian (/peserta/ujian)
- [x] **Fitur 6**: Sertifikat Dinamis PDF (/peserta/sertifikat)
- [x] **Fitur 7**: Login Admin (/admin/login)
- [x] **Fitur 8**: Dashboard Admin — Toggle Akses + Keep Alive Widget
- [x] **Fitur 9**: Admin — Manajemen Peserta & Soal
- [x] **Fitur 10**: Admin — Dokumen, Seleksi, Sarana, Arsip

---

## FASE POLISH

- [x] Review responsivitas mobile di semua halaman
- [x] Review konsistensi desain dan UX
- [x] Bersihkan dead code
- [x] Update PANDUAN_SISTEM.md dan MEMORY.md final
