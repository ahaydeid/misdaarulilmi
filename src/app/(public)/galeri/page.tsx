import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { GalleryItemRecord } from "@/lib/services/gallery";
import GaleriGrid from "./components/galeriGrid";

export const instant = false;

export const metadata: Metadata = {
  title: "Galeri Kegiatan Madrasah",
  description:
    "Potret berbagai momen pembelajaran, kepramukaan, dan kebersamaan di MIS Daarul Ilmi Balaraja.",
};

export default async function GaleriPage() {
  const supabase = await createServerSupabaseClient();
  const { data: items, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          <h2 className="text-lg font-bold">Terjadi Kesalahan Database</h2>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

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

      <GaleriGrid items={(items as GalleryItemRecord[]) || []} />
    </div>
  );
}
