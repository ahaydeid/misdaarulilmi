import type { ReactNode } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "MIS Daarul Ilmi",
  alternateName: "Madrasah Ibtidaiyah Daarul Ilmi",
  url: "https://misdaarulilmi.sch.id",
  logo: "https://misdaarulilmi.sch.id/img/logo-bulat.png",
  description:
    "Website resmi MIS Daarul Ilmi. Membentuk generasi Qur'ani, cerdas, berkarakter Islami, dan berprestasi berlandaskan iman dan taqwa.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Raya Madrasah, Kp. Contoh",
    addressLocality: "Wilayah",
    addressRegion: "Daerah",
    addressCountry: "ID",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62-812-3456-7890",
    contactType: "Customer Support",
    areaServed: "ID",
    availableLanguage: ["Indonesian"],
  },
};

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
