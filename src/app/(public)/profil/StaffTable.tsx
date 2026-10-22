"use client";

import { useState, useMemo } from "react";
import type { StaffMemberRecord } from "@/lib/services/staff";
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

interface StaffTableProps {
  staff: StaffMemberRecord[];
}

export default function StaffTable({ staff }: StaffTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter staff berdasarkan nama atau tugas/mapel secara instan di klien
  const filteredStaff = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return staff;
    return staff.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query);
      const matchSubject = (item.subject || "").toLowerCase().includes(query);
      return matchName || matchSubject;
    });
  }, [staff, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / pageSize));

  // Amankan halaman aktif jika filter mengubah jumlah total halaman
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedStaff = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredStaff.slice(start, start + pageSize);
  }, [filteredStaff, safeCurrentPage, pageSize]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  if (!staff || staff.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Kontrol Pencarian dan Jumlah Baris */}
      <TableControls
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Cari nama guru atau tugas..."
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Tabel Guru */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="w-14 text-center whitespace-nowrap">
              No
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap">
              Nama Lengkap
            </TableHeaderCell>
            <TableHeaderCell className="whitespace-nowrap">
              Mata Pelajaran / Tugas
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedStaff.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="py-8 text-center text-zinc-400">
                Tidak ada data guru yang sesuai dengan &ldquo;{searchTerm}&rdquo;
              </TableCell>
            </TableRow>
          ) : (
            paginatedStaff.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                  {(safeCurrentPage - 1) * pageSize + idx + 1}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={item.name}
                      photo={item.photo_url}
                      size="smedium"
                    />
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-300">
                  {item.subject || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Paginasi (< dan >) */}
      {filteredStaff.length > 0 && (
        <TablePagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
