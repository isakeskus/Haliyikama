"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MessageCircle, Phone, Sparkles as SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { use3DSupport } from "@/components/3d/use-3d-support";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/services";
import { cn } from "@/lib/utils";

const SofaCanvas = dynamic(() => import("@/components/3d/sofa-canvas"), {
  ssr: false,
  loading: () => null,
});

const TITLE: { w: string; accent?: boolean }[] = [
  { w: "Bursa'nın" },
  { w: "Profesyonel" },
  { w: "Koltuk", accent: true },
  { w: "Yıkama", accent: true },
  { w: "Hizmeti" },
];

const CHAPTERS = [
  {
    kicker: "01 — Önce",
    text: "Günlük kullanımda lekeler, toz ve akarlar kumaşın derinine işler. Yüzeysel silmek yetmez.",
  },
  {
    kicker: "02 — Buharlı yıkama",
    text: "Sanayi tipi vakumlu makineler ve kumaşa özel solüsyonlarla, evinizde gözünüzün önünde derinlemesine temizlik.",
  },
  {
    kicker: "03 — Sonra",
    text: "4-6 saatte kurur. Anti-alerjik, çocuk dostu ürünlerle koltuklarınız ilk günkü gibi.",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const support = use3DSupport();
  const reduced = useReducedMotion();
  const show3D = support === true && !reduced;
  const pinned = support !== false;
  const inView = useInView(sectionRef, { margin: "120px 0px" });
  const [ready, setReady] = useState(false);
  const [chapter, setChapter] = useState(0);

  // Scroll drives the cleaning; a short autoplay intro shows a clean stripe immediately.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const scroll = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.7 });
  const intro = useMotionValue(0);
  const progress = useTransform([scroll, intro], (v: number[]) => Math.max(v[0], v[1]));
  const percent = useTransform(progress, (v) => Math.round(Math.min(1, v / 0.9) * 100));
  const bar = useTransform(progress, (v) => Math.min(1, v / 0.9));
  const hint = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  useMotionValueEvent(progress, "change", (v) => {
    const next = v < 0.34 ? 0 : v < 0.7 ? 1 : 2;
    setChapter((prev) => (prev === next ? prev : next));
  });

  // Idle autoplay: dirty -> washed -> shining clean -> back to dirty, looping until the visitor
  // starts scrolling; from then on the scroll position drives the cleaning.
  useEffect(() => {
    if (!show3D || scrollYProgress.get() > 0.015) return;
    const loop = animate(intro, [0, 1, 1, 0, 0], {
      duration: 15.5,
      times: [0, 0.58, 0.84, 0.92, 1],
      ease: ["easeInOut", "linear", "easeInOut", "linear"],
      repeat: Infinity,
      delay: 0.8,
    });
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v <= 0.015) return;
      loop.stop();
      animate(intro, 0, { duration: 0.8, ease: "easeInOut" });
      unsubscribe();
    });
    return () => {
      loop.stop();
      unsubscribe();
    };
  }, [show3D, intro, scrollYProgress]);

  const current = CHAPTERS[chapter];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className={cn("relative", pinned && "h-[340vh] motion-reduce:h-auto")}
    >
      <div
        className={cn(
          "flex items-start overflow-hidden lg:items-center",
          pinned ? "sticky top-0 h-svh motion-reduce:static motion-reduce:min-h-svh" : "min-h-svh py-32"
        )}
      >
        {show3D && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.4 }}
            aria-hidden="true"
          >
            <SofaCanvas progress={progress} active={inView} onReady={() => setReady(true)} />
          </motion.div>
        )}

        {!show3D && support !== null && (
          <div className="absolute inset-0" aria-hidden="true">
            <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink via-ink/55 to-transparent to-[58%] lg:bg-linear-to-r lg:from-ink/85 lg:via-ink/25 lg:to-transparent lg:to-[62%]"
        />

        <div className="pointer-events-none container relative z-10 mx-auto px-4 pt-24 sm:pt-28 lg:pt-0">
          <div className="max-w-xl lg:max-w-[35rem]">
            <p
              className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-aqua backdrop-blur sm:mb-5 sm:px-4 sm:text-[11px] sm:tracking-[0.2em]"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="size-1.5 rounded-full bg-turquoise shadow-[0_0_12px_#00b8d9]" aria-hidden="true" />
              Bursa · Yerinde Profesyonel Temizlik
            </p>

            <h1
              id="hero-title"
              className="text-[2.3rem] font-semibold leading-[1.04] text-white sm:text-6xl lg:text-[clamp(3rem,8.6vh,5rem)]"
            >
              {TITLE.map((t, i) => (
                <span key={t.w}>
                  <span className="reveal-word">
                    <span style={{ ["--i" as string]: i }} className={cn(t.accent && "text-gradient")}>
                      {t.w}
                    </span>
                  </span>{" "}
                </span>
              ))}
            </h1>

            <div className="mt-5 min-h-[7.25rem] sm:mt-7 sm:min-h-[8rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={chapter}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-aqua">{current.kicker}</p>
                  <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-lg">{current.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-auto mt-6 hidden gap-3 sm:flex">
              <Magnetic>
                <Button size="lg" variant="primary" asChild>
                  <a href={`tel:${PHONE_TEL}`}>
                    <Phone size={20} /> Hemen Ara
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="whatsapp" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={20} /> WhatsApp
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>

        {show3D && (
          <>
            <div className="pointer-events-none absolute inset-x-4 bottom-24 z-10 flex justify-center md:bottom-10 lg:inset-x-auto lg:left-[max(1rem,calc((100vw-80rem)/2+1rem))] lg:justify-start">
              <div className="glass flex items-center gap-3 rounded-full px-5 py-3 sm:gap-4">
                <SparklesIcon size={16} className="text-aqua" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">Temizlik</span>
                <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10 sm:w-28">
                  <motion.div
                    style={{ scaleX: bar }}
                    className="h-full origin-left rounded-full bg-linear-to-r from-navy via-turquoise to-aqua"
                  />
                </div>
                <span className="w-14 text-right font-display text-lg font-semibold tabular-nums text-white">
                  <motion.span>{percent}</motion.span>%
                </span>
              </div>
            </div>

            <motion.div
              style={{ opacity: hint }}
              className="pointer-events-none absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/50 lg:flex"
              aria-hidden="true"
            >
              Kaydır
              <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
                <span className="animate-scroll-hint size-1.5 rounded-full bg-aqua" />
              </span>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
