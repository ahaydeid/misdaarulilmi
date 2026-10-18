import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaCalendarDays,
  FaWhatsapp,
  FaFileLines,
  FaCircleCheck,
} from "react-icons/fa6";
import { announcements } from "../data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return announcements.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = announcements.find((a) => a.slug === slug);

  if (!item) {
    return {
      title: "Pengumuman Tidak Ditemukan",
    };
  }

  return {
    title: `${item.title} - MIS Daarul Ilmi Balaraja`,
    description: item.excerpt,
  };
}

export default async function PengumumanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = announcements.find((a) => a.slug === slug);

  if (!item) {
    notFound();
  }

  const shareText = encodeURIComponent(
    `*${item.title}*\n${item.excerpt}\n\nSelengkapnya dapat dibaca di website MIS Daarul Ilmi Balaraja.`
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Tombol Kembali */}
      <div className="mb-8">
        <Link
          href="/pengumuman"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
        >
          <FaArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali</span>
        </Link>
      </div>

      {/* Kontainer Surat / Pengumuman Resmi */}
      <article className="rounded-lg bg-white p-6 sm:p-10 dark:bg-zinc-900">
        {/* Header Pengumuman */}
        <header className="border-b border-zinc-100 pb-6 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1 rounded-xs bg-emerald-500 px-3 py-1 font-medium text-white dark:bg-emerald-950 dark:text-emerald-300">
              {item.tag}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FaCalendarDays className="h-3.5 w-3.5 text-slate-500 dark:text-emerald-400" />
              {item.date}
            </span>
          </div>

          <h1 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            {item.title}
          </h1>

          {item.author && (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Diterbitkan oleh: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.author}</span>
            </p>
          )}
        </header>

        {/* Isi Pengumuman Lengkap */}
        <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {item.htmlContent ? (
            <div
              className="prose dark:prose-invert max-w-none space-y-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.htmlContent }}
            />
          ) : (
            <>
              {item.content.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Poin-poin Ketentuan jika ada */}
              {item.content.points && item.content.points.length > 0 && (
                <div className="my-6 rounded-xl bg-zinc-50 p-5 dark:bg-zinc-800/50">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Rincian & Ketentuan Pelaksanaan:
                  </h2>
                  <ul className="space-y-2.5">
                    {item.content.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm">
                        <FaCircleCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.content.closing && (
                <p className="pt-2">{item.content.closing}</p>
              )}
            </>
          )}

          {/* Lembar Pengesahan */}
          <div className="mt-10 border-t border-zinc-100 pt-6 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <p>Balaraja, {item.date}</p>
            <p className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
              MIS Daarul Ilmi Balaraja
            </p>
          </div>
        </div>

        {/* Footer Aksi / Share */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
          >
            <FaWhatsapp className="h-4 w-4" />
            <span>Bagikan ke WhatsApp</span>
          </a>
        </footer>
      </article>
    </div>
  );
}
