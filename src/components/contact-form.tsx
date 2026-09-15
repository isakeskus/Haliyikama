"use client";

import { Button } from "@/components/ui/button";

export function ContactForm() {
  return (
    <div className="glass-card p-8 rounded-3xl">
      <h2 className="text-2xl font-bold mb-6">Bize Mesaj Gönderin</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-semibold ml-1">Adınız Soyadınız</label>
          <input type="text" autoComplete="name" className="w-full h-12 px-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold ml-1">Telefon Numaranız</label>
          <input type="tel" inputMode="tel" autoComplete="tel" className="w-full h-12 px-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" />
        </div>
        <div>
          <label className="text-sm font-semibold ml-1">Mesajınız</label>
          <textarea className="w-full p-4 mt-1 rounded-xl border border-foreground/20 bg-background/50 focus:border-turquoise outline-none" rows={4}></textarea>
        </div>
        <Button size="lg" className="w-full">Mesajı Gönder</Button>
      </form>
    </div>
  );
}
