"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, BookOpen, BrainCircuit, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home",       href: "/home",       icon: Home },
  { label: "AI Tutor",  href: "/ai-tutor",    icon: Bot },
  { label: "Flashcards",href: "/flashcards",   icon: BookOpen },
  { label: "Quiz",      href: "/quiz",         icon: BrainCircuit },
  { label: "Focus",     href: "/focus",        icon: Timer },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Blur background */}
      <div className="absolute inset-0 glass border-t border-white/10" />

      <div className="relative flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 group"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -inset-2 rounded-xl bg-violet-600/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={cn(
                    "relative z-10 transition-colors duration-200",
                    isActive ? "text-violet-400" : "text-white/40 group-hover:text-white/70",
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-200",
                  isActive ? "text-violet-400" : "text-white/40",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
