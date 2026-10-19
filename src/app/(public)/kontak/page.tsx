import type { Metadata } from "next";
import { FaLocationDot, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Informasi alamat, nomor telepon, WhatsApp, dan layanan komunikasi resmi MIS Daarul Ilmi Balaraja.",
};

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Hubungi Kami
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Kami siap melayani pertanyaan seputar pendaftaran murid baru, kegiatan madrasah, dan informasi akademik.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Info Kontak */}
        <div className="space-y-6 rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Informasi Kontak Resmi
          </h2>

          <div className="space-y-5 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-start gap-3.5">
              <FaLocationDot className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-500" />
              <div>
                <strong className="block text-zinc-900 dark:text-zinc-100">Alamat Madrasah</strong>
                <span>Jl. Raya Kresek Kp. Jati Baru Ds. Tobat RT. 05/04 Kec. Balaraja Kab. Tangerang, Banten</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <FaEnvelope className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-500" />
              <div>
                <strong className="block text-zinc-900 dark:text-zinc-100">Email Resmi</strong>
                <span>midaarulilmi5@gmail.com</span>
              </div>
            </div>

            <div className="pt-2">
              <strong className="mb-3 block text-zinc-900 dark:text-zinc-100">
                Contact Person & WhatsApp Resmi
              </strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/6281287931380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Ibu Wanti</div>
                    <div className="text-zinc-500 dark:text-zinc-400">0812-8793-1380</div>
                  </div>
                  <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                </a>

                <a
                  href="https://wa.me/6285694605981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Ibu Silvi</div>
                    <div className="text-zinc-500 dark:text-zinc-400">0856-9460-5981</div>
                  </div>
                  <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                </a>

                <a
                  href="https://wa.me/6285319307900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Ibu Yati</div>
                    <div className="text-zinc-500 dark:text-zinc-400">0853-1930-7900</div>
                  </div>
                  <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                </a>

                <a
                  href="https://wa.me/6281311507042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-xs transition hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
                >
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Ibu Rum</div>
                    <div className="text-zinc-500 dark:text-zinc-400">0813-1150-7042</div>
                  </div>
                  <FaWhatsapp className="h-4 w-4 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Jam Operasional & Layanan */}
        <div className="flex flex-col justify-between rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Waktu Pelayanan Administrasi
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                <span>Senin</span>
                <span className="text-emerald-700 font-medium dark:text-white">06.30 - 14.00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                <span>Selasa - Kamis</span>
                <span className="text-emerald-700 font-medium dark:text-white">06.30 - 15.00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                <span>Jumat</span>
                <span className="text-emerald-700 font-medium dark:text-white">06.30 - 15.00 WIB</span>
              </li>
              <li className="flex justify-between border-b border-zinc-100 pb-2 dark:border-zinc-800">
                <span>Sabtu</span>
                <span className="text-emerald-700 font-medium dark:text-white">06.30 - 12.00 WIB</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Ahad & Hari Libur Nasional</span>
                <span className="text-rose-600 font-medium dark:text-rose-400">Libur</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <a
              href="https://wa.me/6281287931380"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
            >
              <FaWhatsapp className="h-5 w-5" />
              Kirim Pesan WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Section Peta Lokasi */}
      <div className="mt-12 overflow-hidden rounded-2xl bg-zinc-50 p-6 md:p-8 dark:bg-zinc-900">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Lokasi Madrasah
          </h2>
        </div>

        <div className="relative aspect-16/9 w-full min-h-[380px] md:min-h-[460px] overflow-hidden rounded-lg border border-zinc-200/60 dark:border-zinc-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61647.478496209!2d106.37827174284195!3d-6.185081500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42019cda009c95%3A0x54c06874d958ab10!2sMIS%20DAARUL%20ILMI%20BALARAJA!5e1!3m2!1sid!2sid!4v1792173162341!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
            title="Lokasi MIS DAARUL ILMI BALARAJA"
          />
        </div>
      </div>
    </div>
  );
}
