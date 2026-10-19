"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay, FaYoutube } from "react-icons/fa6";
import GaleriModal from "./galeriModal";
import VideoModal from "./videoModal";
import type { GalleryItemRecord } from "@/lib/services/gallery";

interface GaleriGridProps {
  items: GalleryItemRecord[];
}

export default function GaleriGrid({ items }: GaleriGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItemRecord | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItemRecord | null>(null);

  const handleOpenModal = (item: GalleryItemRecord) => {
    if (item.type === "video") {
      setSelectedVideo(item);
    } else {
      setSelectedPhoto(item);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mt-16 text-center py-16 bg-white dark:bg-zinc-900/50">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
          Belum ada dokumentasi galeri kegiatan yang dipublikasikan.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const imgFront =
            (item.images && item.images[0]) || item.src || "/img/pramuka.jpeg";
          const imgMid =
            (item.images && item.images[1]) || imgFront;
          const imgBack =
            (item.images && item.images[2]) || imgMid;

          return (
            <div
              key={item.id || index}
              onClick={() => handleOpenModal(item)}
              className="group relative z-0 cursor-pointer transition-all hover:z-30"
            >
              {/* Kartu 1: Belakang (Miring Kiri) - Foto ke-3 atau fallback */}
              {item.type !== "video" && (
                <div className="pointer-events-none absolute inset-0 z-0 origin-bottom-left overflow-hidden rounded-xl bg-white opacity-0 shadow-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:shadow-md group-hover:-translate-x-4 group-hover:-translate-y-1 group-hover:-rotate-6 dark:bg-zinc-900 flex flex-col">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={imgBack}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized={imgBack.startsWith("http")}
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
                    {item.desc && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Kartu 2: Tengah (Lurus di Tengah) - Foto ke-2 atau fallback */}
              {item.type !== "video" && (
                <div className="pointer-events-none absolute inset-0 z-10 origin-bottom overflow-hidden rounded-xl bg-white opacity-0 shadow-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:shadow-md group-hover:translate-x-0 group-hover:-translate-y-1.5 group-hover:rotate-0 dark:bg-zinc-900 flex flex-col">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={imgMid}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized={imgMid.startsWith("http")}
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
                    {item.desc && (
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Kartu 3: Paling Depan - Foto Utama (Cover) */}
              <div
                className={`relative z-20 flex h-full cursor-pointer origin-bottom-right flex-col overflow-hidden rounded-xl bg-white shadow-none transition-all duration-300 ease-out dark:bg-zinc-900 ${
                  item.type !== "video"
                    ? "group-hover:opacity-100 group-hover:shadow-md group-hover:translate-x-4 group-hover:-translate-y-1 group-hover:rotate-6"
                    : "group-hover:-translate-y-1.5 group-hover:shadow-md"
                }`}
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={imgFront}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={imgFront.startsWith("http")}
                  />

                  {/* Badge Tipe / Kategori */}
                  <div className="absolute left-3 top-3 z-10 flex gap-2">
                    <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Tombol Play Khusus Video */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/40">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-600/90 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <FaPlay className="ml-1 h-5 w-5" />
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <FaYoutube className="text-red-500" />
                        <span>Tonton Video</span>
                      </div>
                    </div>
                  )}

                  {/* Indikator Jumlah Foto Album */}
                  {item.type !== "video" && item.images && item.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {item.images.length} Foto
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {item.date && (
                    <span className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  )}
                  <h2 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                    {item.title}
                  </h2>
                  {item.desc && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <GaleriModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        item={selectedPhoto}
      />

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        youtubeId={selectedVideo?.youtube_id}
        title={selectedVideo?.title}
      />
    </>
  );
}
