"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { announcements, type Announcement } from "@/app/(public)/pengumuman/data";
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
} from "@/components/ui/Table";
import Modal from "@/app/components/modal";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

const contentToHtml = (ann: Announcement): string => {
  if (ann.htmlContent) return ann.htmlContent;
  let html = (ann.content?.paragraphs || []).map((p) => `<p>${p}</p>`).join("");
  if (ann.content?.points && ann.content.points.length > 0) {
    html += `<ul>${ann.content.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>`;
  }
  if (ann.content?.closing) {
    html += `<p>${ann.content.closing}</p>`;
  }
  return html;
};

const generateExcerpt = (html: string, maxLen = 140): string => {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + "...";
};

export default function AdminPengumumanPage() {
  const [data, setData] = useState<Announcement[]>(announcements);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("Semua");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Akademik");
  const [author, setAuthor] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [contentHtml, setContentHtml] = useState("");

  const categories = ["Akademik", "Kesiswaan", "Umum"];

  // Filter Data
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === "Semua" || item.tag === selectedTag;
    return matchSearch && matchTag;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle("");
    setTag("Akademik");
    setAuthor("Kurikulum & Akademik");
    setIsActive(true);
    setContentHtml("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Announcement) => {
    setEditingItem(item);
    setTitle(item.title);
    setTag(item.tag);
    setAuthor(item.author || "");
    setIsActive(item.isActive !== false);
    setContentHtml(contentToHtml(item));
    setIsModalOpen(true);
  };

  const handleDelete = (item: Announcement) => {
    Swal.fire({
      title: "Hapus Pengumuman?",
      text: `Apakah Anda yakin ingin menghapus "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((a) => a.slug !== item.slug));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const plainText = contentHtml.replace(/<[^>]*>/g, "").trim();
    if (!title.trim() || !plainText) {
      Swal.fire("Perhatian", "Judul dan isi pengumuman lengkap wajib diisi.", "warning");
      return;
    }

    const autoExcerpt = generateExcerpt(contentHtml);

    if (editingItem) {
      // Edit mode: pertahankan tanggal asli pembuatan
      setData((prev) =>
        prev.map((item) =>
          item.slug === editingItem.slug
            ? {
                ...item,
                title,
                tag,
                author,
                excerpt: autoExcerpt,
                isActive,
                htmlContent: contentHtml,
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
    } else {
      // Add mode: tanggal diambil otomatis saat dibuat
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

      const newItem: Announcement = {
        slug,
        title,
        tag,
        date: currentDate,
        author,
        excerpt: autoExcerpt,
        isActive,
        htmlContent: contentHtml,
        content: {
          paragraphs: [autoExcerpt],
        },
      };

      setData([newItem, ...data]);
      Swal.fire({
        title: "Tersimpan!",
        text: "Pengumuman baru berhasil ditambahkan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setIsModalOpen(false);
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

      {/* Table Controls (Search & Filter) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari pengumuman..."
      >
        <TableFilterSelect
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
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
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-zinc-400">
                Tidak ada pengumuman yang sesuai dengan pencarian.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item, idx) => (
              <TableRow key={item.slug}>
                <TableCell className="text-center whitespace-nowrap">{idx + 1}</TableCell>
                <TableCell className="max-w-xs truncate" title={item.title}>
                  {item.title}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant={item.isActive !== false ? "success" : "secondary"}>
                    {item.isActive !== false ? "Aktif" : "Tidak Aktif"}
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
            <Button type="submit" variant="primary" size="md">
              {editingItem ? "Simpan Perubahan" : "Tambah Pengumuman"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
