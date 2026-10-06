import { Marquee } from "@/components/ui/marquee";

const ITEMS = [
  "Buharlı Derin Temizlik",
  "Aynı Gün Servis",
  "Leke Garantisi",
  "Anti-Alerjik Ürünler",
  "Bursa'nın Her Noktasına",
  "Her Gün 08:00 - 22:00",
];

export function MarqueeStrip() {
  return (
    <section aria-label="Öne çıkan özellikler" className="relative z-10 space-y-3 border-y border-white/10 bg-white/[0.02] py-6 backdrop-blur-sm md:space-y-4 md:py-8">
      <Marquee items={ITEMS} className="font-display text-2xl font-semibold text-white/85 md:text-5xl" />
      <Marquee
        items={[...ITEMS].reverse()}
        reverse
        className="font-display text-2xl font-semibold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] md:text-5xl"
      />
    </section>
  );
}
