"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/services";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan yazın"
      className="fixed bottom-6 right-6 z-50 hidden size-16 place-items-center rounded-full bg-linear-to-b from-[#3be07f] to-[#25d366] text-[#052e16] shadow-[0_14px_50px_-6px_rgba(37,211,102,0.75)] md:grid"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1, delay: 1.2 }}
    >
      <MessageCircle size={28} />
      <span className="absolute inset-0 -z-10 animate-ping-soft rounded-full bg-[#25d366]/40" aria-hidden="true" />
    </motion.a>
  );
}
