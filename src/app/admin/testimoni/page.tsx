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
  testimonialsData,
  type TestimonialItem,
} from "@/app/(public)/components/beranda/testimoniData";

export default function AdminTestimoniPage() {
  const [data, setData] = useState<TestimonialItem[]>(testimonialsData);
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Filter Data
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.quote.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setRole("");
    setQuote("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setQuote(item.quote);
    setIsActive(item.isActive);
    setIsModalOpen(true);
  };

  const handleDelete = (item: TestimonialItem) => {
    Swal.fire({
      title: "Hapus Testimoni?",
      text: `Apakah Anda yakin ingin menghapus ulasan dari "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((t) => t.id !== item.id));
        Swal.fire({
          title: "Terhapus!",
          text: "Testimoni berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !quote.trim()) {
      Swal.fire("Perhatian", "Semua kolom wajib diisi.", "warning");
      return;
    }

    if (editingItem) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: name.trim(),
                role: role.trim(),
                quote: quote.trim(),
                isActive,
              }
            : item
        )
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Testimoni berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const newItem: TestimonialItem = {
        id: `testi-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        quote: quote.trim(),
        isActive,
      };

      setData((prev) => [newItem, ...prev]);

      Swal.fire({
        title: "Tersimpan!",
        text: "Testimoni baru berhasil ditambahkan.",
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

      {/* Table Controls (Pencarian) Standar */}
      <TableControls
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari testimoni..."
      />

      {/* Tabel Data Testimoni */}
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
            filteredData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center whitespace-nowrap">
                  {idx + 1}
                </TableCell>
                <TableCell className="max-w-xs truncate" title={item.name}>
                  {item.name}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {item.role}
                </TableCell>
                <TableCell className="max-w-md truncate" title={item.quote}>
                  &ldquo;{item.quote}&rdquo;
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

      {/* Modal Form Tambah / Ubah Testimoni */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Testimoni" : "Tambah Testimoni"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Lengkap & Peran */}
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
              placeholder="Contoh: Wali Santri Kelas II atau Alumni"
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
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
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingItem ? "Simpan Perubahan" : "Tambah Testimoni"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
