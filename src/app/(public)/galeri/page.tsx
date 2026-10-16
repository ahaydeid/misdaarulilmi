"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay, FaYoutube } from "react-icons/fa6";
import GaleriModal, { type GalleryItem } from "./components/galeriModal";
import VideoModal from "./components/videoModal";

const galleryItems: GalleryItem[] = [
  {
    type: "photo",
    src: "/img/pramuka.jpeg",
    images: ["/img/pramuka.jpeg", "/img/pramuka2.jpeg", "/img/pramuka3.jpeg"],
    title: "Kegiatan Kepramukaan",
    category: "Ekstrakurikuler",
    date: "14 Oktober 2025",
    desc: "Latihan baris-berbaris dan pembinaan kemandirian santri.",
  },
  {
    type: "video",
    youtubeId: "7okSQjjabgk",
    src: "/img/pramuka2.jpeg",
    title: "Dokumentasi Perkemahan Santri MIS Daarul Ilmi",
    category: "Video Kegiatan",
    date: "10 Oktober 2025",
    desc: "Keseruan rangkaian perkemahan santri dalam membangun kekompakan, kepemimpinan, dan kemandirian.",
  },
  {
    type: "photo",
    src: "/img/pramuka3.jpeg",
    images: ["/img/pramuka3.jpeg", "/img/pramuka.jpeg", "/img/pramuka2.jpeg"],
    title: "Upacara & Apel Pagi",
    category: "Kedisiplinan",
    date: "29 September 2025",
    desc: "Kedisiplinan dan pembinaan karakter setiap awal pekan.",
  },
  {
    type: "video",
    youtubeId: "7okSQjjabgk",
    src: "/img/guru.jpeg",
    title: "Profil & Suasana Belajar Santri",
    category: "Video Profil",
    date: "15 September 2025",
    desc: "Mengenal lebih dekat lingkungan madrasah, dewan guru, dan pembiasaan adab Al-Qur'an terpadu.",
  },
  {
    type: "photo",
    src: "/img/guru.jpeg",
    images: ["/img/guru.jpeg"],
    title: "Dewan Guru & Tenaga Kependidikan",
    category: "Civitas Akademika",
    date: "01 September 2025",
    desc: "Kebersamaan para pendidik MIS Daarul Ilmi.",
  },
];

export default function GaleriPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);

  const handleOpenModal = (item: GalleryItem) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedPhoto(item);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
          Galeri Kegiatan Madrasah
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Potret berbagai momen pembelajaran, kepramukaan, dan kebersamaan di MIS Daarul Ilmi Balaraja.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleOpenModal(item)}
            className="group relative z-0 cursor-pointer transition-all hover:z-30"
          >
            {/* Kartu 1: Belakang (Miring Kiri) - Khusus Album Foto */}
            {item.type !== "video" && (
              <div className="pointer-events-none absolute inset-0 z-0 origin-bottom-left overflow-hidden rounded-2xl bg-white opacity-0 shadow-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:shadow-md group-hover:-translate-x-4 group-hover:-translate-y-1 group-hover:-rotate-6 dark:bg-zinc-900 flex flex-col">
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15 dark:bg-black/30" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {item.date && (
                    <span className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  )}
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Kartu 2: Tengah (Lurus di Tengah) - Khusus Album Foto */}
            {item.type !== "video" && (
              <div className="pointer-events-none absolute inset-0 z-10 origin-bottom overflow-hidden rounded-2xl bg-white opacity-0 shadow-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:shadow-md group-hover:translate-x-0 group-hover:-translate-y-1.5 group-hover:rotate-0 dark:bg-zinc-900 flex flex-col">
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/8 dark:bg-black/20" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {item.date && (
                    <span className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  )}
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Kartu 3: Paling Depan */}
            <div
              className={`relative z-20 flex h-full cursor-pointer origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-none transition-all duration-300 ease-out dark:bg-zinc-900 ${
                item.type === "video"
                  ? "group-hover:-translate-y-2 group-hover:shadow-md"
                  : "group-hover:translate-x-4 group-hover:-translate-y-2.5 group-hover:rotate-6 group-hover:shadow-md"
              }`}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {item.type === "video" ? (
                  <>
                    {/* Badge Video YouTube */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/95 px-2.5 py-1 text-[11px] font-semibold text-white">
                        <FaYoutube className="text-xs" />
                        Video
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/35">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-rose-600 shadow-md backdrop-blur-xs transition group-hover:scale-110 group-hover:bg-white">
                        <FaPlay className="ml-0.5 text-sm" />
                      </div>
                    </div>
                  </>
                ) : (
                  item.images && item.images.length > 1 && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/70 px-2.5 py-0.5 text-[11px] font-medium text-white">
                        {item.images.length} Foto
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                {item.date && (
                  <span className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {item.date}
                  </span>
                )}
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Galeri Foto */}
      <GaleriModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        item={selectedPhoto}
      />

      {/* Modal Video YouTube (Hanya Video Penuh Tanpa Keterangan) */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        youtubeId={selectedVideo?.youtubeId}
        title={selectedVideo?.title}
      />
    </div>
  );
}
