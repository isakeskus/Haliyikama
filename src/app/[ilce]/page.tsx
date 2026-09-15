import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { districts, getDistrictBySlug } from "@/lib/districts";
import { PHONE_TEL, WHATSAPP_URL, serviceLinks } from "@/lib/services";

export function generateStaticParams() {
  return districts.map((d) => ({ ilce: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ilce: string }>;
}) {
  const { ilce } = await params;
  const district = getDistrictBySlug(ilce);
  if (!district) return {};

  const title = `${district.name} Koltuk Yıkama | Yerinde Profesyonel Temizlik`;
  const description = `${district.name}'de evinizde veya iş yerinizde profesyonel koltuk, yatak, sandalye ve araç koltuğu yıkama hizmeti. Aynı gün randevu ve leke çıkarma garantisi.`;

  return {
    title,
    description,
    alternates: { canonical: `/${district.slug}` },
    openGraph: {
      title,
      description,
      url: `https://bursakoltukyikama.com/${district.slug}`,
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ ilce: string }>;
}) {
  const { ilce } = await params;
  const district = getDistrictBySlug(ilce);

  if (!district) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Koltuk ve Yatak Yıkama",
    provider: {
      "@type": "LocalBusiness",
      name: "Bursa Koltuk Yıkama",
      telephone: PHONE_TEL,
      areaServed: district.name,
    },
    areaServed: {
      "@type": "City",
      name: `${district.name}, Bursa`,
    },
    name: `${district.name} Koltuk Yıkama`,
    description: district.blurb,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://bursakoltukyikama.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: `${district.name} Koltuk Yıkama`,
        item: `https://bursakoltukyikama.com/${district.slug}`,
      },
    ],
  };

  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-32">
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
        <div>
          <div className="inline-flex items-center gap-2 text-turquoise font-medium mb-4">
            <MapPin size={18} />
            <span>Bursa / {district.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy dark:text-white leading-tight">
            {district.name} Koltuk Yıkama
          </h1>
          <p className="text-lg text-foreground/80 mb-6">{district.blurb}</p>

          {district.neighborhoods && district.neighborhoods.length > 0 && (
            <p className="text-sm text-foreground/60 mb-8">
              Hizmet verdiğimiz bazı mahalleler: {district.neighborhoods.join(", ")} ve {district.name}&apos;in diğer tüm mahalleleri.
            </p>
          )}

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
            alt={`${district.name} koltuk yıkama hizmeti`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-navy dark:text-white">
            {district.name}&apos;de Sunduğumuz Hizmetler
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block p-6 rounded-2xl bg-white/70 dark:bg-navy/10 border border-foreground/10 hover:border-turquoise/50 transition-colors"
              >
                <CheckCircle2 className="text-turquoise mb-3" size={24} />
                <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                <p className="text-sm text-foreground/70">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy dark:text-white">
          Bursa&apos;nın Diğer İlçelerinde de Hizmetteyiz
        </h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {districts
            .filter((d) => d.slug !== district.slug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="px-4 py-2 rounded-full border border-turquoise/30 bg-turquoise/5 text-turquoise font-medium text-sm hover:bg-turquoise/10 transition-colors"
              >
                {d.name} Koltuk Yıkama
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
