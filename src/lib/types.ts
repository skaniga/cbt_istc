// ============================================================
// Database Types — International Photography Exhibition 2025
// ============================================================

export type KategoriPeserta = 'umum' | 'pelajar' | 'profesional'
export type StatusSesi = 'in_progress' | 'selesai' | 'expired'
export type JenisMethod = 'cron' | 'manual'
export type JenisDokumen = 'juknis' | 'sop' | 'sk' | 'proposal' | 'tata_tertib' | 'pedoman_juri'
export type JenisVenue = 'venue' | 'peralatan' | 'fasilitas'
export type StatusEvent = 'aktif' | 'selesai' | 'arsip'
export type KunciJawaban = 'A' | 'B' | 'C' | 'D'

export interface Participant {
  id: string
  nomor_peserta: string
  nama_lengkap: string
  no_passport: string
  foto_url: string | null
  skor: number | null
  lulus: boolean
  created_at: string
}

export interface Question {
  id: string
  nomor_soal: number
  pertanyaan: string
  pilihan_a: string
  pilihan_b: string
  pilihan_c: string
  pilihan_d: string
  kunci_jawaban: KunciJawaban
  kategori: string
  bobot: number
  aktif: boolean
  created_at: string
}

export interface ExamSession {
  id: string
  peserta_id: string
  mulai_at: string
  selesai_at: string | null
  skor_akhir: number
  total_soal: number
  total_benar: number
  status: StatusSesi
  created_at: string
}

export interface Answer {
  id: string
  sesi_id: string
  soal_id: string
  jawaban: KunciJawaban | null
  benar: boolean | null
  answered_at: string
}

export interface SystemConfig {
  id: string
  kunci: string
  nilai: string
  keterangan: string | null
  updated_at: string
}

export interface Document {
  id: string
  judul: string
  jenis: JenisDokumen
  tahun: number
  file_url: string
  file_size: number | null
  deskripsi: string | null
  publik: boolean
  created_at: string
}

export interface Winner {
  id: string
  peserta_id: string | null
  nama_pemenang: string
  peringkat: number
  tahun: number
  skor: number | null
  apresiasi: string | null
  foto_karya_url: string | null
  created_at: string
}

export interface Venue {
  id: string
  nama: string
  jenis: JenisVenue
  deskripsi: string | null
  lokasi: string | null
  kapasitas: number | null
  foto_url: string[] | null
  denah_url: string | null
  aktif: boolean
  created_at: string
}

export interface AnnualEvent {
  id: string
  tahun: number
  tema: string | null
  deskripsi: string | null
  tanggal_mulai: string | null
  tanggal_selesai: string | null
  jumlah_peserta: number
  flyer_url: string | null
  dokumentasi_url: string[] | null
  lpj_url: string | null
  berita_acara_url: string | null
  status: StatusEvent
  created_at: string
}

export interface KeepAlive {
  id: string
  check_time: string
  method: JenisMethod
}

// ============================================================
// Helper: Map system_config array → key-value object
// ============================================================
export type SystemConfigMap = Record<string, string>

export function toConfigMap(configs: SystemConfig[]): SystemConfigMap {
  return configs.reduce((acc, cfg) => {
    acc[cfg.kunci] = cfg.nilai
    return acc
  }, {} as SystemConfigMap)
}
