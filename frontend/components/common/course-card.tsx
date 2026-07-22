"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, itemVariants } from "@/lib/motion";
import Link from "next/link";
import { BookOpen, CheckCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  subject: string;
  cardCount: number;
  masteredCount: number;
  color?: string;
  lastStudied?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function CourseCard({
  title,
  subject,
  cardCount,
  masteredCount,
  color = "#818cf8",
  lastStudied,
  href,
  onClick,
  className,
}: CourseCardProps) {
  const progress = cardCount > 0 ? Math.round((masteredCount / cardCount) * 100) : 0;

  const content = (
    <motion.div
      variants={itemVariants}
      className={cn("glass-card p-4 cursor-pointer group", className)}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      animate="rest"
      custom={cardHover}
      onClick={onClick}
    >
      {/* Color bar */}
      <div className="h-1 rounded-full mb-4" style={{ backgroundColor: color }} />

      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
          <BookOpen size={18} style={{ color }} />
        </div>
        {progress === 100 && (
          <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
        )}
      </div>

      <h3 className="font-semibold text-white text-sm leading-snug mb-0.5">{title}</h3>
      <p className="text-xs text-white/50 mb-3">{subject}</p>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-white/50 mb-1.5">
          <span>{masteredCount}/{cardCount} mastered</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {lastStudied && (
        <p className="text-xs text-white/30 mt-2">Last: {lastStudied}</p>
      )}
    </motion.div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}
