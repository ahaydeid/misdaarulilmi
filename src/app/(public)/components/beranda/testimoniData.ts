export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  isActive: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Nurhasanah",
    role: "Wali Santri Kelas II",
    quote:
      "Alhamdulillah sejak bersekolah di Daarul Ilmi, ananda lebih tertib sholat lima waktu dan hafalan surat pendeknya berkembang pesat tanpa harus dipaksa di rumah.",
    isActive: true,
  },
  {
    id: "testi-2",
    name: "Ahmad Fauzi",
    role: "Wali Santri Kelas IV",
    quote:
      "Bapak dan Ibu guru sangat komunikatif dan perhatian. Pendekatan pembelajarannya seimbang antara mata pelajaran umum dan penanaman adab keagamaan.",
    isActive: true,
  },
  {
    id: "testi-3",
    name: "Siti Rahmawati",
    role: "Wali Santri Kelas VI",
    quote:
      "Kegiatan kepramukaan dan pembiasaan sholat dhuha benar-benar membentuk kemandirian anak kami. Sangat bersyukur menyekolahkan ananda di madrasah ini.",
    isActive: true,
  },
  {
    id: "testi-4",
    name: "Hendra Pratama",
    role: "Wali Santri Kelas III",
    quote:
      "Bimbingan tahfidz dan tahsinnya luar biasa telaten. Bacaan Al-Qur'an anak saya menjadi jauh lebih tartil sesuai kaidah tajwid dan hafalannya lancar.",
    isActive: true,
  },
  {
    id: "testi-5",
    name: "Rina Marlina",
    role: "Wali Santri Kelas I",
    quote:
      "Awalnya khawatir saat ananda masuk kelas 1, tapi lingkungan madrasah yang ramah dan guru yang sabar membuat anak kami langsung betah dan semangat belajar.",
    isActive: true,
  },
  {
    id: "testi-6",
    name: "Ahmad Fauzi",
    role: "Wali Santri Kelas V",
    quote:
      "Kombinasi sains dan kurikulum keislamannya sangat proporsional. Santri diajarkan berpikir kritis tanpa melupakan pondasi akhlakul karimah sehari-hari.",
    isActive: true,
  },
];
