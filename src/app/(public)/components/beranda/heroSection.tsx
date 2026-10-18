import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";

const socialMediaLinks = [
  { href: "https://wa.me", label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebook },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export default function HeroSection() {
  return (
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

      {/* Konten Hero */}
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
                className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 active:scale-95"
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

          {/* Gambar Maskot Hero (murid-hero.png) dengan Aksen Blob */}
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
  );
}
