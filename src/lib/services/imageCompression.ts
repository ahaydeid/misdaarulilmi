export type CompressImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  maxSizeKB?: number;
  initialQuality?: number;
  minQuality?: number;
  qualityStep?: number;
  format?: "image/webp" | "image/jpeg";
};

const DEFAULT_OPTIONS: Required<CompressImageOptions> = {
  maxWidth: 1600,
  maxHeight: 1600,
  maxSizeKB: 200,
  initialQuality: 0.85,
  minQuality: 0.45,
  qualityStep: 0.1,
  format: "image/webp",
};

function calculateTargetSize(
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  let width = sourceWidth;
  let height = sourceHeight;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  return { width, height };
}

function imageFromFile(file: File | Blob): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Gagal membaca file gambar untuk dikompresi."));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string,
  quality: number
): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        reject(new Error("Gagal memproses canvas gambar."));
      },
      format,
      quality
    );
  });
}

/**
 * Mengompresi file gambar di sisi client (browser) menggunakan HTML5 Canvas
 * untuk menghemat kuota Supabase Storage dan mempercepat waktu muat.
 */
export async function compressImage(
  file: File,
  options?: CompressImageOptions
): Promise<Blob> {
  // Hanya proses jika file bertipe gambar (kecuali SVG dan GIF animasi)
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  const config = { ...DEFAULT_OPTIONS, ...options };

  // Jika ukuran file asli sudah sangat kecil (di bawah maxSizeKB), gunakan aslinya
  if (file.size <= config.maxSizeKB * 1024 && (file.type === "image/webp" || file.type === "image/jpeg")) {
    return file;
  }

  const image = await imageFromFile(file);
  const { width, height } = calculateTargetSize(
    image.naturalWidth || image.width,
    image.naturalHeight || image.height,
    config.maxWidth,
    config.maxHeight
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return file;
  }

  // Latar belakang putih untuk transparansi jika di-convert ke jpeg
  if (config.format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
  }

  context.drawImage(image, 0, 0, width, height);

  let quality = config.initialQuality;
  let output = await canvasToBlob(canvas, config.format, quality);

  // Turunkan kualitas secara bertahap jika ukuran masih di atas target maxSizeKB
  while (output.size > config.maxSizeKB * 1024 && quality > config.minQuality) {
    quality -= config.qualityStep;
    output = await canvasToBlob(canvas, config.format, quality);
  }

  return output;
}
