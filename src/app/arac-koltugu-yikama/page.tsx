import { ServicePage } from "@/components/service-page";
import { PHONE_TEL } from "@/lib/services";

export const metadata = {
  title: "Araç Koltuğu Yıkama | Bursa",
  description: "Bursa'da profesyonel araç koltuğu yıkama ve detaylı iç temizlik hizmeti. Leke ve kokulara kesin çözüm.",
  alternates: { canonical: "/arac-koltugu-yikama" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Araç Koltuğu Yıkama",
  name: "Araç Koltuğu ve İç Mekan Yıkama",
  areaServed: { "@type": "City", name: "Bursa" },
  provider: { "@type": "LocalBusiness", name: "Bursa Koltuk Yıkama", telephone: PHONE_TEL },
};

export default function AracKoltuguYikamaPage() {
  return (
    <ServicePage
      kicker="Araç Koltuğu Yıkama"
      title="Araç Koltuğu"
      accent="Yıkama"
      intro="Aracınızın içi zamanla toz, ter ve dökülen sıvılar nedeniyle kirlenir. Özel araç içi temizleme makinelerimizle aracınızın koltuklarını, kapı döşemelerini ve taban halısını ilk günkü temizliğine kavuşturuyoruz. Kötü kokulara son veriyoruz."
      bullets={[
        "Derinlemesine vakumlu temizlik",
        "Araç içine sinmiş kötü kokuların giderilmesi",
        "Tavan ve taban döşemesi temizliği (Opsiyonel)",
        "Hızlı kuruma ve teslimat",
      ]}
      image="/images/hero.jpg"
      imageAlt="Araç koltuğu yıkama hizmeti detayı"
      currentHref="/arac-koltugu-yikama"
      schema={serviceSchema}
    />
  );
}
