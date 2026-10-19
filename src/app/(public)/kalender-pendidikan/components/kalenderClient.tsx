"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Modal from "@/app/components/modal";
import {
  type CalendarEventRecord,
  type EventCategory,
  dayNames,
  monthNames,
} from "@/lib/services/calendar";

// Helper mencocokkan apakah tanggal tertentu berada dalam jadwal agenda
const isDateInEvent = (
  ev: CalendarEventRecord,
  year: number,
  month: number,
  day: number
): boolean => {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  const targetDateStr = `${year}-${m}-${d}`;

  if (!ev.end_date || ev.end_date === ev.start_date) {
    return ev.start_date === targetDateStr;
  }
  return targetDateStr >= ev.start_date && targetDateStr <= ev.end_date;
};

// Styling pill pada grid kalender sesuai kategori
const getCategoryPillClass = (cat: EventCategory): string => {
  switch (cat) {
    case "Akademik":
      return "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300";
    case "Kegiatan":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300";
    case "Hari Libur":
      return "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

// Styling badge kategori pada modal detail agenda
const getCategoryBadgeClass = (cat: EventCategory): string => {
  switch (cat) {
    case "Akademik":
      return "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300";
    case "Kegiatan":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300";
    case "Hari Libur":
      return "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
  }
};

interface KalenderClientProps {
  events: CalendarEventRecord[];
}

export default function KalenderClient({ events }: KalenderClientProps) {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // Oktober (0-indexed = 9)
  const [modalDay, setModalDay] = useState<number | null>(null);

  // Status hari ini (diambil dalam useEffect agar kompatibel dengan prerender Next.js)
  const [todayInfo, setTodayInfo] = useState<{
    date: number;
    month: number;
    year: number;
    dayOfWeek: number;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    setTodayInfo({
      date: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      dayOfWeek: now.getDay(),
    });
  }, []);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Hari pertama dalam bulan (0 = Minggu, 1 = Senin, ..., 6 = Sabtu)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Total hari dalam bulan saat ini
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Total hari pada bulan sebelumnya (untuk mengisi kotak kosong di awal)
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Hari penutup di akhir grid agar kolom genap kelipatan 7
  const totalCells = firstDayOfWeek + daysInMonth;
  const trailingDays = (7 - (totalCells % 7)) % 7;

  const isCurrentMonthActive =
    todayInfo !== null &&
    currentMonth === todayInfo.month &&
    currentYear === todayInfo.year;

  // Agenda khusus hari ini (tidak terpengaruh klik kalender)
  const todayEvents = todayInfo
    ? events.filter((ev) =>
        isDateInEvent(ev, todayInfo.year, todayInfo.month, todayInfo.date)
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Kolom Kiri: Kalender Utama */}
        <div className="overflow-hidden rounded-xl bg-white p-6 sm:p-8 lg:col-span-8 dark:bg-zinc-900">
          {/* Kontrol Navigasi Bulan */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">
                {monthNames[currentMonth]} {currentYear}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Bulan Sebelumnya"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-900 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <FaChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Bulan Selanjutnya"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-900 active:scale-95 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
              >
                <FaChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 7 Kolom Nama Hari: Dimulai dari Minggu */}
          <div className="mt-6 grid grid-cols-7 text-center text-xs uppercase font-medium sm:text-sm">
            {dayNames.map((day, idx) => (
              <div
                key={day}
                className={`py-2 ${
                  idx === 0
                    ? "text-rose-500 dark:text-rose-400"
                    : idx === 5
                    ? "text-emerald-500 dark:text-emerald-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          {/* Grid Tanggal Kalender dengan Garis Halus */}
          <div className="mt-4 grid grid-cols-7 border-t border-l border-zinc-100 dark:border-zinc-800">
            {/* Hari dari bulan sebelumnya */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => {
              const prevDay = daysInPrevMonth - firstDayOfWeek + idx + 1;
              return (
                <div
                  key={`prev-${idx}`}
                  className="flex aspect-square w-full flex-col items-start justify-start border-r border-b border-zinc-100 p-1.5 text-xs text-zinc-300 sm:p-2 sm:text-sm dark:border-zinc-800 dark:text-zinc-700"
                >
                  <span>{prevDay}</span>
                </div>
              );
            })}

            {/* Hari pada bulan aktif */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dayOfWeek = (firstDayOfWeek + idx) % 7;
              const isSunday = dayOfWeek === 0;
              const isFriday = dayOfWeek === 5;
              const isToday = isCurrentMonthActive && day === todayInfo?.date;
              const isSelected = modalDay === day;
              const dayEvents = events.filter((ev) =>
                isDateInEvent(ev, currentYear, currentMonth, day)
              );

              return (
                <button
                  type="button"
                  key={`day-${day}`}
                  onClick={() => setModalDay(day)}
                  className={`flex aspect-square w-full cursor-pointer flex-col items-start justify-start overflow-hidden border-r border-b border-zinc-100 text-left transition dark:border-zinc-800 ${
                    isSelected && !isToday
                      ? "bg-zinc-100/70 dark:bg-zinc-800/50"
                      : "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  {/* Angka Tanggal di Kiri Atas */}
                  {isToday ? (
                    <span className="flex items-center justify-center rounded-br-lg bg-emerald-600 px-2 py-1 text-xs font-semibold leading-none text-white shadow-xs sm:text-sm">
                      {day}
                    </span>
                  ) : (
                    <span
                      className={`p-1.5 text-xs font-medium leading-none sm:p-2 sm:text-sm ${
                        isSunday
                          ? "text-rose-600 dark:text-rose-400"
                          : isFriday
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {day}
                    </span>
                  )}

                  {/* Pill Agenda jika ada */}
                  {dayEvents.length > 0 && (
                    <div className="flex w-full flex-col gap-1 overflow-hidden p-1.5 pt-1 sm:p-2 sm:pt-1">
                      {dayEvents.slice(0, 2).map((ev, evIdx) => (
                        <span
                          key={evIdx}
                          title={ev.title}
                          className={`block w-full truncate rounded px-1 py-0.5 text-[9px] font-medium leading-tight sm:text-[10px] ${getCategoryPillClass(
                            ev.category
                          )}`}
                        >
                          {ev.title}
                        </span>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[9px] text-zinc-400">
                          +{dayEvents.length - 2} lagi
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}

            {/* Hari penutup dari bulan berikutnya */}
            {Array.from({ length: trailingDays }).map((_, idx) => (
              <div
                key={`next-${idx}`}
                className="flex aspect-square w-full flex-col items-start justify-start border-r border-b border-zinc-100 p-1.5 text-xs text-zinc-300 sm:p-2 sm:text-sm dark:border-zinc-800 dark:text-zinc-700"
              >
                <span>{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Agenda Hari Ini (Statis) */}
        <div className="lg:col-span-4">
          <div className="rounded-xl bg-white p-6 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Agenda Hari Ini
              </h2>
              <p className="mt-0.5 text-xs text-zinc-400">
                {todayInfo
                  ? `${dayNames[todayInfo.dayOfWeek]}, ${todayInfo.date} ${monthNames[todayInfo.month]} ${todayInfo.year}`
                  : "-"}
              </p>
            </div>

            {todayEvents.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm">
                {todayEvents.map((ev, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950/60"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {ev.title}
                      </p>
                      <span className="text-[11px] text-zinc-400">
                        {ev.category}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs text-zinc-400">
                Tidak ada agenda khusus madrasah hari ini (kegiatan belajar mengajar berjalan normal).
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Agenda saat Tanggal Kalender Diklik */}
      <Modal
        isOpen={modalDay !== null}
        onClose={() => setModalDay(null)}
        title={
          modalDay !== null
            ? `Agenda ${modalDay} ${monthNames[currentMonth]} ${currentYear}`
            : ""
        }
        size="xl"
      >
        {modalDay !== null && (() => {
          const dayEvents = events.filter((ev) =>
            isDateInEvent(ev, currentYear, currentMonth, modalDay)
          );

          if (dayEvents.length === 0) {
            return (
              <p className="py-2 text-sm text-zinc-500 dark:text-zinc-400">
                Tidak ada agenda khusus madrasah pada tanggal ini.
              </p>
            );
          }

          return (
            <ul className="space-y-3">
              {dayEvents.map((ev, idx) => (
                <li
                  key={idx}
                  className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {ev.title}
                      </h4>
                      {ev.description && (
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {ev.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center rounded-xs px-2 py-0.5 text-[11px] font-medium ${getCategoryBadgeClass(
                        ev.category
                      )}`}
                    >
                      {ev.category}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          );
        })()}
      </Modal>
    </div>
  );
}
