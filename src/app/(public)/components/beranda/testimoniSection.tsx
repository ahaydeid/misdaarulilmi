import { FaQuoteLeft, FaUser } from "react-icons/fa6";

const testimonials = [
  {
    quote:
      "Alhamdulillah sejak bersekolah di Daarul Ilmi, ananda lebih tertib sholat lima waktu dan hafalan surat pendeknya berkembang pesat tanpa harus dipaksa di rumah.",
    name: "Nurhasanah",
    role: "Wali Santri Kelas II",
  },
  {
    quote:
      "Bapak dan Ibu guru sangat komunikatif dan perhatian. Pendekatan pembelajarannya seimbang antara mata pelajaran umum dan penanaman adab keagamaan.",
    name: "Ahmad Fauzi",
    role: "Wali Santri Kelas IV",
  },
  {
    quote:
      "Kegiatan kepramukaan dan pembiasaan sholat dhuha benar-benar membentuk kemandirian anak kami. Sangat bersyukur menyekolahkan ananda di madrasah ini.",
    name: "Siti Rahmawati",
    role: "Wali Santri Kelas VI",
  },
  {
    quote:
      "Bimbingan tahfidz dan tahsinnya luar biasa telaten. Bacaan Al-Qur'an anak saya menjadi jauh lebih tartil sesuai kaidah tajwid dan hafalannya lancar.",
    name: "Hendra Pratama",
    role: "Wali Santri Kelas III",
  },
  {
    quote:
      "Awalnya khawatir saat ananda masuk kelas 1, tapi lingkungan madrasah yang ramah dan guru yang sabar membuat anak kami langsung betah dan semangat belajar.",
    name: "Rina Marlina",
    role: "Wali Santri Kelas I",
  },
  {
    quote:
      "Kombinasi sains dan kurikulum keislamannya sangat proporsional. Santri diajarkan berpikir kritis tanpa melupakan pondasi akhlakul karimah sehari-hari.",
    name: "Budi Santoso",
    role: "Wali Santri Kelas V",
  },
];

export default function TestimoniSection() {
  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <style>{`
        @keyframes marquee-slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-slide 50s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Apa Kata Wali Murid
        </h2>
      </div>

      {/* Marquee Track Container with subtle fade edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent" />

        {/* Sliding Cards */}
        <div className="marquee-track flex gap-6 pr-6">
          {[...testimonials, ...testimonials].map((testi, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] shrink-0 flex flex-col justify-between rounded-2xl bg-zinc-100 p-7 dark:bg-zinc-800/80"
            >
              <div>
                <FaQuoteLeft className="h-6 w-6 text-emerald-700" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-zinc-200/80 pt-4 dark:border-zinc-700">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-500 text-white dark:bg-slate-600"
                  aria-hidden="true"
                >
                  <FaUser className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">
                    {testi.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {testi.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
