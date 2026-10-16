"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function getSnapshot() {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerSnapshot() {
  return "light";
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

export default function ThemeToggle() {
  const isServer = useSyncExternalStore(emptySubscribe, () => false, () => true);
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.dispatchEvent(new Event("storage"));
  };

  if (isServer) {
    return <div className="h-[32px] w-[64px] rounded-full bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      className={`relative flex h-[32px] w-[64px] shrink-0 cursor-pointer items-center rounded-full p-[3px] transition-colors duration-300 focus:outline-hidden ${
        isDark ? "bg-[#1c1c1e] shadow-inner" : "bg-[#e2e2e6] shadow-inner"
      }`}
    >
      {/* Sisi Kiri: Ikon Matahari (tampak saat mode terang) */}
      <div className="flex h-[26px] w-[26px] items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-zinc-900 transition-opacity duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      </div>

      {/* Sisi Kanan: Ikon Bulan Sabit & Bintang (tampak saat mode gelap) */}
      <div className="ml-auto flex h-[26px] w-[26px] items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white transition-opacity duration-200"
          fill="currentColor"
        >
          {/* Bulan Sabit */}
          <path d="M11.5 3a8.5 8.5 0 1 0 8.4 9.7 5.5 5.5 0 0 1-7.1-7.1A8.4 8.4 0 0 0 11.5 3z" />
          {/* Bintang Utama */}
          <path d="M19 4.2l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z" />
          {/* Bintang Kecil */}
          <path d="M21 10.5l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3.3-.7z" />
        </svg>
      </div>

      {/* Tombol Geser Bulat (Thumb) */}
      <span
        className={`absolute top-[3px] left-[3px] h-[26px] w-[26px] rounded-full shadow-md transition-all duration-300 ease-in-out ${
          isDark
            ? "translate-x-0 bg-white"
            : "translate-x-[32px] bg-[#1c1c1e]"
        }`}
      />
    </button>
  );
}
