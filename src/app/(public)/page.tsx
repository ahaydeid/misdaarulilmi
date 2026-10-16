import type { Metadata } from "next";
import HeroSection from "./components/beranda/heroSection";
import ProgramUnggulan from "./components/beranda/programUnggulan";
import SekilasMadrasah from "./components/beranda/sekilasMadrasah";
import TestimoniSection from "./components/beranda/testimoniSection";
import PengumumanTerbaru from "./components/beranda/pengumumanTerbaru";

export const metadata: Metadata = {
  title: "MIS Daarul Ilmi Balaraja - Beranda",
  description:
    "Website Resmi MIS Daarul Ilmi Balaraja. Lembaga pendidikan dasar Islam terpadu yang membina generasi Qur'ani, berkarakter, dan berprestasi.",
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ProgramUnggulan />
      <SekilasMadrasah />
      <TestimoniSection />
      <PengumumanTerbaru />
    </div>
  );
}
