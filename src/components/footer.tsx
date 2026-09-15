import Link from "next/link";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/services";
import { districts } from "@/lib/districts";

const featuredDistricts = districts.slice(0, 6);

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8 rounded-t-3xl mt-12 shadow-2xl">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-12">
        {/* Brand & Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Bursa<span className="text-turquoise">Yıkama</span>
          </h2>
          <p className="text-white/80 mb-6">
            Bursa&apos;nın her noktasına aynı gün yerinde profesyonel koltuk, yatak ve araç koltuğu temizliği hizmeti sunuyoruz.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6">İletişim</h3>
          <ul className="space-y-4 text-white/80">
            <li className="flex items-start space-x-3">
              <Phone className="text-turquoise shrink-0 mt-1" size={20} />
              <a href={`tel:${PHONE_TEL}`} className="hover:text-turquoise transition-colors block">{PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-start space-x-3">
              <MessageCircle className="text-turquoise shrink-0 mt-1" size={20} />
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-turquoise transition-colors block">WhatsApp&apos;tan Yazın</a>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="text-turquoise shrink-0 mt-1" size={20} />
              <span>Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara, Bursa</span>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="text-turquoise shrink-0 mt-1" size={20} />
              <span>Her Gün: 08:00 - 22:00</span>
            </li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Hızlı Bağlantılar</h3>
          <ul className="space-y-2 text-white/80">
            <li><Link href="/koltuk-yikama" className="hover:text-turquoise transition-colors">Koltuk Yıkama</Link></li>
            <li><Link href="/yatak-yikama" className="hover:text-turquoise transition-colors">Yatak Yıkama</Link></li>
            <li><Link href="/sandalye-yikama" className="hover:text-turquoise transition-colors">Sandalye Yıkama</Link></li>
            <li><Link href="/arac-koltugu-yikama" className="hover:text-turquoise transition-colors">Araç Koltuğu Yıkama</Link></li>
            <li><Link href="/iletisim" className="hover:text-turquoise transition-colors">İletişim & Randevu</Link></li>
          </ul>
        </div>

        {/* District Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Hizmet Bölgeleri</h3>
          <ul className="space-y-2 text-white/80">
            {featuredDistricts.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className="hover:text-turquoise transition-colors">
                  {d.name} Koltuk Yıkama
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
        <p>&copy; {new Date().getFullYear()} Bursa Koltuk Yıkama. Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
}
