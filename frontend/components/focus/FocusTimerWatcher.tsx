"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const FOCUS_TIMER_STORAGE_KEY =
    "learning_buddy_focus_timer";

export default function FocusTimerWatcher() {
    const router = useRouter();
    const pathname = usePathname();

    const [showCompletionModal, setShowCompletionModal] =
        useState(false);
        const completionHandledRef = useRef(false);

    useEffect(() => {
        const checkTimer = () => {
            const savedTimer = localStorage.getItem(
                FOCUS_TIMER_STORAGE_KEY
            );

            if (!savedTimer) return;

            try {
                const timerData = JSON.parse(savedTimer);

               if (
    timerData.isRunning &&
    timerData.endTime &&
    Date.now() >= timerData.endTime &&
    !completionHandledRef.current
) {
    completionHandledRef.current = true;
                    // Timer has finished
                    localStorage.setItem(
                        FOCUS_TIMER_STORAGE_KEY,
                        JSON.stringify({
                            ...timerData,
                            isRunning: false,
                            timeLeft: 0,
                        })
                    );

                    // Show global completion popup
                    setShowCompletionModal(true);

                    // Notify Focus page
                    window.dispatchEvent(
                        new Event("focusTimerCompleted")
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to check focus timer:",
                    error
                );
            }
        };

        // Check immediately
        checkTimer();

        // Check every second
        const interval = setInterval(
            checkTimer,
            1000
        );

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (!showCompletionModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-[#172b4d] shadow-2xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-8 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
                        🎉
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-white">
                        Time for a break!
                    </h2>

                    <p className="mt-2 text-sm text-violet-100">
                        Great job! You completed your focus session.
                    </p>

                </div>

                {/* Content */}
                <div className="p-6">

                    <p className="mb-5 text-center text-sm text-gray-300">
                        What would you like to do next?
                    </p>

                    <div className="space-y-3">

                        {/* Take a Break */}
                        <button
                            type="button"
                            onClick={() =>
                                setShowCompletionModal(false)
                            }
                            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            ☕ Take a Break
                        </button>

                           
{/* Continue Learning */}
<button
    type="button"
   onClick={() => {
    setShowCompletionModal(false);

    if (pathname === "/ai-tutor") {
        return;
    }

    router.push(pathname);
}}
    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
>
    📚 Continue Learning
</button>

                        {/* Flashcards */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowCompletionModal(false);
                                router.push("/flashcards");
                            }}
                            className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
                        >
                            🃏 Play Flashcards
                        </button>

                        {/* AI Quiz */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowCompletionModal(false);
                                router.push("/quiz");
                            }}
                            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            🧠 Take AI Quiz
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}