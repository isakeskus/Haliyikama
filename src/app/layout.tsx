import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { districts } from "@/lib/districts";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const districtKeywords = districts.map((d) => `${d.name} Koltuk Yıkama`);

export const metadata: Metadata = {
  metadataBase: new URL("https://bursakoltukyikama.com"),
  title: {
    default: "Bursa Koltuk Yıkama | Profesyonel Yerinde Temizlik",
    template: "%s | Bursa Koltuk Yıkama",
  },
  description: "Bursa'da evde yerinde profesyonel koltuk, yatak, sandalye ve araç koltuğu temizliği. Aynı gün servis ve leke çıkarma garantisi. Bursa'nın tüm ilçelerine hizmet.",
  keywords: [
    "Bursa Koltuk Yıkama",
    "Bursa Yerinde Koltuk Yıkama",
    "Bursa Halı Yıkama",
    "Profesyonel Koltuk Temizleme Bursa",
    ...districtKeywords,
  ],
  authors: [{ name: "Bursa Koltuk Yıkama" }],
  creator: "Bursa Koltuk Yıkama",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bursakoltukyikama.com",
    title: "Bursa Koltuk Yıkama | Profesyonel Yerinde Temizlik",
    description: "Bursa'da evde yerinde profesyonel koltuk, yatak, sandalye ve araç koltuğu temizliği.",
    siteName: "Bursa Koltuk Yıkama",
    images: [{ url: "/images/hero.jpg", width: 1376, height: 774, alt: "Bursa Koltuk Yıkama - Profesyonel Yerinde Temizlik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bursa Koltuk Yıkama",
    description: "Bursa'da profesyonel yerinde koltuk yıkama hizmeti.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F3D7A",
};

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bursa Koltuk Yıkama",
    "image": "https://bursakoltukyikama.com/images/hero.jpg",
    "@id": "https://bursakoltukyikama.com",
    "url": "https://bursakoltukyikama.com",
    "telephone": "+905523135463",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara",
      "addressLocality": "Osmangazi",
      "addressRegion": "Bursa",
      "postalCode": "16000",
      "addressCountry": "TR"
    },
    "areaServed": [
      { "@type": "City", "name": "Bursa" },
      ...districts.map((d) => ({ "@type": "City", "name": d.name })),
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "22:00"
    }
  };

  return (
    <html lang="tr" suppressHydrationWarning className={`${poppins.variable} h-full scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-turquoise selection:text-white">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <JsonLd data={localBusinessSchema} />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
