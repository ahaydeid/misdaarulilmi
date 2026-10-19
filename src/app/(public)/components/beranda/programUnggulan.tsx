import {
  FaMosque,
  FaShieldHalved,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa6";

const schoolStrengths = [
  {
    title: "Membentuk Karakter Religius dan Disiplin",
    desc: "Penanaman nilai-nilai akhlakul karimah, pembiasaan ibadah harian, dan kedisiplinan murid sejak dini.",
    icon: FaMosque,
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Aman Untuk Anak, Tenang Bagi Orang Tua",
    desc: "Lingkungan madrasah yang aman, ramah anak, dan terpantau dengan baik sehingga menenangkan orang tua.",
    icon: FaShieldHalved,
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    title: "Pembelajaran Aktif, Kreatif dan Islami",
    desc: "Metode belajar interaktif dan inovatif yang memadukan kurikulum akademik dengan nilai-nilai Islam.",
    icon: FaLightbulb,
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Siap Mencetak Lulusan Unggulan",
    desc: "Membekali murid dengan pondasi IMTAQ dan IPTEK yang kuat agar siap berprestasi di jenjang berikutnya.",
    icon: FaGraduationCap,
    iconColor: "text-sky-600 dark:text-sky-400",
  },
];

export default function ProgramUnggulan() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Keunggulan Madrasah
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {schoolStrengths.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center"
            >
              <Icon className={`h-14 w-14 sm:h-16 sm:w-16 ${item.iconColor}`} />

              <h3 className="mt-8 text-base font-bold text-zinc-900 sm:text-lg dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xs">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
