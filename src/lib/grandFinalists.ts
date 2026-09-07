export interface GrandFinalist {
  no: number
  nomor_peserta: string
  nama_lengkap: string
  kategori: 'Smart Robotics' | 'Science In Action' | 'Environmental Technology' | 'Mathematic'
}

export const GRAND_FINALISTS_2026: GrandFinalist[] = [
  { no: 1, nomor_peserta: 'IPE-2026-0061', nama_lengkap: 'WISTARADDIPTA ARKAAN ANZAM', kategori: 'Smart Robotics' },
  { no: 2, nomor_peserta: 'IPE-2026-0060', nama_lengkap: 'DANISH RAZQA FAEYZA SATRIO', kategori: 'Science In Action' },
  { no: 3, nomor_peserta: 'IPE-2026-0059', nama_lengkap: 'PHARADISYA ALZENA DIANDRA', kategori: 'Environmental Technology' },
  { no: 4, nomor_peserta: 'IPE-2026-0058', nama_lengkap: 'RAIHAN NISA CAHYA RAMADHANI', kategori: 'Smart Robotics' },
  { no: 5, nomor_peserta: 'IPE-2026-0057', nama_lengkap: 'FARREL VIRENDRA YUWONO', kategori: 'Mathematic' },
  { no: 6, nomor_peserta: 'IPE-2026-0056', nama_lengkap: 'KAITHLYN BELLVANIA KHANSA', kategori: 'Mathematic' },
  { no: 7, nomor_peserta: 'IPE-2026-0055', nama_lengkap: 'FAEYZA ZIDAN EVANDAFFA', kategori: 'Environmental Technology' },
  { no: 8, nomor_peserta: 'IPE-2026-0054', nama_lengkap: 'KENNISTYA LAVANI MULYADARMA', kategori: 'Science In Action' },
  { no: 9, nomor_peserta: 'IPE-2026-0053', nama_lengkap: 'AISHA NADIRA SANJAYA', kategori: 'Mathematic' },
  { no: 10, nomor_peserta: 'IPE-2026-0052', nama_lengkap: 'MAHARANI AYU ANGGITA', kategori: 'Smart Robotics' },
  { no: 11, nomor_peserta: 'IPE-2026-0051', nama_lengkap: 'ARYA BAGAS SAPUTRA', kategori: 'Environmental Technology' },
  { no: 12, nomor_peserta: 'IPE-2026-0050', nama_lengkap: 'JAUNATA AHLA ALISA', kategori: 'Science In Action' },
  { no: 13, nomor_peserta: 'IPE-2026-0049', nama_lengkap: 'GALANG NEAL KALPANA PUTRA PRIYADI', kategori: 'Environmental Technology' },
  { no: 14, nomor_peserta: 'IPE-2026-0048', nama_lengkap: 'KAISYA HIRFAZANI DZUHRI', kategori: 'Mathematic' },
  { no: 15, nomor_peserta: 'IPE-2026-0047', nama_lengkap: 'NISITA CAESA TSABITA', kategori: 'Smart Robotics' },
  { no: 16, nomor_peserta: 'IPE-2026-0046', nama_lengkap: 'AYRA SALWA DAFIYA', kategori: 'Environmental Technology' },
  { no: 17, nomor_peserta: 'IPE-2026-0045', nama_lengkap: 'NABILA AZZAHRA KURNIAWATI', kategori: 'Mathematic' },
  { no: 18, nomor_peserta: 'IPE-2026-0044', nama_lengkap: 'DENALI NAILA NAFISHA', kategori: 'Science In Action' },
  { no: 19, nomor_peserta: 'IPE-2026-0043', nama_lengkap: 'ANDRA GAIZKA ZAIN', kategori: 'Smart Robotics' },
  { no: 20, nomor_peserta: 'IPE-2026-0042', nama_lengkap: 'LARISSA ALYA AMANY', kategori: 'Mathematic' },
  { no: 21, nomor_peserta: 'IPE-2026-0041', nama_lengkap: 'FAISAL RAYAN KURNIAWAN', kategori: 'Smart Robotics' },
  { no: 22, nomor_peserta: 'IPE-2026-0040', nama_lengkap: 'FIRZA NAJA MUJTAHID', kategori: 'Science In Action' },
  { no: 23, nomor_peserta: 'IPE-2026-0039', nama_lengkap: 'ALLYSSA FEBRIYANI AZ ZAHRA', kategori: 'Science In Action' },
  { no: 24, nomor_peserta: 'IPE-2026-0038', nama_lengkap: 'MUHAMMAD UWAIS HARDIYANTO', kategori: 'Smart Robotics' },
  { no: 25, nomor_peserta: 'IPE-2026-0037', nama_lengkap: 'ALIYA ZARA SABRINA', kategori: 'Mathematic' },
  { no: 26, nomor_peserta: 'IPE-2026-0036', nama_lengkap: 'FARID RAFFASYA ASSIDIQ', kategori: 'Environmental Technology' },
  { no: 27, nomor_peserta: 'IPE-2026-0035', nama_lengkap: 'ALFIANDRA KHIBRAN WIJAYA', kategori: 'Science In Action' },
  { no: 28, nomor_peserta: 'IPE-2026-0034', nama_lengkap: 'AMIRA ZAFIRA', kategori: 'Mathematic' },
  { no: 29, nomor_peserta: 'IPE-2026-0033', nama_lengkap: 'AOZORA ATTSANY IMTIHAN', kategori: 'Environmental Technology' },
  { no: 30, nomor_peserta: 'IPE-2026-0032', nama_lengkap: 'FARZAL ATHA ZHAVIER TAFAKKUR', kategori: 'Environmental Technology' },
  { no: 31, nomor_peserta: 'IPE-2026-0031', nama_lengkap: 'MUHAMMAD YODA NARUTAMA', kategori: 'Smart Robotics' },
  { no: 32, nomor_peserta: 'IPE-2026-0030', nama_lengkap: 'IMAM FATHAN AHSAN KUSUMA', kategori: 'Smart Robotics' },
  { no: 33, nomor_peserta: 'IPE-2026-0029', nama_lengkap: 'Rifan aqila fathan', kategori: 'Science In Action' },
  { no: 34, nomor_peserta: 'IPE-2026-0028', nama_lengkap: 'Nabila Shakira Putri', kategori: 'Environmental Technology' },
  { no: 35, nomor_peserta: 'IPE-2026-0027', nama_lengkap: 'Alicia Ismayanti Nurul Fikri', kategori: 'Mathematic' },
]

export const CATEGORY_ICONS: Record<string, string> = {
  'Smart Robotics': '🤖',
  'Science In Action': '🔬',
  'Environmental Technology': '🌱',
  'Mathematic': '📐',
}
