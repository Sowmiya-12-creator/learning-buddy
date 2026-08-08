"use client";

import AppLayout from "@/components/layout/app-layout";

import {
    Clock3,
    History,
    Loader2,
    Pause,
    Play,
    RotateCcw,
    Timer,
} from "lucide-react";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import focusService, {
    FocusStatsResponse,
} from "@/services/focus.service";
import { useRouter } from "next/navigation";

const FOCUS_DURATION_MINUTES = 25;
const FOCUS_DURATION_SECONDS =
    FOCUS_DURATION_MINUTES * 60;
const FOCUS_TIMER_STORAGE_KEY = "learning_buddy_focus_timer";

export default function FocusPage() {
    const router = useRouter();

    // ========================================================
    // Session Details
    // ========================================================

    const [subject, setSubject] =
        useState("");

    const [topic, setTopic] =
        useState("");


        

    // ========================================================
// Timer
// ========================================================

const [timeLeft, setTimeLeft] =
    useState(FOCUS_DURATION_SECONDS);

const [isRunning, setIsRunning] =
    useState(false);

const [hasStarted, setHasStarted] =
    useState(false);

const [showCompletionModal, setShowCompletionModal] =
    useState(false);

useEffect(() => {
    const handleFocusTimerCompleted = () => {
        setShowCompletionModal(true);
    };

    window.addEventListener(
        "focusTimerCompleted",
        handleFocusTimerCompleted
    );

    return () => {
        window.removeEventListener(
            "focusTimerCompleted",
            handleFocusTimerCompleted
        );
    };
}, []);

const sessionSavedRef =
    useRef(false);


// ========================================================
// Stats
// ========================================================

    const [stats, setStats] =
        useState<FocusStatsResponse | null>(
            null
        );

    const [isLoadingStats, setIsLoadingStats] =
        useState(true);

    const [isSaving, setIsSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");


    // ========================================================
    // Load Focus Stats
    // ========================================================

    const loadStats =
        useCallback(async () => {

            try {

                setIsLoadingStats(true);

                const response =
                    await focusService.getStats();

                setStats(response);

            } catch (err) {

                console.error(
                    "Unable to load focus stats:",
                    err
                );

                setError(
                    "Unable to load your focus statistics."
                );

            } finally {

                setIsLoadingStats(false);
            }

        }, []);


    useEffect(() => {

        loadStats();

    }, [loadStats]);


    // ========================================================
    // Save Completed Session
    // ========================================================

    const saveCompletedSession =
        useCallback(async () => {

            if (sessionSavedRef.current) {
                return;
            }

            sessionSavedRef.current = true;

            try {

                setIsSaving(true);
                setError("");

                const response =
                    await focusService.saveSession(
                        FOCUS_DURATION_MINUTES,
                        subject,
                        topic
                    );

                setSuccessMessage(
                    response.message
                );

                await loadStats();

            } catch (err) {

                console.error(
                    "Unable to save focus session:",
                    err
                );

                sessionSavedRef.current = false;

                setError(
                    "Your focus session finished, but we could not save it. Please check your connection."
                );

            } finally {

                setIsSaving(false);
            }

        }, [
            subject,
            topic,
            loadStats,
        ]);

useEffect(() => {
    const savedTimer = localStorage.getItem(
        FOCUS_TIMER_STORAGE_KEY
    );

    if (!savedTimer) {
        return;
    }

    try {
        const timerData = JSON.parse(savedTimer);

        setSubject(timerData.subject || "");
        setTopic(timerData.topic || "");

        if (timerData.isRunning && timerData.endTime) {
            const remaining = Math.max(
                Math.ceil(
                    (timerData.endTime - Date.now()) / 1000
                ),
                0
            );

            if (remaining > 0) {
                setTimeLeft(remaining);
                setIsRunning(true);
                setHasStarted(true);
            } else {
                setTimeLeft(0);
                setIsRunning(false);
                setHasStarted(true);
            }
        } else {
            setTimeLeft(
                timerData.timeLeft ??
                FOCUS_DURATION_SECONDS
            );

            setIsRunning(false);

            setHasStarted(
                timerData.hasStarted ?? false
            );
        }
    } catch (error) {
        console.error(
            "Failed to restore focus timer:",
            error
        );

        localStorage.removeItem(
            FOCUS_TIMER_STORAGE_KEY
        );
    }
}, []);


    // ========================================================
    // Timer Logic
    // ========================================================

   useEffect(() => {
    if (!isRunning) {
        return;
    }

    const timer = window.setInterval(() => {
        const savedTimer = localStorage.getItem(
            FOCUS_TIMER_STORAGE_KEY
        );

        if (!savedTimer) {
            return;
        }

        try {
            const timerData = JSON.parse(savedTimer);

            const remaining = Math.max(
                Math.ceil(
                    (timerData.endTime - Date.now()) / 1000
                ),
                0
            );

            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);

                setIsRunning(false);
                setTimeLeft(0);

                localStorage.removeItem(
                    FOCUS_TIMER_STORAGE_KEY
                );

                saveCompletedSession();

                setShowCompletionModal(true);
            }
        } catch (error) {
            console.error(
                "Focus timer error:",
                error
            );
        }
    }, 1000);

    return () => {
        clearInterval(timer);
    };

}, [
    isRunning,
    saveCompletedSession,
]);


    // ========================================================
    // Controls
    // ========================================================
const saveTimerState = (
    nextTimeLeft: number,
    running: boolean,
    started: boolean
) => {
    const timerData = {
        timeLeft: nextTimeLeft,
        isRunning: running,
        hasStarted: started,
        subject,
        topic,
        endTime: running
            ? Date.now() + nextTimeLeft * 1000
            : null,
    };

    localStorage.setItem(
        FOCUS_TIMER_STORAGE_KEY,
        JSON.stringify(timerData)
    );
};
    const handleStart = () => {
    if (timeLeft === 0) {
        return;
    }

    setError("");
    setSuccessMessage("");

    setHasStarted(true);
    setIsRunning(true);

    saveTimerState(
        timeLeft,
        true,
        true
    );
};

    const handlePause = () => {
    setIsRunning(false);

    saveTimerState(
        timeLeft,
        false,
        true
    );
};


    const handleReset = () => {
    setIsRunning(false);

    setTimeLeft(FOCUS_DURATION_SECONDS);

    setHasStarted(false);

    sessionSavedRef.current = false;

    setSuccessMessage("");
    setError("");

    localStorage.removeItem(
        FOCUS_TIMER_STORAGE_KEY
    );
};


    // ========================================================
    // Formatting
    // ========================================================

    const formatTime = (
        seconds: number
    ) => {

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remainingSeconds =
            seconds % 60;

        return `${String(
            minutes
        ).padStart(
            2,
            "0"
        )}:${String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )}`;
    };


    const formatMinutes = (
        minutes: number
    ) => {

        if (minutes < 60) {
            return `${minutes} min`;
        }

        const hours =
            Math.floor(
                minutes / 60
            );

        const remaining =
            minutes % 60;

        if (remaining === 0) {
            return `${hours}h`;
        }

        return `${hours}h ${remaining}m`;
    };


    const formatDate = (
        dateString: string
    ) => {

        return new Date(
            dateString
        ).toLocaleString(
            undefined,
            {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
            }
        );
    };


    const progressPercentage =
        (
            (
                FOCUS_DURATION_SECONDS -
                timeLeft
            ) /
            FOCUS_DURATION_SECONDS
        ) * 100;


    return (

        <AppLayout>

            <div className="mx-auto max-w-4xl">

                {/* =============================================
                    Header
                ============================================= */}

                <h1 className="text-3xl font-bold">
                    ⏱️ Focus Timer
                </h1>

                <p className="mt-2 text-gray-300">
                    Stay focused using a
                    25-minute Pomodoro session.
                </p>


                {/* =============================================
                    Session Details
                ============================================= */}

                <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 md:grid-cols-2">

                    <div>

                        <label
                            htmlFor="focus-subject"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Subject
                        </label>

                        <input
                            id="focus-subject"
                            type="text"
                            value={subject}
                            disabled={hasStarted}
                            onChange={(event) =>
                                setSubject(
                                    event.target.value
                                )
                            }
                            placeholder="Example: Java"
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                    </div>


                    <div>

                        <label
                            htmlFor="focus-topic"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Topic
                        </label>

                        <input
                            id="focus-topic"
                            type="text"
                            value={topic}
                            disabled={hasStarted}
                            onChange={(event) =>
                                setTopic(
                                    event.target.value
                                )
                            }
                            placeholder="Example: OOP"
                            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        />

                    </div>

                </div>


                {/* =============================================
                    Timer
                ============================================= */}

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center md:p-10">

                    <Timer className="mx-auto h-12 w-12 text-violet-400" />


                    <h2 className="mt-6 text-6xl font-bold tracking-wider md:text-7xl">

                        {formatTime(
                            timeLeft
                        )}

                    </h2>


                    <p className="mt-3 text-gray-300">

                        {timeLeft === 0
                            ? "Focus Session Complete"
                            : isRunning
                              ? "Stay focused"
                              : hasStarted
                                ? "Session paused"
                                : "Focus Session"}

                    </p>


                    {/* Progress Bar */}

                    <div className="mx-auto mt-7 h-2 max-w-xl overflow-hidden rounded-full bg-white/10">

                        <div
                            className="h-full rounded-full bg-violet-600 transition-all duration-500"
                            style={{
                                width:
                                    `${progressPercentage}%`,
                            }}
                        />

                    </div>


                    {/* Controls */}

                    <div className="mt-9 flex flex-wrap justify-center gap-3">

                        {!isRunning && (
                            <button
                                type="button"
                                onClick={
                                    handleStart
                                }
                                disabled={
                                    timeLeft === 0 ||
                                    isSaving
                                }
                                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <Play size={18} />

                                {hasStarted
                                    ? "Resume"
                                    : "Start"}

                            </button>
                        )}


                        {isRunning && (

                            <button
                                type="button"
                                onClick={
                                    handlePause
                                }
                                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold transition hover:bg-yellow-600"
                            >

                                <Pause size={18} />

                                Pause

                            </button>
                        )}


                        <button
                            type="button"
                            onClick={
                                handleReset
                            }
                            disabled={isSaving}
                            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
                        >

                            <RotateCcw size={18} />

                            Reset

                        </button>

                    </div>


                    {isSaving && (

                        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-violet-300">

                            <Loader2 className="h-4 w-4 animate-spin" />

                            Saving completed session...

                        </div>
                    )}


                    {successMessage && (

                        <p className="mt-5 text-sm text-green-400">
                            ✓ {successMessage}
                        </p>
                    )}


                    {error && (

                        <p className="mt-5 text-sm text-red-400">
                            {error}
                        </p>
                    )}

                </div>


                {/* =============================================
                    Real Focus Statistics
                ============================================= */}

                <div className="mt-8">

                    <h2 className="text-xl font-bold">
                        Focus Statistics
                    </h2>


                    {isLoadingStats ? (

                        <div className="mt-5 flex items-center gap-2 text-gray-400">

                            <Loader2 className="h-5 w-5 animate-spin" />

                            Loading statistics...

                        </div>

                    ) : stats ? (

                        <div className="mt-5 grid gap-5 md:grid-cols-3">

                            <StatCard
                                title="Total Sessions"
                                value={
                                    stats.total_sessions
                                }
                                icon={
                                    <Clock3 className="text-violet-400" />
                                }
                            />

                            <StatCard
                                title="Total Focus Time"
                                value={
                                    formatMinutes(
                                        stats.total_study_minutes
                                    )
                                }
                                icon={
                                    <Timer className="text-blue-400" />
                                }
                            />

                            <StatCard
                                title="Today's Focus"
                                value={
                                    formatMinutes(
                                        stats.today_study_minutes
                                    )
                                }
                                icon={
                                    <Clock3 className="text-green-400" />
                                }
                            />

                        </div>

                    ) : null}

                </div>


                {/* =============================================
                    Recent Sessions
                ============================================= */}

                {stats && (

                    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">

                        <div className="flex items-center gap-3">

                            <History className="text-violet-400" />

                            <h2 className="text-xl font-bold">
                                Recent Focus Sessions
                            </h2>

                        </div>


                        {stats.recent_sessions.length === 0 ? (

                            <p className="py-10 text-center text-sm text-gray-500">
                                Complete your first
                                Pomodoro session and it
                                will appear here.
                            </p>

                        ) : (

                            <div className="mt-5 space-y-3">

                                {stats.recent_sessions.map(
                                    (
                                        session,
                                        index
                                    ) => (

                                        <div
                                            key={`${session.completed_at}-${index}`}
                                            className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/10 p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >

                                            <div>

                                                <h3 className="font-semibold">

                                                    {session.subject ||
                                                        "Focus Session"}

                                                </h3>


                                                {session.topic && (

                                                    <p className="mt-1 text-sm text-gray-400">
                                                        {
                                                            session.topic
                                                        }
                                                    </p>
                                                )}


                                                <p className="mt-1 text-xs text-gray-500">

                                                    {formatDate(
                                                        session.completed_at
                                                    )}

                                                </p>

                                            </div>


                                            <div className="font-semibold text-violet-300">

                                                {
                                                    session.duration_minutes
                                                }{" "}
                                                min

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>
                )}

            </div>

        </AppLayout>
    );
}


// ============================================================
// Stat Card
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

            <div className="text-2xl">
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