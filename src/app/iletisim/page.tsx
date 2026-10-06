import { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bursa Koltuk Yıkama ile iletişime geçin. Telefon veya WhatsApp üzerinden hemen randevu alın, Bursa'nın tüm ilçelerine aynı gün hizmet veriyoruz.",
  alternates: { canonical: "/iletisim" },
};

const CARD = "glass flex items-start gap-5 rounded-3xl p-6";
const ICON = "grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-b from-turquoise/25 to-turquoise/5 text-aqua ring-1 ring-inset ring-white/10";

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHero
        kicker="İletişim"
        title="Bizimle"
        accent="İletişime Geçin"
        description="Randevu almak veya hizmetlerimiz hakkında detaylı bilgi edinmek için bize aşağıdaki kanallardan ulaşabilirsiniz."
      />

      <section className="pb-24 md:pb-32">
        <div className="container mx-auto grid max-w-5xl items-start gap-6 px-4 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            <Reveal>
              <a href={`tel:${PHONE_TEL}`} className={`${CARD} transition-colors hover:bg-white/[0.08]`}>
                <span className={ICON}><Phone size={26} /></span>
                <span>
                  <span className="block text-lg font-semibold text-white">Telefon</span>
                  <span className="mt-1 block text-sm text-white/50">Hızlı randevu ve teklif için arayın.</span>
                  <span className="mt-2 block text-xl font-semibold text-aqua">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.07}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${CARD} transition-colors hover:bg-white/[0.08]`}>
                <span className={ICON}><MessageCircle size={26} /></span>
                <span>
                  <span className="block text-lg font-semibold text-white">WhatsApp</span>
                  <span className="mt-1 block text-sm text-white/50">Yazışarak hızlıca fiyat teklifi alın.</span>
                  <span className="mt-2 block text-xl font-semibold text-aqua">WhatsApp&apos;tan Yazın</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.14}>
              <div className={CARD}>
                <span className={ICON}><MapPin size={26} /></span>
                <span>
                  <span className="block text-lg font-semibold text-white">Merkez Ofis</span>
                  <span className="mt-1 block text-white/70">Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara, Bursa</span>
                  <span className="mt-2 block text-sm text-white/40">*Bursa&apos;nın tüm ilçelerine gezici servis ağımız mevcuttur.</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.21}>
              <div className={CARD}>
                <span className={ICON}><Clock size={26} /></span>
                <span>
                  <span className="block text-lg font-semibold text-white">Çalışma Saatleri</span>
                  <span className="mt-1 block text-white/70">Pazartesi - Pazar: 08:00 - 22:00</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
