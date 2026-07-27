"use client";

import AppLayout from "@/components/layout/app-layout";

import {
    Activity,
    Award,
    BookOpenCheck,
    CheckCircle2,
    Flame,
    Loader2,
    Target,
    Trophy,
    XCircle,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import progressService, {
    ProgressResponse,
} from "@/services/progress.service";


export default function ProgressPage() {

    const [progress, setProgress] =
        useState<ProgressResponse | null>(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ========================================================
    // Load Progress
    // ========================================================

    useEffect(() => {

        const loadProgress = async () => {

            try {

                setIsLoading(true);
                setError("");

                const response =
                    await progressService.getProgress();

                setProgress(response);

            } catch (err) {

                console.error(
                    "Unable to load progress:",
                    err
                );

                setError(
                    "Unable to load your learning progress. Please try again."
                );

            } finally {

                setIsLoading(false);
            }
        };

        loadProgress();

    }, []);


    // ========================================================
    // Date Formatter
    // ========================================================

    const formatDate = (
        dateString: string
    ) => {

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };


    // ========================================================
    // Loading
    // ========================================================

    if (isLoading) {

        return (

            <AppLayout>

                <div className="flex min-h-[400px] items-center justify-center">

                    <div className="text-center">

                        <Loader2 className="mx-auto h-9 w-9 animate-spin text-violet-400" />

                        <p className="mt-4 text-gray-400">
                            Loading your progress...
                        </p>

                    </div>

                </div>

            </AppLayout>
        );
    }


    // ========================================================
    // Error
    // ========================================================

    if (error || !progress) {

        return (

            <AppLayout>

                <h1 className="text-3xl font-bold">
                    📈 Learning Progress
                </h1>

                <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/5 p-6">

                    <p className="text-red-300">
                        {error ||
                            "Progress information is unavailable."}
                    </p>

                </div>

            </AppLayout>
        );
    }


    return (

        <AppLayout>

            {/* =================================================
                Header
            ================================================= */}

            <div>

                <h1 className="text-3xl font-bold">
                    📈 Learning Progress
                </h1>

                <p className="mt-2 text-gray-400">
                    Track your quiz performance and
                    learning consistency.
                </p>

            </div>


            {/* =================================================
                Streak
            ================================================= */}

            <div className="mt-8 grid gap-5 md:grid-cols-2">

                <div className="rounded-3xl border border-orange-400/10 bg-white/5 p-6">

                    <Flame
                        className="text-orange-400"
                        size={38}
                    />

                    <h2 className="mt-4 text-lg font-semibold text-gray-300">
                        Current Streak
                    </h2>

                    <div className="mt-2 flex items-end gap-2">

                        <p className="text-5xl font-bold">
                            {progress.current_streak}
                        </p>

                        <p className="pb-1 text-gray-400">
                            {progress.current_streak === 1
                                ? "day"
                                : "days"}
                        </p>

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        Complete learning activity
                        regularly to maintain your streak.
                    </p>

                </div>


                <div className="rounded-3xl border border-yellow-400/10 bg-white/5 p-6">

                    <Trophy
                        className="text-yellow-400"
                        size={38}
                    />

                    <h2 className="mt-4 text-lg font-semibold text-gray-300">
                        Longest Streak
                    </h2>

                    <div className="mt-2 flex items-end gap-2">

                        <p className="text-5xl font-bold">
                            {progress.longest_streak}
                        </p>

                        <p className="pb-1 text-gray-400">
                            {progress.longest_streak === 1
                                ? "day"
                                : "days"}
                        </p>

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        Your best consecutive
                        quiz-learning streak so far.
                    </p>

                </div>

            </div>


            {/* =================================================
                Quiz Statistics
            ================================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    title="Quizzes Completed"
                    value={progress.total_quizzes}
                    icon={
                        <BookOpenCheck
                            className="text-violet-400"
                            size={28}
                        />
                    }
                />

                <StatCard
                    title="Questions Attempted"
                    value={progress.total_questions}
                    icon={
                        <Activity
                            className="text-blue-400"
                            size={28}
                        />
                    }
                />

                <StatCard
                    title="Correct Answers"
                    value={progress.correct_answers}
                    icon={
                        <CheckCircle2
                            className="text-green-400"
                            size={28}
                        />
                    }
                />

                <StatCard
                    title="Wrong Answers"
                    value={progress.wrong_answers}
                    icon={
                        <XCircle
                            className="text-red-400"
                            size={28}
                        />
                    }
                />

                <StatCard
                    title="Average Score"
                    value={`${Math.round(
                        progress.average_score
                    )}%`}
                    icon={
                        <Target
                            className="text-cyan-400"
                            size={28}
                        />
                    }
                />

                <StatCard
                    title="Best Score"
                    value={`${Math.round(
                        progress.best_score
                    )}%`}
                    icon={
                        <Award
                            className="text-yellow-400"
                            size={28}
                        />
                    }
                />

            </div>


            {/* =================================================
                Performance Summary
            ================================================= */}

            {progress.total_questions > 0 && (

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">

                    <div className="flex items-center justify-between gap-4">

                        <div>

                            <h2 className="text-xl font-bold">
                                Overall Accuracy
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Based on all quiz questions
                                you have attempted.
                            </p>

                        </div>

                        <div className="text-2xl font-bold text-violet-300">

                            {Math.round(
                                (
                                    progress.correct_answers /
                                    progress.total_questions
                                ) * 100
                            )}
                            %

                        </div>

                    </div>


                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

                        <div
                            className="h-full rounded-full bg-violet-600 transition-all"
                            style={{
                                width: `${Math.min(
                                    100,
                                    (
                                        progress.correct_answers /
                                        progress.total_questions
                                    ) * 100
                                )}%`,
                            }}
                        />

                    </div>

                </div>
            )}


            {/* =================================================
                Recent Quiz Activity
            ================================================= */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7">

                <h2 className="text-2xl font-bold">
                    Recent Quiz Activity
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Your latest quiz attempts.
                </p>


                {progress.recent_quizzes.length === 0 ? (

                    <div className="py-12 text-center">

                        <BookOpenCheck className="mx-auto h-10 w-10 text-gray-600" />

                        <h3 className="mt-4 font-semibold text-gray-300">
                            No quizzes completed yet
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Complete your first quiz and
                            your results will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="mt-6 space-y-3">

                        {progress.recent_quizzes.map(
                            (quiz, index) => (

                                <div
                                    key={`${quiz.attempted_at}-${index}`}
                                    className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/10 p-4 sm:flex-row sm:items-center sm:justify-between"
                                >

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            {quiz.topic}
                                        </h3>

                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">

                                            <span className="capitalize">
                                                {quiz.difficulty}
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {formatDate(
                                                    quiz.attempted_at
                                                )}
                                            </span>

                                        </div>

                                    </div>


                                    <div
                                        className={
                                            quiz.score_percentage >= 80
                                                ? "text-xl font-bold text-green-400"
                                                : quiz.score_percentage >= 50
                                                  ? "text-xl font-bold text-yellow-400"
                                                  : "text-xl font-bold text-red-400"
                                        }
                                    >

                                        {Math.round(
                                            quiz.score_percentage
                                        )}
                                        %

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </AppLayout>
    );
}


// ============================================================
// Statistic Card
// ============================================================

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}) {

    return (

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <div>
                {icon}
            </div>

            <p className="mt-4 text-sm text-gray-400">
                {title}
            </p>

            <p className="mt-1 text-3xl font-bold">
                {value}
            </p>

        </div>
    );
}