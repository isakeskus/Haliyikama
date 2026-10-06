"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

const STATS = [
  { value: 5000, suffix: "+", label: "Mutlu Müşteri" },
  { value: 17, suffix: "", label: "Bursa İlçesinde Hizmet" },
  { value: 95, prefix: "%", label: "Lekelerde Başarı" },
];

function ParallaxImage({
  src,
  alt,
  className,
  range,
}: {
  src: string;
  alt: string;
  className?: string;
  range: [string, string];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], range);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(14% 14% 14% 14% round 2.5rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] ${className ?? ""}`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent" aria-hidden="true" />
    </motion.div>
  );
}

export function Showcase() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading
          kicker="İşimizden Kareler"
          title="Titiz çalışma,"
          accent="gözle görülür fark"
          description="Profesyonel ekipmanlarımız ve titiz çalışma anlayışımızla yerinde temizlik."
        />

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:mt-20 md:grid-cols-12 md:gap-6">
          <ParallaxImage
            src="/images/hero.jpg"
            alt="Evde profesyonel koltuk yıkama hizmeti"
            range={["-6%", "6%"]}
            className="h-[22rem] md:col-span-7 md:h-[34rem]"
          />
          <div className="flex flex-col gap-5 md:col-span-5 md:gap-6">
            <ParallaxImage
              src="/images/detail.jpg"
              alt="Buharlı koltuk yıkama ve leke çıkarma detayı"
              range={["6%", "-6%"]}
              className="h-[18rem] md:h-[19rem]"
            />
            <Reveal className="grow">
              <div className="glass flex h-full flex-col justify-center rounded-[2.5rem] p-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-aqua">Bursa&apos;nın tercihi</p>
                <p className="mt-3 text-lg leading-relaxed text-white/80">
                  Yerinde yıkıyor, gözünüzün önünde sonucu görüyorsunuz. İşlem bitiminde siz onay verene kadar işimizi tamamlamış saymıyoruz.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-5 sm:grid-cols-3 md:mt-8 md:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass rounded-[2rem] p-8 text-center">
                <p className="font-display text-5xl font-semibold text-gradient md:text-6xl">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/50">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
