"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBorderCardProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedBorderCard({ children, className }: AnimatedBorderCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("group relative", className)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse"></div>
      <div className="relative bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}