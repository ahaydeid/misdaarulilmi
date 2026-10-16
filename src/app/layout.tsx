import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://misdaarulilmi.sch.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MIS Daarul Ilmi - Madrasah Ibtidaiyah",
    template: "%s | MIS Daarul Ilmi",
  },
  description:
    "Website resmi MIS Daarul Ilmi. Membentuk generasi Qur'ani, cerdas, berkarakter Islami, dan berprestasi berlandaskan iman dan taqwa.",
  keywords: [
    "MIS Daarul Ilmi",
    "Madrasah Ibtidaiyah",
    "Sekolah Islam",
    "Madrasah",
    "Pendidikan Islam",
    "PPDB Madrasah",
  ],
  authors: [{ name: "MIS Daarul Ilmi" }],
  creator: "edula",
  icons: {
    icon: "/img/logo-bulat.png",
    apple: "/img/logo-bulat.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "MIS Daarul Ilmi",
    title: "MIS Daarul Ilmi - Madrasah Ibtidaiyah",
    description:
      "Membentuk generasi Qur'ani, cerdas, berkarakter Islami, dan berprestasi berlandaskan iman dan taqwa.",
    images: [
      {
        url: "/img/logo-bulat.png",
        width: 1188,
        height: 1188,
        alt: "Logo MIS Daarul Ilmi",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MIS Daarul Ilmi - Madrasah Ibtidaiyah",
    description:
      "Website resmi Madrasah Ibtidaiyah Daarul Ilmi. Membentuk generasi Qur'ani dan berprestasi.",
    images: ["/img/logo-bulat.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50/50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">{children}</body>
    </html>
  );
}
