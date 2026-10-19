# Catatan Proyek MIS Daarul Ilmi

Dokumen ini memuat kesepakatan teknis, arsitektur, dan prinsip kerja untuk pengembangan website MIS Daarul Ilmi.

---

## 1. Fokus SEO & Crawler (Khusus Sisi Publik)

* **Hanya Sisi Publik**: Optimasi SEO hanya diterapkan pada sisi publik (`src/app/(public)`). Sisi admin tidak memerlukan SEO sama sekali.
* **Robots & Sitemap**:
  * `robots.ts` mengizinkan pengindeksan sisi publik dan secara tegas memblokir (`disallow`) rute `/admin` dari crawler mesin pencari.
  * `sitemap.ts` hanya memuat rute-rute publik yang relevan.
* **Standar SEO Alami (Anti-Spam / White Hat)**:
  * Meta data informatif dan spesifik per halaman (menghindari keyword stuffing).
  * Struktur semantik HTML yang disiplin: tepat satu `<h1>` per halaman, diikuti urutan heading bertingkat (`<h2>`, `<h3>`).
  * Setiap elemen gambar wajib memiliki atribut `alt` deskriptif.
  * Structured data (JSON-LD Schema.org `EducationalOrganization`) untuk identitas sekolah resmi.

---

## 2. Arsitektur Proyek & Pola Struktur Komponen

* **Pemisahan 2 Sisi**:
  * **Sisi Publik**: `src/app/(public)/` (rute root `/`, `/tentang`, `/visi-misi`, `/galeri`, `/berita`, `/kontak`, `/spmb`).
  * **Sisi Admin**: `src/app/admin/` (panel administrasi, terlindungi otentikasi Supabase).
* **Colocation Komponen**:
  * Komponen sisi publik ditaruh di dalam: `src/app/(public)/components/`.
  * Komponen sisi admin ditaruh di dalam: `src/app/admin/components/`.
  * Dilarang membuat folder komponen global terpisah jika komponen tersebut spesifik pada salah satu sisi.

---

## 3. Identitas & Desain

* **Penamaan Madrasah**:
  * Gunakan **MIS Daarul Ilmi** atau **Madrasah Ibtidaiyah Daarul Ilmi**.
  * Jangan menegaskan kata "Swasta" pada tampilan antarmuka maupun teks publik.
* **Logo & Aset**:
  * Menggunakan file bulat resmi: `public/img/logo-bulat.png`.
  * Tampilkan dengan `object-contain` tanpa crop lingkaran atau border tebal yang memotong elemen logo.
* **Tema Visual**:
  * Menggunakan palet **Light Minimalis** (latar belakang cerah/putih, bersih, ramah pendidikan anak).
  * Menghindari border tebal/kaku di area footer dan navigasi.
  * Aksen warna: Hijau madrasah (`emerald-600` / `emerald-700`).
* **Credit Pengembang**:
  * Di footer dicantumkan: `© [Tahun] MIS Daarul Ilmi. Dibuat oleh edula`.
  * Tulisan `edula` menggunakan font **Fredoka**: `edu` bertema `text-sky-700`, `la` bertema `text-rose-700`, bertautan ke `https://edula.id` (`target="_blank"`).

---

## 4. Tech Stack

* **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
* **Styling**: Tailwind CSS v4
* **Backend, DB & Object Storage**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
* **Icons**: `react-icons`
* **Notifikasi / Dialog**: `sweetalert2`

---

## 5. Alur Kerja Git

* **Jangan main Git sembarangan**: Dilarang menjalankan perintah commit atau push ke remote sebelum ada instruksi khusus dari pengguna.
