import type { Metadata } from "next";
import { FaCircleCheck, FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "PPDB Online",
  description:
    "Penerimaan Peserta Didik Baru (PPDB) MIS Daarul Ilmi Balaraja. Syarat pendaftaran, alur, dan formulir pendaftaran santri baru.",
};

const requirements = [
  "Mengisi formulir pendaftaran secara online atau langsung di sekretariat madrasah.",
  "Fotokopi Akta Kelahiran santri (3 lembar).",
  "Fotokopi Kartu Keluarga (KK) orang tua / wali (3 lembar).",
  "Fotokopi KTP kedua orang tua (masing-masing 3 lembar).",
  "Pas foto santri ukuran 3x4 (4 lembar, latar merah/biru).",
  "Ijazah / Surat Keterangan Lulus dari RA/TK/PAUD (bisa menyusul).",
];

const steps = [
  { step: "1", title: "Pendaftaran Online / Offline", desc: "Mengisi data santri dan orang tua secara lengkap." },
  { step: "2", title: "Penyerahan Berkas", desc: "Menyerahkan dokumen persyaratan ke panitia PPDB madrasah." },
  { step: "3", title: "Observasi Santri", desc: "Tes pemetaan kemampuan membaca, menulis, dan dasar membaca Iqro/Al-Qur'an." },
  { step: "4", title: "Pengumuman & Daftar Ulang", desc: "Konfirmasi penerimaan santri dan penyelesaian administrasi." },
];

export default function PPDBPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          Tahun Ajaran 2026/2027
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Penerimaan Peserta Didik Baru (PPDB)
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Bergabunglah bersama keluarga besar MIS Daarul Ilmi Balaraja. Tempat tumbuh kembangnya generasi berilmu dan berakhlakul karimah.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Persyaratan */}
        <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Syarat Pendaftaran
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Alur Pendaftaran */}
        <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Alur Penerimaan Santri
          </h2>
          <div className="mt-6 space-y-5">
            {steps.map((st) => (
              <div key={st.step} className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white text-sm shadow-xs">
                  {st.step}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">
                    {st.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hubungi Panitia PPDB */}
      <div className="mt-12 rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
        <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Butuh Bantuan Pendaftaran?
        </h2>
        <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
          Hubungi panitia PPDB MIS Daarul Ilmi melalui WhatsApp untuk informasi kuota, jadwal observasi, dan formulir.
        </p>
        <div className="mt-6">
          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
          >
            <FaWhatsapp className="h-5 w-5" />
            Hubungi Panitia PPDB (WhatsApp)
          </a>
        </div>
      </div>
    </div>
  );
}
