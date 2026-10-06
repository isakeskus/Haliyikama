import { ServicePage } from "@/components/service-page";
import { PHONE_TEL } from "@/lib/services";

export const metadata = {
  title: "Koltuk Yıkama Hizmeti",
  description: "Bursa'da evinizde profesyonel koltuk yıkama hizmeti. Derinlemesine buharlı temizlik ve leke çıkarma garantisi.",
  alternates: { canonical: "/koltuk-yikama" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Koltuk Yıkama",
  name: "Profesyonel Koltuk Yıkama",
  areaServed: { "@type": "City", name: "Bursa" },
  provider: { "@type": "LocalBusiness", name: "Bursa Koltuk Yıkama", telephone: PHONE_TEL },
};

export default function KoltukYikamaPage() {
  return (
    <ServicePage
      kicker="Koltuk Yıkama"
      title="Profesyonel"
      accent="Koltuk Yıkama"
      intro="Koltuklarınız evinizin en çok kullanılan ve en hızlı kirlenen eşyalarıdır. Yüzeysel silme işlemleri kirleri kumaşın altına itmekten başka bir işe yaramaz. Profesyonel buharlı ve vakumlu yıkama ile koltuklarınızı ilk günkü temizliğine kavuşturuyoruz."
      bullets={[
        "Sanayi tipi yüksek vakumlu makineler",
        "Kumaşa özel zararsız temizlik solüsyonları",
        "İnatçı lekeler için özel müdahale",
        "Hızlı kuruma ve aynı gün kullanım",
      ]}
      image="/images/detail.jpg"
      imageAlt="Koltuk yıkama sırasında buharlı temizlik detayı"
      currentHref="/koltuk-yikama"
      schema={serviceSchema}
    />
  );
}
