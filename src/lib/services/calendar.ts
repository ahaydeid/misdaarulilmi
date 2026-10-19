export type EventCategory = "Akademik" | "Kegiatan" | "Hari Libur";

export interface CalendarEventRecord {
  id: string;
  title: string;
  category: EventCategory;
  start_date: string; // YYYY-MM-DD
  end_date?: string | null; // YYYY-MM-DD
  description?: string | null;
  created_at?: string;
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
