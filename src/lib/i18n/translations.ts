export type Locale = 'en' | 'id' | 'ms'

export const translations = {
  en: {
    // Navbar
    nav_about: 'About',
    nav_flow: 'Competition Flow',
    nav_archive: 'Archive',
    nav_login: 'Participant Login',
    nav_register: 'Register',

    // Landing Hero
    hero_badge: 'International Competition',
    hero_title_line1: 'International',
    hero_title_line2: 'Photography',
    hero_title_line3: 'Exhibition',
    hero_subtitle: 'An international-standard photographic art competition. Discover, compete, and be recognized on the world stage.',
    hero_cta_register: 'Register Now',
    hero_cta_learn: 'Learn More',

    // Landing Sections
    about_label: 'About the Competition',
    about_title: 'A Global Photography Stage',
    about_desc: 'International Photography Exhibition is a prestigious annual photography competition that brings together photographers from various countries, competing in photographic theory and technique through a Computer-Based Testing (CBT) examination system.',
    about_stat1: 'Countries',
    about_stat2: 'Participants',
    about_stat3: 'Editions',

    flow_label: 'Participation Flow',
    flow_title: 'Four Steps to Becoming a Champion',
    step1_title: 'Registration',
    step1_desc: 'Fill out the online registration form. Participant number is automatically issued.',
    step2_title: 'Verification',
    step2_desc: 'Committee verifies data. Participant status updated within 1×24 hours.',
    step3_title: 'CBT Exam',
    step3_desc: '50 multiple-choice questions on photography. Completed online.',
    step4_title: 'Certificate',
    step4_desc: 'Download your official digital certificate immediately after completing the exam.',

    archive_label: 'Past Editions',
    archive_title: 'History of Excellence',
    archive_view_all: 'View All Archive',
    archive_participants: 'Participants',

    footer_tagline: 'International Photography Exhibition — Celebrating photographic excellence across borders.',
    footer_quick_links: 'Quick Links',
    footer_participant: 'Participant',
    footer_admin: 'Admin',

    // Registration Page
    reg_title: 'Participant Registration',
    reg_subtitle: 'Fill in your data to get a participant number.',
    reg_name: 'Full Name',
    reg_name_placeholder: 'As in passport',
    reg_passport: 'Passport Number',
    reg_passport_placeholder: 'e.g. A1234567',
    reg_submit: 'Register',
    reg_loading: 'Processing...',
    reg_success_title: 'Registration Successful!',
    reg_success_desc: 'Your participant number has been issued:',
    reg_success_note: 'Please save this number. Use it along with the universal password to log in.',
    reg_success_login: 'Proceed to Login',
    reg_already: 'Already registered?',
    reg_login_here: 'Login here',

    // Login Page
    login_title: 'Participant Login',
    login_subtitle: 'Enter your participant number and universal password.',
    login_number: 'Participant Number',
    login_number_placeholder: 'e.g. IPE-2025-0001',
    login_password: 'Password',
    login_password_placeholder: 'Universal password',
    login_submit: 'Login',
    login_loading: 'Verifying...',
    login_no_account: "Don't have an account?",
    login_register_here: 'Register here',

    // Peserta Dashboard
    dashboard_welcome: 'Welcome back',
    dashboard_number: 'Participant Number',
    dashboard_score: 'Score',
    dashboard_status: 'Status',
    dashboard_passed: 'PASSED',
    dashboard_failed: 'NOT PASSED',
    dashboard_exam_start: 'Start Exam',
    dashboard_exam_continue: 'Continue Exam',
    dashboard_exam_done: 'Exam Completed',
    dashboard_certificate: 'Download Certificate',
    dashboard_logout: 'Logout',

    // Exam Page
    exam_title: 'CBT Exam',
    exam_time_left: 'Time Remaining',
    exam_question: 'Question',
    exam_of: 'of',
    exam_submit: 'Submit Exam',
    exam_confirm_submit: 'Are you sure you want to submit? Unanswered questions will be left blank.',
    exam_saving: 'Saving...',
    exam_answered: 'Answered',
    exam_unanswered: 'Unanswered',

    // Sertifikat
    cert_title: 'Participant Certificate',
    cert_download: 'Download Certificate (PDF)',
    cert_generating: 'Preparing PDF...',
    cert_achievement: 'CERTIFICATE OF ACHIEVEMENT',
    cert_excellence: 'CERTIFICATE OF EXCELLENCE',
    cert_desc_standard: 'Has successfully completed the competency exam with score',
    cert_desc_passed: 'and is declared',
    cert_desc_winner: 'Awarded the recognition of',
    cert_desc_winner2: 'for outstanding achievement in the international competition.',
    cert_number: 'PARTICIPANT NUMBER',
    cert_issued: 'ISSUED',
    cert_chairman: 'CHAIRMAN OF COMMITTEE',

    // Arsip Page
    archive_page_title: 'Hall of Fame',
    archive_page_subtitle: 'Tracing the history of photographic excellence through editions of the International Photography Exhibition.',

    // General
    loading: 'Loading...',
    close: 'Close',
    download: 'Download',
    view: 'View',
  },

  id: {
    // Navbar
    nav_about: 'Tentang',
    nav_flow: 'Alur Lomba',
    nav_archive: 'Arsip',
    nav_login: 'Login Peserta',
    nav_register: 'Daftar',

    // Landing Hero
    hero_badge: 'Kompetisi Internasional',
    hero_title_line1: 'International',
    hero_title_line2: 'Photography',
    hero_title_line3: 'Exhibition',
    hero_subtitle: 'Kompetisi seni fotografi berstandar internasional. Temukan, bersaing, dan diakui di panggung dunia.',
    hero_cta_register: 'Daftar Sekarang',
    hero_cta_learn: 'Pelajari Lebih Lanjut',

    // Landing Sections
    about_label: 'Tentang Kompetisi',
    about_title: 'Panggung Fotografi Global',
    about_desc: 'International Photography Exhibition adalah kompetisi fotografi tahunan bergengsi yang mempertemukan para fotografer dari berbagai negara, bersaing dalam teori dan teknik fotografi melalui sistem ujian Computer-Based Testing (CBT).',
    about_stat1: 'Negara',
    about_stat2: 'Peserta',
    about_stat3: 'Edisi',

    flow_label: 'Alur Keikutsertaan',
    flow_title: 'Empat Langkah Menuju Juara',
    step1_title: 'Pendaftaran',
    step1_desc: 'Isi formulir pendaftaran daring. Nomor peserta diterbitkan otomatis.',
    step2_title: 'Verifikasi',
    step2_desc: 'Panitia memverifikasi data. Status peserta diperbarui dalam 1×24 jam.',
    step3_title: 'Ujian CBT',
    step3_desc: '50 soal pilihan ganda seputar fotografi. Dikerjakan secara daring.',
    step4_title: 'Sertifikat',
    step4_desc: 'Unduh sertifikat digital resmi segera setelah ujian diselesaikan.',

    archive_label: 'Edisi Sebelumnya',
    archive_title: 'Sejarah Keunggulan',
    archive_view_all: 'Lihat Seluruh Arsip',
    archive_participants: 'Peserta',

    footer_tagline: 'International Photography Exhibition — Merayakan keunggulan fotografi lintas batas.',
    footer_quick_links: 'Tautan Cepat',
    footer_participant: 'Peserta',
    footer_admin: 'Admin',

    // Registration Page
    reg_title: 'Pendaftaran Peserta',
    reg_subtitle: 'Isi data Anda untuk mendapatkan nomor peserta.',
    reg_name: 'Nama Lengkap',
    reg_name_placeholder: 'Sesuai paspor',
    reg_passport: 'Nomor Paspor',
    reg_passport_placeholder: 'contoh: A1234567',
    reg_submit: 'Daftar',
    reg_loading: 'Memproses...',
    reg_success_title: 'Pendaftaran Berhasil!',
    reg_success_desc: 'Nomor peserta Anda telah diterbitkan:',
    reg_success_note: 'Simpan nomor ini. Gunakan bersama kata sandi universal untuk masuk.',
    reg_success_login: 'Lanjut ke Login',
    reg_already: 'Sudah terdaftar?',
    reg_login_here: 'Login di sini',

    // Login Page
    login_title: 'Login Peserta',
    login_subtitle: 'Masukkan nomor peserta dan kata sandi universal Anda.',
    login_number: 'Nomor Peserta',
    login_number_placeholder: 'contoh: IPE-2025-0001',
    login_password: 'Kata Sandi',
    login_password_placeholder: 'Kata sandi universal',
    login_submit: 'Masuk',
    login_loading: 'Memverifikasi...',
    login_no_account: 'Belum punya akun?',
    login_register_here: 'Daftar di sini',

    // Peserta Dashboard
    dashboard_welcome: 'Selamat datang kembali',
    dashboard_number: 'Nomor Peserta',
    dashboard_score: 'Skor',
    dashboard_status: 'Status',
    dashboard_passed: 'LULUS',
    dashboard_failed: 'TIDAK LULUS',
    dashboard_exam_start: 'Mulai Ujian',
    dashboard_exam_continue: 'Lanjutkan Ujian',
    dashboard_exam_done: 'Ujian Selesai',
    dashboard_certificate: 'Unduh Sertifikat',
    dashboard_logout: 'Keluar',

    // Exam Page
    exam_title: 'Ujian CBT',
    exam_time_left: 'Sisa Waktu',
    exam_question: 'Soal',
    exam_of: 'dari',
    exam_submit: 'Kumpulkan Ujian',
    exam_confirm_submit: 'Yakin ingin mengumpulkan? Soal yang belum dijawab akan dikosongkan.',
    exam_saving: 'Menyimpan...',
    exam_answered: 'Dijawab',
    exam_unanswered: 'Belum Dijawab',

    // Sertifikat
    cert_title: 'Sertifikat Peserta',
    cert_download: 'Unduh Sertifikat (PDF)',
    cert_generating: 'Menyiapkan PDF...',
    cert_achievement: 'CERTIFICATE OF ACHIEVEMENT',
    cert_excellence: 'CERTIFICATE OF EXCELLENCE',
    cert_desc_standard: 'Telah berhasil menyelesaikan ujian kompetensi dengan skor',
    cert_desc_passed: 'dan dinyatakan',
    cert_desc_winner: 'Dianugerahi penghargaan',
    cert_desc_winner2: 'atas prestasi luar biasa pada kompetisi tingkat internasional.',
    cert_number: 'NOMOR PESERTA',
    cert_issued: 'DITERBITKAN',
    cert_chairman: 'KETUA PENYELENGGARA',

    // Arsip Page
    archive_page_title: 'Hall of Fame',
    archive_page_subtitle: 'Menelusuri sejarah keunggulan fotografi melalui edisi-edisi International Photography Exhibition.',

    // General
    loading: 'Memuat...',
    close: 'Tutup',
    download: 'Unduh',
    view: 'Lihat',
  },

  ms: {
    // Navbar
    nav_about: 'Tentang',
    nav_flow: 'Aliran Pertandingan',
    nav_archive: 'Arkib',
    nav_login: 'Log Masuk Peserta',
    nav_register: 'Daftar',

    // Landing Hero
    hero_badge: 'Pertandingan Antarabangsa',
    hero_title_line1: 'International',
    hero_title_line2: 'Photography',
    hero_title_line3: 'Exhibition',
    hero_subtitle: 'Pertandingan seni fotografi bertaraf antarabangsa. Temui, bersaing, dan diiktiraf di pentas dunia.',
    hero_cta_register: 'Daftar Sekarang',
    hero_cta_learn: 'Ketahui Lebih Lanjut',

    // Landing Sections
    about_label: 'Tentang Pertandingan',
    about_title: 'Pentas Fotografi Global',
    about_desc: 'International Photography Exhibition ialah pertandingan fotografi tahunan berprestij yang mempertemukan para fotografer dari pelbagai negara, bersaing dalam teori dan teknik fotografi melalui sistem peperiksaan Computer-Based Testing (CBT).',
    about_stat1: 'Negara',
    about_stat2: 'Peserta',
    about_stat3: 'Edisi',

    flow_label: 'Aliran Penyertaan',
    flow_title: 'Empat Langkah Menjadi Juara',
    step1_title: 'Pendaftaran',
    step1_desc: 'Isi borang pendaftaran dalam talian. Nombor peserta diterbitkan secara automatik.',
    step2_title: 'Pengesahan',
    step2_desc: 'Jawatankuasa mengesahkan data. Status peserta dikemas kini dalam masa 1×24 jam.',
    step3_title: 'Peperiksaan CBT',
    step3_desc: '50 soalan aneka pilihan tentang fotografi. Dilaksanakan secara dalam talian.',
    step4_title: 'Sijil',
    step4_desc: 'Muat turun sijil digital rasmi selepas peperiksaan selesai.',

    archive_label: 'Edisi Lepas',
    archive_title: 'Sejarah Kecemerlangan',
    archive_view_all: 'Lihat Semua Arkib',
    archive_participants: 'Peserta',

    footer_tagline: 'International Photography Exhibition — Meraikan kecemerlangan fotografi merentasi sempadan.',
    footer_quick_links: 'Pautan Pantas',
    footer_participant: 'Peserta',
    footer_admin: 'Pentadbir',

    // Registration Page
    reg_title: 'Pendaftaran Peserta',
    reg_subtitle: 'Isi data anda untuk mendapatkan nombor peserta.',
    reg_name: 'Nama Penuh',
    reg_name_placeholder: 'Seperti dalam pasport',
    reg_passport: 'Nombor Pasport',
    reg_passport_placeholder: 'cth: A1234567',
    reg_submit: 'Daftar',
    reg_loading: 'Memproses...',
    reg_success_title: 'Pendaftaran Berjaya!',
    reg_success_desc: 'Nombor peserta anda telah diterbitkan:',
    reg_success_note: 'Simpan nombor ini. Gunakan bersama kata laluan universal untuk log masuk.',
    reg_success_login: 'Teruskan ke Log Masuk',
    reg_already: 'Sudah berdaftar?',
    reg_login_here: 'Log masuk di sini',

    // Login Page
    login_title: 'Log Masuk Peserta',
    login_subtitle: 'Masukkan nombor peserta dan kata laluan universal anda.',
    login_number: 'Nombor Peserta',
    login_number_placeholder: 'cth: IPE-2025-0001',
    login_password: 'Kata Laluan',
    login_password_placeholder: 'Kata laluan universal',
    login_submit: 'Log Masuk',
    login_loading: 'Mengesahkan...',
    login_no_account: 'Belum ada akaun?',
    login_register_here: 'Daftar di sini',

    // Peserta Dashboard
    dashboard_welcome: 'Selamat kembali',
    dashboard_number: 'Nombor Peserta',
    dashboard_score: 'Markah',
    dashboard_status: 'Status',
    dashboard_passed: 'LULUS',
    dashboard_failed: 'TIDAK LULUS',
    dashboard_exam_start: 'Mula Peperiksaan',
    dashboard_exam_continue: 'Teruskan Peperiksaan',
    dashboard_exam_done: 'Peperiksaan Selesai',
    dashboard_certificate: 'Muat Turun Sijil',
    dashboard_logout: 'Log Keluar',

    // Exam Page
    exam_title: 'Peperiksaan CBT',
    exam_time_left: 'Masa Berbaki',
    exam_question: 'Soalan',
    exam_of: 'daripada',
    exam_submit: 'Hantar Peperiksaan',
    exam_confirm_submit: 'Pasti ingin menghantar? Soalan yang belum dijawab akan dikosongkan.',
    exam_saving: 'Menyimpan...',
    exam_answered: 'Dijawab',
    exam_unanswered: 'Belum Dijawab',

    // Sertifikat
    cert_title: 'Sijil Peserta',
    cert_download: 'Muat Turun Sijil (PDF)',
    cert_generating: 'Menyediakan PDF...',
    cert_achievement: 'CERTIFICATE OF ACHIEVEMENT',
    cert_excellence: 'CERTIFICATE OF EXCELLENCE',
    cert_desc_standard: 'Telah berjaya menyelesaikan peperiksaan kompetensi dengan markah',
    cert_desc_passed: 'dan dinyatakan',
    cert_desc_winner: 'Dianugerahkan pengiktirafan',
    cert_desc_winner2: 'atas pencapaian luar biasa dalam pertandingan antarabangsa.',
    cert_number: 'NOMBOR PESERTA',
    cert_issued: 'DITERBITKAN',
    cert_chairman: 'PENGERUSI JAWATANKUASA',

    // Arsip Page
    archive_page_title: 'Hall of Fame',
    archive_page_subtitle: 'Menelusuri sejarah kecemerlangan fotografi melalui edisi International Photography Exhibition.',

    // General
    loading: 'Memuatkan...',
    close: 'Tutup',
    download: 'Muat Turun',
    view: 'Lihat',
  },
} as const

export type TranslationKey = keyof typeof translations.en
