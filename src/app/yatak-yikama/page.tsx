import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export const metadata = {
  title: "Yatak Yıkama Hizmeti | Bursa",
  description: "Bursa'da evinizde profesyonel anti-bakteriyel yatak yıkama hizmeti. Derinlemesine buharlı temizlik ile mayt ve akarlardan kurtulun.",
  alternates: { canonical: "/yatak-yikama" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Yatak Yıkama",
  name: "Anti-Bakteriyel Yatak Yıkama",
  areaServed: { "@type": "City", name: "Bursa" },
  provider: { "@type": "LocalBusiness", name: "Bursa Koltuk Yıkama", telephone: PHONE_TEL },
};

export default function YatakYikamaPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-32 container mx-auto px-4 max-w-5xl">
      <JsonLd data={serviceSchema} />
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy dark:text-white">Anti-Bakteriyel Yatak Yıkama</h1>
          <p className="text-lg text-foreground/80 mb-6">
            Yataklarınız, gözle görülmeyen toz akarları (maytlar), ölü deri hücreleri ve ter kalıntıları ile doludur. Sağlıklı bir uyku ve hijyenik bir yatak odası için yataklarınızı periyodik olarak profesyonel vakumlu makinelerimizle temizliyoruz.
          </p>
          <ul className="space-y-3 mb-8">
            {["Mayt ve toz akarlarına karşı %100 etkili temizlik", "Sararmış ter lekelerine özel solüsyon", "Anti-alerjik ve kokusuz deterjan kullanımı", "Kısa sürede kuruma garantisi"].map((item, i) => (
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
            src="/images/hero.jpg"
            alt="Evde profesyonel yatak yıkama hizmeti"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
