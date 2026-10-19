"use client";

import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabase/client";
import type { CalendarEventRecord, EventCategory } from "@/lib/services/calendar";

const formatDateDisplay = (startDate: string, endDate?: string | null): string => {
  if (!startDate) return "-";

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("id-ID", options);

  if (endDate && endDate !== startDate) {
    const end = new Date(endDate);
    const endStr = end.toLocaleDateString("id-ID", options);
    return `${startStr} - ${endStr}`;
  }

  return startStr;
};

export default function AdminKalenderPage() {
  const [data, setData] = useState<CalendarEventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CalendarEventRecord | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("Akademik");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const categories: EventCategory[] = ["Akademik", "Kegiatan", "Hari Libur"];

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      const { data: records, error } = await supabase
        .from("academic_calendar")
        .select("*")
        .order("start_date", { ascending: true });

      if (ignore) return;
      if (error) {
        setLoadError(error.message);
        Swal.fire("Error Database", "Gagal memuat agenda: " + error.message, "error");
      } else {
        setData((records as CalendarEventRecord[]) || []);
      }
      setIsLoading(false);
    };

    void load();
    return () => {
      ignore = true;
    };
  }, []);

  // Filter Data (Global Search & Category)
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      ((item.description || "").toLowerCase().includes(search.toLowerCase()));
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Akademik");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CalendarEventRecord) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setStartDate(item.start_date);
    setEndDate(item.end_date || "");
    setDescription(item.description || "");
    setIsModalOpen(true);
  };

  const handleDelete = (item: CalendarEventRecord) => {
    Swal.fire({
      title: "Hapus Agenda?",
      text: `Apakah Anda yakin ingin menghapus agenda "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("academic_calendar")
          .delete()
          .eq("id", item.id);

        if (error) {
          Swal.fire("Gagal", "Gagal menghapus agenda: " + error.message, "error");
          return;
        }

        setData((prev) => prev.filter((a) => a.id !== item.id));
        Swal.fire({
          title: "Terhapus!",
          text: "Agenda berhasil dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !startDate) {
      Swal.fire("Perhatian", "Nama agenda dan tanggal mulai wajib diisi.", "warning");
      return;
    }

    if (endDate && new Date(endDate) < new Date(startDate)) {
      Swal.fire("Perhatian", "Tanggal selesai tidak boleh lebih awal dari tanggal mulai.", "warning");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Konfirmasi Simpan",
      text: editingItem
        ? "Apakah Anda yakin ingin memperbarui agenda ini?"
        : "Apakah Anda yakin ingin menambahkan agenda baru ini?",
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
      const { data: updated, error } = await supabase
        .from("academic_calendar")
        .update({
          title: title.trim(),
          category,
          start_date: startDate,
          end_date: endDate ? endDate : null,
          description: description.trim() || null,
        })
        .eq("id", editingItem.id)
        .select()
        .single();

      setIsSubmitting(false);

      if (error) {
        Swal.fire("Gagal", "Gagal memperbarui agenda: " + error.message, "error");
        return;
      }

      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? (updated as CalendarEventRecord) : item
        )
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Agenda berhasil diperbarui.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const { data: created, error } = await supabase
        .from("academic_calendar")
        .insert({
          title: title.trim(),
          category,
          start_date: startDate,
          end_date: endDate ? endDate : null,
          description: description.trim() || null,
        })
        .select()
        .single();

      setIsSubmitting(false);

      if (error) {
        Swal.fire("Gagal", "Gagal menambahkan agenda: " + error.message, "error");
        return;
      }

      setData((prev) => [...prev, created as CalendarEventRecord]);

      Swal.fire({
        title: "Tersimpan!",
        text: "Agenda baru berhasil ditambahkan.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Kalender Pendidikan
        </h1>
        <Button
          onClick={handleOpenAdd}
          size="sm"
          className="shrink-0 gap-1.5 self-start sm:self-auto"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span>Tambah Agenda</span>
        </Button>
      </div>

      {/* Table Controls (Pencarian, Filter & Baris Per Halaman) */}
      <TableControls
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Cari agenda..."
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      >
        <TableFilterSelect
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
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

      {/* Error Alert */}
      {loadError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          Gagal mengambil data dari database: {loadError}
        </div>
      )}

      {/* Tabel Data Agenda */}
      {isLoading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-12 text-center whitespace-nowrap">
                No
              </TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">
                Nama Agenda
              </TableHeaderCell>
              <TableHeaderCell className="w-32 text-center whitespace-nowrap">
                Kategori
              </TableHeaderCell>
              <TableHeaderCell className="w-48 whitespace-nowrap">
                Waktu Pelaksanaan
              </TableHeaderCell>
              <TableHeaderCell className="whitespace-nowrap">
                Keterangan
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
                  Tidak ada agenda yang sesuai dengan pencarian.
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
                  <Badge variant="outline">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDateDisplay(item.start_date, item.end_date)}
                </TableCell>
                <TableCell className="max-w-sm truncate" title={item.description || ""}>
                  {item.description || "-"}
                </TableCell>
                <TableCell stickyRight className="text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <ActionButton
                      variant="edit"
                      onClick={() => handleOpenEdit(item)}
                      title="Edit Agenda"
                    >
                      <HiOutlinePencilSquare className="h-4 w-4" />
                    </ActionButton>
                    <ActionButton
                      variant="delete"
                      onClick={() => handleDelete(item)}
                      title="Hapus Agenda"
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

      {/* Modal Form Tambah / Ubah Agenda */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Agenda" : "Tambah Agenda"}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Agenda */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Nama Agenda <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Penilaian Tengah Semester (PTS) Ganjil"
              className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Kategori, Tanggal Mulai, Tanggal Selesai */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
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
                Tanggal Mulai <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1.5 w-full rounded border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* Keterangan */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Keterangan
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Catatan pelaksanaan atau detail agenda..."
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
                : "Tambah Agenda"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
