"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "@/lib/services";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/koltuk-yikama", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b-0">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-navy dark:text-white tracking-tight">
            Bursa<span className="text-turquoise">Yıkama</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-turquoise",
                pathname === link.href ? "text-turquoise" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="whatsapp" size="icon" className="gap-2" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp'tan yazın">
              <MessageCircle size={20} />
            </a>
          </Button>
          <Button variant="primary" className="gap-2" asChild>
            <a href={`tel:${PHONE_TEL}`}>
              <Phone size={18} />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-turquoise",
                    pathname === link.href ? "text-turquoise" : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-4">
                <Button variant="whatsapp" className="flex-1 gap-2" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="primary" className="flex-1 gap-2" asChild>
                  <a href={`tel:${PHONE_TEL}`}>
                    <Phone size={18} />
                    Ara
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
