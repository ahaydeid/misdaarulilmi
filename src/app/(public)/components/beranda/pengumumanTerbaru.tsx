import Link from "next/link";
import { FaArrowRight, FaCalendarDays } from "react-icons/fa6";
import { announcements } from "../../pengumuman/data";

export default function PengumumanTerbaru() {
  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <section className="w-full bg-emerald-700 py-20 sm:py-28 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Pengumuman Terbaru
            </h2>
          </div>
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-1.5 text-xs font-normal text-white transition hover:underline active:scale-95 shrink-0"
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
              className="group flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white">
                  <span className="inline-flex items-center gap-1.5 uppercase font-medium text-white">
                    {item.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaCalendarDays className="h-3.5 w-3.5 text-white" />
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white transition-opacity group-hover:opacity-90">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-white line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-normal text-white transition-opacity group-hover:opacity-90">
                <span>Baca Selengkapnya</span>
                <FaArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
