import type { Metadata } from "next";
import Link from "next/link";
import { FaCalendarDays, FaArrowRight } from "react-icons/fa6";
import { announcements } from "./data";

export const metadata: Metadata = {
  title: "Pengumuman & Berita",
  description:
    "Pemberitahuan resmi, edaran wali santri, dan berita terkini dari MIS Daarul Ilmi Balaraja.",
};

export default function PengumumanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Pengumuman & Informasi Resmi
        </h1>
      </div>

      <div className="mt-12 space-y-6">
        {announcements.map((item) => (
          <Link
            key={item.slug}
            href={`/pengumuman/${item.slug}`}
            className="block group"
          >
            <article className="rounded-lg bg-gray-100 p-6 shadow-xs transition duration-200 group-hover:bg-zinc-200/70 dark:bg-zinc-900 dark:group-hover:bg-zinc-800/80">
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5 rounded-xs bg-emerald-500 px-3 py-1 font-medium text-white dark:bg-emerald-950 dark:text-emerald-300">
                  {item.tag}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaCalendarDays className="h-3 w-3 text-slate-500 dark:text-emerald-400" />
                  {item.date}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-end gap-1.5 text-xs font-normal text-emerald-600 dark:text-emerald-400">
                <span>Baca Selengkapnya</span>
                <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
