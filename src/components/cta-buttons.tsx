"use client";

import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export function CtaButtons({ phoneLabel = "Hemen Randevu Al" }: { phoneLabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Magnetic>
        <Button size="lg" variant="primary" asChild>
          <a href={`tel:${PHONE_TEL}`}>
            <Phone size={20} /> {phoneLabel}
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
  );
}
