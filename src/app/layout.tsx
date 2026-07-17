import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Bursa Koltuk Yıkama | Profesyonel Yerinde Temizlik",
    template: "%s | Bursa Koltuk Yıkama",
  },
  description: "Bursa'da evde yerinde profesyonel koltuk, yatak, sandalye ve araç koltuğu temizliği. Aynı gün servis ve leke çıkarma garantisi.",
  keywords: ["Bursa Koltuk Yıkama", "Bursa Yerinde Koltuk Yıkama", "Nilüfer Koltuk Yıkama", "Osmangazi Koltuk Yıkama", "Profesyonel Koltuk Temizleme Bursa"],
  authors: [{ name: "Bursa Koltuk Yıkama" }],
  creator: "Bursa Koltuk Yıkama",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bursakoltukyikama.com",
    title: "Bursa Koltuk Yıkama | Profesyonel Yerinde Temizlik",
    description: "Bursa'da evde yerinde profesyonel koltuk, yatak, sandalye ve araç koltuğu temizliği.",
    siteName: "Bursa Koltuk Yıkama",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bursa Koltuk Yıkama",
    description: "Bursa'da profesyonel yerinde koltuk yıkama hizmeti.",
  },
};

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${poppins.variable} h-full scroll-smooth`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-turquoise selection:text-white">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
