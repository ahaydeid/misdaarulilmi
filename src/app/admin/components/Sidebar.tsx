"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineBars3,
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlinePhoto,
  HiOutlineMegaphone,
  HiOutlineCalendarDays,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase/client";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    pathname === "/admin"
      ? "dashboard"
      : pathname.startsWith("/admin/testimoni")
        ? "testimoni"
        : pathname.startsWith("/admin/staff")
          ? "staff"
          : pathname.startsWith("/admin/galeri")
            ? "galeri"
            : pathname.startsWith("/admin/pengumuman")
              ? "pengumuman"
              : pathname.startsWith("/admin/kalender")
                ? "kalender"
                : "";

  const config = {
    bgDarkClass: "bg-emerald-700 dark:bg-zinc-900",
    sidebarTextClass:
      "text-white group-hover:text-white dark:text-zinc-400 dark:group-hover:text-zinc-100 transition-colors duration-200",
    sidebarTextActiveColorClass: "text-emerald-800 dark:text-emerald-400 font-bold",
    sidebarTextActiveBgClass: "bg-zinc-50 dark:bg-zinc-950",
    sidebarBorderClass: "border-emerald-800/40 dark:border-zinc-800",
    sidebarProfileHoverClass: "hover:bg-emerald-800/60 dark:hover:bg-zinc-800/60",
    sidebarBrandTextClass: "text-white font-bold",
    sidebarSubtextClass: "text-emerald-200 dark:text-zinc-500",
    sidebarHoverLineClass: "bg-white/15 dark:bg-zinc-800",
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [userEmail, setUserEmail] = useState("admin@daarulilmi.sch.id");

  const profile = {
    name: "Admin Madrasah",
    email: userEmail,
  };

  // Ambil email admin aktif dari sesi Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  // Tutup dropdown profil jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Konfirmasi Keluar",
      text: "Apakah Anda yakin ingin keluar dari portal admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Keluar",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }
  };

  const menuItems = [
    { type: "header", label: "Menu Utama" },
    {
      type: "item",
      id: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: HiOutlineHome,
    },
    {
      type: "item",
      id: "pengumuman",
      label: "Pengumuman",
      href: "/admin/pengumuman",
      icon: HiOutlineMegaphone,
    },
    {
      type: "item",
      id: "galeri",
      label: "Galeri Kegiatan",
      href: "/admin/galeri",
      icon: HiOutlinePhoto,
    },
    {
      type: "item",
      id: "kalender",
      label: "Kalender Pendidikan",
      href: "/admin/kalender",
      icon: HiOutlineCalendarDays,
    },
    {
      type: "item",
      id: "staff",
      label: "Staff & Tendik",
      href: "/admin/staff",
      icon: HiOutlineUserGroup,
    },
    {
      type: "item",
      id: "testimoni",
      label: "Testimoni",
      href: "/admin/testimoni",
      icon: HiOutlineChatBubbleLeftRight,
    },
  ];

  const handleItemClick = (item: { href?: string }) => {
    if (item.href) {
      router.push(item.href);
    }
  };

  const getCapsuleClass = (isActive: boolean) => {
    const base = `absolute inset-y-0 right-0 rounded-l-full ${config.sidebarTextActiveBgClass} pointer-events-none z-0`;
    const width = isCollapsed ? "w-[calc(100%-12px)]" : "w-[calc(100%-16px)]";
    return `${base} ${width} ${isActive ? "opacity-100" : "opacity-0"}`;
  };

  const getMaskClass = (position: "top" | "bottom", isActive: boolean) => {
    const basePos = position === "top" ? "-top-4" : "-bottom-4";
    const base = `absolute ${basePos} right-0 w-4 h-4 bg-zinc-50 dark:bg-zinc-950 pointer-events-none z-10`;
    const transition = isActive ? "opacity-100" : "opacity-0";
    return `${base} ${transition}`;
  };

  const getIconClass = (isActive: boolean) => {
    const base = "h-4.5 w-4.5 shrink-0";
    const color = isActive
      ? `${config.sidebarTextActiveColorClass} transition-all duration-300`
      : config.sidebarTextClass;

    const scale = isCollapsed ? "scale-[1.22]" : "scale-100";
    return `${base} ${color} ${scale}`;
  };

  const getSpanClass = (isActive: boolean) => {
    const base = "whitespace-nowrap overflow-hidden font-medium text-sm";
    const color = isActive
      ? `${config.sidebarTextActiveColorClass} transition-all duration-300`
      : config.sidebarTextClass;
    const layout = isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-44 opacity-100 ml-3";
    return `${base} ${color} ${layout}`;
  };

  return (
    <aside
      style={{
        width: isCollapsed ? "4rem" : "16rem",
        transition: "width 350ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={`h-screen sticky top-0 ${config.bgDarkClass} ${config.sidebarTextClass} flex flex-col shrink-0 relative select-none`}
    >
      {/* Brand Logo / Action Bar */}
      <div
        className={`h-16 ${config.bgDarkClass} flex items-center justify-between border-b ${
          config.sidebarBorderClass
        } shrink-0 overflow-hidden transition-all duration-300 ${
          isCollapsed ? "px-4" : "px-5"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`group p-1.5 ${config.sidebarProfileHoverClass} ${config.sidebarTextClass} rounded-full transition-colors cursor-pointer outline-none shrink-0 relative`}
            title={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
          >
            <HiOutlineBars3
              className={`h-5 w-5 transition-opacity duration-150 ${
                isCollapsed ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            />
            {isCollapsed && (
              <span className="absolute inset-0 flex items-center justify-center rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-150 select-none w-8 h-8 m-auto overflow-hidden">
                <Image
                  src="/img/logo-bulat.png"
                  alt="Logo MIS Daarul Ilmi"
                  width={32}
                  height={32}
                  className="h-7 w-7 object-contain"
                />
              </span>
            )}
          </button>

          <div
            className={`flex items-center gap-2.5 transition-all duration-300 ${
              isCollapsed ? "opacity-0 w-0 pointer-events-none" : "opacity-100 w-auto"
            }`}
          >
            <div className="relative h-7 w-7 shrink-0">
              <Image
                src="/img/logo-bulat.png"
                alt="Logo"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
            <h1 className="text-sm font-bold leading-none truncate text-white">
              Daarul Ilmi <span className="text-white/60 dark:text-zinc-500 font-normal">Admin</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Menu Items List */}
      <nav className="flex-1 flex flex-col gap-1.5 pr-0 py-6 overflow-y-auto scrollbar-none">
        {menuItems.map((item, idx) => {
          if (item.type === "header") {
            return (
              <div
                key={`header-${idx}`}
                className={`px-5 text-[10px] font-bold text-white/50 dark:text-zinc-500 uppercase tracking-widest select-none transition-all duration-300 whitespace-nowrap overflow-hidden
                  ${isCollapsed ? "max-w-0 opacity-0 py-0 h-0" : "max-w-48 opacity-100 pt-3.5 pb-1"}`}
              >
                {item.label}
              </div>
            );
          }

          const isActive = activeTab === item.id;
          const Icon = item.icon!;

          return (
            <div
              key={item.id}
              id={`sidebar-item-${item.id}`}
              className="relative w-full group"
            >
              {/* Active expand-capsule background */}
              <div className={getCapsuleClass(isActive)} />

              {/* Top curved mask */}
              <div className={getMaskClass("top", isActive)}>
                <div className={`w-full h-full ${config.bgDarkClass} rounded-br-2xl`}></div>
              </div>

              {/* Main button */}
              <button
                type="button"
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center outline-none text-sm cursor-pointer justify-start py-3 pr-5 text-left relative z-10 transition-all duration-300 ease-in-out
                  ${isCollapsed ? "pl-[23px]" : "pl-7"}`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="relative flex items-center shrink-0">
                  <Icon className={getIconClass(isActive)} />
                </div>
                <span className={getSpanClass(isActive)}>{item.label}</span>
              </button>

              {/* Bottom curved mask */}
              <div className={getMaskClass("bottom", isActive)}>
                <div className={`w-full h-full ${config.bgDarkClass} rounded-tr-2xl`}></div>
              </div>

              {/* Hover line indicator (only for inactive item) */}
              <div
                className={`absolute bottom-0 right-0 h-px ${config.sidebarHoverLineClass} transition-all duration-300
                  ${isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"}
                  ${isCollapsed ? "left-3" : "left-7"}`}
              />
            </div>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div
        ref={profileRef}
        className={`border-t ${config.sidebarBorderClass} pt-4 pb-4 relative transition-all duration-300 ${
          isCollapsed ? "px-2" : "px-4"
        }`}
      >
        {/* Dropdown Menu */}
        {isProfileOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute left-full bottom-2 ml-2 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-1.5 z-50 text-slate-800 dark:text-zinc-100 flex flex-col gap-0.5"
          >
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsProfileOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg font-medium cursor-pointer transition-colors outline-none justify-start text-left"
            >
              <HiOutlineGlobeAlt className="h-4 w-4 shrink-0 text-zinc-500" />
              <span>Lihat Website</span>
            </a>
            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-0.5" />
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                handleLogout();
              }}
              className="w-full flex text-red-600 dark:text-red-400 items-center gap-2.5 px-3 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer transition-colors outline-none justify-start text-left"
            >
              <HiOutlineArrowLeftOnRectangle className="h-4 w-4 shrink-0" />
              <span>Keluar</span>
            </button>
          </div>
        )}

        {/* Profile Trigger Button */}
        <button
          type="button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className={`w-full flex items-center rounded-xl ${config.sidebarProfileHoverClass} active:scale-98 transition-all duration-300 cursor-pointer outline-none justify-between p-2 text-left`}
        >
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 dark:bg-zinc-800 text-white font-bold text-xs uppercase border border-emerald-600/50 dark:border-zinc-700/50">
              MI
            </div>
            <div
              className={`min-w-0 flex-1 transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isCollapsed ? "max-w-0 opacity-0 ml-0" : "max-w-40 opacity-100 ml-3"
              }`}
            >
              <p
                className="text-sm font-medium truncate text-white leading-tight"
                title={profile.name}
              >
                {profile.name}
              </p>
              <p
                className={`text-[11px] ${config.sidebarSubtextClass} font-normal truncate`}
                title={profile.email}
              >
                {profile.email}
              </p>
            </div>
          </div>
          <HiOutlineChevronDown
            className={`h-4 w-4 ${
              config.sidebarSubtextClass
            } shrink-0 transition-all duration-300 ${
              isCollapsed
                ? "max-w-0 opacity-0 scale-75"
                : "max-w-4 opacity-100 scale-100"
            } ${isProfileOpen ? "-rotate-90" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
