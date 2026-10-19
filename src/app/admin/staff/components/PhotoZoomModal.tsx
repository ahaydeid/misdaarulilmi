"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/app/components/modal";

interface PhotoZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  photoUrl: string | null;
  subject?: string;
}

export default function PhotoZoomModal({
  isOpen,
  onClose,
  name,
  photoUrl,
  subject,
}: PhotoZoomModalProps) {
  // Simpan data foto terakhir agar tidak langsung hilang saat animasi tutup (300ms) berjalan
  const [cachedPhoto, setCachedPhoto] = useState<{
    name: string;
    photoUrl: string;
    subject?: string;
  } | null>(null);

  useEffect(() => {
    if (photoUrl) {
      setCachedPhoto({ name, photoUrl, subject });
    }
  }, [photoUrl, name, subject]);

  const activePhoto = photoUrl
    ? { name, photoUrl, subject }
    : cachedPhoto;

  return (
    <Modal
      isOpen={isOpen && !!activePhoto}
      onClose={onClose}
      title={
        <div className="flex flex-col">
          <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {activePhoto?.name}
          </span>
          {activePhoto?.subject && (
            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {activePhoto.subject}
            </span>
          )}
        </div>
      }
      size="md"
    >
      {activePhoto && (
        <div className="flex flex-col items-center justify-center p-1">
          <div className="relative aspect-square w-full bg-gray-50 overflow-hidden rounded-lg">
            <Image
              src={activePhoto.photoUrl}
              alt={activePhoto.name}
              fill
              sizes="(max-width: 640px) 90vw, 384px"
              className="object-contain"
              priority
              unoptimized={activePhoto.photoUrl.startsWith("http")}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
