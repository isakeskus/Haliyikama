import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, serviceLinks } from "@/lib/services";
import { districts } from "@/lib/districts";

const featuredDistricts = districts.slice(0, 8);

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden pb-28 pt-4 md:pb-10">
      <div className="container mx-auto px-4">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div>
              <Link href="/" className="font-display text-3xl font-semibold tracking-tight text-white">
                Bursa<span className="text-turquoise">Yıkama</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Bursa&apos;nın her noktasına aynı gün yerinde profesyonel koltuk, yatak ve araç koltuğu temizliği hizmeti sunuyoruz.
              </p>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-aqua">İletişim</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 shrink-0 text-turquoise" size={18} />
                  <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-white">{PHONE_DISPLAY}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 shrink-0 text-turquoise" size={18} />
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    WhatsApp&apos;tan Yazın
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-turquoise" size={18} />
                  <span>Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara, Bursa</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 shrink-0 text-turquoise" size={18} />
                  <span>Her Gün: 08:00 - 22:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-aqua">Hizmetler</h3>
              <ul className="space-y-3 text-sm text-white/70">
                {serviceLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="transition-colors hover:text-white">{s.title}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/iletisim" className="transition-colors hover:text-white">İletişim &amp; Randevu</Link>
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-aqua">Hizmet Bölgeleri</h3>
              <ul className="space-y-3 text-sm text-white/70">
                {featuredDistricts.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${d.slug}`} className="transition-colors hover:text-white">
                      {d.name} Koltuk Yıkama
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-10 select-none text-center font-display text-[17vw] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)] md:mt-14"
        >
          BursaYıkama
        </p>

        <p className="mt-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Bursa Koltuk Yıkama. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
}
