import type { Metadata } from "next";
import Image from "next/image";
import {
  FaSchool,
  FaHeart,
  FaTrophy,
  FaHandshake,
  FaBookQuran,
  FaMosque,
  FaCompass,
  FaFlask,
} from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";

export const metadata: Metadata = {
  title: "Profil Madrasah",
  description:
    "Profil lengkap MIS Daarul Ilmi Balaraja. Visi, misi, nilai karakter, program unggulan, dan identitas madrasah.",
};

const missions = [
  {
    number: "01",
    title: "Pendidikan Terpadu",
    desc: "Menyelenggarakan pembelajaran dasar Islam yang seimbang dan terintegrasi antara kurikulum nasional dan muatan keagamaan.",
    icon: FaSchool,
  },
  {
    number: "02",
    title: "Pembiasaan Karakter Islami",
    desc: "Membiasakan ibadah harian, sholat berjamaah, dan pengamalan akhlakul karimah dalam kehidupan sehari-hari santri.",
    icon: FaHeart,
  },
  {
    number: "03",
    title: "Pengembangan Potensi & Bakat",
    desc: "Memfasilitasi bakat, minat, kepramukaan, dan kreativitas santri melalui ragam program kokurikuler dan ekstrakurikuler terarah.",
    icon: FaTrophy,
  },
  {
    number: "04",
    title: "Kemitraan Edukatif",
    desc: "Membangun sinergi harmonis antara madrasah, orang tua wali santri, dan masyarakat dalam mencetak generasi unggul.",
    icon: FaHandshake,
  },
];

const featuredPrograms = [
  {
    title: "Tahfidz & Tahsin Al-Qur'an",
    desc: "Program hafalan Juz 30 berstandar tajwid dengan pembinaan harian intensif.",
    icon: FaBookQuran,
  },
  {
    title: "Pembiasaan Ibadah Harian",
    desc: "Sholat dhuha berjamaah setiap pagi, doa harian, dan pembiasaan sholat dzuhur terpimpin.",
    icon: FaMosque,
  },
  {
    title: "Kepramukaan & Karakter",
    desc: "Pembentukan jiwa kepemimpinan, kepanduan, gotong royong, dan kemandirian santri.",
    icon: FaCompass,
  },
  {
    title: "Sains & Literasi Madrasah",
    desc: "Penguatan literasi membaca serta eksplorasi sains praktis untuk melatih daya nalar santri.",
    icon: FaFlask,
  },
];

const schoolIdentity = [
  { label: "Nama Satuan Pendidikan", value: "MIS Daarul Ilmi Balaraja" },
  { label: "Jenjang Pendidikan", value: "Madrasah Ibtidaiyah (MI)" },
  { label: "Status Madrasah", value: "Swasta Terakreditasi" },
  { label: "Naungan", value: "Kementerian Agama RI" },
  { label: "Kurikulum", value: "Kurikulum Merdeka & Kemenag" },
  { label: "Waktu Belajar", value: "Pagi Hari (Senin – Sabtu)" },
  { label: "Kecamatan / Kab.", value: "Balaraja, Kabupaten Tangerang" },
  { label: "Provinsi", value: "Banten" },
];

import { staffMembersData as staffMembers } from "./staffData";

export default function ProfilPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Halaman */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Profil MIS Daarul Ilmi Balaraja
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lembaga pendidikan dasar Islam yang berkomitmen melahirkan generasi santri yang beriman, berakhlak mulia, cerdas, dan siap menghadapi tantangan zaman.
        </p>
      </div>

      {/* Banner Foto Utama (Flat & Lebar) */}
      <div className="mt-12 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <div className="relative aspect-16/9 md:aspect-21/9 w-full">
          <Image
            src="/img/guru.jpeg"
            alt="Dewan Guru dan Tenaga Pendidik MIS Daarul Ilmi Balaraja"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Section Visi Madrasah (Statement Card) */}
      <div className="mt-12 rounded-xl bg-zinc-100 p-8 sm:p-12 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            <span className="text-emerald-600">Visi</span> Madrasah
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-200">
            &ldquo;Membentuk Generasi Muslim Yang Beriman, Bertaqwa, Mulia, Cerdas dan Terampil Serta Mandiri.&rdquo;
          </p>
        </div>
      </div>

      {/* Section Misi Madrasah (Numbered Flat Cards dengan Siluet Icon) */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Misi Madrasah
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.number}
                className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 dark:bg-zinc-900"
              >
                <div className="relative z-10">
                  <span className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">
                    {m.number}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {m.desc}
                  </p>
                </div>

                {/* Siluet Icon Watermark */}
                <IconComponent className="pointer-events-none absolute -bottom-3 -right-3 text-7xl text-zinc-900/[0.04] dark:text-white/[0.04]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Program Unggulan (Flat Cards dengan Siluet Icon) */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Program Unggulan
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPrograms.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div
                key={prog.title}
                className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 dark:bg-zinc-900"
              >
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {prog.desc}
                  </p>
                </div>

                {/* Siluet Icon Watermark */}
                <IconComponent className="pointer-events-none absolute -bottom-3 -right-3 text-7xl text-zinc-900/[0.04] dark:text-white/[0.04]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Staff Dan Tendik (Sliding 1 Baris Tanpa Card Pembungkus) */}
      <div className="mt-16">
        <style>{`
          @keyframes staff-marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .staff-marquee-track {
            display: flex;
            width: max-content;
            animation: staff-marquee 60s linear infinite;
          }
        `}</style>

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Staff Dan Tendik
        </h2>

        <div className="relative w-full overflow-hidden py-2">
          {/* Subtle Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-gray-50/90 via-gray-50/40 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/40 dark:to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-gray-50/90 via-gray-50/40 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/40 dark:to-transparent" />

          {/* 1 Baris Sliding Items */}
          <div className="staff-marquee-track flex gap-8 pr-8">
            {[...staffMembers, ...staffMembers].map((staff, idx) => (
              <div
                key={idx}
                className="w-48 sm:w-56 shrink-0 flex flex-col items-center text-center"
              >
                <Avatar
                  name={staff.name}
                  photo={staff.photo}
                  className="!w-20 !h-20 sm:!w-24 sm:!h-24 shadow-xs"
                />
                <h3 className="mt-3 text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                  {staff.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  {staff.subject}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Identitas Satuan Pendidikan (Tabel Data Ringkas & Flat) */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Identitas Satuan Pendidikan
        </h2>

        <div className="overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <div className="grid grid-cols-1 divide-y divide-zinc-200/60 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-zinc-800">
            {/* Kolom Kiri */}
            <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
              {schoolIdentity.slice(0, 4).map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 sm:px-6 text-sm"
                >
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-white text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Kolom Kanan */}
            <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800">
              {schoolIdentity.slice(4).map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-4 sm:px-6 text-sm"
                >
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-white text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
