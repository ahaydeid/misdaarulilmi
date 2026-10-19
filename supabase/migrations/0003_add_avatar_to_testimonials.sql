-- Migrasi penambahan kolom avatar_url pada tabel testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS avatar_url TEXT;
