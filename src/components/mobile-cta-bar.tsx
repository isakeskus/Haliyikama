"use client";

import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

export function MobileCtaBar() {
  return (
    <motion.div
      initial={{ y: "120%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1, delay: 1 }}
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="glass glass-strong mx-auto flex max-w-md gap-2 rounded-full p-1.5">
        <Button variant="primary" asChild className="h-12 flex-1">
          <a href={`tel:${PHONE_TEL}`}>
            <Phone size={18} /> Hemen Ara
          </a>
        </Button>
        <Button variant="whatsapp" asChild className="h-12 flex-1">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
