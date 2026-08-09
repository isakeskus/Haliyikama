import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Araç Koltuğu Yıkama | Bursa",
  description: "Bursa'da profesyonel araç koltuğu yıkama ve detaylı iç temizlik hizmeti. Leke ve kokulara kesin çözüm.",
};

export default function AracKoltuguYikamaPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-40 lg:pb-32 container mx-auto px-4 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy dark:text-white">Araç Koltuğu Yıkama</h1>
          <p className="text-lg text-foreground/80 mb-6">
            Aracınızın içi zamanla toz, ter ve dökülen sıvılar nedeniyle kirlenir. Özel araç içi temizleme makinelerimizle aracınızın koltuklarını, kapı döşemelerini ve taban halısını ilk günkü temizliğine kavuşturuyoruz. Kötü kokulara son veriyoruz.
          </p>
          <ul className="space-y-3 mb-8">
            {["Derinlemesine vakumlu temizlik", "Araç içine sinmiş kötü kokuların giderilmesi", "Tavan ve taban döşemesi temizliği (Opsiyonel)", "Hızlı kuruma ve teslimat"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="text-turquoise shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="gap-2 text-lg" asChild>
            <a href="tel:+905523135463">
              <Phone size={20} /> Hemen Randevu Al
            </a>
          </Button>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl glass border border-white/30 h-[300px] md:h-[400px] relative">
          <Image 
            src="/images/hero.jpg" 
            alt="Araç Koltuğu Yıkama Detayı" 
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
