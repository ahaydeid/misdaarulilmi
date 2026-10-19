"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from "react-icons/hi2";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      Swal.fire({
        title: "Perhatian",
        text: "Silakan masukkan email dan kata sandi Anda.",
        icon: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        Swal.fire({
          title: "Gagal Masuk",
          text:
            error.message === "Invalid login credentials"
              ? "Email atau kata sandi yang Anda masukkan salah."
              : error.message,
          icon: "error",
        });
        return;
      }

      if (data?.user) {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      Swal.fire({
        title: "Kesalahan Sistem",
        text: "Terjadi kesalahan saat mencoba masuk. Silakan coba beberapa saat lagi.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-white dark:bg-zinc-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sisi Kiri: Panel Gray / Abu-Abu - Full Logo */}
      <div className="relative flex-1 bg-zinc-100/90 dark:bg-zinc-950 lg:rounded-r-[2.5rem] flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 lg:h-full lg:overflow-hidden">
        {/* Top Spacer */}
        <div className="shrink-0" />

        {/* Center: Full Logo */}
        <div className="my-auto flex items-center justify-center py-4">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] max-h-[60vh] max-w-[60vh]">
            <Image
              src="/img/logo-trans.png"
              alt="Logo MIS Daarul Ilmi Balaraja"
              fill
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 380px, 420px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between text-xs text-zinc-400 shrink-0 pt-2">
          <span>MIS Daarul Ilmi Balaraja</span>
          <span>Web Official Madrasah</span>
        </div>
      </div>

      {/* Sisi Kanan: Panel Putih dengan Formulir Masuk */}
      <div className="flex-1 bg-white dark:bg-zinc-900 flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 lg:h-full lg:overflow-hidden">

        {/* Card Form */}
        <div className="mx-auto w-full max-w-md my-auto py-2">
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
              Selamat Datang Kembali
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Masuk
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
                Email
              </label>
              <div className="relative mt-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  className="w-full border-b-2 border-zinc-300 bg-transparent py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider text-zinc-700 uppercase dark:text-zinc-300">
                Kata Sandi
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full border-b-2 border-zinc-300 bg-transparent py-2 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition cursor-pointer"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>


            {/* Tombol Masuk (Rata Kanan) */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>{isLoading ? "Memproses..." : "Masuk"}</span>
                {!isLoading && <HiOutlineArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Kanan */}
        <div className="text-center text-xs text-zinc-400 dark:text-zinc-600 pt-2 shrink-0">
          © 2026 MIS Daarul Ilmi Balaraja
        </div>
      </div>
    </div>
  );
}
