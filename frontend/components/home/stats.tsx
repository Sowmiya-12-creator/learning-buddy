"use client";

import { useEffect, useState } from "react";

import focusService from "@/services/focus.service";
import progressService from "@/services/progress.service";


export default function Stats() {

    const [streak, setStreak] =
        useState<number | null>(null);

    const [studyMinutes, setStudyMinutes] =
        useState<number | null>(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        const loadStats = async () => {

            try {

                const [progress, focus] =
                    await Promise.all([
                        progressService.getProgress(),
                        focusService.getStats(),
                    ]);

                setStreak(
                    progress.current_streak
                );

                setStudyMinutes(
                    focus.total_study_minutes
                );

            } catch (error) {

                console.error(
                    "Unable to load home statistics:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };

        loadStats();

    }, []);


    const formatStudyTime = (
        minutes: number
    ) => {

        if (minutes < 60) {
            return `${minutes} min`;
        }

        const hours =
            Math.floor(minutes / 60);

        const remainingMinutes =
            minutes % 60;

        if (remainingMinutes === 0) {
            return `${hours}h`;
        }

        return `${hours}h ${remainingMinutes}m`;
    };


    return (

        <section className="mx-6 mt-8 grid grid-cols-2 gap-4">

            <Card
                title="🔥 Streak"
                value={
                    loading
                        ? "..."
                        : `${streak ?? 0} ${
                              streak === 1
                                  ? "Day"
                                  : "Days"
                          }`
                }
            />

            <Card
                title="⏱️ Study Time"
                value={
                    loading
                        ? "..."
                        : formatStudyTime(
                              studyMinutes ?? 0
                          )
                }
            />

        </section>
    );
}


function Card({
    title,
    value,
}: {
    title: string;
    value: string;
}) {

    return (

        <div className="rounded-2xl bg-white/10 p-5">

            <p className="text-sm text-gray-300">
                {title}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
                {value}
            </h3>

        </div>
    );
}