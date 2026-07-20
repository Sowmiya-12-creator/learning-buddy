"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
    return (
        <main className="min-h-screen bg-[#071B3B] flex items-center justify-center px-6">
            <div className="w-full max-w-md text-center">

                {/* Skip */}
                <div className="flex justify-end mb-8">
                    <Link
                        href="/login"
                        className="text-violet-400 hover:text-violet-300 font-medium"
                    >
                        Skip
                    </Link>
                </div>

                {/* Robot Placeholder */}
                <div className="mx-auto mb-10 flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/30 shadow-[0_0_60px_rgba(124,58,237,0.5)]">
                    <span className="text-8xl">🤖</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white leading-tight">
                    Welcome to
                </h1>

                <h2 className="mt-2 text-5xl font-extrabold text-violet-500">
                    Learning Buddy
                </h2>

                {/* Subtitle */}
                <p className="mt-6 text-gray-300 leading-7">
                    Your AI-powered learning companion that helps you study smarter,
                    stay motivated and track your learning journey.
                </p>

                {/* Progress Dots */}
                <div className="mt-10 flex justify-center gap-3">
                    <div className="h-3 w-10 rounded-full bg-violet-500"></div>
                    <div className="h-3 w-3 rounded-full bg-gray-600"></div>
                    <div className="h-3 w-3 rounded-full bg-gray-600"></div>
                </div>

                {/* Next Button */}
                <Link
                    href="/login"
                    className="mt-12 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-violet-600 text-lg font-semibold text-white transition hover:bg-violet-700"
                >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </main>
    );
}