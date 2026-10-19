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
import type { StaffMemberRecord } from "@/lib/services/staff";
import PhotoZoomModal from "./components/PhotoZoomModal";

export default function AdminStaffPage() {
  const [data, setData] = useState<StaffMemberRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [zoomedStaff, setZoomedStaff] = useState<StaffMemberRecord | null>(null);

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
  const [editingItem, setEditingItem] = useState<StaffMemberRecord | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);

  // Server-Side Query dengan .range() dan count: "exact"
  const fetchData = useCallback(async () => {
    setLoading(true);
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("staff_members")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (debouncedSearch.trim()) {
      const q = `%${debouncedSearch.trim()}%`;
      query = query.or(`name.ilike.${q},subject.ilike.${q}`);
    }

    const { data: records, count, error } = await query;

    if (error) {
      Swal.fire({
        title: "Gagal Mengambil Data",
        text: error.message,
        icon: "error",
      });
    } else {
      setData((records as StaffMemberRecord[]) || []);
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  }, [currentPage, pageSize, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setSubject("");
    setPhotoPreview("");
    setPhotoFile(null);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StaffMemberRecord) => {
    setEditingItem(item);
    setName(item.name);
    setSubject(item.subject);
    setPhotoPreview(item.photo_url || "");
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

  const handleDelete = (item: StaffMemberRecord) => {
    Swal.fire({
      title: "Hapus Staff?",
      text: `Apakah Anda yakin ingin menghapus data "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("staff_members")
          .delete()
          .eq("id", item.id);

        if (error) {
          Swal.fire("Gagal Menghapus", error.message, "error");
        } else {
          Swal.fire({
            title: "Terhapus!",
            text: "Data staff berhasil dihapus.",
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

    if (!name.trim() || !subject.trim()) {
      Swal.fire("Perhatian", "Nama lengkap dan jabatan/tugas wajib diisi.", "warning");
      return;
    }

    const confirmResult = await Swal.fire({
      title: editingItem ? "Simpan Perubahan?" : "Tambah Staff?",
      text: editingItem
        ? `Perbarui data staff "${name.trim()}"?`
        : `Tambahkan "${name.trim()}" ke daftar staff?`,
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
      let finalPhotoUrl: string | null = photoPreview.startsWith("blob:")
        ? null
        : photoPreview || null;

      // Jika ada berkas baru, kompresi dan upload ke Supabase Storage
      if (photoFile) {
        try {
          const publicUrl = await uploadMediaFile(photoFile, "staff", "media");
          finalPhotoUrl = publicUrl;
        } catch (uploadErr: unknown) {
          setIsSubmitting(false);
          const msg =
            uploadErr instanceof Error
              ? uploadErr.message
              : "Gagal mengunggah foto profil.";
          Swal.fire("Gagal Upload Foto", msg, "error");
          return;
        }
      }

      if (editingItem) {
        const { error } = await supabase
          .from("staff_members")
          .update({
            name: name.trim(),
            subject: subject.trim(),
            photo_url: finalPhotoUrl,
            is_active: isActive,
          })
          .eq("id", editingItem.id);

        if (error) {
          Swal.fire("Gagal Memperbarui", error.message, "error");
        } else {
          Swal.fire({
            title: "Berhasil!",
            text: "Data staff berhasil diperbarui.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
          fetchData();
        }
      } else {
        const { error } = await supabase.from("staff_members").insert({
          name: name.trim(),
          subject: subject.trim(),
          photo_url: finalPhotoUrl,
          is_active: isActive,
        });

        if (error) {
          Swal.fire("Gagal Menyimpan", error.message, "error");
        } else {
          Swal.fire({
            title: "Tersimpan!",
            text: "Staff baru berhasil ditambahkan.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
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
          Staff & Tendik
        </h1>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="shrink-0 gap-1.5 self-start sm:self-auto"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span>Tambah Staff</span>
        </Button>
      </div>

      {/* Table Controls (Pencarian & Baris Per Halaman) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari staff..."
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* Tabel Data Staff */}
      {loading ? (
        <TableSkeleton rows={6} cols={5} hasAvatar />
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
              <TableHeaderCell className="whitespace-nowrap">
                Jabatan / Tugas
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-zinc-400">
                  Tidak ada data staff yang sesuai dengan pencarian.
                </TableCell>
              </TableRow>
            ) : (
            data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center whitespace-nowrap">
                  {(currentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.name}>
                  <div className="flex items-center gap-2.5">
                    {item.photo_url ? (
                      <button
                        type="button"
                        onClick={() => setZoomedStaff(item)}
                        className="group relative rounded-full transition-all hover:scale-110 hover:ring-2 hover:ring-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95 cursor-pointer"
                        title={`Perbesar foto ${item.name}`}
                      >
                        <Avatar name={item.name} photo={item.photo_url} size="smedium" />
                      </button>
                    ) : (
                      <Avatar name={item.name} photo={item.photo_url} size="smedium" />
                    )}
                    <span className="truncate">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.subject}>
                  {item.subject}
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
                      title="Edit Staff"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(item)}
                      title="Hapus Staff"
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

      {!loading && totalCount > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Modal Form Tambah / Ubah Staff */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        title={editingItem ? "Edit Staff" : "Tambah Staff"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap & Status */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Nama Lengkap & Gelar <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: H. Ahmad Nawawi, S.Pd.I"
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

          {/* Jabatan / Tugas Mengajar */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Jabatan / Tugas Mengajar <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Kepala Madrasah & Tahfidz"
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Foto Profil (File Picker) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Foto Profil <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <div className="flex items-center gap-4 rounded border border-zinc-200 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <Avatar name={name || "Staff"} photo={photoPreview} size="medium" />
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

          {/* Footer Tombol Modal */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={isSubmitting}
              onClick={() => setIsModalOpen(false)}
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
                ? "Menyimpan..."
                : editingItem
                ? "Simpan Perubahan"
                : "Tambah Staff"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Zoom Foto Staff */}
      <PhotoZoomModal
        isOpen={!!zoomedStaff}
        onClose={() => setZoomedStaff(null)}
        name={zoomedStaff?.name || ""}
        photoUrl={zoomedStaff?.photo_url || null}
        subject={zoomedStaff?.subject}
      />
    </div>
  );
}
