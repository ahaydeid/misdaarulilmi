import type { Metadata } from "next";
import { FaCircleCheck, FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "SPMB Online",
  description:
    "Sistem Penerimaan Murid Baru (SPMB) MIS Daarul Ilmi Balaraja. Syarat pendaftaran, alur, dan formulir pendaftaran santri baru.",
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
  { step: "2", title: "Penyerahan Berkas", desc: "Menyerahkan dokumen persyaratan ke panitia SPMB madrasah." },
  { step: "3", title: "Observasi Santri", desc: "Tes pemetaan kemampuan membaca, menulis, dan dasar membaca Iqro/Al-Qur'an." },
  { step: "4", title: "Pengumuman & Daftar Ulang", desc: "Konfirmasi penerimaan santri dan penyelesaian administrasi." },
];

export default function SPMBPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block text-xs font-medium text-emerald-700 dark:text-emerald-300">
          Tahun Ajaran 2026/2027
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Sistem Penerimaan Murid Baru (SPMB)
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
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-sm shadow-xs">
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

      {/* Hubungi Panitia SPMB */}
      <div className="mt-12 rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
        <h2 className="text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Butuh Bantuan Pendaftaran?
        </h2>
        <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300">
          Hubungi panitia SPMB MIS Daarul Ilmi melalui WhatsApp untuk informasi kuota, jadwal observasi, dan formulir pendaftaran:
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <a
            href="https://wa.me/6281287931380"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white p-3.5 text-xs shadow-2xs transition hover:scale-105 hover:bg-emerald-600 hover:text-white dark:bg-zinc-900 dark:hover:bg-emerald-600"
          >
            <div className="text-left">
              <div className="font-semibold text-zinc-900 dark:text-white">Ibu Wanti</div>
              <div className="text-zinc-500 dark:text-zinc-400">0812-8793-1380</div>
            </div>
            <FaWhatsapp className="h-4 w-4 text-emerald-600" />
          </a>

          <a
            href="https://wa.me/6285694605981"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white p-3.5 text-xs shadow-2xs transition hover:scale-105 hover:bg-emerald-600 hover:text-white dark:bg-zinc-900 dark:hover:bg-emerald-600"
          >
            <div className="text-left">
              <div className="font-semibold text-zinc-900 dark:text-white">Ibu Silvi</div>
              <div className="text-zinc-500 dark:text-zinc-400">0856-9460-5981</div>
            </div>
            <FaWhatsapp className="h-4 w-4 text-emerald-600" />
          </a>

          <a
            href="https://wa.me/6285319307900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white p-3.5 text-xs shadow-2xs transition hover:scale-105 hover:bg-emerald-600 hover:text-white dark:bg-zinc-900 dark:hover:bg-emerald-600"
          >
            <div className="text-left">
              <div className="font-semibold text-zinc-900 dark:text-white">Ibu Yati</div>
              <div className="text-zinc-500 dark:text-zinc-400">0853-1930-7900</div>
            </div>
            <FaWhatsapp className="h-4 w-4 text-emerald-600" />
          </a>

          <a
            href="https://wa.me/6281311507042"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white p-3.5 text-xs shadow-2xs transition hover:scale-105 hover:bg-emerald-600 hover:text-white dark:bg-zinc-900 dark:hover:bg-emerald-600"
          >
            <div className="text-left">
              <div className="font-semibold text-zinc-900 dark:text-white">Ibu Rum</div>
              <div className="text-zinc-500 dark:text-zinc-400">0813-1150-7042</div>
            </div>
            <FaWhatsapp className="h-4 w-4 text-emerald-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
