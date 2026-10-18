import Link from "next/link";
import { FaArrowRight, FaCalendarDays } from "react-icons/fa6";
import { announcements } from "../../pengumuman/data";

export default function PengumumanTerbaru() {
  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <section className="w-full bg-white py-20 sm:py-28 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Pengumuman Terbaru
            </h2>
          </div>
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 transition hover:text-emerald-800 hover:underline active:scale-95 shrink-0 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <span>Lihat Semua</span>
            <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {latestAnnouncements.map((item) => (
            <Link
              key={item.slug}
              href={`/pengumuman/${item.slug}`}
              className="group flex flex-col justify-between bg-gray-50 p-5 rounded-lg"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarDays className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 line-clamp-3 dark:text-zinc-400">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-normal text-emerald-700 transition-colors group-hover:text-emerald-800 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                <span>Baca Selengkapnya</span>
                <FaArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
