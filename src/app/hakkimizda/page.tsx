import { Metadata } from "next";
import Image from "next/image";
import { Cpu, HeartHandshake, Leaf, Users } from "lucide-react";
import { PageTransition } from "@/components/page-transition";
import { PageHero } from "@/components/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Bursa Koltuk Yıkama olarak yılların tecrübesiyle Bursa'nın tüm ilçelerine profesyonel temizlik hizmeti sunuyoruz.",
  alternates: { canonical: "/hakkimizda" },
};

const VALUES = [
  { title: "Uzman Ekip", desc: "Alanında eğitimli ve deneyimli profesyonellerle çalışıyoruz.", icon: Users },
  { title: "Son Teknoloji Makineler", desc: "Derinlemesine temizlik ve yüksek vakum gücü sağlayan sanayi tipi cihazlar kullanıyoruz.", icon: Cpu },
  { title: "Çevre ve İnsan Dostu", desc: "Kullandığımız tüm temizlik ürünleri anti-alerjik ve sağlığa zararsızdır.", icon: Leaf },
  { title: "%100 Memnuniyet Garantisi", desc: "İşlem bitiminde siz onay verene kadar işimizi tamamlamış saymıyoruz.", icon: HeartHandshake },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        kicker="Hakkımızda"
        title="Bursa Koltuk Yıkama"
        accent="Hakkımızda"
        description="Bursa ve çevresindeki müşterilerimize yıllardır en kaliteli ve güvenilir temizlik hizmetini sunmaktan gurur duyuyoruz. Evlerinizde ve iş yerlerinizde sağlıklı, hijyenik ve ferah yaşam alanları yaratmak en büyük gayemizdir."
      />

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <TiltCard className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]" max={4}>
              <Image
                src="/images/hero.jpg"
                alt="Bursa Koltuk Yıkama ekibi çalışma anı"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" aria-hidden="true" />
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-[2.5rem] p-8 md:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-aqua">Vizyonumuz</p>
              <p className="mt-4 text-xl leading-relaxed text-white/85 md:text-2xl">
                Temizlik sektöründe yenilikçi teknolojileri ve çevre dostu ürünleri kullanarak, Bursa&apos;nın en çok tercih edilen ve güvenilen koltuk yıkama firması olmak.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-semibold text-white md:text-5xl">
              Neden <span className="text-gradient">biz?</span>
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={(i % 2) * 0.08}>
                  <TiltCard className="group h-full p-7 md:p-8">
                    <span className="mb-5 grid size-14 place-items-center rounded-2xl bg-linear-to-b from-turquoise/25 to-turquoise/5 text-aqua ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={26} />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{v.desc}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </PageTransition>
  );
}
