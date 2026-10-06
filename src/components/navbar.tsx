"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL, serviceLinks } from "@/lib/services";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 180 && !open);
  });

  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isServicePath = serviceLinks.some((s) => pathname === s.href);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            "glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pl-6 pr-2 transition-colors duration-500",
            scrolled ? "bg-ink/70" : "bg-white/[0.03]"
          )}
        >
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)} aria-label="Bursa Yıkama anasayfa">
            <span className="grid size-8 place-items-center rounded-full bg-linear-to-b from-[#3adbf5] to-turquoise text-sm font-bold text-ink shadow-[0_0_24px_rgba(0,184,217,0.6)]">
              B
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              Bursa<span className="text-turquoise">Yıkama</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
            {navLinks.slice(0, 2).map((link) => (
              <NavLink key={link.href} href={link.href} active={pathname === link.href}>
                {link.label}
              </NavLink>
            ))}

            <div className="group relative">
              <button
                type="button"
                className={cn(
                  "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                  isServicePath ? "text-white" : "text-white/65"
                )}
                aria-haspopup="true"
              >
                {isServicePath && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                Hizmetler
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="glass glass-strong rounded-3xl p-2">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block rounded-2xl px-4 py-3 transition-colors hover:bg-white/10"
                    >
                      <span className="block text-sm font-semibold text-white">{s.title}</span>
                      <span className="block text-xs text-white/50">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <NavLink key={link.href} href={link.href} active={pathname.startsWith(link.href)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="whatsapp" size="icon" asChild className="hidden size-11 sm:inline-flex">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp'tan yazın">
                <MessageCircle size={20} />
              </a>
            </Button>
            <Button variant="primary" size="sm" asChild className="hidden h-11 sm:inline-flex">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-strong fixed inset-0 z-40 flex flex-col justify-center px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobil menü">
              {[...navLinks.slice(0, 2), ...serviceLinks.map((s) => ({ href: s.href, label: s.title })), ...navLinks.slice(2)].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 font-display text-3xl font-semibold tracking-tight transition-colors",
                      pathname === link.href ? "text-turquoise" : "text-white/85 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex gap-3"
            >
              <Button variant="whatsapp" size="lg" asChild className="flex-1">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </Button>
              <Button variant="primary" size="lg" asChild className="flex-1">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone size={18} /> Ara
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-white",
        active ? "text-white" : "text-white/65"
      )}
    >
      {active && (
        <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
      )}
      {children}
    </Link>
  );
}
