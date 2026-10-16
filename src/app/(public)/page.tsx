import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarDays,
  FaBookOpen,
  FaHandsPraying,
  FaCampground,
  FaQuoteLeft,
  FaUser,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
import { announcements } from "./pengumuman/data";

export const metadata: Metadata = {
  title: "MIS Daarul Ilmi Balaraja - Beranda",
  description:
    "Website Resmi MIS Daarul Ilmi Balaraja. Lembaga pendidikan dasar Islam terpadu yang membina generasi Qur'ani, berkarakter, dan berprestasi.",
};

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

const socialMediaLinks = [
  { href: "https://wa.me", label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebook },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export default function HomePage() {
  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <div>
      {/* 1. Hero Section (Setinggi layar penuh / Full viewport height) */}
      <section className="relative -mt-[68px] flex min-h-screen w-full flex-col justify-center overflow-hidden pt-24 pb-12 sm:-mt-[72px] sm:pt-28 sm:pb-16">
        {/* Background Organic Blobs & Accents (Mentok ke pinggiran layar & tembus ke navbar) */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Blob Organik Kiri Atas (Bleed mentok ke tepi kiri layar dan tembus ke balik navbar) */}
          <svg
            className="absolute -top-10 -left-20 h-96 w-96 text-emerald-100 sm:h-[520px] sm:w-[520px] lg:-top-14 lg:-left-24 lg:h-[600px] lg:w-[600px] dark:text-emerald-950/60"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,73.1,41.9C64.8,54.7,53.8,65.7,40.8,72.4C27.7,79.1,12.7,81.5,-2.2,85.3C-17.1,89.1,-31.9,94.3,-45.3,89.6C-58.7,84.9,-70.7,70.3,-78.9,54.7C-87.1,39.1,-91.5,22.5,-90.7,6.2C-89.9,-10.1,-83.9,-26.1,-75.1,-39.8C-66.3,-53.5,-54.7,-64.9,-41.4,-72.6C-28.1,-80.3,-13.1,-84.3,1.3,-86.6C15.7,-88.9,30.6,-83.6,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>


          {/* Blob Organik Tengah Bawah */}
          <svg
            className="absolute -bottom-20 left-1/4 h-72 w-72 text-teal-100 sm:h-96 sm:w-96 dark:text-emerald-950/50"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M38.1,-63.9C50.2,-57.8,61.4,-49,69.5,-37.6C77.6,-26.2,82.6,-12.1,81.4,1.4C80.2,14.9,72.8,27.8,64,39.1C55.2,50.4,45,60.1,33,66.8C21,73.5,7.2,77.2,-7,78.4C-21.2,79.6,-35.8,78.3,-47.9,71.6C-60,64.9,-69.6,52.8,-76.3,39.2C-83,25.6,-86.8,10.5,-84.9,-4.1C-83,-18.7,-75.4,-32.8,-65.7,-43.8C-56,-54.8,-44.2,-62.7,-31.7,-68.5C-19.2,-74.3,-6,-78,6.8,-79.2C19.6,-80.4,26,-69.9,38.1,-63.9Z"
              transform="translate(100 100)"
            />
          </svg>

        </div>

        {/* Konten Hero tetap rapi di grid tengah max-w-7xl dan vertikal center */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Teks Hero */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl sm:leading-tight dark:text-white">
                Membina Generasi <span className="text-emerald-700 dark:text-emerald-400">Qur&apos;ani</span>, Cerdas, dan Berakhlak Mulia
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
                Lembaga pendidikan dasar Islam terpadu di Balaraja yang memadukan keunggulan kurikulum nasional dengan pembiasaan adab dan nilai-nilai Al-Qur&apos;an.
              </p>

              {/* Tombol Media Sosial (Icon saja) */}
              <div className="flex items-center gap-2 pt-1">
                {socialMediaLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-emerald-700 hover:text-white active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/profil"
                  className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 active:scale-95"
                >
                  Profil Madrasah
                </Link>
                <Link
                  href="/kontak"
                  className="rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-200/80 active:scale-95 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>

            {/* Gambar Maskot Hero (murid-hero.png) dengan Aksen Blob & Organik */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              {/* Aksen Blob Organik Belakang */}
              <div
                className="pointer-events-none absolute h-80 w-80 sm:h-[400px] sm:w-[400px] lg:h-[440px] lg:w-[440px] rounded-[48%_52%_68%_32%/42%_38%_62%_58%] bg-emerald-100 dark:bg-emerald-900/60"
                aria-hidden="true"
              />


              {/* Gambar Maskot */}
              <div className="relative aspect-square w-full max-w-lg lg:max-w-[480px]">
                <Image
                  src="/img/murid-hero.png"
                  alt="Santri MIS Daarul Ilmi Balaraja"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program Unggulan (Simple Minimalist Icons) */}
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

      {/* 3. Tentang (Sekilas Madrasah - Pure Flat Emerald-700 Centered) */}
      <section className="w-full bg-emerald-700 py-20 sm:py-28 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Sekilas Madrasah
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white sm:text-lg">
            MIS Daarul Ilmi hadir untuk mendampingi masa tumbuh kembang putra-putri Anda pada fase pendidikan dasar. Kami memadukan keunggulan kurikulum nasional dengan pembiasaan adab dan nilai-nilai Al-Qur&apos;an demi membentuk generasi yang cerdas secara intelektual serta luhur budi pekertinya.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/profil"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 active:scale-95"
            >
              <span>Pelajari Selengkapnya</span>
              <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Apa Kata Wali Murid (Pure Flat Canvas - Infinite Marquee) */}
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

      {/* 5. Pengumuman Terbaru (Solid Emerald-700 - Zero Cards) */}
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
    </div>
  );
}
