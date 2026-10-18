"use client";

import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  HiOutlinePlus,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { galleryItems, type GalleryItem } from "@/app/(public)/galeri/data";
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
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

const getTodayFormatted = (): string => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const now = new Date();
  return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
};

const extractYouTubeId = (urlOrId: string): string => {
  if (!urlOrId) return "";
  const trimmed = urlOrId.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
};

export default function AdminGaleriPage() {
  const [data, setData] = useState<GalleryItem[]>(galleryItems);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Form State
  const [formType, setFormType] = useState<"photo" | "video">("photo");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Ekstrakurikuler");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formYoutubeId, setFormYoutubeId] = useState("");
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formNewImage, setFormNewImage] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  // Derived YouTube ID preview
  const currentYoutubeId = extractYouTubeId(formYoutubeId);

  // Categories list derived from current data
  const categories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  );

  // Filter Data
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    const matchType =
      selectedType === "Semua" ||
      (selectedType === "Foto" && item.type === "photo") ||
      (selectedType === "Video" && item.type === "video");
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;

    return matchSearch && matchType && matchCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormType("photo");
    setFormTitle("");
    setFormCategory(categories[0] || "Ekstrakurikuler");
    setFormDate(getTodayFormatted());
    setFormDesc("");
    setFormYoutubeId("");
    setFormImages(["/img/pramuka.jpeg"]);
    setFormNewImage("");
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormType(item.type || "photo");
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDate(item.date);
    setFormDesc(item.desc);
    setFormYoutubeId(item.youtubeId || "");
    setFormImages(
      item.images && item.images.length > 0
        ? [...item.images]
        : item.src
        ? [item.src]
        : []
    );
    setFormNewImage("");
    setFormIsActive(item.isActive !== false);
    setIsModalOpen(true);
  };

  const handleAddImage = () => {
    if (!formNewImage.trim()) return;
    setFormImages((prev) => [...prev, formNewImage.trim()]);
    setFormNewImage("");
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleDelete = (item: GalleryItem) => {
    Swal.fire({
      title: "Hapus Galeri?",
      text: `Apakah Anda yakin ingin menghapus "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((g) => g.id !== item.id));
        Swal.fire({
          title: "Terhapus!",
          text: "Galeri kegiatan berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      Swal.fire({
        title: "Perhatian",
        text: "Judul kegiatan wajib diisi!",
        icon: "warning",
      });
      return;
    }

    const cleanYoutubeId =
      formType === "video" ? extractYouTubeId(formYoutubeId) : undefined;

    // Cover otomatis:
    // Jika video: ambil dari thumbnail YouTube
    // Jika foto: ambil dari gambar pertama di album
    let autoCover = "/img/pramuka.jpeg";
    if (formType === "video") {
      autoCover = cleanYoutubeId
        ? `https://img.youtube.com/vi/${cleanYoutubeId}/hqdefault.jpg`
        : "/img/pramuka.jpeg";
    } else {
      autoCover = formImages.length > 0 ? formImages[0] : "/img/pramuka.jpeg";
    }

    const finalImages =
      formType === "photo"
        ? formImages.length > 0
          ? formImages
          : [autoCover]
        : undefined;

    if (editingItem) {
      // Update
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                type: formType,
                title: formTitle.trim(),
                category: formCategory.trim(),
                date: formDate.trim() || getTodayFormatted(),
                desc: formDesc.trim(),
                src: autoCover,
                youtubeId: cleanYoutubeId,
                images: finalImages,
                isActive: formIsActive,
              }
            : item
        )
      );
      Swal.fire({
        title: "Berhasil!",
        text: "Galeri kegiatan berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // Create new
      const newItem: GalleryItem = {
        id: `galeri-${Date.now()}`,
        type: formType,
        title: formTitle.trim(),
        category: formCategory.trim(),
        date: formDate.trim() || getTodayFormatted(),
        desc: formDesc.trim(),
        src: autoCover,
        youtubeId: cleanYoutubeId,
        images: finalImages,
        isActive: formIsActive,
      };

      setData((prev) => [newItem, ...prev]);
      Swal.fire({
        title: "Berhasil!",
        text: "Galeri kegiatan baru berhasil ditambahkan.",
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
          Galeri Kegiatan
        </h1>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="shrink-0 gap-1.5 self-start sm:self-auto"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span>Tambah Galeri</span>
        </Button>
      </div>

      {/* Table Controls (Search & Filter) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari galeri kegiatan..."
      >
        <TableFilterSelect
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Semua">Semua Tipe</option>
          <option value="Foto">Foto</option>
          <option value="Video">Video</option>
        </TableFilterSelect>

        <TableFilterSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Semua">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </TableFilterSelect>
      </TableControls>

      {/* Table Section */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-12 text-center">No</TableHeaderCell>
            <TableHeaderCell>Judul Kegiatan</TableHeaderCell>
            <TableHeaderCell className="w-28 text-center">Tipe</TableHeaderCell>
            <TableHeaderCell>Deskripsi</TableHeaderCell>
            <TableHeaderCell className="w-36">Kategori</TableHeaderCell>
            <TableHeaderCell className="w-36">Media Info</TableHeaderCell>
            <TableHeaderCell className="w-32">Tanggal</TableHeaderCell>
            <TableHeaderCell className="w-28 text-center">Status</TableHeaderCell>
            <TableHeaderCell
              stickyRight
              className="w-28 text-center whitespace-nowrap"
            >
              Aksi
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center text-zinc-400">
                Tidak ada data galeri kegiatan yang ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item, index) => {
              const isVideo = item.type === "video";

              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center whitespace-nowrap">
                    {index + 1}
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={item.title}>
                    {item.title}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {isVideo ? (
                      <Badge variant="destructive" className="gap-1">
                        <HiOutlineVideoCamera className="h-3.5 w-3.5" />
                        Video
                      </Badge>
                    ) : (
                      <Badge variant="info" className="gap-1">
                        <HiOutlinePhoto className="h-3.5 w-3.5" />
                        Foto
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-sm truncate" title={item.desc}>
                    {item.desc}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.category}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {isVideo
                      ? "1 Video (YouTube)"
                      : `${item.images?.length || 1} Foto Album`}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item.date}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {item.isActive !== false ? (
                      <Badge variant="success">Aktif</Badge>
                    ) : (
                      <Badge variant="secondary">Nonaktif</Badge>
                    )}
                  </TableCell>
                  <TableCell
                    stickyRight
                    className="text-center whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <ActionButton
                        variant="edit"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit Galeri"
                      >
                        <HiOutlinePencilSquare className="h-4 w-4" />
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        onClick={() => handleDelete(item)}
                        title="Hapus Galeri"
                      >
                        <HiOutlineTrash className="h-4 w-4" />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Galeri Kegiatan" : "Tambah Galeri Kegiatan"}
        size="3xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Switch Tipe Media */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Tipe Media
            </label>
            <div>
              <ToggleSwitch
                checked={formType === "photo"}
                onChange={(isPhoto) => setFormType(isPhoto ? "photo" : "video")}
                labels={["Album Foto", "Video YouTube"]}
                size="md"
              />
            </div>
          </div>

          {/* Baris 1: Judul Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Judul Kegiatan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Contoh: Kegiatan Kepramukaan Santri"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            />
          </div>

          {/* Baris 2: Kategori & Tanggal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Kategori
              </label>
              <input
                type="text"
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="Contoh: Ekstrakurikuler, Kedisiplinan"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Tanggal Kegiatan
              </label>
              <input
                type="text"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                placeholder="Contoh: 18 Oktober 2026"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              />
            </div>
          </div>

          {/* Input Spesifik Tipe Video dengan Preview Otomatis */}
          {formType === "video" ? (
            <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Link atau ID YouTube <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formYoutubeId}
                  onChange={(e) => setFormYoutubeId(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... atau ID video (7okSQjjabgk)"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                  Sistem otomatis mendeteksi ID dan menghasilkan cover thumbnail dari video ini.
                </p>
              </div>

              {/* Kotak Preview Video Otomatis */}
              {currentYoutubeId && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Preview Video
                  </label>
                  <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-black shadow-sm dark:border-zinc-800">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentYoutubeId}`}
                      title="YouTube video preview"
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Input Spesifik Tipe Foto dengan Cover Otomatis dari Gambar Pertama */
            <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Foto Kegiatan Album ({formImages.length} Foto)
                  </label>
                  <span className="text-[11px] text-rose-600 italic dark:text-rose-400">
                    *Foto pertama akan menjadi cover utama
                  </span>
                </div>

                <div className="flex gap-2 mb-2.5">
                  <input
                    type="text"
                    value={formNewImage}
                    onChange={(e) => setFormNewImage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                    placeholder="Masukkan path/URL foto (contoh: /img/pramuka2.jpeg)"
                    className="flex-1 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAddImage}
                  >
                    Tambah Foto
                  </Button>
                </div>

                {/* List Foto Album dengan preview cover pertama */}
                {formImages.length > 0 && (
                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {formImages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between rounded-lg border p-2 text-xs transition ${
                          idx === 0
                            ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800/60 dark:bg-emerald-950/20"
                            : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                            <Image
                              src={img}
                              alt={`Foto ${idx + 1}`}
                              fill
                              sizes="32px"
                              className="object-cover"
                              unoptimized={img.startsWith("http")}
                            />
                          </div>
                          <span className="truncate font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                            {img}
                          </span>
                          {idx === 0 && (
                            <span className="shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                              Cover Utama
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="shrink-0 ml-2 text-zinc-400 hover:text-rose-600 transition"
                          title="Hapus foto"
                        >
                          <HiOutlineTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deskripsi Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Deskripsi Singkat
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              placeholder="Tuliskan keterangan singkat kegiatan..."
              className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            />
          </div>

          {/* Status Aktif */}
          <div className="flex items-center gap-2.5 pt-1">
            <ToggleSwitch
              checked={formIsActive}
              onChange={(val) => setFormIsActive(!!val)}
              size="sm"
            />
            <span
              onClick={() => setFormIsActive(!formIsActive)}
              className="text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
            >
              Tampilkan di Halaman Galeri Publik
            </span>
          </div>

          {/* Tombol Aksi Modal */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" size="sm">
              {editingItem ? "Simpan Perubahan" : "Tambah Galeri"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
