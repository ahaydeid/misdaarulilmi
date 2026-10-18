export interface Announcement {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  author?: string;
  isActive?: boolean;
  htmlContent?: string;
  content: {
    paragraphs: string[];
    points?: string[];
    closing?: string;
  };
}

export const announcements: Announcement[] = [
  {
    slug: "edaran-pelaksanaan-penilaian-tengah-semester-pts",
    title: "Edaran Pelaksanaan Penilaian Tengah Semester (PTS)",
    date: "15 Oktober 2026",
    tag: "Akademik",
    author: "Kurikulum & Akademik",
    excerpt:
      "Diberitahukan kepada seluruh wali santri bahwa pelaksanaan PTS Semester Ganjil akan dimulai pekan depan. Diharapkan santri mempersiapkan diri dengan baik.",
    content: {
      paragraphs: [
        "Assalamu’alaikum Warahmatullahi Wabarakatuh.",
        "Puji syukur ke hadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya. Sholawat serta salam semoga senantiasa tercurah kepada junjungan kita Nabi Muhammad SAW, beserta keluarga, sahabat, dan pengikutnya hingga akhir zaman.",
        "Sehubungan dengan agenda kalender akademik MIS Daarul Ilmi Balaraja Tahun Ajaran 2026/2027, kami menginformasikan kepada seluruh Bapak/Ibu Wali Santri bahwa Penilaian Tengah Semester (PTS) Ganjil akan segera diselenggarakan. Kegiatan evaluasi ini bertujuan untuk mengukur capaian kompetensi belajar santri selama setengah semester berjalan.",
      ],
      points: [
        "Pelaksanaan PTS Ganjil dijadwalkan pada hari Senin – Sabtu, 20 – 25 Oktober 2026.",
        "Santri diharapkan hadir tepat waktu di madrasah paling lambat pukul 07.00 WIB untuk mengikuti pembiasaan sholat dhuha berjamaah.",
        "Seluruh santri diwajibkan mengenakan seragam rapi dan lengkap sesuai jadwal harian madrasah.",
        "Materi evaluasi mencakup seluruh mata pelajaran umum dan muatan lokal keagamaan yang telah diajarkan.",
        "Bagi santri yang berhalangan hadir karena sakit, dimohon orang tua/wali santri segera menyampaikan surat keterangan dokter kepada wali kelas masing-masing.",
      ],
      closing:
        "Demikian surat pemberitahuan ini kami sampaikan. Atas perhatian, dukungan, dan kerja sama Bapak/Ibu Wali Santri dalam membimbing ananda belajar di rumah, kami haturkan terima kasih. Wassalamu’alaikum Warahmatullahi Wabarakatuh.",
    },
  },
  {
    slug: "pendaftaran-ekstrakurikuler-wajib-dan-pilihan-santri",
    title: "Pendaftaran Ekstrakurikuler Wajib & Pilihan Santri",
    date: "08 Oktober 2026",
    tag: "Kesiswaan",
    author: "Kesiswaan & Ekstrakurikuler",
    excerpt:
      "Formulir pemilihan ekstrakurikuler seperti Pramuka, Tahfidz intensif, dan Rebana dapat diserahkan ke wali kelas masing-masing.",
    content: {
      paragraphs: [
        "Assalamu’alaikum Warahmatullahi Wabarakatuh.",
        "Dalam rangka mengembangkan bakat, minat, kedisiplinan, serta keterampilan para santri, MIS Daarul Ilmi Balaraja membuka pendaftaran kegiatan ekstrakurikuler untuk Tahun Ajaran berjalan.",
        "Kegiatan ekstrakurikuler terbagi menjadi ekstrakurikuler wajib yang diikuti seluruh santri sesuai jenjang kelas, serta ekstrakurikuler pilihan yang dapat dipilih berdasarkan minat dan keahlian ananda.",
      ],
      points: [
        "Pramuka (Wajib bagi santri kelas III – VI, setiap hari Jumat pukul 14.00 – 16.00 WIB).",
        "Tahfidz Intensif & Tilawatil Qur'an (Pilihan, setiap hari Selasa dan Kamis).",
        "Hadrah & Seni Rebana Islami (Pilihan, setiap hari Rabu sore).",
        "Pencak Silat Tapak Suci (Pilihan, setiap hari Sabtu pagi).",
        "Klub Sains & Matematika Madrasah (Pilihan persiapan kompetensi KSM).",
      ],
      closing:
        "Formulir pendaftaran dapat diisi dan dikembalikan kepada wali kelas selambat-lambatnya hari Sabtu, 18 Oktober 2026. Mari bersama-sama kita kembangkan potensi generasi madrasah yang unggul dan berakhlakul karimah.",
    },
  },
  {
    slug: "sosialisasi-program-tabungan-qurban-santri-madrasah",
    title: "Sosialisasi Program Tabungan Qurban Santri Madrasah",
    date: "01 Oktober 2026",
    tag: "Umum",
    author: "Humas & Paguyuban",
    excerpt:
      "Madrasah membuka kesempatan tabungan qurban untuk melatih kepedulian dan keikhlasan santri sejak usia dini.",
    content: {
      paragraphs: [
        "Assalamu’alaikum Warahmatullahi Wabarakatuh.",
        "Meneladani ketaatan Nabi Ibrahim AS dan menanamkan nilai-nilai keikhlasan serta empati sosial sejak usia dini, MIS Daarul Ilmi Balaraja kembali meluncurkan Program Tabungan Qurban Santri untuk Hari Raya Idul Adha mendatang.",
        "Program ini bersifat sukarela dan bertujuan sebagai sarana edukasi keagamaan agar ananda terbiasa menyisihkan sebagian uang sakunya untuk beramal shaleh.",
      ],
      points: [
        "Penyetoran tabungan qurban dapat dilakukan setiap hari Jumat melalui wali kelas masing-masing.",
        "Nominal tabungan fleksibel tanpa batasan minimum, disesuaikan dengan keikhlasan ananda.",
        "Buku rekapitulasi tabungan qurban akan dicatat secara transparan oleh bendahara madrasah dan dapat dicek berkala oleh wali santri.",
        "Hasil tabungan akan dialokasikan untuk pengadaan hewan qurban atas nama santri pada momentum Idul Adha.",
      ],
      closing:
        "Semoga niat baik kita semua senantiasa mendapat ridho dan keberkahan dari Allah SWT. Terima kasih atas dukungan Bapak/Ibu Wali Santri sekalian.",
    },
  },
];
