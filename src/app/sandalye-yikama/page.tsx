import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export const metadata = {
  title: "Sandalye Yıkama Hizmeti | Bursa",
  description: "Bursa'da yemek masası ve ofis sandalyeleri için profesyonel buharlı yıkama hizmeti.",
  alternates: { canonical: "/sandalye-yikama" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sandalye Yıkama",
  name: "Profesyonel Sandalye Yıkama",
  areaServed: { "@type": "City", name: "Bursa" },
  provider: { "@type": "LocalBusiness", name: "Bursa Koltuk Yıkama", telephone: PHONE_TEL },
};

export default function SandalyeYikamaPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-32 container mx-auto px-4 max-w-5xl">
      <JsonLd data={serviceSchema} />
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy dark:text-white">Profesyonel Sandalye Yıkama</h1>
          <p className="text-lg text-foreground/80 mb-6">
            Yemek masası sandalyeleri ve ofis koltukları, günlük kullanımda en çabuk kirlenen eşyalardandır. Özellikle kumaş sandalyelerdeki yemek ve yağ lekeleri için özel buharlı yıkama ve vakumlama uyguluyoruz.
          </p>
          <ul className="space-y-3 mb-8">
            {["Kumaş dokusuna zarar vermeyen işlem", "Ofisler için toplu yıkama indirimi", "Yemek ve yağ lekelerine kesin çözüm", "Hızlı kuruma özelliği"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="text-turquoise shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 text-lg" asChild>
              <a href={`tel:${PHONE_TEL}`}>
                <Phone size={20} /> Hemen Randevu Al
              </a>
            </Button>
            <Button size="lg" variant="whatsapp" className="gap-2 text-lg" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl glass border border-white/30 h-[300px] md:h-[400px] relative">
          <Image
            src="/images/detail.jpg"
            alt="Sandalye yıkama sırasında buharlı temizlik detayı"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
