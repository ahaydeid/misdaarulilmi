export interface StaffMember {
  id: string;
  name: string;
  subject: string;
  photo?: string | null;
  isActive: boolean;
}

export const staffMembersData: StaffMember[] = [
  {
    id: "staff-1",
    name: "H. Ahmad Nawawi, S.Pd.I",
    subject: "Kepala Madrasah & Tahfidz",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-2",
    name: "Siti Maryam, S.Pd.",
    subject: "Tematik & Matematika",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-3",
    name: "M. Rizki Fadillah, S.Pd.I",
    subject: "Fiqih & Bahasa Arab",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-4",
    name: "Nurul Hidayah, S.Pd.",
    subject: "IPA & Bahasa Indonesia",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-5",
    name: "Fajar Shodiq, S.Kom.",
    subject: "TIK & Kepramukaan",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-6",
    name: "Halimah, S.Ag.",
    subject: "Al-Qur'an Hadits & Akidah",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-7",
    name: "Dedi Kurniawan, S.Pd.",
    subject: "Penjasorkes (PJOK)",
    photo: null,
    isActive: true,
  },
  {
    id: "staff-8",
    name: "Eka Rahmawati, S.E.",
    subject: "Tata Usaha & Administrasi",
    photo: null,
    isActive: true,
  },
];
