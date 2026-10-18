export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  youtubeId?: string;
  src: string;
  images?: string[];
  title: string;
  category: string;
  date: string;
  desc: string;
  isActive?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "galeri-1",
    type: "photo",
    src: "/img/pramuka.jpeg",
    images: ["/img/pramuka.jpeg", "/img/pramuka2.jpeg", "/img/pramuka3.jpeg"],
    title: "Kegiatan Kepramukaan",
    category: "Ekstrakurikuler",
    date: "14 Oktober 2025",
    desc: "Latihan baris-berbaris dan pembinaan kemandirian santri.",
    isActive: true,
  },
  {
    id: "galeri-2",
    type: "video",
    youtubeId: "7okSQjjabgk",
    src: "/img/pramuka2.jpeg",
    title: "Dokumentasi Perkemahan Santri MIS Daarul Ilmi",
    category: "Video Kegiatan",
    date: "10 Oktober 2025",
    desc: "Keseruan rangkaian perkemahan santri dalam membangun kekompakan, kepemimpinan, dan kemandirian.",
    isActive: true,
  },
  {
    id: "galeri-3",
    type: "photo",
    src: "/img/pramuka3.jpeg",
    images: ["/img/pramuka3.jpeg", "/img/pramuka.jpeg", "/img/pramuka2.jpeg"],
    title: "Upacara & Apel Pagi",
    category: "Kedisiplinan",
    date: "29 September 2025",
    desc: "Kedisiplinan dan pembinaan karakter setiap awal pekan.",
    isActive: true,
  },
  {
    id: "galeri-4",
    type: "video",
    youtubeId: "7okSQjjabgk",
    src: "/img/guru.jpeg",
    title: "Profil & Suasana Belajar Santri",
    category: "Video Profil",
    date: "15 September 2025",
    desc: "Mengenal lebih dekat lingkungan madrasah, dewan guru, dan pembiasaan adab Al-Qur'an terpadu.",
    isActive: true,
  },
  {
    id: "galeri-5",
    type: "photo",
    src: "/img/guru.jpeg",
    images: ["/img/guru.jpeg"],
    title: "Dewan Guru & Tenaga Kependidikan",
    category: "Civitas Akademika",
    date: "01 September 2025",
    desc: "Kebersamaan para pendidik MIS Daarul Ilmi.",
    isActive: true,
  },
];
