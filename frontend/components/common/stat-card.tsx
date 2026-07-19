"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { itemVariants } from "@/lib/motion";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  color?: string;
  className?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  subtext,
  color = "text-violet-400",
  className,
}: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "glass-card p-4 flex items-center gap-4",
        className,
      )}
    >
      <div className={cn("flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10", color)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/50 font-medium uppercase tracking-wider truncate">{label}</p>
        <p className={cn("text-2xl font-bold mt-0.5 leading-none", color)}>{value}</p>
        {subtext && <p className="text-xs text-white/40 mt-1">{subtext}</p>}
      </div>
    </motion.div>
  );
}
