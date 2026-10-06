import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { CtaButtons } from "@/components/cta-buttons";
import { FinalCta } from "@/components/home/final-cta";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { districts } from "@/lib/districts";
import { serviceLinks } from "@/lib/services";

export function ServicePage({
  kicker,
  title,
  accent,
  intro,
  bullets,
  image,
  imageAlt,
  currentHref,
  schema,
}: {
  kicker: string;
  title: string;
  accent: string;
  intro: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  currentHref: string;
  schema: Record<string, unknown>;
}) {
  const others = serviceLinks.filter((s) => s.href !== currentHref);

  return (
    <PageTransition>
      <JsonLd data={schema} />
      <PageHero kicker={kicker} title={title} accent={accent} description={intro}>
        <CtaButtons />
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]" max={4}>
              <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur">
                <span className="size-1.5 rounded-full bg-turquoise shadow-[0_0_10px_#00b8d9]" aria-hidden="true" />
                Yerinde Hizmet
              </span>
            </TiltCard>
          </Reveal>

          <ul className="space-y-3">
            {bullets.map((item, i) => (
              <Reveal key={item} delay={i * 0.08} y={24}>
                <li className="glass flex items-center gap-4 rounded-2xl px-5 py-4 md:px-6 md:py-5">
                  <CheckCircle2 className="shrink-0 text-turquoise" size={24} />
                  <span className="font-medium text-white/90">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-white md:text-3xl">Diğer hizmetlerimiz</h2>
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.href} delay={i * 0.08} y={24}>
                <Link href={s.href} className="group glass block h-full rounded-3xl p-6 transition-colors hover:bg-white/[0.08]">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                    <ArrowUpRight size={20} className="text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aqua" />
                  </div>
                  <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {districts.slice(0, 9).map((d) => (
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
