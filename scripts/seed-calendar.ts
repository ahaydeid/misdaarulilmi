import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load .env.local manually if not in process.env
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY tidak ditemukan!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const events = [
  {
    title: "Hari Santri Nasional",
    category: "Kegiatan",
    start_date: "2026-10-22",
    end_date: null,
    description: "Upacara bendera santri, istighotsah kubro, dan perlombaan keagamaan.",
  },
  {
    title: "Hari Sumpah Pemuda",
    category: "Kegiatan",
    start_date: "2026-10-28",
    end_date: null,
    description: "Peringatan ikrar pemuda Indonesia dan upacara bendera madrasah.",
  },
  {
    title: "Hari Pahlawan",
    category: "Kegiatan",
    start_date: "2026-11-10",
    end_date: null,
    description: "Upacara bendera dan renungan mengenang jasa perjuangan pahlawan.",
  },
  {
    title: "Hari Guru Nasional",
    category: "Kegiatan",
    start_date: "2026-11-25",
    end_date: null,
    description: "Apel penghormatan guru dan apresiasi pendidik MIS Daarul Ilmi.",
  },
  {
    title: "Hari Raya Natal",
    category: "Hari Libur",
    start_date: "2026-12-25",
    end_date: null,
    description: "Hari libur nasional perayaan Natal.",
  },
  {
    title: "Tahun Baru Masehi 2027",
    category: "Hari Libur",
    start_date: "2027-01-01",
    end_date: null,
    description: "Libur nasional tahun baru kalender masehi.",
  },
  {
    title: "Hari Amal Bhakti (HAB) Kemenag RI Ke-81",
    category: "Kegiatan",
    start_date: "2027-01-03",
    end_date: null,
    description: "Peringatan hari lahir Kementerian Agama RI dan apel bersama.",
  },
  {
    title: "Hari Buruh Internasional",
    category: "Hari Libur",
    start_date: "2027-05-01",
    end_date: null,
    description: "Hari libur nasional May Day.",
  },
  {
    title: "Hari Pendidikan Nasional (Hardiknas)",
    category: "Kegiatan",
    start_date: "2027-05-02",
    end_date: null,
    description: "Upacara bendera peringatan hari pendidikan nasional.",
  },
  {
    title: "Hari Kebangkitan Nasional",
    category: "Kegiatan",
    start_date: "2027-05-20",
    end_date: null,
    description: "Apel peringatan hari kebangkitan nasional.",
  },
  {
    title: "Hari Lahir Pancasila",
    category: "Hari Libur",
    start_date: "2027-06-01",
    end_date: null,
    description: "Hari libur nasional peringatan lahirnya dasar negara.",
  },
  {
    title: "Hari Pramuka Nasional",
    category: "Kegiatan",
    start_date: "2027-08-14",
    end_date: null,
    description: "Apel besar dan kemah kepramukaan gugus depan madrasah.",
  },
  {
    title: "HUT Kemerdekaan RI Ke-82",
    category: "Hari Libur",
    start_date: "2027-08-17",
    end_date: null,
    description: "Hari libur nasional peringatan proklamasi kemerdekaan Republik Indonesia.",
  },
  {
    title: "Hari Kesaktian Pancasila",
    category: "Kegiatan",
    start_date: "2027-10-01",
    end_date: null,
    description: "Upacara bendera peringatan kesaktian Pancasila.",
  },
];

async function seed() {
  console.log("Memulai proses seeding kalender pendidikan ke Supabase...");

  // Ambil agenda yang sudah ada agar tidak terjadi duplikasi
  const { data: existing, error: fetchErr } = await supabase
    .from("academic_calendar")
    .select("title, start_date");

  if (fetchErr) {
    console.error("Gagal memeriksa agenda yang ada:", fetchErr.message);
    process.exit(1);
  }

  const existingKeys = new Set(
    (existing || []).map((item) => `${item.title}|${item.start_date}`)
  );

  const toInsert = events.filter(
    (ev) => !existingKeys.has(`${ev.title}|${ev.start_date}`)
  );

  if (toInsert.length === 0) {
    console.log("Semua agenda kalender sudah ada di database. Tidak ada data baru yang dimasukkan.");
    return;
  }

  const { data: inserted, error: insertErr } = await supabase
    .from("academic_calendar")
    .insert(toInsert)
    .select();

  if (insertErr) {
    console.error("Gagal menyisipkan agenda kalender:", insertErr.message);
    process.exit(1);
  }

  console.log(`Berhasil menyisipkan ${inserted?.length || 0} agenda kalender ke database!`);
  for (const item of inserted || []) {
    console.log(`- [${item.start_date}] (${item.category}) ${item.title}`);
  }
}

seed().catch((err) => {
  console.error("Terjadi kesalahan:", err);
  process.exit(1);
});
