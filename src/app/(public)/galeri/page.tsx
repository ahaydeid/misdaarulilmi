"use client";

import { useState } from "react";
import Image from "next/image";
import GaleriModal, { type GalleryItem } from "./components/galeriModal";

const galleryItems: GalleryItem[] = [
  {
    src: "/img/pramuka.jpeg",
    images: ["/img/pramuka.jpeg", "/img/pramuka2.jpeg", "/img/pramuka3.jpeg"],
    title: "Kegiatan Kepramukaan",
    category: "Ekstrakurikuler",
    date: "14 Oktober 2025",
    desc: "Latihan baris-berbaris dan pembinaan kemandirian santri.",
  },
  {
    src: "/img/pramuka2.jpeg",
    images: ["/img/pramuka2.jpeg", "/img/pramuka.jpeg", "/img/pramuka3.jpeg"],
    title: "Perkemahan Santri",
    category: "Kegiatan Luar Ruang",
    date: "10 Oktober 2025",
    desc: "Membangun kekompakan, kepemimpinan, dan kebersamaan.",
  },
  {
    src: "/img/pramuka3.jpeg",
    images: ["/img/pramuka3.jpeg", "/img/pramuka.jpeg", "/img/pramuka2.jpeg"],
    title: "Upacara & Apel Pagi",
    category: "Kedisiplinan",
    date: "29 September 2025",
    desc: "Kedisiplinan dan pembinaan karakter setiap awal pekan.",
  },
  {
    src: "/img/guru.jpeg",
    images: ["/img/guru.jpeg"],
    title: "Dewan Guru & Tenaga Kependidikan",
    category: "Civitas Akademika",
    date: "15 September 2025",
    desc: "Kebersamaan para pendidik MIS Daarul Ilmi.",
  },
];

export default function GaleriPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            {/* Kartu 1: Belakang (Miring Kiri) */}
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
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Kartu 2: Tengah (Lurus di Tengah) */}
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
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Kartu 3: Paling Depan (Miring Kanan) */}
            <div className="relative z-20 flex h-full cursor-pointer origin-bottom-right flex-col overflow-hidden rounded-2xl bg-white shadow-none transition-all duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-2.5 group-hover:rotate-6 group-hover:shadow-md dark:bg-zinc-900">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
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
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Galeri */}
      <GaleriModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        item={selectedItem}
      />
    </div>
  );
}
