"use client";

import { ArrowLeft, ShieldCheck, Database, Lock, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#071B3B] text-white">
            <div className="mx-auto max-w-3xl px-6 py-6">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Privacy
                        </h1>

                        <p className="text-sm text-gray-400">
                            Manage your privacy and data
                        </p>
                    </div>
                </div>

                {/* Privacy Intro */}
                <div className="mb-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
                        <ShieldCheck className="h-6 w-6 text-violet-400" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        Your Privacy Matters
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-300">
                        Learning Buddy uses your profile and learning preferences
                        to provide a more personalized learning experience.
                    </p>
                </div>

                {/* Privacy Information */}
                <div className="space-y-4">

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex gap-4">
                            <Database className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                            <div>
                                <h3 className="font-semibold">
                                    Your Information
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Your account information and learning preferences
                                    are used to personalize your Learning Buddy
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex gap-4">
                            <Lock className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                            <div>
                                <h3 className="font-semibold">
                                    Account Security
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Your account is protected using the
                                    authentication system provided by Learning
                                    Buddy.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex gap-4">
                            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-violet-400" />

                            <div>
                                <h3 className="font-semibold">
                                    Personalized Learning
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Your selected class, learning goals, language,
                                    and study preferences help Learning Buddy
                                    provide relevant learning support.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}