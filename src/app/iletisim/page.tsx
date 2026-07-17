"use client";

import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-navy dark:text-white">İletişim</h1>
        <p className="text-lg text-foreground/70">
          Randevu almak veya hizmetlerimiz hakkında detaylı bilgi edinmek için bize aşağıdaki kanallardan ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Telefon / WhatsApp</h3>
              <p className="text-foreground/70 mb-2">Hızlı randevu ve teklif için arayın.</p>
              <a href="tel:+905523135463" className="text-xl font-semibold hover:text-turquoise transition-colors block">0552 313 54 63</a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Merkez Ofis</h3>
              <p className="text-foreground/70">Ahmet Paşa mahallesi fevziçakmak caddesi 47 numara, Bursa</p>
              <p className="text-sm text-foreground/50 mt-1">*Bursa'nın tüm ilçelerine gezici servis ağımız mevcuttur.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-4 bg-turquoise/10 rounded-2xl text-turquoise">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Çalışma Saatleri</h3>
              <p className="text-foreground/70">Pazartesi - Pazar: 08:00 - 22:00</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-semibold ml-1">Adınız Soyadınız</label>
              <input type="text" className="w-full h-12 px-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold ml-1">Telefon Numaranız</label>
              <input type="tel" className="w-full h-12 px-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold ml-1">Mesajınız</label>
              <textarea className="w-full p-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" rows={4}></textarea>
            </div>
            <Button size="lg" className="w-full">Mesajı Gönder</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
