"use client";

import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/onboarding");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071B3B]">
            {/* Background Glow */}
            <div className="absolute h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-3xl" />

            {/* Floating Dots */}
            <div className="absolute top-24 left-20 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="absolute top-40 right-24 h-3 w-3 rounded-full bg-violet-500 animate-pulse" />
            <div className="absolute bottom-40 left-32 h-2 w-2 rounded-full bg-blue-400 animate-pulse" />

            <div className="z-10 flex flex-col items-center">
                {/* AI Icon */}
                <div className="mb-8 flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_80px_rgba(124,58,237,0.6)]">
                    <BrainCircuit size={90} className="text-white" />
                </div>

                <h1 className="text-6xl font-extrabold text-white">
                    Learning
                </h1>

                <h2 className="text-6xl font-extrabold text-violet-500">
                    Buddy
                </h2>

                <p className="mt-4 text-lg text-gray-300">
                    Your AI Learning Assistant
                </p>

                {/* Loader */}
                <div className="mt-16 h-14 w-14 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
            </div>
        </main>
    );
}