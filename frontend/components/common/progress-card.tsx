"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { itemVariants } from "@/lib/motion";

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  progress: number; // 0-100
  icon?: React.ReactNode;
  color?: string;
  rightLabel?: string;
  className?: string;
}

export default function ProgressCard({
  title,
  subtitle,
  progress,
  icon,
  color = "from-violet-500 to-purple-600",
  rightLabel,
  className,
}: ProgressCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <motion.div
      variants={itemVariants}
      className={cn("glass-card p-4", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
          </div>
        </div>
        <span className="text-sm font-bold text-white/80">
          {rightLabel ?? `${Math.round(clampedProgress)}%`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", color)}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
