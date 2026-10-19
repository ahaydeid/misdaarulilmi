"use client";

import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  HiOutlinePlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ActionButton } from "@/components/ui/ActionButton";
import Avatar from "@/components/ui/Avatar";
import {
  Table,
  TableControls,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TablePagination,
} from "@/components/ui/Table";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import Modal from "@/app/components/modal";
import { supabase } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/services/storage";
import type { TestimonialRecord } from "@/lib/services/testimonial";

export default function AdminTestimoniPage() {
  const [data, setData] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialRecord | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: records, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      Swal.fire({
        title: "Gagal Mengambil Data",
        text: error.message,
        icon: "error",
      });
    } else {
      setData((records as TestimonialRecord[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter Data (Global Search)
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.quote.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setRole("");
    setQuote("");
    setPhotoPreview("");
    setPhotoFile(null);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialRecord) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setQuote(item.quote);
    setPhotoPreview(item.avatar_url || "");
    setPhotoFile(null);
    setIsActive(item.is_active);
    setIsModalOpen(true);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire("Perhatian", "Berkas yang dipilih harus berupa gambar.", "warning");
      return;
    }

    setPhotoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPhotoPreview(objectUrl);
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview("");
  };

  const handleCloseModal = () => {
    if (isSubmitting) return;
    if (photoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (item: TestimonialRecord) => {
    Swal.fire({
      title: "Hapus Testimoni?",
      text: `Apakah Anda yakin ingin menghapus ulasan dari "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("testimonials")
          .delete()
          .eq("id", item.id);

        if (error) {
          Swal.fire("Gagal Menghapus", error.message, "error");
        } else {
          Swal.fire({
            title: "Terhapus!",
            text: "Testimoni berhasil dihapus.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchData();
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !quote.trim()) {
      Swal.fire("Perhatian", "Semua kolom wajib diisi.", "warning");
      return;
    }

    const confirmResult = await Swal.fire({
      title: editingItem ? "Simpan Perubahan?" : "Tambah Testimoni?",
      text: editingItem
        ? `Perbarui ulasan dari "${name.trim()}"?`
        : `Tambahkan testimoni baru dari "${name.trim()}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    setIsSubmitting(true);

    try {
      let finalAvatarUrl: string | null = photoPreview.startsWith("blob:")
        ? null
        : photoPreview || null;

      // Unggah foto baru ke Supabase Storage hanya setelah konfirmasi
      if (photoFile) {
        try {
          const publicUrl = await uploadMediaFile(photoFile, "testimonials", "media");
          finalAvatarUrl = publicUrl;
        } catch (uploadErr: unknown) {
          setIsSubmitting(false);
          const msg =
            uploadErr instanceof Error
              ? uploadErr.message
              : "Gagal mengunggah foto profil testimoni.";
          Swal.fire("Gagal Upload Foto", msg, "error");
          return;
        }
      }

      if (editingItem) {
        const { error } = await supabase
          .from("testimonials")
          .update({
            name: name.trim(),
            role: role.trim(),
            quote: quote.trim(),
            avatar_url: finalAvatarUrl,
            is_active: isActive,
          })
          .eq("id", editingItem.id);

        if (error) {
          Swal.fire("Gagal Memperbarui", error.message, "error");
        } else {
          Swal.fire({
            title: "Berhasil!",
            text: "Testimoni berhasil diperbarui.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          handleCloseModal();
          fetchData();
        }
      } else {
        const { error } = await supabase.from("testimonials").insert({
          name: name.trim(),
          role: role.trim(),
          quote: quote.trim(),
          avatar_url: finalAvatarUrl,
          is_active: isActive,
        });

        if (error) {
          Swal.fire("Gagal Menyimpan", error.message, "error");
        } else {
          Swal.fire({
            title: "Tersimpan!",
            text: "Testimoni baru berhasil ditambahkan.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          handleCloseModal();
          fetchData();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan tidak terduga";
      Swal.fire("Terjadi Kesalahan", msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Tanpa Pembungkus & Subjudul */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Testimoni
        </h1>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="shrink-0 gap-1.5 self-start sm:self-auto"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span>Tambah Testimoni</span>
        </Button>
      </div>

      {/* Table Controls (Pencarian & Baris Per Halaman) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Cari testimoni..."
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* Tabel Data Testimoni */}
      {loading ? (
        <TableSkeleton rows={5} cols={6} hasAvatar />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-12 text-center whitespace-nowrap">
                No
              </TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">
                Nama Lengkap
              </TableHeaderCell>
              <TableHeaderCell className="w-48 whitespace-nowrap">
                Peran / Keterangan
              </TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">
                Isi Testimoni
              </TableHeaderCell>
              <TableHeaderCell className="w-28 text-center whitespace-nowrap">
                Status
              </TableHeaderCell>
              <TableHeaderCell
                stickyRight
                className="w-24 text-center whitespace-nowrap"
              >
                Aksi
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-zinc-400">
                  Tidak ada data testimoni yang sesuai dengan pencarian.
                </TableCell>
              </TableRow>
            ) : (
            paginatedData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center whitespace-nowrap">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.name}>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={item.name} photo={item.avatar_url} size="smedium" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.role}
                </TableCell>
                <TableCell className="max-w-md truncate" title={item.quote}>
                  &ldquo;{item.quote}&rdquo;
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant={item.is_active ? "success" : "secondary"}>
                    {item.is_active ? "Aktif" : "Tidak Aktif"}
                  </Badge>
                </TableCell>
                <TableCell stickyRight className="text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <ActionButton
                      variant="edit"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Testimoni"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(item)}
                      title="Hapus Testimoni"
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

      {!loading && filteredData.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal Form Tambah / Ubah Testimoni */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? "Edit Testimoni" : "Tambah Testimoni"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Nurhasanah"
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
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
          </div>

          {/* Peran / Keterangan Wali */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Peran / Keterangan Wali <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Contoh: Wali Murid Kelas II atau Alumni"
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Foto Profil (Opsional) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Foto Profil <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <div className="flex items-center gap-4 rounded border border-zinc-200 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <Avatar name={name || "Wali"} photo={photoPreview} size="medium" />
              <div className="flex-1 space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="block w-full text-xs text-zinc-500 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-zinc-800 dark:file:text-zinc-200 dark:hover:file:bg-zinc-700"
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Otomatis dikompresi ke WebP sebelum diunggah</span>
                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="text-rose-500 hover:text-rose-600 transition cursor-pointer"
                    >
                      Hapus Foto
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Isi Testimoni */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Isi Testimoni / Kutipan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Tulis ulasan, kesan, atau pesan pengalaman belajar di madrasah..."
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Footer Tombol Modal */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={isSubmitting}
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Menyimpan & Mengunggah..."
                : editingItem
                ? "Simpan Perubahan"
                : "Tambah Testimoni"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
