import { FaQuoteLeft } from "react-icons/fa6";
import Avatar from "@/components/ui/Avatar";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { TestimonialRecord } from "@/lib/services/testimonial";

export default async function TestimoniSection() {
  const supabase = await createServerSupabaseClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  const activeTestimonials = (testimonials as TestimonialRecord[]) || [];

  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 overflow-hidden">
      <style>{`
        @keyframes marquee-slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-slide 50s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Apa Kata Mereka
        </h2>
      </div>

      {/* Marquee Track Container with subtle fade edges */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent" />

        {/* Sliding Cards */}
        <div className="marquee-track flex gap-6 pr-6">
          {[...activeTestimonials, ...activeTestimonials].map((testi, idx) => (
            <div
              key={`${testi.id}-${idx}`}
              className="w-[320px] sm:w-[380px] shrink-0 flex flex-col justify-between rounded-2xl bg-zinc-100 p-7 dark:bg-zinc-800/80"
            >
              <div>
                <FaQuoteLeft className="h-6 w-6 text-emerald-700" />
                <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3.5 border-t border-zinc-200/80 pt-4 dark:border-zinc-700">
                <Avatar
                  name={testi.name}
                  photo={testi.avatar_url}
                  size="smedium"
                  className="!w-10 !h-10 shrink-0"
                />

                <div>
                  <p className="font-bold text-sm text-zinc-900 dark:text-white">
                    {testi.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {testi.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
