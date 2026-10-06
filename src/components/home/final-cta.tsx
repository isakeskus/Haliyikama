"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export function FinalCta() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:px-16 md:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,184,217,0.35),transparent_65%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[length:26px_26px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]"
            />

            <div className="relative">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-aqua">Fiyat Teklifi</p>
              <h2 className="text-3xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl">
                Koltuklarınız <span className="text-gradient">ilk günkü gibi</span> olsun
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                Hizmetlerimiz hakkında detaylı bilgi ve evinize özel fiyat teklifi almak için bizi saniyeler içinde arayabilir ya da yazabilirsiniz.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <Button size="lg" variant="primary" asChild className="h-16 px-10 text-lg">
                    <a href={`tel:${PHONE_TEL}`}>
                      <Phone size={22} /> {PHONE_DISPLAY}
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button size="lg" variant="whatsapp" asChild className="h-16 px-10 text-lg">
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={22} /> WhatsApp
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
