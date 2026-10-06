"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { CalendarCheck, PartyPopper, Sparkles, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Randevu Al", desc: "Bizi arayarak ya da WhatsApp'tan yazarak randevu oluşturun.", icon: CalendarCheck },
  { title: "Ekibimiz Gelsin", desc: "Belirlenen saatte makineleriyle birlikte adresinizdeyiz.", icon: Truck },
  { title: "Profesyonel Temizlik", desc: "Derinlemesine buharlı ve vakumlu yıkama işlemi.", icon: Sparkles },
  { title: "Mis Gibi Teslim", desc: "Tertemiz koltuklarınızı kısa sürede kullanmaya başlayın.", icon: PartyPopper },
];

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative pb-10 last:pb-0 md:pb-14">
      <span
        className={cn(
          "absolute -left-12 top-1 grid size-10 place-items-center rounded-full border text-sm font-semibold transition-all duration-500 sm:-left-16 sm:size-14",
          active
            ? "border-aqua bg-turquoise text-ink shadow-[0_0_34px_rgba(34,211,238,0.7)]"
            : "border-white/15 bg-ink text-white/50"
        )}
      >
        {index + 1}
      </span>
      <Reveal>
        <div className={cn("glass rounded-3xl p-6 transition-colors duration-500 md:p-8", active && "bg-white/[0.08]")}>
          <Icon size={26} className={cn("mb-4 transition-colors duration-500", active ? "text-aqua" : "text-white/40")} />
          <h3 className="text-xl font-semibold text-white md:text-2xl">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">{step.desc}</p>
        </div>
      </Reveal>
    </div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 });

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto grid gap-14 px-4 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            kicker="Süreç"
            title="Nasıl"
            accent="çalışıyoruz?"
            description="Dört basit adımda, siz hiçbir şeyi taşımadan, evinizde yerinde temizlik."
          />
        </div>

        <div ref={ref} className="relative ml-12 sm:ml-16">
          <div className="absolute -left-[28px] bottom-2 top-2 w-px bg-white/10 sm:-left-[36px]" aria-hidden="true" />
          <motion.div
            style={{ scaleY: line }}
            className="absolute -left-[28px] bottom-2 top-2 w-px origin-top bg-linear-to-b from-turquoise to-aqua shadow-[0_0_14px_#22d3ee] sm:-left-[36px]"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
