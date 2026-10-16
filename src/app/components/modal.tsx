"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className,
  bodyClassName,
}: ModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  // Tangani transisi buka (zoom in) dan tutup (zoom out) yang sangat halus
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setMounted(true);
      // Double requestAnimationFrame menjamin frame awal ter-render sebelum transisi CSS dipicu
      let innerFrame: number;
      const outerFrame = requestAnimationFrame(() => {
        innerFrame = requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      return () => {
        cancelAnimationFrame(outerFrame);
        if (innerFrame) cancelAnimationFrame(innerFrame);
      };
    } else {
      // Mulai animasi keluar
      setVisible(false);
      // Berikan jeda transisi selesai sebelum unmount
      timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Tutup saat tombol ESC ditekan
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, onClose]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop Gelap Halus dengan Transisi Fade */}
      <div
        onClick={closeOnOverlay ? onClose : undefined}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Kontainer Modal dengan Animasi Zoom In / Zoom Out Halus */}
      <div
        className={`relative z-10 w-full overflow-hidden shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          className || "rounded-md bg-white dark:bg-zinc-900"
        } ${sizeClasses[size]} ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Tombol Tutup (X) di Pojok Kanan Atas */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="absolute top-3 right-3 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-95 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <FaXmark className="h-4 w-4" />
          </button>
        )}

        {/* Header Modal */}
        {title && (
          <div className="border-b border-zinc-100 px-6 py-4 pr-12 dark:border-zinc-800">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
          </div>
        )}

        {/* Konten Utama Modal */}
        <div
          className={
            bodyClassName !== undefined
              ? bodyClassName
              : "p-6 text-sm text-zinc-700 dark:text-zinc-300"
          }
        >
          {children}
        </div>

        {/* Footer Modal (Opsional) */}
        {footer && (
          <div className="flex items-center justify-end gap-2.5 border-t border-zinc-100 bg-zinc-50/50 px-6 py-3.5 dark:border-zinc-800 dark:bg-zinc-950/40">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
