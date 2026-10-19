import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CalendarEventRecord } from "@/lib/services/calendar";
import KalenderClient from "./components/kalenderClient";

export const instant = false;

export const metadata: Metadata = {
  title: "Kalender Pendidikan | MIS Daarul Ilmi Balaraja",
  description:
    "Jadwal agenda akademik, kegiatan santri, dan hari libur MIS Daarul Ilmi Balaraja.",
};

export default async function KalenderPendidikanPage() {
  const supabase = await createServerSupabaseClient();
  const { data: events, error } = await supabase
    .from("academic_calendar")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          <h2 className="text-lg font-bold">Terjadi Kesalahan Database</h2>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return <KalenderClient events={(events as CalendarEventRecord[]) || []} />;
}
