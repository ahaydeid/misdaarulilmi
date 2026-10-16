import { FaBookOpen, FaHandsPraying, FaCampground } from "react-icons/fa6";

const featuredPrograms = [
  {
    title: "Tahfidz & Tahsin Al-Qur'an",
    desc: "Bimbingan tartil dan hafalan Juz 30 berstandar tajwid dengan pembinaan harian intensif yang menyenangkan bagi santri.",
    icon: FaBookOpen,
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "Pembiasaan Ibadah Harian",
    desc: "Pembiasaan sholat dhuha berjamaah setiap pagi, doa harian, dan sholat dzuhur terpimpin untuk memperkuat akhlak santri.",
    icon: FaHandsPraying,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Kepramukaan & Kemandirian",
    desc: "Kegiatan kepanduan terarah yang melatih kepemimpinan, kedisiplinan, kepedulian sosial, dan kerja sama tim santri.",
    icon: FaCampground,
    iconColor: "text-sky-600 dark:text-sky-400",
  },
];

export default function ProgramUnggulan() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Program Unggulan
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12 lg:gap-16">
        {featuredPrograms.map((prog, idx) => {
          const Icon = prog.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <Icon className={`h-14 w-14 sm:h-16 sm:w-16 ${prog.iconColor}`} />

              <h3 className="mt-8 text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                {prog.title}
              </h3>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xs">
                {prog.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
