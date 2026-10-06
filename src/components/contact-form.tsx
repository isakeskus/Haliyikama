"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/services";

const FIELD =
  "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/30 outline-none transition-colors focus:border-aqua/70 focus:bg-white/[0.07]";

// There is no backend: the form composes a WhatsApp message to the business so nothing
// is stored or sent to any server of ours.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const text = `Merhaba, ben ${name}.\nTelefon: ${phone}\n${message}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <div className="glass rounded-[2rem] p-7 md:p-10">
      <h2 className="text-2xl font-semibold text-white">Bize mesaj gönderin</h2>
      <p className="mt-2 text-sm text-white/50">Formu doldurun, mesajınız WhatsApp üzerinden bize ulaşsın.</p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="cf-name" className="ml-1 text-sm font-medium text-white/80">Adınız Soyadınız</label>
          <input id="cf-name" name="name" type="text" required maxLength={80} autoComplete="name" className={`${FIELD} h-13`} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="ml-1 text-sm font-medium text-white/80">Telefon Numaranız</label>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" className={`${FIELD} h-13`} />
        </div>
        <div>
          <label htmlFor="cf-message" className="ml-1 text-sm font-medium text-white/80">Mesajınız</label>
          <textarea id="cf-message" name="message" required maxLength={600} rows={4} className={`${FIELD} resize-none py-3`} />
        </div>
        <Button type="submit" size="lg" variant="whatsapp" className="w-full">
          <MessageCircle size={20} /> WhatsApp ile Gönder
        </Button>
        {sent && (
          <p role="status" className="text-center text-sm text-aqua">
            WhatsApp açıldı. Mesajınızı oradan gönderebilirsiniz.
          </p>
        )}
      </form>
    </div>
  );
}
