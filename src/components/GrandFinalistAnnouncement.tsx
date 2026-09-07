'use client'

import { useState, useMemo } from 'react'
import { GRAND_FINALISTS_2026, CATEGORY_ICONS } from '@/lib/grandFinalists'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface GrandFinalistAnnouncementProps {
  defaultExpanded?: boolean
}

export default function GrandFinalistAnnouncement({
  defaultExpanded = true,
}: GrandFinalistAnnouncementProps) {
  const { locale } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  const isEn = locale === 'en'
  const isMs = locale === 'ms'

  // Filter daftar berdasarkan kategori dan pencarian
  const filteredFinalists = useMemo(() => {
    return GRAND_FINALISTS_2026.filter((finalist) => {
      const matchCategory =
        selectedCategory === 'ALL' || finalist.kategori === selectedCategory
      const query = searchQuery.trim().toLowerCase()
      const matchSearch =
        !query ||
        finalist.nama_lengkap.toLowerCase().includes(query) ||
        finalist.nomor_peserta.toLowerCase().includes(query) ||
        finalist.kategori.toLowerCase().includes(query)

      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: GRAND_FINALISTS_2026.length,
      'Environmental Technology': 0,
      'Smart Robotics': 0,
      'Science In Action': 0,
      Mathematic: 0,
    }
    GRAND_FINALISTS_2026.forEach((f) => {
      if (counts[f.kategori] !== undefined) {
        counts[f.kategori]++
      }
    })
    return counts
  }, [])

  const handlePrint = () => {
    setIsExpanded(true)

    try {
      const printWindow = window.open('', '_blank', 'width=900,height=800')
      if (printWindow) {
        const rowsHtml = GRAND_FINALISTS_2026.map(
          (f) => `
            <tr>
              <td style="padding: 6px 10px; border: 1px solid #777; text-align: center;">${f.no}</td>
              <td style="padding: 6px 10px; border: 1px solid #777; text-align: center; font-family: monospace; font-weight: bold;">${f.nomor_peserta}</td>
              <td style="padding: 6px 10px; border: 1px solid #777; font-weight: 600;">${f.nama_lengkap}</td>
              <td style="padding: 6px 10px; border: 1px solid #777;">${f.kategori}</td>
            </tr>
          `
        ).join('')

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>${isEn ? 'ISTC 2026 Grand Finalists' : 'Pengumuman Grand Finalis ISTC 2026'}</title>
              <style>
                @page { size: A4 portrait; margin: 15mm; }
                body { font-family: 'Times New Roman', Georgia, serif; color: #111; margin: 0; padding: 20px; line-height: 1.5; }
                .kop { text-align: center; border-bottom: 2px solid #222; padding-bottom: 12px; margin-bottom: 20px; }
                .kop h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
                .kop h2 { margin: 4px 0 0 0; font-size: 14px; font-weight: normal; color: #333; }
                .title { text-align: center; margin: 20px 0 15px; }
                .title h3 { margin: 0; font-size: 16px; text-transform: uppercase; text-decoration: underline; }
                .title p { margin: 4px 0 0 0; font-size: 12px; color: #555; }
                .content { font-size: 13.5px; margin-bottom: 18px; line-height: 1.6; }
                .content p { margin: 4px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12.5px; }
                th { background: #f0f0f0; border: 1px solid #555; padding: 7px 10px; text-align: left; font-weight: bold; }
                td { border: 1px solid #777; }
                .footer-sign { margin-top: 30px; display: flex; justify-content: flex-end; }
                .sign-box { text-align: center; width: 240px; font-size: 13px; }
                @media print {
                  body { padding: 0; }
                }
              </style>
            </head>
            <body>
              <div class="kop">
                <h1>International Science and Technology Competitions</h1>
                <h2>ISTC 2026 — Official Committee & Selection Board</h2>
              </div>

              <div class="title">
                <h3>${isEn ? 'ANNOUNCEMENT OF GRAND FINALISTS' : 'PENGUMUMAN GRAND FINALIS'}</h3>
                <p>Ref: 042/PAN-ISTC/IX/2026 • ${isEn ? 'September 7, 2026' : '7 September 2026'}</p>
              </div>

              <div class="content">
                <p>${isEn 
                  ? 'Congratulations to all participants selected as <strong>Grand Finalists of the International Science and Technology Competitions (ISTC) 2026</strong>.'
                  : 'Selamat kepada seluruh peserta yang dinyatakan terpilih sebagai <strong>Grand Finalis International Science and Technology Competitions (ISTC) 2026</strong>.'}</p>
                <p style="font-weight: bold; color: #900;">⚠️ ${isEn
                  ? 'Grand finalists are required to attend in person at the competition.'
                  : 'Grand Finalis wajib hadir langsung di perlombaan.'}</p>
                <p style="font-weight: bold;">📍 Venue: Kuala Lumpur, Malaysia</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th style="width: 35px; text-align: center;">No.</th>
                    <th style="width: 140px; text-align: center;">${isEn ? 'Participant ID' : 'No. Peserta'}</th>
                    <th>${isEn ? 'Participant Name' : 'Nama Peserta'}</th>
                    <th style="width: 200px;">${isEn ? 'Category' : 'Bidang Lomba'}</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>



              <script>
                window.onload = function() {
                  window.print();
                };
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
        return
      }
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      window.print()
    }, 200)
  }

  return (
    <div
      id="pengumuman-finalis"
      aria-label={isEn ? 'ISTC 2026 Grand Finalists Announcement' : 'Pengumuman Grand Finalis ISTC 2026'}
      style={{
        marginBottom: '2rem',
      }}
    >
      <div
        className="card ornate-frame"
        style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--border)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-md)',
          padding: 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {/* ── HEADER PENGUMUMAN ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1C1714 0%, #2D2520 100%)',
            color: '#FAFAF8',
            padding: '1.5rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            borderBottom: '2px solid var(--brass)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--brass-light)',
                  background: 'rgba(201, 169, 98, 0.2)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '0.25rem',
                }}
              >
                {isEn ? 'Official Announcement' : isMs ? 'Pengumuman Rasmi' : 'Pengumuman Resmi'}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {isEn
                  ? 'Announcement of Grand Finalists ISTC 2026'
                  : isMs
                  ? 'Pengumuman Grand Finalis ISTC 2026'
                  : 'Pengumuman Grand Finalis ISTC 2026'}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              type="button"
              className="btn btn--outline"
              style={{
                fontSize: '0.8rem',
                padding: '0.45rem 0.85rem',
                borderColor: 'rgba(201, 169, 98, 0.6)',
                color: 'var(--brass-light)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              title={isEn ? 'Print announcement' : 'Cetak pengumuman'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>{isEn ? 'Print' : 'Cetak'}</span>
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
              className="btn btn--secondary"
              style={{
                fontSize: '0.8rem',
                padding: '0.45rem 0.85rem',
                background: isExpanded ? 'rgba(255,255,255,0.1)' : 'var(--brass)',
                color: isExpanded ? '#FFFFFF' : '#1C1714',
                borderColor: 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              {isExpanded
                ? (isEn ? 'Collapse' : 'Tutup')
                : (isEn ? 'View Finalists (35)' : 'Lihat Finalis (35)')}
              <span
                style={{
                  display: 'inline-block',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontSize: '0.65rem',
                }}
              >
                ▼
              </span>
            </button>
          </div>
        </div>

        {/* ── ISI PENGUMUMAN ── */}
        {isExpanded && (
          <div style={{ padding: '1.75rem 2rem' }}>
            {/* PESAN PENGUMUMAN INTI */}
            <div
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--brass)',
                borderRadius: '6px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.75rem',
              }}
            >
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--fg)',
                  margin: '0 0 0.5rem 0',
                }}
              >
                {isEn ? (
                  <>
                    Congratulations to all participants selected as <strong>Grand Finalists of the International Science and Technology Competitions (ISTC) 2026</strong>.
                  </>
                ) : isMs ? (
                  <>
                    Tahniah kepada semua peserta yang terpilih sebagai <strong>Grand Finalis International Science and Technology Competitions (ISTC) 2026</strong>.
                  </>
                ) : (
                  <>
                    Selamat kepada seluruh peserta yang dinyatakan terpilih sebagai <strong>Grand Finalis International Science and Technology Competitions (ISTC) 2026</strong>.
                  </>
                )}
              </p>
              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--crimson)',
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                }}
              >
                {isEn ? (
                  '⚠️ Grand finalists are required to attend in person at the competition.'
                ) : isMs ? (
                  '⚠️ Grand Finalis wajib hadir langsung di perlombaan.'
                ) : (
                  '⚠️ Grand Finalis wajib hadir langsung di perlombaan.'
                )}
              </p>
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--fg)',
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                📍 Venue: Kuala Lumpur, Malaysia
              </p>
            </div>

            {/* ── FILTER & PENCARIAN ── */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    margin: '0 0 0.15rem 0',
                    color: 'var(--fg)',
                  }}
                >
                  {isEn ? 'Official List of Grand Finalists' : isMs ? 'Senarai Peserta Grand Finalis' : 'Daftar Peserta Grand Finalis'}
                </h3>
                <p style={{ color: 'var(--muted-fg)', margin: 0, fontSize: '0.85rem' }}>
                  {isEn
                    ? `Showing ${filteredFinalists.length} of ${GRAND_FINALISTS_2026.length} participants`
                    : `Menampilkan ${filteredFinalists.length} dari ${GRAND_FINALISTS_2026.length} peserta`}
                </p>
              </div>

              {/* Input Pencarian */}
              <div style={{ position: 'relative', minWidth: '240px', flex: '0 1 300px' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search name or participant ID...' : 'Cari nama atau no. peserta...'}
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem 0.6rem 2.2rem',
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--fg)',
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    left: '0.7rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--muted-fg)',
                    fontSize: '0.9rem',
                    pointerEvents: 'none',
                  }}
                >
                  🔍
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    type="button"
                    style={{
                      position: 'absolute',
                      right: '0.7rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--muted-fg)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Kategori Filter Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.45rem',
                flexWrap: 'wrap',
                marginBottom: '1.25rem',
              }}
            >
              {[
                { key: 'ALL', label: isEn ? 'All Categories' : 'Semua Bidang' },
                { key: 'Environmental Technology', label: 'Environmental Technology' },
                { key: 'Smart Robotics', label: 'Smart Robotics' },
                { key: 'Science In Action', label: 'Science In Action' },
                { key: 'Mathematic', label: 'Mathematic' },
              ].map((cat) => {
                const isSelected = selectedCategory === cat.key
                const icon = cat.key !== 'ALL' ? CATEGORY_ICONS[cat.key] : '📋'
                const count = categoryCounts[cat.key] ?? 0

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      border: isSelected
                        ? '1px solid var(--brass)'
                        : '1px solid var(--border)',
                      background: isSelected ? 'var(--brass)' : '#FFFFFF',
                      color: isSelected ? '#1C1714' : 'var(--fg)',
                      fontWeight: isSelected ? 700 : 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{icon}</span>
                    <span>{cat.label}</span>
                    <span
                      style={{
                        background: isSelected ? 'rgba(0,0,0,0.15)' : 'var(--muted)',
                        borderRadius: '10px',
                        padding: '0.05rem 0.4rem',
                        fontSize: '0.7rem',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ── TABEL DAFTAR GRAND FINALIS (Passport disembunyikan!) ── */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: 'var(--bg-alt)',
                        borderBottom: '2px solid var(--border)',
                        color: 'var(--fg)',
                      }}
                    >
                      <th
                        style={{
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          width: '50px',
                        }}
                      >
                        No.
                      </th>
                      <th
                        style={{
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          width: '160px',
                        }}
                      >
                        {isEn ? 'Participant ID' : 'No. Peserta'}
                      </th>
                      <th
                        style={{
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {isEn ? 'Participant Name' : 'Nama Peserta'}
                      </th>
                      <th
                        style={{
                          padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          width: '240px',
                        }}
                      >
                        {isEn ? 'Category' : 'Bidang Lomba'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFinalists.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            padding: '2.5rem 1rem',
                            textAlign: 'center',
                            color: 'var(--muted-fg)',
                          }}
                        >
                          <p style={{ margin: 0, fontSize: '1rem' }}>
                            {isEn
                              ? 'No participants found matching your search.'
                              : 'Tidak ditemukan peserta yang sesuai dengan pencarian.'}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredFinalists.map((finalist, index) => {
                        const icon = CATEGORY_ICONS[finalist.kategori] || '📌'

                        return (
                          <tr
                            key={finalist.nomor_peserta}
                            style={{
                              borderBottom: '1px solid var(--border)',
                              background: index % 2 === 0 ? '#FFFFFF' : 'var(--bg)',
                              transition: 'background 0.15s ease',
                            }}
                          >
                            {/* Nomor urut */}
                            <td
                              style={{
                                padding: '0.75rem 1rem',
                                fontSize: '0.9rem',
                                color: 'var(--muted-fg)',
                              }}
                            >
                              {finalist.no}
                            </td>

                            {/* Nomor Peserta */}
                            <td
                              style={{
                                padding: '0.75rem 1rem',
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.85rem',
                                letterSpacing: '0.06em',
                                color: 'var(--brass-dark)',
                                fontWeight: 600,
                              }}
                            >
                              {finalist.nomor_peserta}
                            </td>

                            {/* Nama Lengkap */}
                            <td
                              style={{
                                padding: '0.75rem 1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--fg)',
                              }}
                            >
                              {finalist.nama_lengkap}
                            </td>

                            {/* Bidang Lomba */}
                            <td style={{ padding: '0.75rem 1rem' }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  fontSize: '0.8rem',
                                  fontFamily: 'var(--font-display)',
                                  letterSpacing: '0.03em',
                                  color: 'var(--fg)',
                                  background: 'var(--bg-alt)',
                                  border: '1px solid var(--border)',
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '999px',
                                }}
                              >
                                <span>{icon}</span>
                                <span>{finalist.kategori}</span>
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer Catatan Tabel */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-alt)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--muted-fg)',
                }}
              >
                <span>ISTC 2026</span>
                <span>
                  {isEn
                    ? `Total: ${filteredFinalists.length} Grand Finalists`
                    : `Total: ${filteredFinalists.length} Peserta`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
