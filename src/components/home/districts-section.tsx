import Link from "next/link";
import { MapPin } from "lucide-react";
import { districts } from "@/lib/districts";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function DistrictsSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="Hizmet Bölgelerimiz"
          title="Bursa'nın"
          accent="her ilçesinde"
          description="Bursa'nın tüm ilçelerine gezici servisimiz ile profesyonel yerinde koltuk ve yatak yıkama hizmeti sunuyoruz."
        />

        <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-3 md:mt-16">
          {districts.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 6) * 0.04} y={20}>
              <Link
                href={`/${d.slug}`}
                className="group glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-turquoise/15 hover:text-white hover:shadow-[0_12px_40px_-8px_rgba(0,184,217,0.5)] md:text-base"
              >
                <MapPin size={16} className="text-turquoise transition-transform duration-300 group-hover:scale-125" />
                {d.name} Koltuk Yıkama
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
