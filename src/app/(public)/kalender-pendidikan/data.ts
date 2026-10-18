export type EventCategory = "Akademik" | "Kegiatan" | "Hari Libur";

export interface CalendarEventItem {
  id: string;
  title: string;
  category: EventCategory;
  startDate: string; // Format: YYYY-MM-DD
  endDate?: string;   // Format: YYYY-MM-DD
  description?: string;
}

export const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const calendarEventsData: CalendarEventItem[] = [
  {
    id: "cal-1",
    title: "Masa Pengenalan Lingkungan Madrasah (MPLM)",
    category: "Kegiatan",
    startDate: "2026-07-13",
    endDate: "2026-07-15",
    description: "Orientasi pengenalan madrasah bagi seluruh santri baru.",
  },
  {
    id: "cal-2",
    title: "Awal Masuk KBM Semester Ganjil",
    category: "Akademik",
    startDate: "2026-07-16",
    description: "Awal pelaksanaan proses belajar mengajar tatap muka.",
  },
  {
    id: "cal-3",
    title: "HUT Kemerdekaan RI Ke-81",
    category: "Hari Libur",
    startDate: "2026-08-17",
    description: "Hari libur nasional peringatan proklamasi kemerdekaan.",
  },
  {
    id: "cal-4",
    title: "Penilaian Tengah Semester (PTS) Ganjil",
    category: "Akademik",
    startDate: "2026-09-21",
    endDate: "2026-09-26",
    description: "Ujian evaluasi kompetensi belajar tengah semester ganjil.",
  },
  {
    id: "cal-5",
    title: "Pembagian Rapor PTS Ganjil",
    category: "Akademik",
    startDate: "2026-10-10",
    description: "Penyerahan laporan kemajuan belajar santri kepada wali santri.",
  },
  {
    id: "cal-6",
    title: "Peringatan Hari Santri Nasional",
    category: "Kegiatan",
    startDate: "2026-10-22",
    description: "Upacara bendera, tabligh akbar, dan perlombaan keagamaan santri.",
  },
  {
    id: "cal-7",
    title: "Penilaian Akhir Semester (PAS) Ganjil",
    category: "Akademik",
    startDate: "2026-12-07",
    endDate: "2026-12-12",
    description: "Evaluasi akhir semester ganjil tahun ajaran 2026/2027.",
  },
  {
    id: "cal-8",
    title: "Pembagian Rapor Semester Ganjil",
    category: "Akademik",
    startDate: "2026-12-19",
    description: "Penyerahan buku rapor hasil evaluasi akhir semester ganjil.",
  },
  {
    id: "cal-9",
    title: "Hari Raya Natal & Cuti Bersama",
    category: "Hari Libur",
    startDate: "2026-12-25",
    endDate: "2026-12-26",
    description: "Hari libur keagamaan nasional.",
  },
  {
    id: "cal-10",
    title: "Tahun Baru Masehi 2027",
    category: "Hari Libur",
    startDate: "2027-01-01",
    description: "Hari libur nasional tahun baru masehi.",
  },
  {
    id: "cal-11",
    title: "Awal Masuk KBM Semester Genap",
    category: "Akademik",
    startDate: "2027-01-04",
    description: "Awal pelaksanaan pembelajaran semester genap tahun ajaran 2026/2027.",
  },
];
