"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover } from "@/lib/motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
};

export default function GlassCard({
  children,
  className,
  animate = false,
  onClick,
  padding = "md",
}: GlassCardProps) {
  if (animate) {
    return (
      <motion.div
        className={cn("glass-card", paddingMap[padding], onClick && "cursor-pointer", className)}
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        variants={cardHover}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn("glass-card", paddingMap[padding], onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
