import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function SekilasMadrasah() {
  return (
    <section className="w-full bg-emerald-700 py-20 sm:py-28 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Sekilas Madrasah
        </h2>

        <p className="mt-3 text-lg font-medium text-emerald-100 sm:text-xl">
          &ldquo;Tempat Belajar, Beribadah, dan Berkarakter.&rdquo;
        </p>

        <p className="mt-6 text-base leading-relaxed text-emerald-50 sm:text-lg">
          Madrasah Ibtidaiyah Daarul Ilmi berdiri sejak 2012, terdaftar di Kementerian Agama (NSM 11236030271) dan Terakreditasi B. Berlokasi di Lingkungan yang aman, Nyaman dan Strategis ±100 M dari jalan raya (Jl. Raya Kresek Kp. Jati Baru Ds. Tobat, Balaraja).
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
  );
}
