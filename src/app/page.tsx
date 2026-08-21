import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/server'
import { AnnualEvent, SystemConfig, toConfigMap } from '@/lib/types'

// Revalidate setiap 1 jam
export const revalidate = 3600

async function getPageData() {
  const supabase = await createClient()

  const [configRes, eventsRes] = await Promise.all([
    supabase.from('system_config').select('*'),
    supabase
      .from('annual_events')
      .select('id, tahun, tema, deskripsi, jumlah_peserta, flyer_url, status')
      .eq('status', 'selesai')
      .order('tahun', { ascending: false })
      .limit(3),
  ])

  const config = toConfigMap((configRes.data as SystemConfig[]) ?? [])
  const events = (eventsRes.data as AnnualEvent[]) ?? []

  return { config, events }
}

// ─── Timeline Steps (konten statis UI) ────────────────────────────────────────
const timelineSteps = [
  {
    roman: 'I',
    title: 'Pendaftaran',
    desc: 'Isi formulir pendaftaran daring. Nomor peserta diterbitkan otomatis.',
  },
  {
    roman: 'II',
    title: 'Verifikasi',
    desc: 'Panitia memverifikasi data. Status peserta diperbarui dalam 1×24 jam.',
  },
  {
    roman: 'III',
    title: 'Ujian CBT',
    desc: '50 soal pilihan ganda seputar fotografi. Dikerjakan secara daring.',
  },
  {
    roman: 'IV',
    title: 'Sertifikat',
    desc: 'Unduh sertifikat digital resmi segera setelah ujian diselesaikan.',
  },
]

// ─── Kategori Ujian ────────────────────────────────────────────────────────────
const categories = [
  { label: 'Teknik Fotografi', icon: '◎', desc: 'Eksposur, komposisi, pencahayaan, dan optik kamera.' },
  { label: 'Estetika Visual', icon: '◈', desc: 'Prinsip desain, warna, perspektif, dan storytelling.' },
  { label: 'Sejarah Fotografi', icon: '◉', desc: 'Pelopor fotografi, gerakan seni, dan ikonografi.' },
  { label: 'Pengetahuan Umum', icon: '◆', desc: 'Regulasi, standar industri, dan perkembangan terkini.' },
]

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default async function HomePage() {
  const { config, events } = await getPageData()

  const namaLomba  = config['nama_lomba']  ?? 'International Photography Exhibition'
  const tahunAktif = config['tahun_aktif'] ?? '2025'

  return (
    <>
      <Navbar />

      <main id="main-content">

        {/* ─── HERO ──────────────────────────────────────────────────── */}
        <section className="hero" aria-label="Hero section" id="hero">
          {/* Background image */}
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

          {/* Corner flourishes on hero content */}
          <div className="container">
            <div className="hero__content ornate-frame ornate-frame--lg">

              {/* Year badge */}
              <div className="hero__year-badge" aria-hidden="true">
                <span className="label">{tahunAktif}</span>
              </div>

              {/* Volume label */}
              <p className="label" style={{ marginBottom: '0.75rem' }}>
                Volume I — {namaLomba}
              </p>

              {/* Title */}
              <h1 className="hero__title">
                International<br />
                <em>Photography</em><br />
                Exhibition
              </h1>

              {/* Subtitle */}
              <p className="hero__subtitle">
                Platform ujian daring resmi. Daftarkan diri Anda, ikuti
                50 soal pilihan ganda, dan terima sertifikat digital
                berkelas internasional.
              </p>

              {/* CTA */}
              <div className="hero__actions">
                <Link href="/daftar" className="btn btn--primary" id="hero-daftar-btn">
                  Daftar Sekarang
                </Link>
                <Link href="/login" className="btn btn--secondary" id="hero-login-btn">
                  Login Peserta
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="hero__scroll-hint" aria-hidden="true">
            Gulir
          </div>
        </section>

        {/* ─── STATS BAR ─────────────────────────────────────────────── */}
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

        {/* ─── TENTANG ───────────────────────────────────────────────── */}
        <section className="section" id="tentang" aria-labelledby="tentang-heading">
          <div className="container">
            <div className="about-grid">

              {/* Image */}
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

              {/* Text */}
              <div>
                <p className="label" style={{ marginBottom: '1rem' }}>Volume I — Tentang</p>
                <div className="ornate-divider" aria-hidden="true" style={{ marginTop: 0, width: '8rem', background: 'linear-gradient(90deg, var(--brass), transparent)' }} />

                <h2 id="tentang-heading" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                  Merayakan Seni<br />
                  <span style={{ fontStyle: 'italic', color: 'var(--muted-fg)' }}>di Balik Lensa</span>
                </h2>

                <div style={{ color: 'var(--muted-fg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <p className="drop-cap">
                    International Photography Exhibition adalah ajang bergengsi yang
                    mengangkat karya fotografi sebagai medium seni dan ilmu pengetahuan.
                    Melalui platform CBT daring ini, setiap peserta diuji pemahamannya
                    terhadap teknik, estetika, dan sejarah fotografi secara komprehensif.
                  </p>
                  <p>
                    Program ini terbuka untuk peserta dari seluruh kalangan — pelajar,
                    mahasiswa, dan fotografer profesional — dengan tiga kategori penilaian
                    yang terstandarisasi secara internasional.
                  </p>
                  <p>
                    Setiap peserta yang menyelesaikan ujian akan menerima sertifikat digital
                    resmi yang dapat diunduh langsung dari platform, mencantumkan nama,
                    nomor peserta, dan skor yang diraih.
                  </p>
                </div>

                {/* Category chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
                  {(['Umum', 'Pelajar', 'Profesional'] as const).map(cat => (
                    <span key={cat} style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      padding: '0.45rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--muted-fg)',
                    }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── KATEGORI SOAL ─────────────────────────────────────────── */}
        <section className="section section--alt" aria-labelledby="kategori-heading">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>Volume II — Materi Ujian</p>
              <h2 id="kategori-heading">Empat Bidang Pengetahuan</h2>
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

        {/* ─── ALUR LOMBA ────────────────────────────────────────────── */}
        <section className="section" id="alur" aria-labelledby="alur-heading">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>Volume III — Alur Lomba</p>
              <h2 id="alur-heading">Empat Langkah Mudah</h2>
              <p style={{ color: 'var(--muted-fg)', marginTop: '1rem', maxWidth: '32rem', marginInline: 'auto' }}>
                Dari pendaftaran hingga sertifikat, seluruh proses berjalan
                secara daring tanpa perlu hadir secara fisik.
              </p>
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

        {/* ─── ARSIP PENYELENGGARAAN ─────────────────────────────────── */}
        {events.length > 0 && (
          <section className="section section--alt" id="arsip" aria-labelledby="arsip-heading">
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p className="label" style={{ marginBottom: '0.75rem' }}>Volume IV — Arsip</p>
                  <h2 id="arsip-heading">Penyelenggaraan<br />Sebelumnya</h2>
                </div>
                <Link href="/arsip" className="btn btn--ghost" id="lihat-semua-arsip-btn">
                  Lihat Semua →
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
                          {ev.jumlah_peserta} Peserta
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Arsip section — empty state */}
        {events.length === 0 && (
          <section className="section section--alt" id="arsip" aria-labelledby="arsip-heading">
            <div className="container" style={{ textAlign: 'center' }}>
              <p className="label" style={{ marginBottom: '0.75rem' }}>Volume IV — Arsip</p>
              <h2 id="arsip-heading" style={{ marginBottom: '1rem' }}>Penyelenggaraan Sebelumnya</h2>
              <p style={{ color: 'var(--muted-fg)' }}>
                Arsip penyelenggaraan akan tersedia setelah edisi pertama selesai.
              </p>
            </div>
          </section>
        )}

        {/* ─── CTA ───────────────────────────────────────────────────── */}
        <section className="cta-section" aria-labelledby="cta-heading">
          <div className="container container--narrow">
            <p className="label" style={{ marginBottom: '1.25rem', color: 'var(--brass)' }}>
              Volume V — Daftarkan Diri
            </p>
            <h2 id="cta-heading" style={{ color: 'var(--bg)', marginBottom: '1.25rem', fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
              Siap Membuktikan<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(232,220,212,0.7)' }}>Pengetahuan Anda?</span>
            </h2>
            <p style={{ color: 'rgba(232,220,212,0.65)', marginBottom: '2.5rem', fontSize: '1.15rem', lineHeight: 1.7 }}>
              Bergabunglah dengan para fotografer dari seluruh Indonesia.
              Pendaftaran gratis. Sertifikat langsung tersedia setelah ujian.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/daftar" className="btn btn--primary" id="cta-daftar-btn" style={{ fontSize: '0.75rem' }}>
                Daftar Sekarang
              </Link>
              <Link href="/login" className="btn" id="cta-login-btn" style={{
                background: 'transparent',
                border: '1.5px solid rgba(201,169,98,0.45)',
                color: 'var(--brass)',
                textShadow: 'none',
              }}>
                Sudah Punya Akun?
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ────────────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__grid">

            {/* Brand */}
            <div>
              <p className="footer__brand">
                IPE <span>—</span> International Photography Exhibition
              </p>
              <p className="footer__desc">
                Platform ujian daring resmi International Photography Exhibition.
                Menguji pengetahuan teknik, estetika, dan sejarah fotografi secara
                terstandarisasi.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <p className="footer__col-title">Navigasi</p>
              <ul className="footer__links" role="list">
                <li><Link href="/#tentang" className="footer__link">Tentang</Link></li>
                <li><Link href="/#alur" className="footer__link">Alur Lomba</Link></li>
                <li><Link href="/#arsip" className="footer__link">Arsip</Link></li>
              </ul>
            </div>

            {/* Peserta links */}
            <div>
              <p className="footer__col-title">Peserta</p>
              <ul className="footer__links" role="list">
                <li><Link href="/daftar" className="footer__link">Pendaftaran</Link></li>
                <li><Link href="/login" className="footer__link">Login</Link></li>
                <li><Link href="/admin/login" className="footer__link">Admin</Link></li>
              </ul>
            </div>

          </div>

          {/* Bottom bar */}
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
