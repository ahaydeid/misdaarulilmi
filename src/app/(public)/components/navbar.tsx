"use client";

import { useState, useSyncExternalStore, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark, FaChevronDown } from "react-icons/fa6";
import ThemeToggle from "./theme-toggle";

function getScrollSnapshot() {
  if (typeof window === "undefined") return false;
  return window.scrollY > 10;
}

function getScrollServerSnapshot() {
  return false;
}

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
  };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  );

  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());

  const isInformasiActive =
    pathname === "/pengumuman" || pathname === "/kalender-akademik";

  const activeKey = isInformasiActive ? "/informasi" : pathname;

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current.get(activeKey);
      const navEl = navRef.current;
      if (activeEl && navEl) {
        const navRect = navEl.getBoundingClientRect();
        const linkRect = activeEl.getBoundingClientRect();
        const inset = 12; // Menyesuaikan padding px-3 (12px)
        setIndicator({
          left: linkRect.left - navRect.left + inset,
          width: Math.max(0, linkRect.width - inset * 2),
          opacity: 1,
        });
      } else {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const frameId = requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeKey]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-white/90 backdrop-blur-md dark:bg-zinc-950/90"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0">
            <Image
              src="/img/logo-bulat.png"
              alt="Logo MIS Daarul Ilmi"
              fill
              sizes="44px"
              priority
              className="object-contain"
            />
          </div>
          <div>
            <span className="block text-base font-bold leading-tight text-zinc-900 dark:text-white">
              MIS Daarul Ilmi
            </span>
            <span className="block text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Balaraja
            </span>
          </div>
        </Link>

        {/* Desktop Navigation: Tepat 5 Menu Utama dengan Sliding Indicator */}
        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          {/* 1. Beranda */}
          <Link
            href="/"
            ref={(el) => {
              if (el) linkRefs.current.set("/", el);
              else linkRefs.current.delete("/");
            }}
            className={`px-3 py-1.5 text-md transition-colors ${
              pathname === "/"
                ? "font-medium text-zinc-900 dark:text-white"
                : "font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Beranda
          </Link>

          {/* 2. Profil */}
          <Link
            href="/profil"
            ref={(el) => {
              if (el) linkRefs.current.set("/profil", el);
              else linkRefs.current.delete("/profil");
            }}
            className={`px-3 py-1.5 text-md transition-colors ${
              pathname === "/profil"
                ? "font-medium text-zinc-900 dark:text-white"
                : "font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Profil
          </Link>

          {/* 3. Galeri */}
          <Link
            href="/galeri"
            ref={(el) => {
              if (el) linkRefs.current.set("/galeri", el);
              else linkRefs.current.delete("/galeri");
            }}
            className={`px-3 py-1.5 text-md transition-colors ${
              pathname === "/galeri"
                ? "font-medium text-zinc-900 dark:text-white"
                : "font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Galeri
          </Link>

          {/* 4. Informasi (Dropdown) */}
          <div
            className="group relative"
            ref={(el) => {
              if (el) linkRefs.current.set("/informasi", el);
              else linkRefs.current.delete("/informasi");
            }}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-md transition-colors ${
                isInformasiActive
                  ? "font-medium text-zinc-900 dark:text-white"
                  : "font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <span>Informasi</span>
              <FaChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Dropdown Card */}
            <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="w-48 rounded-xl border border-zinc-100 bg-white/95 p-1.5 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95">
                <Link
                  href="/pengumuman"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Pengumuman
                </Link>
                <Link
                  href="/kalender-pendidikan"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Kalender Pendidikan
                </Link>
              </div>
            </div>
          </div>

          {/* 5. Kontak */}
          <Link
            href="/kontak"
            ref={(el) => {
              if (el) linkRefs.current.set("/kontak", el);
              else linkRefs.current.delete("/kontak");
            }}
            className={`px-3 py-1.5 text-md transition-colors ${
              pathname === "/kontak"
                ? "font-medium text-zinc-900 dark:text-white"
                : "font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            Kontak
          </Link>

          {/* Garis Indikator Meluncur (Sliding Indicator) */}
          <span
            className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{
              left: `${indicator.left}px`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />
        </nav>

        {/* Actions & Theme Toggle (Desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/spmb"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
          >
            SPMB Online
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Actions: Theme Toggle di pojok kanan */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {isOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="bg-white px-4 pt-2 pb-6 md:hidden dark:bg-zinc-950">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`w-fit px-3 py-2 text-base transition-colors ${
                pathname === "/"
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              }`}
            >
              Beranda
            </Link>
            <Link
              href="/profil"
              onClick={() => setIsOpen(false)}
              className={`w-fit px-3 py-2 text-base transition-colors ${
                pathname === "/profil"
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              }`}
            >
              Profil
            </Link>
            <Link
              href="/galeri"
              onClick={() => setIsOpen(false)}
              className={`w-fit px-3 py-2 text-base transition-colors ${
                pathname === "/galeri"
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              }`}
            >
              Galeri
            </Link>

            {/* Menu Informasi (Mobile) */}
            <div className="px-3 pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Informasi
              </span>
              <div className="mt-1 flex flex-col gap-1 pl-2">
                <Link
                  href="/pengumuman"
                  onClick={() => setIsOpen(false)}
                  className={`w-fit py-1.5 text-sm transition-colors ${
                    pathname === "/pengumuman"
                      ? "font-semibold text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                  }`}
                >
                  Pengumuman
                </Link>
                <Link
                  href="/kalender-akademik"
                  onClick={() => setIsOpen(false)}
                  className={`w-fit py-1.5 text-sm transition-colors ${
                    pathname === "/kalender-akademik"
                      ? "font-semibold text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                  }`}
                >
                  Kalender Akademik
                </Link>
              </div>
            </div>

            <Link
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className={`w-fit px-3 py-2 text-base transition-colors ${
                pathname === "/kontak"
                  ? "font-semibold text-emerald-600 dark:text-emerald-400"
                  : "font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              }`}
            >
              Kontak
            </Link>

            <div className="pt-3">
              <Link
                href="/spmb"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-2.5 text-center text-sm font-medium text-white shadow-xs transition hover:bg-emerald-700"
              >
                SPMB Online
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
