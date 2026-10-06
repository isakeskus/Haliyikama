"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 24,
        mass: 1,
        delay,
        opacity: { duration: 0.7, delay },
        filter: { duration: 0.7, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
