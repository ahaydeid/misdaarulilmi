import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function SekilasMadrasah() {
  return (
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
  );
}
