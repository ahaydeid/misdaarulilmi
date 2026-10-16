import type { Metadata } from "next";
import Link from "next/link";
import { FaCalendarDays, FaTag } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Agenda & Kegiatan",
  description:
    "Informasi seputar agenda, ekstrakurikuler, dan kegiatan santri di MIS Daarul Ilmi Balaraja.",
};

const activities = [
  {
    title: "Latihan Rutin Pramuka Gugus Depan",
    category: "Ekstrakurikuler",
    date: "Setiap Jumat Sore",
    description:
      "Pelatihan ketangkasan, keterampilan simpul, pertolongan pertama, dan kedisiplinan santri madrasah.",
  },
  {
    title: "Tahfidz & Pembiasaan Shalat Dhuha",
    category: "Program Unggulan",
    date: "Setiap Pagi Sebelum KBM",
    description:
      "Muroja'ah dan setoran hafalan Al-Qur'an juz 30 dipandu oleh ustadz dan ustadzah pengampu.",
  },
  {
    title: "Kajian Parenting & Pertemuan Wali Santri",
    category: "Madrasah & Orang Tua",
    date: "Satu Kali Setiap Semester",
    description:
      "Sinergi antara dewan guru dan wali murid dalam mendampingi perkembangan akhlak dan akademik anak.",
  },
];

export default function KegiatanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Kegiatan & Program Santri
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Berbagai aktivitas kurikuler dan ekstrakurikuler untuk membentuk karakter dan mengasah potensi santri.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {activities.map((act, index) => (
          <div
            key={index}
            className="rounded-2xl bg-zinc-50 p-6 shadow-xs transition hover:bg-zinc-100/80 dark:bg-zinc-900 dark:hover:bg-zinc-800/80"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <FaTag className="h-3 w-3" />
                {act.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaCalendarDays className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                {act.date}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-bold text-zinc-900 dark:text-white">
              {act.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {act.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/galeri"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
        >
          Lihat Dokumentasi Foto Kegiatan
        </Link>
      </div>
    </div>
  );
}
