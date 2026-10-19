import type { Metadata } from "next";
import Image from "next/image";
import {
  FaSchool,
  FaHeart,
  FaHandshake,
  FaBookQuran,
  FaLanguage,
  FaHandsPraying,
  FaMosque,
  FaMicrophone,
  FaBookOpen,
  FaTrophy,
  FaScroll,
  FaCampground,
  FaHandFist,
  FaPalette,
  FaPenNib,
  FaMusic,
  FaFlag,
  FaLaptopCode,
  FaFlask,
  FaBullhorn,
  FaUsers,
  FaShieldHalved,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StaffMemberRecord } from "@/lib/services/staff";

export const instant = false;

export const metadata: Metadata = {
  title: "Profil Madrasah",
  description:
    "Profil lengkap MIS Daarul Ilmi Balaraja. Visi, misi, keunggulan madrasah, dan identitas madrasah.",
};

const missions = [
  {
    number: "01",
    desc: "Mengembangkan sistem pendidikan berlandaskan IMTAQ dan IPTEK.",
    icon: FaSchool,
  },
  {
    number: "02",
    desc: "Membentuk SDM yang Islami, Aktif, Kreatif & Inovatif.",
    icon: FaHeart,
  },
  {
    number: "03",
    desc: "Membangun kepercayaan & kemitraan dengan Masyarakat & Orang Tua.",
    icon: FaHandshake,
  },
];

const schoolStrengths = [
  {
    title: "Membentuk Karakter Religius dan Disiplin",
    icon: FaMosque,
  },
  {
    title: "Aman Untuk Anak, Tenang Bagi Orang Tua",
    icon: FaShieldHalved,
  },
  {
    title: "Pembelajaran Aktif, Kreatif dan Islami",
    icon: FaLightbulb,
  },
  {
    title: "Siap Mencetak Lulusan Unggulan",
    icon: FaGraduationCap,
  },
];

const featuredPrograms = [
  {
    title: "Tahfidz Quran ( Juz 30 )",
    icon: FaBookQuran,
  },
  {
    title: "Muhadatsah Arabic and English",
    icon: FaLanguage,
  },
  {
    title: "Shalat Dhuha",
    icon: FaHandsPraying,
  },
  {
    title: "Sholat Dzuhur Berjamaah",
    icon: FaMosque,
  },
  {
    title: "Praktik Ibadah",
    icon: FaBookOpen,
  },
  {
    title: "Pembiasaan Jumat ( Kultum )",
    icon: FaMicrophone,
  },
  {
    title: "Yasin & Tahlil",
    icon: FaScroll,
  },
  {
    title: "Doa Harian",
    icon: FaHeart,
  },
  {
    title: "Pengembangan Potensi Akademik dan Non-Akademik",
    icon: FaTrophy,
  },
  {
    title: "Ngaji Kitab Kuning",
    icon: FaBookOpen,
  },
];

const extracurriculars = [
  { name: "Pramuka", icon: FaCampground },
  { name: "KSM", icon: FaFlask },
  { name: "Pencak Silat", icon: FaHandFist },
  { name: "Karate", icon: FaHandFist },
  { name: "Angklung", icon: FaMusic },
  { name: "Melukis", icon: FaPalette },
  { name: "Seni Tari", icon: FaUsers },
  { name: "Marawis", icon: FaMusic },
  { name: "Qori", icon: FaBookQuran },
  { name: "Paskibra", icon: FaFlag },
  { name: "Tahfidz", icon: FaBookOpen },
  { name: "Khot", icon: FaPenNib },
  { name: "Komputer", icon: FaLaptopCode },
  { name: "Paduan Suara", icon: FaUsers },
  { name: "Pidato", icon: FaBullhorn },
];

const schoolIdentity = [
  { label: "Nama Satuan Pendidikan", value: "MIS Daarul Ilmi Balaraja" },
  { label: "Jenjang Pendidikan", value: "Madrasah Ibtidaiyah (MI)" },
  { label: "Status Madrasah", value: "Swasta Terakreditasi" },
  { label: "Alamat", value: "Jl. Raya Kresek Kp. Jati Baru Ds. Tobat RT. 05/04" },
  { label: "Kecamatan / Kab.", value: "Balaraja, Kabupaten Tangerang" },
  { label: "Provinsi", value: "Banten" },
  { label: "Naungan", value: "Kementerian Agama RI" },
  { label: "Kurikulum", value: "Kurikulum Merdeka & Kemenag" },
  { label: "Waktu Belajar", value: "Pagi Hari (Senin – Sabtu)" },
];

export default async function ProfilPage() {
  const supabase = await createServerSupabaseClient();
  const { data: staffMembers } = await supabase
    .from("staff_members")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: true });

  const activeStaff = (staffMembers as StaffMemberRecord[]) || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Halaman */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Profil MIS Daarul Ilmi Balaraja
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Lembaga pendidikan dasar Islam yang berkomitmen melahirkan generasi murid yang beriman, berakhlak mulia, cerdas, dan siap menghadapi tantangan zaman.
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

      {/* Section Keunggulan Madrasah (Brosur Resmi) */}
      <div className="mt-24 sm:mt-28">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Keunggulan Madrasah
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schoolStrengths.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-xl bg-white p-5 dark:bg-zinc-900"
              >
                <IconComponent className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold leading-snug text-zinc-800 dark:text-zinc-200">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Visi Madrasah (Statement Card) */}
      <div className="mt-24 rounded-xl bg-zinc-100 p-8 sm:mt-28 sm:p-12 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            <span className="text-emerald-600">Visi</span> Madrasah
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-700 sm:text-xl dark:text-zinc-200">
            &ldquo;Membentuk Generasi Muslim Yang Beriman, Bertaqwa, Mulia, Cerdas dan Terampil Serta Mandiri.&rdquo;
          </p>
        </div>
      </div>

      {/* Section Misi Madrasah (3 Butir Resmi Brosur) */}
      <div className="mt-24 sm:mt-28">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Misi Madrasah
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {missions.map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.number}
                className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white p-6 dark:bg-zinc-900"
              >
                <div className="relative z-10">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
                    {m.number}
                  </span>
                  <p className="mt-3 text-base font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
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

      {/* Section Program Unggulan MI Daarul Ilmi (Icon Grid Terbuka Tanpa Card Box) */}
      <div className="mt-24 sm:mt-28">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Program Unggulan MI Daarul Ilmi
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-5 md:gap-y-14">
          {featuredPrograms.map((prog, idx) => {
            const IconComponent = prog.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-start gap-3 text-center"
              >
                <IconComponent className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold leading-snug text-zinc-800 sm:text-sm dark:text-zinc-200">
                  {prog.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Ekstrakurikuler (List Bergaris Divider Rapat & Proporsional) */}
      <div className="mt-24 sm:mt-28">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Ekstrakurikuler
        </h2>

        <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 md:grid-cols-4">
          {extracurriculars.map((ekskul, idx) => {
            const IconComponent = ekskul.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 border-b border-zinc-200/60 py-2.5 dark:border-zinc-800"
              >
                <IconComponent className="h-4.5 w-4.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {ekskul.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section Staff Dan Tendik (Sliding 1 Baris Tanpa Card Pembungkus) */}
      <div className="mt-24 sm:mt-28">
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
          {activeStaff.length > 0 ? (
            <div className="staff-marquee-track flex gap-8 pr-8">
              {[...activeStaff, ...activeStaff].map((staff, idx) => (
                <div
                  key={`${staff.id}-${idx}`}
                  className="w-48 sm:w-56 shrink-0 flex flex-col items-center text-center"
                >
                  <Avatar
                    name={staff.name}
                    photo={staff.photo_url}
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
          ) : (
            <div className="py-8 text-center text-sm text-zinc-400">
              Belum ada data staf terdaftar.
            </div>
          )}
        </div>
      </div>

      {/* Section Identitas Satuan Pendidikan (Tabel Data Ringkas & Flat) */}
      <div className="mt-24 sm:mt-28">
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
