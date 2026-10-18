"use client";

import { useState } from "react";
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
} from "@/components/ui/Table";
import Modal from "@/app/components/modal";
import {
  staffMembersData,
  type StaffMember,
} from "@/app/(public)/profil/staffData";

export default function AdminStaffPage() {
  const [data, setData] = useState<StaffMember[]>(staffMembersData);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StaffMember | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Filter Data
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setSubject("");
    setPhoto("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StaffMember) => {
    setEditingItem(item);
    setName(item.name);
    setSubject(item.subject);
    setPhoto(item.photo || "");
    setIsActive(item.isActive);
    setIsModalOpen(true);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire("Perhatian", "Berkas yang dipilih harus berupa gambar.", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (item: StaffMember) => {
    Swal.fire({
      title: "Hapus Staff?",
      text: `Apakah Anda yakin ingin menghapus data "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((a) => a.id !== item.id));
        Swal.fire({
          title: "Terhapus!",
          text: "Data staff berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !subject.trim()) {
      Swal.fire("Perhatian", "Nama lengkap dan jabatan/tugas wajib diisi.", "warning");
      return;
    }

    if (editingItem) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: name.trim(),
                subject: subject.trim(),
                photo: photo.trim() || null,
                isActive,
              }
            : item
        )
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Data staff berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const newItem: StaffMember = {
        id: `staff-${Date.now()}`,
        name: name.trim(),
        subject: subject.trim(),
        photo: photo.trim() || null,
        isActive,
      };

      setData((prev) => [newItem, ...prev]);

      Swal.fire({
        title: "Tersimpan!",
        text: "Staff baru berhasil ditambahkan.",
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

      {/* Table Controls (Pencarian) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari staff..."
      />

      {/* Tabel Data Staff */}
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
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-zinc-400">
                Tidak ada data staff yang sesuai dengan pencarian.
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center whitespace-nowrap">
                  {idx + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.name}>
                  {item.name}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.subject}>
                  {item.subject}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant={item.isActive ? "success" : "secondary"}>
                    {item.isActive ? "Aktif" : "Tidak Aktif"}
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

      {/* Modal Form Tambah / Ubah Staff */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
              Foto Profil (Opsional)
            </label>
            <div className="flex items-center gap-4 rounded border border-zinc-200 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <Avatar name={name || "Staff"} photo={photo} size="medium" />
              <div className="flex-1 space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="block w-full text-xs text-zinc-500 file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-zinc-800 dark:file:text-zinc-200 dark:hover:file:bg-zinc-700"
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Mendukung file JPG, PNG, atau WebP</span>
                  {photo && (
                    <button
                      type="button"
                      onClick={() => setPhoto("")}
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
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingItem ? "Simpan Perubahan" : "Tambah Staff"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
