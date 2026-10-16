"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/modal";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  youtubeId,
  title,
}: VideoModalProps) {
  // Simpan data terakhir agar animasi zoom out modal tetap berjalan utuh saat parent me-reset state
  const [activeId, setActiveId] = useState(youtubeId);
  const [activeTitle, setActiveTitle] = useState(title);

  useEffect(() => {
    if (youtubeId) {
      setActiveId(youtubeId);
      setActiveTitle(title);
    }
  }, [youtubeId, title]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      className="rounded-none bg-black"
      bodyClassName="p-0"
    >
      {activeId && (
        <div className="relative aspect-video w-full rounded-none bg-black">
          <iframe
            src={
              isOpen
                ? `https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`
                : undefined
            }
            title={activeTitle || "Video Kegiatan"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full rounded-none border-0"
          />
        </div>
      )}
    </Modal>
  );
}
