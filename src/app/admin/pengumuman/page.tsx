"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { supabase } from "@/lib/supabase/client";
import type { AnnouncementRecord } from "@/lib/services/announcements";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ActionButton } from "@/components/ui/ActionButton";
import {
  Table,
  TableControls,
  TableFilterSelect,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TablePagination,
} from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import Modal from "@/app/components/modal";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/components/ui/RichTextEditor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 w-full animate-pulse rounded border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800" />
    ),
  }
);

const generateExcerpt = (html: string, maxLen = 140): string => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "...";
};

export default function AdminPengumumanPage() {
  const [data, setData] = useState<AnnouncementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AnnouncementRecord | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Akademik");
  const [author, setAuthor] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [contentHtml, setContentHtml] = useState("");

  const categories = ["Akademik", "Kesiswaan", "Umum"];

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      const { data: records, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (ignore) return;
      if (error) {
        setLoadError(error.message);
        Swal.fire("Error Database", "Gagal memuat pengumuman: " + error.message, "error");
      } else {
        setData(records || []);
      }
      setIsLoading(false);
    };

    void load();
    return () => {
      ignore = true;
    };
  }, []);

  // Filter Data (Global Search & Tag)
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === "Semua" || item.tag === selectedTag;
    return matchSearch && matchTag;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle("");
    setTag("Akademik");
    setAuthor("Kurikulum & Akademik");
    setIsActive(true);
    setContentHtml("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AnnouncementRecord) => {
    setEditingItem(item);
    setTitle(item.title);
    setTag(item.tag);
    setAuthor(item.author || "");
    setIsActive(item.is_active);
    setContentHtml(item.content_html || "");
    setIsModalOpen(true);
  };

  const handleDelete = (item: AnnouncementRecord) => {
    Swal.fire({
      title: "Hapus Pengumuman?",
      text: `Apakah Anda yakin ingin menghapus "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("announcements")
          .delete()
          .eq("id", item.id);

        if (error) {
          Swal.fire("Gagal", "Gagal menghapus: " + error.message, "error");
          return;
        }

        setData((prev) => prev.filter((a) => a.id !== item.id));
        Swal.fire({
          title: "Terhapus!",
          text: "Pengumuman berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const plainText = contentHtml.replace(/<[^>]*>/g, "").trim();
    if (!title.trim() || !plainText) {
      Swal.fire("Perhatian", "Judul dan isi pengumuman lengkap wajib diisi.", "warning");
      return;
    }

    const autoExcerpt = generateExcerpt(contentHtml);

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Simpan",
      text: editingItem
        ? "Apakah Anda yakin ingin memperbarui pengumuman ini?"
        : "Apakah Anda yakin ingin menambahkan pengumuman baru ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setIsSubmitting(true);

    if (editingItem) {
      const { error } = await supabase
        .from("announcements")
        .update({
          title,
          tag,
          author,
          excerpt: autoExcerpt,
          content_html: contentHtml,
          is_active: isActive,
        })
        .eq("id", editingItem.id);

      setIsSubmitting(false);

      if (error) {
        Swal.fire("Gagal", "Gagal memperbarui: " + error.message, "error");
        return;
      }

      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                title,
                tag,
                author,
                excerpt: autoExcerpt,
                content_html: contentHtml,
                is_active: isActive,
              }
            : item
        )
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Pengumuman berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
    } else {
      const slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now().toString().slice(-4);

      const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const newRecord = {
        slug,
        title,
        tag,
        date: currentDate,
        author,
        excerpt: autoExcerpt,
        content_html: contentHtml,
        is_active: isActive,
      };

      const { data: inserted, error } = await supabase
        .from("announcements")
        .insert([newRecord])
        .select()
        .single();

      setIsSubmitting(false);

      if (error) {
        Swal.fire("Gagal", "Gagal menyimpan pengumuman: " + error.message, "error");
        return;
      }

      setData((prev) => [inserted, ...prev]);
      Swal.fire({
        title: "Tersimpan!",
        text: "Pengumuman baru berhasil ditambahkan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Tanpa Pembungkus & Subjudul */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Pengumuman
        </h1>
        <Button onClick={handleOpenAdd} size="sm" className="shrink-0 gap-1.5 self-start sm:self-auto">
          <HiOutlinePlus className="h-4 w-4" />
          <span>Tambah Pengumuman</span>
        </Button>
      </div>

      {/* Table Controls (Search, Filter & Baris Per Halaman) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Cari pengumuman..."
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      >
        <TableFilterSelect
          value={selectedTag}
          onChange={(e) => {
            setSelectedTag(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Semua">Semua</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </TableFilterSelect>
      </TableControls>

      {/* Table Section Tanpa Pembungkus Ekstra */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={8} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-12 text-center whitespace-nowrap">No</TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">Judul</TableHeaderCell>
              <TableHeaderCell className="w-28 text-center whitespace-nowrap">Status</TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">Ringkasan</TableHeaderCell>
              <TableHeaderCell className="w-32 whitespace-nowrap">Kategori</TableHeaderCell>
              <TableHeaderCell className="w-36 whitespace-nowrap">Tanggal</TableHeaderCell>
              <TableHeaderCell className="w-44 whitespace-nowrap">Penulis</TableHeaderCell>
              <TableHeaderCell stickyRight className="w-24 text-center whitespace-nowrap">Aksi</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadError ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-red-500 font-medium">
                  Gagal memuat data dari database: {loadError}
                </TableCell>
              </TableRow>
            ) : filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-zinc-400">
                  Tidak ada pengumuman yang sesuai dengan pencarian.
                </TableCell>
              </TableRow>
            ) : (
            paginatedData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center whitespace-nowrap">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.title}>
                  {item.title}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant={item.is_active ? "success" : "secondary"}>
                    {item.is_active ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-sm truncate" title={item.excerpt}>
                  {item.excerpt}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.tag}
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="whitespace-nowrap">{item.author || "-"}</TableCell>
                <TableCell stickyRight className="text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <ActionButton
                      variant="edit"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Pengumuman"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(item)}
                      title="Hapus Pengumuman"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      )}

      {!isLoading && filteredData.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
        size="4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Judul Pengumuman <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Edaran Pelaksanaan Ujian Semester..."
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Kategori, Status, Penulis */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Kategori
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Status
              </label>
              <select
                value={isActive ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              >
                <option value="true">Aktif</option>
                <option value="false">Tidak Aktif</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Penulis / Divisi
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Kurikulum & Akademik"
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* Isi Konten Lengkap RichTextEditor */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Isi Pengumuman Lengkap <span className="text-rose-500">*</span>
            </label>
            <RichTextEditor
              value={contentHtml}
              onChange={setContentHtml}
              placeholder="Tulis detail isi pengumuman, ketentuan, dan informasi lengkap di sini..."
            />
          </div>

          {/* Footer Tombol Modal */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
              {isSubmitting
                ? "Menyimpan..."
                : editingItem
                ? "Simpan Perubahan"
                : "Tambah Pengumuman"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
