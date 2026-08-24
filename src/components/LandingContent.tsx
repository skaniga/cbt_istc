'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { AnnualEvent, SystemConfig } from '@/lib/types'

const categories = [
  { label: 'Matematika', icon: '➗', desc: 'Aljabar, geometri, kalkulus, dan logika matematika.' },
  { label: 'Ilmu Pengetahuan Alam', icon: '🧬', desc: 'Fisika, kimia, biologi, dan ilmu bumi.' },
  { label: 'Robotic', icon: '⚙️', desc: 'Pemrograman, mekanika, elektronika, dan kecerdasan buatan.' },
  { label: 'Technology', icon: '💻', desc: 'Komputasi, jaringan, keamanan siber, dan rekayasa perangkat lunak.' },
]

export default function LandingContent({
  config,
  events
}: {
  config: Record<string, string>
  events: AnnualEvent[]
}) {
  const { t, locale } = useLanguage()

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
              className="img-sepia"
            />
          </div>

          <div className="container">
            <div className="hero__content ornate-frame ornate-frame--lg">
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
                <p className="stat-item__label">Soal Pilihan Ganda</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">90'</p>
                <p className="stat-item__label">Durasi Ujian</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">4</p>
                <p className="stat-item__label">Kategori Soal</p>
              </div>
              <div className="stat-item">
                <p className="stat-item__num">100%</p>
                <p className="stat-item__label">Sertifikat Digital</p>
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

        <section className="section section--alt" aria-labelledby="kategori-heading">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 id="kategori-heading">Kategori Ujian</h2>
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
