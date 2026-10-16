import type { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <div className="flex flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Panel Admin - MIS Daarul Ilmi
          </h2>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
