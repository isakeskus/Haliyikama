import Image from "next/image";
import Link from "next/link";
import { Armchair, ArrowUpRight, BedDouble, Building2, Car, Sofa, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "Koltuk Yıkama",
    desc: "Derinlemesine buharlı ve vakumlu temizlik ile koltuklarınız ilk günkü gibi. Kumaşa özel, zararsız solüsyonlar.",
    href: "/koltuk-yikama",
    icon: Sofa,
    featured: true,
  },
  { title: "L Köşe Takımı", desc: "Köşe takımlarınız için özel buharlı temizlik.", href: "/koltuk-yikama", icon: Sparkles },
  { title: "Yatak Yıkama", desc: "Anti-bakteriyel yatak temizliği ile sağlıklı uykular.", href: "/yatak-yikama", icon: BedDouble },
  { title: "Sandalye Yıkama", desc: "Yemek masası ve ofis sandalyeleri için detaylı temizlik.", href: "/sandalye-yikama", icon: Armchair },
  { title: "Araç Koltuğu", desc: "Aracınızın içi mis gibi koksun, lekeler tarih olsun.", href: "/arac-koltugu-yikama", icon: Car },
  { title: "Ofis Koltukları", desc: "İş yerinizdeki koltuklar için toplu ve hızlı temizlik.", href: "/sandalye-yikama", icon: Building2 },
];

export function ServicesBento() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="Hizmetlerimiz"
          title="Her tekstil yüzey için"
          accent="profesyonel çözüm"
          description="Evinizin veya iş yerinizin ihtiyacı olan tüm tekstil yüzeyler için yerinde, hızlı ve hijyenik temizlik."
        />

        <div className="mt-14 grid gap-4 md:mt-20 md:gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className={cn(s.featured && "lg:col-span-2 lg:row-span-2")}>
                <Link href={s.href} className="group block h-full">
                  <TiltCard
                    className={cn(
                      "relative flex h-full flex-col justify-between overflow-hidden p-7 md:p-8",
                      s.featured ? "min-h-[24rem] lg:min-h-[32rem]" : "min-h-[14rem]"
                    )}
                  >
                    {s.featured && (
                      <>
                        <Image
                          src="/images/detail.jpg"
                          alt="Buharlı koltuk yıkama ve leke çıkarma"
                          fill
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          className="object-cover opacity-60 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/10" aria-hidden="true" />
                      </>
                    )}

                    <div className="relative flex items-start justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-aqua backdrop-blur">
                        <Icon size={26} />
                      </span>
                      <span className="grid size-10 place-items-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-aqua/60 group-hover:bg-turquoise group-hover:text-ink">
                        <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <div className="relative mt-10">
                      <h3 className={cn("font-semibold text-white", s.featured ? "text-3xl md:text-4xl" : "text-2xl")}>{s.title}</h3>
                      <p className={cn("mt-3 leading-relaxed text-white/60", s.featured ? "max-w-md text-base" : "text-sm")}>{s.desc}</p>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
