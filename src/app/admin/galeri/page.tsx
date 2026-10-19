"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  HiOutlinePlus,
  HiOutlinePhoto,
  HiOutlineVideoCamera,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";
import { supabase } from "@/lib/supabase/client";
import type { GalleryItemRecord } from "@/lib/services/gallery";
import { uploadMediaFile } from "@/lib/services/storage";
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

interface GalleryFormImage {
  id: string;
  file?: File;
  previewUrl: string;
  name: string;
}

export default function AdminGaleriPage() {
  const [data, setData] = useState<GalleryItemRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Debounce search agar tidak query database setiap ketikan
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemRecord | null>(null);

  // Form State
  const [formType, setFormType] = useState<"photo" | "video">("photo");
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Ekstrakurikuler");
  const [formDesc, setFormDesc] = useState("");
  const [formYoutubeId, setFormYoutubeId] = useState("");
  const [formImages, setFormImages] = useState<GalleryFormImage[]>([]);
  const [formIsActive, setFormIsActive] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived YouTube ID preview
  const currentYoutubeId = extractYouTubeId(formYoutubeId);

  // Categories list
  const defaultCategories = ["Ekstrakurikuler", "Kegiatan", "Upacara", "Prestasi", "Video Profil"];
  const dynamicCategories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  );
  const categories = Array.from(new Set([...defaultCategories, ...dynamicCategories]));

  // Server-Side Query dengan .range() dan count: "exact"
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("gallery_items")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (debouncedSearch.trim()) {
      const q = `%${debouncedSearch.trim()}%`;
      query = query.or(`title.ilike.${q},desc.ilike.${q}`);
    }

    if (selectedType === "Foto") {
      query = query.eq("type", "photo");
    } else if (selectedType === "Video") {
      query = query.eq("type", "video");
    }

    if (selectedCategory !== "Semua") {
      query = query.eq("category", selectedCategory);
    }

    const { data: records, count, error } = await query;

    if (error) {
      setLoadError(error.message);
      Swal.fire("Error Database", "Gagal memuat galeri: " + error.message, "error");
    } else {
      setData(records || []);
      setTotalCount(count ?? 0);
      setLoadError(null);
    }
    setIsLoading(false);
  }, [currentPage, pageSize, debouncedSearch, selectedType, selectedCategory]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormType("photo");
    setFormTitle("");
    setFormCategory(categories[0] || "Ekstrakurikuler");
    setFormDesc("");
    setFormYoutubeId("");
    setFormImages([]);
    setFormIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItemRecord) => {
    setEditingItem(item);
    setFormType(item.type || "photo");
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDesc(item.desc || "");
    setFormYoutubeId(item.youtube_id || "");
    const rawImages =
      item.images && item.images.length > 0
        ? item.images
        : item.src
        ? [item.src]
        : [];
    setFormImages(
      rawImages.map((url, i) => ({
        id: `existing-${i}-${url}`,
        previewUrl: url,
        name: url.split("/").pop() || url,
      }))
    );
    setFormIsActive(item.is_active);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    formImages.forEach((img) => {
      if (img.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    setIsModalOpen(false);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages((prev) => {
      const target = prev[indexToRemove];
      if (target?.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((_, idx) => idx !== indexToRemove);
    });
  };

  // Pilih file foto secara lokal (maksimal 5 foto per album)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const MAX_PHOTOS = 5;
    if (formImages.length >= MAX_PHOTOS) {
      Swal.fire(
        "Batas Maksimal Tercapai",
        "Maksimal 5 foto per album kegiatan. Hapus salah satu foto terlebih dahulu jika ingin mengganti.",
        "warning"
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) {
      Swal.fire("Format Tidak Sesuai", "Pilih file berformat gambar (JPG, PNG, WebP).", "warning");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const remainingSlots = MAX_PHOTOS - formImages.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (validFiles.length > remainingSlots) {
      Swal.fire(
        "Batas 5 Foto",
        `Hanya ${remainingSlots} foto yang ditambahkan karena batas maksimal adalah ${MAX_PHOTOS} foto per album.`,
        "info"
      );
    }

    const newEntries: GalleryFormImage[] = filesToAdd.map((file, i) => ({
      id: `staged-${Date.now()}-${i}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    }));

    setFormImages((prev) => [...prev, ...newEntries]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (item: GalleryItemRecord) => {
    Swal.fire({
      title: "Hapus Galeri?",
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
          .from("gallery_items")
          .delete()
          .eq("id", item.id);

        if (error) {
          Swal.fire("Gagal", "Gagal menghapus: " + error.message, "error");
          return;
        }

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      Swal.fire("Perhatian", "Judul kegiatan wajib diisi!", "warning");
      return;
    }

    const cleanYoutubeId =
      formType === "video" ? extractYouTubeId(formYoutubeId) : null;

    if (formType === "photo" && formImages.length === 0) {
      Swal.fire("Perhatian", "Pilih minimal 1 foto kegiatan untuk album foto.", "warning");
      return;
    }

    if (formType === "photo" && formImages.length > 5) {
      Swal.fire("Batas Maksimal", "Maksimal 5 foto per album kegiatan.", "warning");
      return;
    }

    if (formType === "video" && !cleanYoutubeId) {
      Swal.fire("Perhatian", "Masukkan link atau ID video YouTube yang valid.", "warning");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Simpan",
      text: editingItem
        ? "Apakah Anda yakin ingin memperbarui galeri kegiatan ini?"
        : "Apakah Anda yakin ingin menambahkan galeri kegiatan baru ini?",
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

    try {
      // Unggah hanya foto baru ke Supabase Storage pada saat ini
      const uploadedUrls: string[] = [];
      if (formType === "photo") {
        for (const img of formImages) {
          if (img.file) {
            const publicUrl = await uploadMediaFile(img.file, "gallery", "media");
            uploadedUrls.push(publicUrl);
          } else {
            uploadedUrls.push(img.previewUrl);
          }
        }
      }

      const finalImages = formType === "photo" ? uploadedUrls : [];

      let autoCover = "";
      if (formType === "video") {
        autoCover = cleanYoutubeId
          ? `https://img.youtube.com/vi/${cleanYoutubeId}/hqdefault.jpg`
          : "";
      } else {
        autoCover = finalImages.length > 0 ? finalImages[0] : "";
      }

      if (editingItem) {
        // Update
        const { data: updated, error } = await supabase
          .from("gallery_items")
          .update({
            type: formType,
            title: formTitle.trim(),
            category: formCategory.trim(),
            date: editingItem.date || getTodayFormatted(),
            desc: formDesc.trim(),
            src: autoCover,
            youtube_id: cleanYoutubeId,
            images: finalImages,
            is_active: formIsActive,
          })
          .eq("id", editingItem.id)
          .select()
          .single();

        setIsSubmitting(false);

        if (error) {
          Swal.fire("Gagal", "Gagal memperbarui: " + error.message, "error");
          return;
        }

        setData((prev) =>
          prev.map((item) => (item.id === editingItem.id ? (updated as GalleryItemRecord) : item))
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
        const { data: created, error } = await supabase
          .from("gallery_items")
          .insert({
            type: formType,
            title: formTitle.trim(),
            category: formCategory.trim(),
            date: getTodayFormatted(),
            desc: formDesc.trim(),
            src: autoCover,
            youtube_id: cleanYoutubeId,
            images: finalImages,
            is_active: formIsActive,
          })
          .select()
          .single();

        setIsSubmitting(false);

        if (error) {
          Swal.fire("Gagal", "Gagal menambahkan: " + error.message, "error");
          return;
        }

        setData((prev) => [created as GalleryItemRecord, ...prev]);

        Swal.fire({
          title: "Berhasil!",
          text: "Galeri kegiatan baru berhasil ditambahkan.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      // Bersihkan blob URLs
      formImages.forEach((img) => {
        if (img.previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
      setIsModalOpen(false);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga saat menyimpan";
      Swal.fire("Gagal Menyimpan", msg, "error");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
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

      {/* Table Controls (Search, Filter & Baris Per Halaman) */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari galeri kegiatan..."
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      >
        <TableFilterSelect
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Semua">Semua</option>
          <option value="Foto">Foto</option>
          <option value="Video">Video</option>
        </TableFilterSelect>

        <TableFilterSelect
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="Semua">Semua</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </TableFilterSelect>
      </TableControls>

      {/* Error Banner */}
      {loadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          Gagal mengambil data dari database: {loadError}
        </div>
      )}

      {/* Table Section */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={9} />
      ) : (
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-zinc-400">
                  Tidak ada galeri kegiatan yang sesuai dengan pencarian.
                </TableCell>
              </TableRow>
            ) : (
            data.map((item, index) => {
              const isVideo = item.type === "video";
              const coverThumb =
                item.src || (item.images && item.images[0]) || "/img/pramuka.jpeg";

              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center whitespace-nowrap">
                    {(currentPage - 1) * pageSize + index + 1}
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
                  <TableCell
                    className="max-w-xs truncate text-zinc-500 dark:text-zinc-400"
                    title={item.desc || ""}
                  >
                    {item.desc || "-"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="relative h-9 w-12 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                        <Image
                          src={coverThumb}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized={coverThumb.startsWith("http")}
                        />
                      </div>
                      <span className="text-xs text-zinc-500">
                        {isVideo
                          ? "YouTube"
                          : `${item.images?.length || 1} Foto`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-zinc-500">
                    {item.date}
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {item.is_active ? (
                      <Badge variant="success">Aktif</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell stickyRight className="text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <ActionButton
                        variant="edit"
                        title="Edit Galeri"
                        onClick={() => handleOpenEdit(item)}
                      >
                        <HiOutlinePencilSquare className="h-4 w-4" />
                      </ActionButton>
                      <ActionButton
                        variant="delete"
                        title="Hapus Galeri"
                        onClick={() => handleDelete(item)}
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
      )}

      {!isLoading && totalCount > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal Form Tambah / Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Galeri Kegiatan" : "Tambah Galeri Kegiatan"}
        size="2xl"
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {/* Tipe Media ToggleSwitch */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Tipe Media
            </label>
            <ToggleSwitch
              checked={formType === "photo"}
              onChange={(isPhoto) => setFormType(isPhoto ? "photo" : "video")}
              labels={["Album Foto", "Video YouTube"]}
              size="sm"
            />
          </div>

          {/* Judul Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Judul Kegiatan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Contoh: Latihan Gabungan Pramuka Penggalang"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            />
          </div>

          {/* Kategori Kegiatan (Full Width) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Kategori Kegiatan
            </label>
            <input
              type="text"
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
              placeholder="Contoh: Ekstrakurikuler"
              list="galeri-categories"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
            />
            <datalist id="galeri-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Input Spesifik Tipe Video */}
          {formType === "video" ? (
            <div className="space-y-3 rounded-xl bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  URL Video atau ID YouTube <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formYoutubeId}
                  onChange={(e) => setFormYoutubeId(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=7okSQjjabgk atau 7okSQjjabgk"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </div>

              {/* Preview Player YouTube */}
              {currentYoutubeId && (
                <div className="pt-1">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}`}
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
            /* Input Spesifik Tipe Foto dengan Upload File Storage */
            <div className="space-y-3 rounded-xl bg-zinc-50/60 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/60">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Foto Album Kegiatan ({formImages.length}/5 Foto)
                  </label>
                  <span className="text-[11px] text-rose-600 italic dark:text-rose-400">
                    *Maksimal 5 foto, foto pertama menjadi cover utama
                  </span>
                </div>

                {/* Upload Button */}
                <div className="mb-2.5 flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="galeri-file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isSubmitting || formImages.length >= 5}
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-1.5 bg-white dark:bg-zinc-900 border-dashed hover:border-emerald-500 disabled:opacity-50"
                  >
                    <HiOutlineArrowUpTray className="h-4 w-4 text-emerald-600" />
                    <span>
                      {formImages.length >= 5
                        ? "Batas Maksimal (5/5)"
                        : "Pilih Foto"}
                    </span>
                  </Button>
                  {formImages.length >= 5 && (
                    <span className="text-xs text-zinc-500">
                      Maksimal 5 foto telah terpenuhi
                    </span>
                  )}
                </div>

                {/* List Foto Album */}
                {formImages.length > 0 && (
                  <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {formImages.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`flex items-center justify-between rounded-lg border p-2 text-xs transition ${
                          idx === 0
                            ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-800/60 dark:bg-emerald-950/20"
                            : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                            <Image
                              src={img.previewUrl}
                              alt={`Foto ${idx + 1}`}
                              fill
                              sizes="32px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <span className="truncate font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                            {img.name}
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
              Publish
            </span>
          </div>

          {/* Tombol Aksi Modal */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Menyimpan & Mengunggah..."
                : editingItem
                ? "Simpan Perubahan"
                : "Tambah Galeri"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
