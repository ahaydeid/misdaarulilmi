"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaImages, FaCalendarDays } from "react-icons/fa6";
import Modal from "@/app/components/modal";

export interface GalleryItem {
  src: string;
  images?: string[];
  title: string;
  desc: string;
  date?: string;
  category?: string;
}

interface GaleriModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | null;
}

export default function GaleriModal({ isOpen, onClose, item }: GaleriModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Kumpulan foto: gunakan array images jika ada, fallback ke src utama
  const images = item?.images && item.images.length > 0 ? item.images : item?.src ? [item.src] : [];

  // Reset index saat item berubah atau modal dibuka
  useEffect(() => {
    setCurrentIndex(0);
  }, [item, isOpen]);

  // Dukungan tombol panah keyboard (kiri/kanan) untuk ganti foto
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!item) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden -m-6 rounded-2xl bg-white dark:bg-zinc-900 md:min-h-[580px]">
        {/* Sisi Kiri: Preview Foto dengan Tombol Navigasi < dan > */}
        <div className="relative w-full h-[360px] md:h-auto md:min-h-full bg-white dark:bg-zinc-900 md:col-span-7 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-100 dark:border-zinc-800">
          {/* Sliding Track Carousel */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-full w-full shrink-0 flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt={`${item.title} - Foto ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain p-2 md:p-4"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Tombol Navigasi Kiri (<) */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/60 text-white shadow-md backdrop-blur-xs transition hover:bg-zinc-900/85 hover:scale-105 active:scale-95"
            >
              <FaChevronLeft className="text-base" />
            </button>
          )}

          {/* Tombol Navigasi Kanan (>) */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/60 text-white shadow-md backdrop-blur-xs transition hover:bg-zinc-900/85 hover:scale-105 active:scale-95"
            >
              <FaChevronRight className="text-base" />
            </button>
          )}

          {/* Indikator Jumlah Foto */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-zinc-900/70 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-xs">
              <FaImages className="text-xs text-emerald-400" />
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Sisi Kanan: Deskripsi / Keterangan Lengkap */}
        <div className="flex flex-col justify-between p-6 md:col-span-5 md:p-8">
          <div>
            {/* Tanggal Kegiatan */}
            {item.date && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <FaCalendarDays className="text-[11px]" />
                <span>{item.date}</span>
              </div>
            )}

            {/* Judul Kegiatan */}
            <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
              {item.title}
            </h3>

            {/* Garis Pembatas Lembut */}
            <div className="my-4 h-px w-full bg-zinc-100 dark:bg-zinc-800" />

            {/* Deskripsi Lengkap */}
            <div className="space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <p>{item.desc}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Dokumentasi resmi kegiatan santri dan civitas akademika MIS Daarul Ilmi Balaraja dalam menumbuhkan karakter islami, kemandirian, dan kebersamaan.
              </p>
            </div>
          </div>

          {/* Thumbnail Preview jika lebih dari 1 foto */}
          {images.length > 1 && (
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Semua Foto ({images.length})
              </p>
              <div className="flex gap-2.5 overflow-x-auto py-1.5 px-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition ${
                      currentIndex === idx
                        ? "ring-2 ring-emerald-600 ring-offset-2 dark:ring-offset-zinc-900"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
