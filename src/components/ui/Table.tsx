import React from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

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
  children?: React.ReactNode;
  className?: string;
}

export function TableControls({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Cari...",
  children,
  className = "",
}: TableControlsProps) {
  return (
    <div className={`flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end ${className}`}>
      <div className="flex items-center gap-2">
        {children}
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

Table.Controls = TableControls;
Table.FilterSelect = TableFilterSelect;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Th = TableHeaderCell;
Table.Td = TableCell;

export default Table;
