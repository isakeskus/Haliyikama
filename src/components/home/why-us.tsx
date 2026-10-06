import { BadgeCheck, Droplets, Leaf, ShieldCheck, Users, Wind } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  { title: "Profesyonel Makine", desc: "Yüksek vakum gücüne sahip sanayi tipi makineler.", icon: Droplets },
  { title: "Çevre Dostu İlaç", desc: "Doğaya ve insan sağlığına zararsız özel solüsyonlar.", icon: Leaf },
  { title: "Hızlı Kuruma", desc: "İşlem sonrası çok kısa sürede kullanıma hazır.", icon: Wind },
  { title: "Deneyimli Personel", desc: "Alanında uzman, güler yüzlü ekibimiz.", icon: Users },
  { title: "Uygun Fiyat", desc: "Kaliteli hizmeti en uygun fiyat garantisiyle sunuyoruz.", icon: BadgeCheck },
  { title: "Müşteri Memnuniyeti", desc: "%100 müşteri memnuniyeti odaklı çalışma prensibi.", icon: ShieldCheck },
];

export function WhyUs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading kicker="Neden Biz" title="Neden bizi" accent="seçmelisiniz?" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <TiltCard className="group h-full p-7 md:p-8">
                  <span className="mb-6 grid size-14 place-items-center rounded-2xl bg-linear-to-b from-turquoise/25 to-turquoise/5 text-aqua ring-1 ring-inset ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={26} />
                  </span>
                  <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
