"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faqs";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <SectionHeading kicker="SSS" title="Sık sorulan" accent="sorular" />

        <div className="mt-14 space-y-3 md:mt-16">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05} y={24}>
                <div className={cn("glass overflow-hidden rounded-3xl transition-colors duration-500", isOpen && "bg-white/[0.07]")}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-sans text-lg font-medium text-white md:px-8"
                    >
                      {faq.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                          isOpen ? "border-aqua bg-turquoise text-ink" : "border-white/15 text-white/70"
                        )}
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>
                  </h3>
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 34, mass: 1, opacity: { duration: 0.25 } }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-white/60 md:px-8">{faq.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
