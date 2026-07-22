"use client";

import Link from "next/link";

const navItems = [
    { name: "Home", href: "/home", icon: "🏠" },
    { name: "Tutor", href: "/ai-tutor", icon: "🤖" },
    { name: "Quiz", href: "/quiz", icon: "🧠" },
    { name: "Focus", href: "/focus", icon: "⏱️" },
    { name: "Profile", href: "/profile", icon: "👤" },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#071B3B]/95 backdrop-blur-lg">
            <div className="mx-auto flex max-w-5xl justify-around py-3">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col items-center text-gray-300 hover:text-violet-400 transition"
                    >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="mt-1 text-xs">{item.name}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}