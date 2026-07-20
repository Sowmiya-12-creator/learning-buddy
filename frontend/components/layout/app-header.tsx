"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title?: string;
  showSearch?: boolean;
  className?: string;
}

export default function AppHeader({ title, showSearch = false, className }: AppHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "sticky top-0 z-40 flex items-center justify-between px-5 py-4",
        "glass border-b border-white/8",
        className,
      )}
    >
      {/* Logo / Title */}
      <Link href="/home" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-sm shadow-lg glow-violet">
          🤖
        </div>
        <span className="text-sm font-bold text-white hidden sm:block">
          {title ?? "Learning Buddy"}
        </span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {showSearch && (
          <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Search size={18} />
          </button>
        )}

        {/* Notification bell */}
        <Link
          href="/notifications"
          className="relative w-9 h-9 rounded-xl glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#071B3B]" />
        </Link>

        {/* Avatar */}
        <Link href="/profile">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-violet-500/30">
            AI
          </div>
        </Link>
      </div>
    </motion.header>
  );
}
