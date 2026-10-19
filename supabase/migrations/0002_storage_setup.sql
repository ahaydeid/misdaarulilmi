-- Migration: 0002_storage_setup.sql
-- Keterangan: Inisialisasi Storage Bucket 'media' dan 'gallery' untuk aset publik (foto galeri, foto staff, dll)

-- 1. Buat bucket public 'media' dan 'gallery' jika belum ada
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('media', 'media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('gallery', 'gallery', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Hapus policy lama jika ada untuk mencegah duplikasi
DROP POLICY IF EXISTS "Media Public Read" ON storage.objects;
DROP POLICY IF EXISTS "Media Public Insert" ON storage.objects;
DROP POLICY IF EXISTS "Media Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Media Public Delete" ON storage.objects;

-- 3. Policy Akses Read untuk publik
CREATE POLICY "Media Public Read"
ON storage.objects FOR SELECT
USING (bucket_id IN ('media', 'gallery'));

-- 4. Policy Akses Insert/Upload
CREATE POLICY "Media Public Insert"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('media', 'gallery'));

-- 5. Policy Akses Update
CREATE POLICY "Media Public Update"
ON storage.objects FOR UPDATE
USING (bucket_id IN ('media', 'gallery'));

-- 6. Policy Akses Delete
CREATE POLICY "Media Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id IN ('media', 'gallery'));
