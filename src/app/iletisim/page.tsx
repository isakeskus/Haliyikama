import { Metadata } from "next";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Bursa Koltuk Yıkama ile iletişime geçin. Telefon veya WhatsApp üzerinden hemen randevu alın, Bursa'nın tüm ilçelerine aynı gün hizmet veriyoruz.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-navy dark:text-white">İletişim</h1>
        <p className="text-lg text-foreground/70">
          Randevu almak veya hizmetlerimiz hakkında detaylı bilgi edinmek için bize aşağıdaki kanallardan ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Telefon</h3>
              <p className="text-foreground/70 mb-2">Hızlı randevu ve teklif için arayın.</p>
              <a href={`tel:${PHONE_TEL}`} className="text-xl font-semibold hover:text-turquoise transition-colors block">{PHONE_DISPLAY}</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">WhatsApp</h3>
              <p className="text-foreground/70 mb-2">Yazışarak hızlıca fiyat teklifi alın.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold hover:text-turquoise transition-colors block">WhatsApp&apos;tan Yazın</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Merkez Ofis</h3>
              <p className="text-foreground/70">Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara, Bursa</p>
              <p className="text-sm text-foreground/50 mt-1">*Bursa&apos;nın tüm ilçelerine gezici servis ağımız mevcuttur.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Çalışma Saatleri</h3>
              <p className="text-foreground/70">Pazartesi - Pazar: 08:00 - 22:00</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
