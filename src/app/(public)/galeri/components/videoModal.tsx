"use client";

import { useState } from "react";
import Modal from "@/app/components/modal";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string | null;
  title?: string | null;
}

export default function VideoModal({
  isOpen,
  onClose,
  youtubeId,
  title,
}: VideoModalProps) {
  const [prevId, setPrevId] = useState(youtubeId);
  const [activeId, setActiveId] = useState(youtubeId);
  const [activeTitle, setActiveTitle] = useState(title);

  // Synchronous state adjustment when props change without effect cascade
  if (youtubeId && youtubeId !== prevId) {
    setPrevId(youtubeId);
    setActiveId(youtubeId);
    setActiveTitle(title);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
    >
      {activeId && (
        <div className="relative aspect-video w-full">
          <iframe
            src={
              isOpen
                ? `https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1&rel=0`
                : undefined
            }
            title={activeTitle || "Video Kegiatan"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}
    </Modal>
  );
}
