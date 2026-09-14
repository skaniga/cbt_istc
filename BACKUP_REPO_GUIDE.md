# Panduan Manajemen Repositori Backup (Dual-Remote Git)

Dokumen ini menjelaskan konfigurasi dan tata cara sinkronisasi kode ke repositori backup (**`skaniga/cbt_istc`**) dari repositori utama (**`krido19/computer-service-shop`**).

---

## 1. Informasi Repositori

| Kategori | Nama Remote | URL Repositori | Keterangan |
| :--- | :--- | :--- | :--- |
| **Utama (Primary)** | `origin` | `https://github.com/krido19/computer-service-shop.git` | Repositori kerja harian & upstream branch |
| **Cadangan (Backup)** | `backup` | `https://github.com/skaniga/cbt_istc.git` | Repositori cermin cadangan (*redundancy*) |

---

## 2. Status Konfigurasi Saat Ini

- **Active Branch**: `main`
- **Upstream Tracking**: `origin/main`
- **Autentikasi**: Akun `krido19` telah terdaftar sebagai kolaborator (*write permission*) di repositori `skaniga/cbt_istc`.

Cek konfigurasi remote saat ini kapan saja dengan:
```powershell
git remote -v
```

Output:
```text
backup  https://github.com/skaniga/cbt_istc.git (fetch)
backup  https://github.com/skaniga/cbt_istc.git (push)
origin  https://github.com/krido19/computer-service-shop.git (fetch)
origin  https://github.com/krido19/computer-service-shop.git (push)
```

---

## 3. Prosedur Push Rutin

### A. Push Standar (Terpisah)

Setelah membuat commit baru di lokal:

1. **Push ke Repo Utama:**
   ```powershell
   git push origin main
   ```

2. **Push ke Repo Backup:**
   ```powershell
   git push backup main
   ```

3. **Sinkronisasi Seluruh Branch & Tag (Opsional):**
   ```powershell
   git push backup --all
   git push backup --tags
   ```

---

### B. Opsi Otomatis: Sekali Push ke 2 Repo Sekaligus (Direkomendasikan)

Jika Anda ingin perintah `git push origin main` langsung mengunggah ke **kedua repositori sekaligus**, jalankan pengaturan ini sekali saja:

```powershell
# 1. Tambahkan target push pertama (origin)
git remote set-url --add --push origin https://github.com/krido19/computer-service-shop.git

# 2. Tambahkan target push kedua (backup)
git remote set-url --add --push origin https://github.com/skaniga/cbt_istc.git
```

Setelah disetel, Anda cukup menjalankan:
```powershell
git push origin main
```
*Git akan otomatis mengeksekusi push ke `krido19` dan `skaniga` secara berurutan dalam satu perintah.*

> **Cara Membatalkan Opsi Otomatis:**
> Jika ingin kembali ke push terpisah:
> ```powershell
> git remote set-url --delete --push origin https://github.com/skaniga/cbt_istc.git
> ```

---

## 4. Checklist Keamanan & Hal yang Perlu Diperhatikan

| Item | Status | Catatan |
| :--- | :---: | :--- |
| **Source Code & History** | ✅ Ter-backup | Seluruh commit, branch, dan riwayat file tersimpan di kedua repo. |
| **File Environment (`.env.local`)** | ⚠️ TIDAK ter-backup | Berada dalam `.gitignore`. Simpan salinan isi kredensial di password manager / catatan terenkripsi. |
| **Database Supabase** | ⚠️ Terpisah | Data tabel, RLS policy, dan storage file ada di cloud Supabase, bukan di Git. |
| **Akses Kolaborator** | ✅ Aktif | Akun `krido19` wajib tetap berstatus collaborator di repo `skaniga/cbt_istc`. |

---

## 5. Pemecahan Masalah (Troubleshooting)

### Error 403: `Permission to skaniga/cbt_istc.git denied to krido19`
- **Penyebab:** Hak akses collaborator dicabut atau token login kadaluarsa.
- **Solusi:** Pastikan akun `krido19` masih terdaftar di menu *Settings > Collaborators* pada repo `skaniga/cbt_istc`.

### Error: `Updates were rejected because the remote contains work that you do not have locally`
- **Penyebab:** Ada commit baru langsung di web GitHub `skaniga/cbt_istc` yang belum ada di lokal.
- **Solusi:** Tarik perubahan terlebih dahulu atau sinkronkan:
  ```powershell
  git pull backup main --rebase
  git push backup main
  ```
