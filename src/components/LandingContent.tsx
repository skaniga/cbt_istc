'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { AnnualEvent } from '@/lib/types'

const categoriesData = {
  en: [
    { label: 'Environmental Technology', icon: '🌱', desc: '3R/5R Principles, Waste Management & Composting, Renewable Energy (Solar, Wind, Water, Biogas), Water Treatment & Desalination, Global Warming Impact & Environmental Solutions.' },
    { label: 'Smart Robotics', icon: '🤖', desc: 'Basic Robot Components, Sensor Functions (Ultrasonic, IR, LDR, PIR, Temperature), Motors/Actuators, Basic Microcontroller (Arduino), Robot Programming Logic.' },
    { label: 'Science In Action', icon: '🔬', desc: 'Scientific Method & Experimental Variables, Measuring Instruments & Lab Safety, Applied Junior High Physics (Force, Energy, Light, Sound), Simple Chemistry, Applied Biology.' },
    { label: 'Mathematic', icon: '📐', desc: 'Number Operations & Social Arithmetic, Algebra & Linear Equations, Plane & Solid Geometry, Pythagorean Theorem, Basic Statistics & Probability.' },
  ],
  id: [
    { label: 'Environmental Technology', icon: '🌱', desc: 'Prinsip 3R/5R, Pengelolaan Sampah & Komposting, Energi Terbarukan, Pengolahan Air & Desalinasi, Dampak Pemanasan Global & Solusi Lingkungan.' },
    { label: 'Smart Robotics', icon: '🤖', desc: 'Komponen Dasar Robot, Fungsi Sensor (Ultrasonik, IR, LDR, PIR, Suhu), Motor/Penggerak, Dasar Mikrokontroler, Logika Pemrograman Robot.' },
    { label: 'Science In Action', icon: '🔬', desc: 'Metode Ilmiah & Variabel Percobaan, Alat Ukur & Keselamatan Lab, Penerapan Fisika SMP, Kimia Sederhana, Biologi Terapan.' },
    { label: 'Mathematic', icon: '📐', desc: 'Operasi Bilangan & Aritmatika Sosial, Aljabar & Persamaan Linear, Geometri Datar & Ruang, Teorema Pythagoras, Statistika Sederhana & Peluang.' },
  ],
  ms: [
    { label: 'Environmental Technology', icon: '🌱', desc: 'Prinsip 3R/5R, Pengurusan Sisa & Pengkomposan, Tenaga Boleh Diperbaharui (Suria, Angin, Air, Biogas), Rawatan Air & Penyahgaraman, Kesan Pemanasan Global & Penyelesaian Alam Sekitar.' },
    { label: 'Smart Robotics', icon: '🤖', desc: 'Komponen Asas Robot, Fungsi Sensor (Ultrasonik, IR, LDR, PIR, Suhu), Motor/Penggerak, Asas Mikropengawal (Arduino), Logik Pengaturcaraan Robot.' },
    { label: 'Science In Action', icon: '🔬', desc: 'Kaedah Saintifik & Pemboleh Ubah Eksperimen, Alat Ukur & Keselamatan Makmal, Fizik Sekolah Menengah Rendah Gunaan, Kimia Mudah, Biologi Gunaan.' },
    { label: 'Mathematic', icon: '📐', desc: 'Operasi Nombor & Aritmetik Sosial, Algebra & Persamaan Linear, Geometri Satah & Ruang, Teorem Pythagoras, Statistik Asas & Kebarangkalian.' },
  ],
}

const juknisDataAll = {
  en: [
    { title: "I. Introduction", content: "The development of science and technology in the era of globalization demands young generations to have high competitiveness, critical thinking, and innovation. The International Science and Technology Competition (ISTC) 2026 serves as a platform for Junior High School students to channel their creative ideas, science projects, and technological innovations on the international stage." },
    { title: "II. Competition Theme", content: '"Innovating for a Sustainable Future through Science and Technology"' },
    { title: "III. Participant Requirements", content: "• Active Junior High School student or equivalent.\n• Physically and Mentally Healthy\n• Not Color Blind\n• Aged 12 to 15 years as of September 10, 2026." },
    { title: "IV. Timeline / Schedule", content: "• Registration & Proposal Submission: June 1 – September 5, 2026\n• Announcement of Initial Selection: September 7, 2026\n• Technical Meeting (Online): September 8, 2026\n• Final Round & Exhibition (Offline in Kuala Lumpur): September 10, 2026" },
    { title: "V. Final Round Provisions", content: "Participants who pass the initial selection are required to attend in person at the event venue in Kuala Lumpur, Malaysia on September 10, 2026." },
    { title: "VI. Assessment System", content: "• Creativity & Innovation (30%)\n• Scientific & Technical Value (30%)\n• Benefits & Implementation (20%)\n• Presentation (20%)" },
    { title: "VII. Awards & Prizes", content: "• Grand Champion International Certificate\n• Award to Champion 1, 2 and 3\n• All attending participants will receive an International Participation Certificate." },
  ],
  id: [
    { title: "I. Pendahuluan", content: "Perkembangan ilmu pengetahuan dan teknologi (IPTEK) di era globalisasi menuntut generasi muda untuk memiliki daya saing tinggi, berpikir kritis, serta inovatif. International Science and Technology Competition (ISTC) 2026 hadir sebagai wadah bagi pelajar tingkat Sekolah Menengah Pertama (SMP) untuk menyalurkan ide kreatif, proyek sains, dan inovasi teknologi di kancah internasional." },
    { title: "II. Tema Kegiatan", content: '"Innovating for a Sustainable Future through Science and Technology"' },
    { title: "III. Persyaratan Peserta", content: "• Pelajar aktif tingkat Sekolah Menengah Pertama (SMP) atau sederajat.\n• Sehat Jasmani dan Rohani\n• Tidak Buta Warna\n• Berusia 12 hingga 15 tahun terhitung pada tanggal 10 September 2026." },
    { title: "IV. Timeline / Jadwal Kegiatan", content: "• Pendaftaran & Pengiriman Proposal: 1 Juni – 5 September 2026\n• Pengumuman Seleksi Tahap Awal: 7 September 2026\n• Technical Meeting (Online): 8 September 2026\n• Babak Final & Pameran (Offline di Kuala Lumpur): 10 September 2026" },
    { title: "V. Ketentuan Babak Final", content: "Peserta yang lolos seleksi tahap awal diwajibkan hadir secara langsung di lokasi acara di Kuala Lumpur, Malaysia pada tanggal 10 September 2026." },
    { title: "VI. Sistem Penilaian", content: "• Kreativitas & Inovasi (30%)\n• Nilai Ilmiah & Teknis (30%)\n• Manfaat & Implementasi (20%)\n• Presentasi (20%)" },
    { title: "VII. Penghargaan & Hadiah", content: "• Grand Champion Sertifikat Internasional\n• Award to Champion 1, 2 and 3\n• Seluruh peserta yang hadir akan mendapatkan Sertifikat Partisipasi Internasional." },
  ],
  ms: [
    { title: "I. Pendahuluan", content: "Perkembangan sains dan teknologi di era globalisasi menuntut generasi muda mempunyai daya saing tinggi, pemikiran kritis, dan inovatif. Pertandingan Sains dan Teknologi Antarabangsa (ISTC) 2026 hadir sebagai platform bagi pelajar Sekolah Menengah Rendah untuk menyalurkan idea kreatif, projek sains, dan inovasi teknologi di peringkat antarabangsa." },
    { title: "II. Tema Pertandingan", content: '"Innovating for a Sustainable Future through Science and Technology"' },
    { title: "III. Syarat Peserta", content: "• Pelajar aktif Sekolah Menengah Rendah atau setara.\n• Sihat Jasmani dan Rohani\n• Tidak Buta Warna\n• Berusia 12 hingga 15 tahun pada tarikh 10 September 2026." },
    { title: "IV. Jadual Aktiviti", content: "• Pendaftaran & Penyerahan Cadangan: 1 Jun – 5 September 2026\n• Pengumuman Pemilihan Awal: 7 September 2026\n• Mesyuarat Teknikal (Dalam Talian): 8 September 2026\n• Pusingan Akhir & Pameran (Luar Talian di Kuala Lumpur): 10 September 2026" },
    { title: "V. Peraturan Pusingan Akhir", content: "Peserta yang lulus pemilihan awal diwajibkan hadir secara langsung di lokasi acara di Kuala Lumpur, Malaysia pada 10 September 2026." },
    { title: "VI. Sistem Penilaian", content: "• Kreativiti & Inovasi (30%)\n• Nilai Saintifik & Teknikal (30%)\n• Manfaat & Pelaksanaan (20%)\n• Pembentangan (20%)" },
    { title: "VII. Anugerah & Hadiah", content: "• Grand Champion Sijil Antarabangsa\n• Anugerah kepada Juara 1, 2 dan 3\n• Semua peserta yang hadir akan menerima Sijil Penyertaan Antarabangsa." },
  ],
}

export default function LandingContent({
  config,
  events
}: {
  config: Record<string, string>
  events: AnnualEvent[]
}) {
  const { t, locale } = useLanguage()
  const [openJuknis, setOpenJuknis] = useState<number | null>(0)

  const categories = categoriesData[locale as keyof typeof categoriesData] ?? categoriesData.en
  const juknisData = juknisDataAll[locale as keyof typeof juknisDataAll] ?? juknisDataAll.en

  // PDF file names per locale
  const kisiPdf   = locale === 'en' ? '/Syllabi_ISTC_2026_EN.pdf'  : locale === 'ms' ? '/Silibus_ISTC_2026_MS.pdf'   : '/Kisi_Kisi_ISTC_2026.pdf'
  const juknisPdf = locale === 'en' ? '/Guidelines_ISTC_2026_EN.pdf' : locale === 'ms' ? '/Panduan_ISTC_2026_MS.pdf' : '/Juknis_ISTC_2026.pdf'

  const kisiLabel   = locale === 'en' ? 'Download Syllabus PDF'   : locale === 'ms' ? 'Muat Turun PDF Silibus'     : 'Download PDF Kisi-kisi'
  const juknisLabel = locale === 'en' ? 'Download Guidelines PDF' : locale === 'ms' ? 'Muat Turun PDF Panduan'     : 'Download PDF Juknis'
  const kisiTitle   = locale === 'en' ? 'Examination Syllabus'    : locale === 'ms' ? 'Silibus Peperiksaan'        : 'Kisi-kisi Soal'
  const juknisTitle = locale === 'en' ? 'Technical Guidelines'    : locale === 'ms' ? 'Panduan Teknikal Pertandingan' : 'Petunjuk Teknis Kompetisi'

  const namaLomba  = config['nama_lomba']  ?? 'International Science and Technology Competitions'
  const tahunAktif = config['tahun_aktif'] ?? '2025'
  const heroImage  = config['hero_image_url'] ?? '/hero.webp'
  const aboutImage = config['about_image_url'] ?? '/hero.webp'
  const heroTitle  = config['hero_title']
  const heroSubtitle = config['hero_subtitle']
  const aboutTitle = config['about_title']
  const aboutDesc  = config['about_desc']
  const batasSoal  = config['batas_soal'] ?? '50'

  const timelineSteps = [
    {
      roman: 'I',
      title: t('step1_title'),
      desc: t('step1_desc'),
    },
    {
      roman: 'II',
      title: t('step2_title'),
      desc: t('step2_desc'),
    },
    {
      roman: 'III',
      title: t('step3_title'),
      desc: t('step3_desc').replace('50', batasSoal),
    },
    {
      roman: 'IV',
      title: t('step4_title'),
      desc: t('step4_desc'),
    },
  ]

  return (
    <>
      <Navbar />

      <main id="main-content">
        <section className="hero" aria-label="Hero section" id="hero">
          <div className="hero__bg" aria-hidden="true">
            <Image
              src={heroImage}
              alt="International Science and Technology Competitions hall"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          <div className="container">
            <div className="hero__content ornate-frame ornate-frame--lg" style={{
              background: 'rgba(5,8,20,0.55)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              borderRadius: '8px',
              padding: '2.5rem 2rem',
            }}>
              <div className="hero__year-badge" aria-hidden="true">
                <span className="label">{tahunAktif}</span>
              </div>
              <p className="label" style={{ marginBottom: '0.75rem' }}>
                {t('hero_badge')} — {namaLomba}
              </p>
              <h1 className="hero__title">
                {heroTitle ? (
                  <span style={{ whiteSpace: 'pre-wrap' }}>{heroTitle}</span>
                ) : (
                  <>
                    {t('hero_title_line1')}<br />
                    <em>{t('hero_title_line2')}</em><br />
                    {t('hero_title_line3')}
                  </>
                )}
              </h1>
              <p className="hero__subtitle">
                {heroSubtitle || t('hero_subtitle')}
              </p>
              <div className="hero__actions">
                <Link href={`/${locale}/daftar`} className="btn btn--primary" id="hero-daftar-btn">
                  {t('hero_cta_register')}
                </Link>
                <Link href={`/${locale}/login`} className="btn btn--secondary" id="hero-login-btn">
                  {t('nav_login')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Statistik lomba" style={{ borderBlock: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="stats-bar" style={{ border: 'none', borderRadius: 0 }}>
              <div className="stat-item">
                <p className="stat-item__num">{batasSoal}</p>
                <p className="stat-item__label">{t('stat_multiple_choice')}</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">90'</p>
                <p className="stat-item__label">{t('stat_exam_duration')}</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">4</p>
                <p className="stat-item__label">{t('stat_question_categories')}</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">100%</p>
                <p className="stat-item__label">{t('stat_digital_cert')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="tentang" aria-labelledby="tentang-heading">
          <div className="container">
            <div className="about-grid">
              <div className="about__image-wrap">
                <div className="arch-top ornate-frame" style={{ aspectRatio: '3/4', background: 'var(--muted)', overflow: 'hidden' }}>
                  <Image
                    src={aboutImage}
                    alt="Ruang pameran International Science and Technology Competitions"
                    width={600}
                    height={800}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="img-sepia"
                  />
                </div>
              </div>
              <div>
                <p className="label" style={{ marginBottom: '1rem' }}>{t('about_label')}</p>
                <div className="ornate-divider" aria-hidden="true" style={{ marginTop: 0, width: '8rem', background: 'linear-gradient(90deg, var(--brass), transparent)' }} />
                <h2 id="tentang-heading" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                  {aboutTitle || t('about_title')}
                </h2>
                <div style={{ color: 'var(--muted-fg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p className="drop-cap" style={{ whiteSpace: 'pre-wrap' }}>
                    {aboutDesc || t('about_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="kisi-kisi" aria-labelledby="kategori-heading">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 id="kategori-heading">{kisiTitle}</h2>
              <p style={{ color: 'var(--muted-fg)', marginTop: '0.5rem' }}>
                {locale === 'en' ? 'Subjects and topics covered in the competition exam' : locale === 'ms' ? 'Mata pelajaran dan topik yang diuji dalam peperiksaan' : 'Silabus materi yang akan diujikan pada kompetisi'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {categories.map((cat, i) => (
                <article key={cat.label} className="card card--alt ornate-frame">
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'var(--brass)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}>
                    <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>{cat.icon}</span>
                    {['I','II','III','IV'][i]}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>{cat.label}</h3>
                  <p style={{ color: 'var(--muted-fg)', fontSize: '1rem', lineHeight: 1.65 }}>{cat.desc}</p>
                </article>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href={kisiPdf} download className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {kisiLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="alur" aria-labelledby="alur-heading">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>{t('flow_label')}</p>
              <h2 id="alur-heading">{t('flow_title')}</h2>
            </div>
            <div className="timeline" role="list">
              {timelineSteps.map(step => (
                <div key={step.roman} className="timeline-step" role="listitem">
                  <div className="timeline-step__num" aria-label={`Langkah ${step.roman}`}>
                    {step.roman}
                  </div>
                  <h3 className="timeline-step__title">{step.title}</h3>
                  <p className="timeline-step__desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="juknis" aria-labelledby="juknis-heading" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="ornate-frame" style={{ padding: '3rem', background: 'var(--bg-alt)' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 id="juknis-heading" style={{ fontSize: '1.75rem' }}>{juknisTitle}</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {juknisData.map((item, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                    <button
                      onClick={() => setOpenJuknis(openJuknis === idx ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: openJuknis === idx ? 'rgba(255,255,255,0.02)' : 'transparent',
                        border: 'none',
                        color: 'var(--fg)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.1rem',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      {item.title}
                      <span style={{ 
                        transform: openJuknis === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>
                    {openJuknis === idx && (
                      <div style={{ padding: '0 1.25rem 1.25rem', color: 'var(--muted-fg)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <a href={juknisPdf} download className="btn btn--primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  {juknisLabel}
                </a>
              </div>
            </div>
          </div>
        </section>

        {events.length > 0 && (
          <section className="section section--alt" id="arsip" aria-labelledby="arsip-heading">
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p className="label" style={{ marginBottom: '0.75rem' }}>{t('archive_label')}</p>
                  <h2 id="arsip-heading">{t('archive_title')}</h2>
                </div>
              </div>

              <div className="archive-grid">
                {events.map(ev => (
                  <article key={ev.id} className="archive-card">
                    <div className="archive-card__img">
                      {ev.flyer_url ? (
                        <Image
                          src={ev.flyer_url}
                          alt={`Flyer ISTC ${ev.tahun}`}
                          width={400}
                          height={300}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          className="img-sepia"
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          background: 'var(--muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-display)',
                          fontSize: '2rem',
                          color: 'var(--border-dark)',
                        }}>
                          {ev.tahun}
                        </div>
                      )}
                    </div>
                    <div className="archive-card__body">
                      <p className="label" style={{ marginBottom: '0.5rem' }}>ISTC {ev.tahun}</p>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                        {ev.tema ?? `International Science and Technology Competitions ${ev.tahun}`}
                      </h3>
                      {ev.deskripsi && (
                        <p style={{ color: 'var(--muted-fg)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          {ev.deskripsi.length > 120 ? ev.deskripsi.slice(0, 120) + '…' : ev.deskripsi}
                        </p>
                      )}
                      {ev.jumlah_peserta > 0 && (
                        <p style={{ marginTop: '1rem', fontFamily: 'var(--font-display)', fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted-fg)' }}>
                          {ev.jumlah_peserta} {t('archive_participants')}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <Link href={`/${locale}/arsip`} className="btn btn--ghost" id="lihat-semua-arsip-btn">
                  {t('archive_view_all')} →
                </Link>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__grid">
            <div>
              <div className="footer__brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img src="/logo.png" alt="ISTC Logo" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'contain', background: '#0a0e1a' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>ISTC</span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg)' }}>International Science and Technology Competitions</span>
                </div>
              </div>
              <p className="footer__desc">
                {t('footer_tagline')}
              </p>
            </div>
            <div>
              <p className="footer__col-title">{t('footer_quick_links')}</p>
              <ul className="footer__list" role="list">
                <li><Link href={`/${locale}#tentang`} className="footer__link">{t('nav_about')}</Link></li>
                <li><Link href={`/${locale}#alur`} className="footer__link">{t('nav_flow')}</Link></li>
                <li><Link href={`/${locale}#arsip`} className="footer__link">{t('nav_archive')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="footer__col-title">{t('footer_participant')}</p>
              <ul className="footer__list" role="list">
                <li><Link href={`/${locale}/daftar`} className="footer__link">{t('nav_register')}</Link></li>
                <li><Link href={`/${locale}/login`} className="footer__link">{t('nav_login')}</Link></li>
                <li><Link href="/admin/login" className="footer__link">Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">
              © {tahunAktif} International Science and Technology Competitions. All rights reserved.
            </p>
            <div className="ornate-divider" aria-hidden="true" style={{ width: '8rem', margin: 0 }} />
          </div>
        </div>
      </footer>
    </>
  )
}
