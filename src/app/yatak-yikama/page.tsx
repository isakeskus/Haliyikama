import { ServicePage } from "@/components/service-page";
import { PHONE_TEL } from "@/lib/services";

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
    <ServicePage
      kicker="Yatak Yıkama"
      title="Anti-Bakteriyel"
      accent="Yatak Yıkama"
      intro="Yataklarınız, gözle görülmeyen toz akarları (maytlar), ölü deri hücreleri ve ter kalıntıları ile doludur. Sağlıklı bir uyku ve hijyenik bir yatak odası için yataklarınızı periyodik olarak profesyonel vakumlu makinelerimizle temizliyoruz."
      bullets={[
        "Mayt ve toz akarlarına karşı %100 etkili temizlik",
        "Sararmış ter lekelerine özel solüsyon",
        "Anti-alerjik ve kokusuz deterjan kullanımı",
        "Kısa sürede kuruma garantisi",
      ]}
      image="/images/hero.jpg"
      imageAlt="Evde profesyonel yatak yıkama hizmeti"
      currentHref="/yatak-yikama"
      schema={serviceSchema}
    />
  );
}
