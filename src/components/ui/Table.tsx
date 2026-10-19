import React from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-hidden rounded border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="overflow-x-auto thin-scroll">
        <table className={`w-full border-collapse text-left text-sm text-zinc-700 dark:text-zinc-300 ${className || ""}`} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

interface TableControlsProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  children?: React.ReactNode;
  className?: string;
}

export function TableControls({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Cari...",
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  children,
  className = "",
}: TableControlsProps) {
  return (
    <div className={`flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        {onPageSizeChange !== undefined && (
          <div className="relative">
            <select
              aria-label="Jumlah baris per halaman"
              value={pageSize ?? 10}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="appearance-none rounded-full border border-zinc-200 bg-white py-1.5 pl-3 pr-7 text-xs font-medium text-zinc-700 outline-none transition hover:border-zinc-300 focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700 dark:focus:border-emerald-500 cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <HiOutlineChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-400" />
          </div>
        )}
        {onSearchChange !== undefined && (
          <div className="relative w-48 sm:w-64">
            <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm || ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-white py-1.5 pl-8 pr-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-emerald-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function TableFilterSelect({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`px-3 py-1.5 text-sm text-zinc-700 outline-none transition dark:text-zinc-300 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function TableHead({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`border-b border-zinc-200 bg-zinc-50/60 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 ${className || ""}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={`divide-y divide-zinc-100 dark:divide-zinc-800/60 ${className || ""}`} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr 
      className={`group transition-colors hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40 even:bg-zinc-50/60 dark:even:bg-zinc-900/40 ${className || ""}`} 
      {...props}
    >
      {children}
    </tr>
  );
}

interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  stickyRight?: boolean;
}

export function TableHeaderCell({ children, className, stickyRight, ...props }: TableHeaderCellProps) {
  return (
    <th 
      className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${
        stickyRight
          ? "sticky right-0 z-10 bg-white dark:bg-zinc-900"
          : ""
      } ${className || ""}`} 
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  stickyRight?: boolean;
}

export function TableCell({ children, className, stickyRight, ...props }: TableCellProps) {
  return (
    <td 
      className={`px-4 py-3.5 text-sm text-zinc-600 dark:text-zinc-300 align-middle ${
        stickyRight
          ? "sticky right-0 z-10 bg-white group-even:bg-zinc-50 dark:bg-zinc-900 dark:group-even:bg-zinc-900"
          : ""
      } ${className || ""}`} 
      {...props}
    >
      {children}
    </td>
  );
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  return (
    <div className={`flex items-center justify-end pt-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage <= 1}
          aria-label="Halaman Sebelumnya"
          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <HiOutlineChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-[48px] select-none text-center font-mono text-xs text-zinc-700 dark:text-zinc-300">
          {safeCurrentPage} / {safeTotalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage >= safeTotalPages}
          aria-label="Halaman Selanjutnya"
          className="flex h-7 w-7 items-center justify-center rounded border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <HiOutlineChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

Table.Controls = TableControls;
Table.FilterSelect = TableFilterSelect;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Th = TableHeaderCell;
Table.Td = TableCell;
Table.Pagination = TablePagination;

export default Table;
