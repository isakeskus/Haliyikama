import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { PageTransition } from "@/components/page-transition";
import { PageHero } from "@/components/page-hero";
import { CtaButtons } from "@/components/cta-buttons";
import { FinalCta } from "@/components/home/final-cta";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { districts, getDistrictBySlug } from "@/lib/districts";
import { PHONE_TEL, serviceLinks } from "@/lib/services";

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
    <PageTransition>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        kicker={`Bursa / ${district.name}`}
        title={`${district.name}`}
        accent="Koltuk Yıkama"
        description={district.blurb}
      >
        <CtaButtons />
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]" max={4}>
              <Image
                src="/images/hero.jpg"
                alt={`${district.name} koltuk yıkama hizmeti`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur">
                <MapPin size={14} className="text-turquoise" />
                {district.name} · Aynı Gün Servis
              </span>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl font-semibold text-white md:text-4xl">
                {district.name}&apos;de sunduğumuz <span className="text-gradient">hizmetler</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {serviceLinks.map((s, i) => (
                <Reveal key={s.href} delay={i * 0.07} y={24}>
                  <Link href={s.href} className="group glass block h-full rounded-3xl p-5 transition-colors hover:bg-white/[0.08]">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <ArrowUpRight size={18} className="shrink-0 text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aqua" />
                    </div>
                    <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                  </Link>
                </Reveal>
              ))}
            </div>

            {district.neighborhoods && district.neighborhoods.length > 0 && (
              <Reveal delay={0.2}>
                <p className="mt-8 text-sm leading-relaxed text-white/50">
                  Hizmet verdiğimiz bazı mahalleler: {district.neighborhoods.join(", ")} ve {district.name}&apos;in diğer tüm mahalleleri.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Bursa&apos;nın diğer ilçelerinde de hizmetteyiz
          </h2>
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {districts
              .filter((d) => d.slug !== district.slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70 transition-colors hover:border-aqua/50 hover:text-white"
                >
                  <MapPin size={14} className="text-turquoise" />
                  {d.name} Koltuk Yıkama
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </PageTransition>
  );
}
