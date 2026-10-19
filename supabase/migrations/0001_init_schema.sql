-- Migration: 0001_init_schema.sql
-- Description: Inisialisasi skema tabel untuk pengumuman, galeri, kalender, staff, dan testimoni

-- 1. Tabel Pengumuman (Announcements)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'Umum',
  author TEXT NOT NULL DEFAULT 'Admin Madrasah',
  excerpt TEXT NOT NULL,
  content_html TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Tabel Galeri (Gallery Items)
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kegiatan',
  date TEXT NOT NULL,
  "desc" TEXT,
  src TEXT,
  youtube_id TEXT,
  images TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. Tabel Kalender Pendidikan (Academic Calendar)
CREATE TABLE IF NOT EXISTS academic_calendar (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Akademik', 'Kegiatan', 'Hari Libur')),
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. Tabel Staff & Tenaga Pendidik (Staff Members)
CREATE TABLE IF NOT EXISTS staff_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  photo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. Tabel Testimoni (Testimonials)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Wali Santri',
  quote TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Publik (Select)
CREATE POLICY "Allow public read announcements" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery_items" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read academic_calendar" ON academic_calendar FOR SELECT USING (true);
CREATE POLICY "Allow public read staff_members" ON staff_members FOR SELECT USING (true);
CREATE POLICY "Allow public read testimonials" ON testimonials FOR SELECT USING (true);

-- Kebijakan Akses Penuh (Insert, Update, Delete) untuk Admin / Service Role
CREATE POLICY "Allow full access announcements" ON announcements FOR ALL USING (true);
CREATE POLICY "Allow full access gallery_items" ON gallery_items FOR ALL USING (true);
CREATE POLICY "Allow full access academic_calendar" ON academic_calendar FOR ALL USING (true);
CREATE POLICY "Allow full access staff_members" ON staff_members FOR ALL USING (true);
CREATE POLICY "Allow full access testimonials" ON testimonials FOR ALL USING (true);
