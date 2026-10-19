import { supabase } from "@/lib/supabase/client";
import { compressImage } from "@/lib/services/imageCompression";

/**
 * Uploads a media file to Supabase Storage with automatic client-side compression
 * and returns its public URL.
 */
export async function uploadMediaFile(
  file: File,
  folder: string = "gallery",
  bucketName: string = "media"
): Promise<string> {
  const sanitizedBase = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .slice(0, 30);

  let uploadPayload: Blob | File = file;
  let fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  let contentType = file.type || "image/jpeg";

  // Kompresi otomatis untuk gambar (kecuali gif animasi & svg)
  if (file.type.startsWith("image/") && file.type !== "image/gif" && file.type !== "image/svg+xml") {
    try {
      const compressed = await compressImage(file, {
        format: "image/webp",
        maxSizeKB: 200,
        maxWidth: 1600,
        maxHeight: 1600,
      });
      uploadPayload = compressed;
      fileExt = "webp";
      contentType = "image/webp";
    } catch {
      // Jika kompresi gagal, fallback gunakan file asli
      uploadPayload = file;
    }
  }

  const fileName = `${folder}/${Date.now()}-${sanitizedBase}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, uploadPayload, {
      contentType,
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Upload storage gagal: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
  return data.publicUrl;
}
