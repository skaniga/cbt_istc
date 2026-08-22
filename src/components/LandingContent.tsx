'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { AnnualEvent, SystemConfig } from '@/lib/types'

const categories = [
  { label: 'Teknik Fotografi', icon: '◎', desc: 'Eksposur, komposisi, pencahayaan, dan optik kamera.' },
  { label: 'Estetika Visual', icon: '◈', desc: 'Prinsip desain, warna, perspektif, dan storytelling.' },
  { label: 'Sejarah Fotografi', icon: '◉', desc: 'Pelopor fotografi, gerakan seni, dan ikonografi.' },
  { label: 'Pengetahuan Umum', icon: '◆', desc: 'Regulasi, standar industri, dan perkembangan terkini.' },
]

export default function LandingContent({
  config,
  events
}: {
  config: Record<string, string>
  events: AnnualEvent[]
}) {
  const { t } = useLanguage()

  const namaLomba  = config['nama_lomba']  ?? 'International Photography Exhibition'
  const tahunAktif = config['tahun_aktif'] ?? '2025'

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
      desc: t('step3_desc'),
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
              src="/hero.jpg"
              alt="International Photography Exhibition hall"
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
                {t('hero_title_line1')}<br />
                <em>{t('hero_title_line2')}</em><br />
                {t('hero_title_line3')}
              </h1>
              <p className="hero__subtitle">
                {t('hero_subtitle')}
              </p>
              <div className="hero__actions">
                <Link href="/daftar" className="btn btn--primary" id="hero-daftar-btn">
                  {t('hero_cta_register')}
                </Link>
                <Link href="/login" className="btn btn--secondary" id="hero-login-btn">
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
                <p className="stat-item__num">50</p>
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
                    src="/hero.jpg"
                    alt="Ruang pameran International Photography Exhibition"
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
                  {t('about_title')}
                </h2>
                <div style={{ color: 'var(--muted-fg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p className="drop-cap">
                    {t('about_desc')}
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
                <Link href="/arsip" className="btn btn--ghost" id="lihat-semua-arsip-btn">
                  {t('archive_view_all')} →
                </Link>
              </div>

              <div className="archive-grid">
                {events.map(ev => (
                  <article key={ev.id} className="archive-card">
                    <div className="archive-card__img">
                      {ev.flyer_url ? (
                        <Image
                          src={ev.flyer_url}
                          alt={`Flyer IPE ${ev.tahun}`}
                          width={400}
                          height={300}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                      <p className="label" style={{ marginBottom: '0.5rem' }}>IPE {ev.tahun}</p>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                        {ev.tema ?? `International Photography Exhibition ${ev.tahun}`}
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
            </div>
          </section>
        )}

      </main>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__grid">
            <div>
              <div className="footer__brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <img src="/logo.jpg" alt="IPE Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>IPE</span>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-fg)' }}>International Photography Exhibition</span>
                </div>
              </div>
              <p className="footer__desc">
                {t('footer_tagline')}
              </p>
            </div>
            <div>
              <p className="footer__col-title">{t('footer_quick_links')}</p>
              <ul className="footer__links" role="list">
                <li><Link href="/#tentang" className="footer__link">{t('nav_about')}</Link></li>
                <li><Link href="/#alur" className="footer__link">{t('nav_flow')}</Link></li>
                <li><Link href="/#arsip" className="footer__link">{t('nav_archive')}</Link></li>
              </ul>
            </div>
            <div>
              <p className="footer__col-title">{t('footer_participant')}</p>
              <ul className="footer__links" role="list">
                <li><Link href="/daftar" className="footer__link">{t('nav_register')}</Link></li>
                <li><Link href="/login" className="footer__link">{t('nav_login')}</Link></li>
                <li><Link href="/admin/login" className="footer__link">Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copy">
              © {tahunAktif} International Photography Exhibition. All rights reserved.
            </p>
            <div className="ornate-divider" aria-hidden="true" style={{ width: '8rem', margin: 0 }} />
          </div>
        </div>
      </footer>
    </>
  )
}
