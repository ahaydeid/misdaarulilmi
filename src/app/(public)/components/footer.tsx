import Image from "next/image";
import Link from "next/link";
import { Fredoka } from "next/font/google";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-gray-50/50 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Kolom 1: Profil / Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0">
                <Image
                  src="/img/logo-bulat.png"
                  alt="Logo MIS Daarul Ilmi"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  MIS Daarul Ilmi
                </h3>
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Balaraja
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Membentuk generasi Qur&apos;ani, cerdas, berkarakter Islami, dan berprestasi berlandaskan iman dan taqwa.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-500 dark:hover:text-white"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-500 dark:hover:text-white"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-500 dark:hover:text-white"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6281287931380"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition hover:bg-emerald-600 hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-emerald-500 dark:hover:text-white"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Tautan Cepat
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Profil Madrasah
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Galeri Foto
                </Link>
              </li>
              <li>
                <Link href="/pengumuman" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Pengumuman Resmi
                </Link>
              </li>
              <li>
                <Link href="/kalender-pendidikan" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Kalender Pendidikan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan & Informasi */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Layanan
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/ppdb" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Pendaftaran Online (PPDB)
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Alamat */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Kontak Kami
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                <span>Jl. Raya Kresek Kp. Jati Baru Ds. Tobat RT. 05/04 Kec. Balaraja Kab. Tangerang, Banten</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                <span>info@misdaarulilmi.sch.id</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                <span>+62 812-8793-1380 (Ibu Wanti)</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
                <span>+62 856-9460-5981 (Ibu Silvi)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Copyright */}
        <div className="mt-12 pt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span>© {currentYear} MIS Daarul Ilmi.</span>
            <span>Dibuat oleh</span>
            <a
              href="https://edula.id"
              target="_blank"
              rel="noopener noreferrer"
              className={`${fredoka.className} font-light tracking-wide inline-flex items-center hover:opacity-80 transition`}
            >
              <span className="text-sky-700">edu</span>
              <span className="text-rose-700">la</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
