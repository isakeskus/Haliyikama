import { ServicePage } from "@/components/service-page";
import { PHONE_TEL } from "@/lib/services";

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
    <ServicePage
      kicker="Sandalye Yıkama"
      title="Profesyonel"
      accent="Sandalye Yıkama"
      intro="Yemek masası sandalyeleri ve ofis koltukları, günlük kullanımda en çabuk kirlenen eşyalardandır. Özellikle kumaş sandalyelerdeki yemek ve yağ lekeleri için özel buharlı yıkama ve vakumlama uyguluyoruz."
      bullets={[
        "Kumaş dokusuna zarar vermeyen işlem",
        "Ofisler için toplu yıkama indirimi",
        "Yemek ve yağ lekelerine kesin çözüm",
        "Hızlı kuruma özelliği",
      ]}
      image="/images/detail.jpg"
      imageAlt="Sandalye yıkama sırasında buharlı temizlik detayı"
      currentHref="/sandalye-yikama"
      schema={serviceSchema}
    />
  );
}
