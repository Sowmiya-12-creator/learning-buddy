"use client";

import {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Bot,
    Loader2,
    Pause,
    Play,
    RotateCcw,
    SkipForward,
    Volume2,
} from "lucide-react";

import VisualTeachingComponent from "./visual-teaching";

import {
    AvatarSection,
    VisualTeaching,
} from "@/services/ai-tutor.service";

import ttsService from "@/services/tts.service";


interface LearningBuddyTeacherProps {
    topic?: string | null;
    explanation?: string | null;
    example?: string | null;
    code?: string | null;
    codeLanguage?: string | null;
    keyPoints?: string[];
    visual?: VisualTeaching | null;
    sections: AvatarSection[];
}


type HighlightableSection =
    | "topic"
    | "explanation"
    | "example"
    | "code";


export default function LearningBuddyTeacher({
    topic,
    explanation,
    example,
    code,
    codeLanguage,
    keyPoints = [],
    visual,
    sections,
}: LearningBuddyTeacherProps) {

    const [started, setStarted] =
        useState(false);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [isGenerating, setIsGenerating] =
        useState(false);

    const [isSpeaking, setIsSpeaking] =
        useState(false);

    const [error, setError] =
        useState("");


    const audioRef =
        useRef<HTMLAudioElement | null>(null);

    const audioUrlRef =
        useRef<string | null>(null);


    const topicRef =
        useRef<HTMLDivElement | null>(null);

    const explanationRef =
        useRef<HTMLElement | null>(null);

    const exampleRef =
        useRef<HTMLElement | null>(null);

    const codeRef =
        useRef<HTMLElement | null>(null);


    const hasLesson =
        Boolean(
            explanation ||
            example ||
            code ||
            keyPoints.length > 0 ||
            visual ||
            sections.length > 0
        );


    const currentSection =
        sections[currentIndex];


    const isLastStep =
        sections.length > 0 &&
        currentIndex === sections.length - 1;


    // ============================================================
    // ACTIVE TEACHING TARGET
    // ============================================================

    const activeTargetSection =
        started
            ? currentSection?.target_section ?? "none"
            : "none";


    const activeTargetText =
        started
            ? currentSection?.target_text ?? null
            : null;


    // ============================================================
    // CLEAN AUDIO
    // ============================================================

    const cleanAudio = () => {

        if (audioRef.current) {

            audioRef.current.pause();

            audioRef.current = null;
        }


        if (audioUrlRef.current) {

            URL.revokeObjectURL(
                audioUrlRef.current
            );

            audioUrlRef.current = null;
        }


        setIsSpeaking(false);
    };


    // ============================================================
    // CLEANUP
    // ============================================================

    useEffect(() => {

        return () => {

            if (audioRef.current) {
                audioRef.current.pause();
            }

            if (audioUrlRef.current) {

                URL.revokeObjectURL(
                    audioUrlRef.current
                );
            }
        };

    }, []);


    // ============================================================
    // SCROLL TO ACTIVE LESSON SECTION
    // ============================================================

    useEffect(() => {

        if (!started) {
            return;
        }


        let targetElement:
            HTMLElement | null = null;


        switch (activeTargetSection) {

            case "topic":
                targetElement =
                    topicRef.current;
                break;

            case "explanation":
                targetElement =
                    explanationRef.current;
                break;

            case "example":
                targetElement =
                    exampleRef.current;
                break;

            case "code":
                targetElement =
                    codeRef.current;
                break;

            default:
                targetElement = null;
        }


        if (!targetElement) {
            return;
        }


        const timer =
            window.setTimeout(() => {

                targetElement?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

            }, 150);


        return () => {

            window.clearTimeout(timer);

        };

    }, [
        started,
        currentIndex,
        activeTargetSection,
    ]);


    // ============================================================
    // CHECK ACTIVE SECTION
    // ============================================================

    const isSectionActive = (
        sectionName: HighlightableSection
    ) => {

        return (
            started &&
            activeTargetSection === sectionName
        );
    };


    // ============================================================
    // HIGHLIGHT TARGET TEXT
    // ============================================================

    const renderHighlightedText = (
        text: string,
        sectionName: HighlightableSection
    ): ReactNode => {

        if (
            !started ||
            activeTargetSection !== sectionName ||
            !activeTargetText?.trim()
        ) {
            return text;
        }


        const target =
            activeTargetText.trim();


        const lowerText =
            text.toLocaleLowerCase();

        const lowerTarget =
            target.toLocaleLowerCase();


        const startIndex =
            lowerText.indexOf(
                lowerTarget
            );


        if (startIndex === -1) {

            return text;
        }


        const endIndex =
            startIndex + target.length;


        return (
            <>
                {text.slice(
                    0,
                    startIndex
                )}

                <mark className="rounded-md bg-yellow-300 px-1 py-0.5 font-semibold text-gray-950 shadow-sm ring-2 ring-yellow-200/40 transition-all duration-300">
                    {text.slice(
                        startIndex,
                        endIndex
                    )}
                </mark>

                {text.slice(
                    endIndex
                )}
            </>
        );
    };


    // ============================================================
    // SPEAK TEACHING STEP
    // ============================================================

    const speakSection = async (
        section: AvatarSection
    ) => {

        if (!section?.speech?.trim()) {
            return;
        }


        cleanAudio();

        setError("");

        setIsGenerating(true);


        try {

            const audioBlob =
                await ttsService.generateSpeech(
                    section.speech
                );


            const audioUrl =
                URL.createObjectURL(
                    audioBlob
                );


            audioUrlRef.current =
                audioUrl;


            const audio =
                new Audio(audioUrl);


            audioRef.current =
                audio;


            audio.onplay = () => {

                setIsSpeaking(true);

            };


            audio.onpause = () => {

                setIsSpeaking(false);

            };


            audio.onended = () => {

                setIsSpeaking(false);


                if (audioUrlRef.current) {

                    URL.revokeObjectURL(
                        audioUrlRef.current
                    );

                    audioUrlRef.current =
                        null;
                }


                audioRef.current =
                    null;
            };


            audio.onerror = () => {

                setIsSpeaking(false);

                setError(
                    "Unable to play this teaching step."
                );
            };


            await audio.play();

        } catch (error) {

            console.error(
                "Learning Buddy speech error:",
                error
            );


            setError(
                "Learning Buddy could not generate speech right now."
            );

        } finally {

            setIsGenerating(false);
        }
    };


    // ============================================================
    // START TEACHING
    // ============================================================

    const startTeaching = async () => {

        if (sections.length === 0) {

            setError(
                "No interactive teaching steps are available for this lesson."
            );

            return;
        }


        setStarted(true);

        setCurrentIndex(0);

        setError("");


        await speakSection(
            sections[0]
        );
    };


    // ============================================================
    // NEXT STEP
    // ============================================================

    const nextStep = async () => {

        if (
            currentIndex >=
            sections.length - 1
        ) {
            return;
        }


        const nextIndex =
            currentIndex + 1;


        setCurrentIndex(
            nextIndex
        );


        await speakSection(
            sections[nextIndex]
        );
    };


    // ============================================================
    // REPLAY CURRENT STEP
    // ============================================================

    const replayStep = async () => {

        if (!currentSection) {
            return;
        }


        await speakSection(
            currentSection
        );
    };


    // ============================================================
    // PAUSE / RESUME
    // ============================================================

    const toggleAudio = async () => {

        const audio =
            audioRef.current;


        if (!audio) {

            if (currentSection) {

                await speakSection(
                    currentSection
                );
            }

            return;
        }


        if (audio.paused) {

            try {

                await audio.play();

            } catch {

                setError(
                    "Unable to resume the lesson audio."
                );
            }

        } else {

            audio.pause();
        }
    };


    // ============================================================
    // RESTART LESSON
    // ============================================================

    const restartLesson = async () => {

        cleanAudio();

        setCurrentIndex(0);

        setStarted(true);

        setError("");


        if (sections[0]) {

            await speakSection(
                sections[0]
            );
        }
    };


    // ============================================================
    // ROBOT GESTURE
    // ============================================================

    const getGesture = () => {

        if (!started) {
            return "👈";
        }


        switch (currentSection?.gesture) {

            case "welcome":
                return "👋";

            case "explain":
                return "💡";

            case "point_to_content":
                return "👈";

            case "encourage":
                return "👏";

            case "think":
                return "🤔";

            case "conclude":
                return "🎉";

            case "none":
                return "🤖";

            default:
                return "🤖";
        }
    };


    // ============================================================
    // SECTION CARD STYLE
    // ============================================================

    const getSectionClassName = (
        sectionName: HighlightableSection
    ) => {

        if (!isSectionActive(sectionName)) {
            return "";
        }


        return [
            "rounded-2xl",
            "ring-2",
            "ring-yellow-300/60",
            "bg-yellow-300/5",
            "shadow-lg",
            "shadow-yellow-500/5",
            "transition-all",
            "duration-300",
        ].join(" ");
    };


    // ============================================================
    // NO LESSON
    // ============================================================

    if (!hasLesson) {
        return null;
    }


    // ============================================================
    // UI
    // ============================================================

    return (

        <div className="mt-5 overflow-hidden rounded-3xl border border-violet-400/20 bg-linear-to-br from-violet-500/10 via-white/3 to-indigo-500/10">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="border-b border-white/10 px-6 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">

                        <Bot className="h-5 w-5 text-violet-300" />

                    </div>


                    <div>

                        <h3 className="font-semibold text-white">
                            Learn with Learning Buddy
                        </h3>


                        <p className="text-sm text-gray-400">
                            Your AI-powered interactive lesson
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                CLASSROOM
            ===================================================== */}

            <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">


                {/* =================================================
                    LEFT — FULL LESSON
                ================================================= */}

                <div className="min-w-0 p-6 lg:border-r lg:border-white/10">


                    {/* Topic */}

                    {topic && (

                        <div
                            ref={topicRef}
                            className={`mb-6 p-3 ${getSectionClassName(
                                "topic"
                            )}`}
                        >

                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">

                                Topic

                            </p>


                            <h2 className="mt-2 text-2xl font-bold text-white">

                                {renderHighlightedText(
                                    topic,
                                    "topic"
                                )}

                            </h2>

                        </div>

                    )}


                    {/* Explanation */}

                    {explanation && (

                        <section
                            ref={explanationRef}
                            className={`p-3 ${getSectionClassName(
                                "explanation"
                            )}`}
                        >

                            <h4 className="mb-3 text-lg font-semibold text-white">

                                Explanation

                            </h4>


                            <p className="whitespace-pre-wrap leading-8 text-gray-200">

                                {renderHighlightedText(
                                    explanation,
                                    "explanation"
                                )}

                            </p>

                        </section>

                    )}


                    {/* Visual */}

                    {visual && (

                        <section className="mt-7">

                            <VisualTeachingComponent
                                visual={visual}
                            />

                        </section>

                    )}


                    {/* Example */}

                    {example && (

                        <section
                            ref={exampleRef}
                            className={`mt-7 p-3 ${getSectionClassName(
                                "example"
                            )}`}
                        >

                            <h4 className="mb-3 text-lg font-semibold text-white">

                                Example

                            </h4>


                            <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">

                                <p className="whitespace-pre-wrap leading-7 text-gray-200">

                                    {renderHighlightedText(
                                        example,
                                        "example"
                                    )}

                                </p>

                            </div>

                        </section>

                    )}


                    {/* Code */}

                    {code && (

                        <section
                            ref={codeRef}
                            className={`mt-7 p-3 ${getSectionClassName(
                                "code"
                            )}`}
                        >

                            <div className="mb-3 flex items-center justify-between gap-4">

                                <h4 className="text-lg font-semibold text-white">

                                    Code

                                </h4>


                                {codeLanguage && (

                                    <span className="rounded-lg bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-gray-300">

                                        {codeLanguage}

                                    </span>

                                )}

                            </div>


                            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30">

                                <pre className="p-5 text-sm leading-6 text-gray-100">

                                    <code>

                                        {renderHighlightedText(
                                            code,
                                            "code"
                                        )}

                                    </code>

                                </pre>

                            </div>

                        </section>

                    )}


                    {/* Key Points */}

                    {keyPoints.length > 0 && (

                        <section className="mt-7">

                            <h4 className="mb-3 text-lg font-semibold text-white">

                                Key Points

                            </h4>


                            <div className="space-y-3">

                                {keyPoints.map(
                                    (
                                        point,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="flex gap-3 rounded-xl bg-white/5 p-4"
                                        >

                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-300">

                                                {index + 1}

                                            </div>


                                            <p className="leading-6 text-gray-200">

                                                {point}

                                            </p>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                    )}

                </div>


                {/* =================================================
                    RIGHT — INTERACTIVE LEARNING BUDDY
                ================================================= */}

                <aside className="relative flex min-h-140 flex-col p-6">


                    <div className="sticky top-6 flex flex-1 flex-col">


                        {/* =================================================
                            SPEECH BUBBLE
                        ================================================= */}

                        <div className="relative rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">

                            <div className="mb-2 flex items-center gap-2">

                                {isSpeaking && (

                                    <Volume2 className="h-4 w-4 animate-pulse text-cyan-300" />

                                )}


                                <span className="text-xs font-semibold uppercase tracking-wide text-violet-300">

                                    {!started
                                        ? "Learning Buddy"
                                        : `Step ${currentIndex + 1} of ${sections.length}`}

                                </span>

                            </div>


                            <p className="text-sm leading-6 text-gray-200">

                                {!started
                                    ? "I'm ready to explain this lesson step by step."
                                    : currentSection?.speech ??
                                      "Let's continue learning."}

                            </p>


                            <div className="absolute -bottom-2 right-12 h-4 w-4 rotate-45 border-b border-r border-violet-400/20 bg-[#17152a]" />

                        </div>


                        {/* Current Target */}

                        {started &&
                            currentSection &&
                            currentSection.target_section !== "none" && (

                                <div className="mt-3 rounded-xl border border-yellow-300/20 bg-yellow-300/5 px-3 py-2">

                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-yellow-200">

                                        Teaching Now

                                    </p>


                                    <p className="mt-1 text-xs text-gray-300">

                                        {currentSection.target_section}

                                        {currentSection.target_text
                                            ? ` · ${currentSection.target_text}`
                                            : ""}

                                    </p>

                                </div>

                            )}


                        {/* =================================================
                            ROBOT
                        ================================================= */}

                        <div className="flex flex-1 flex-col items-center justify-center py-8">


                            <div className="relative">


                                <div
                                    className={`flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-violet-400/20 bg-linear-to-br from-violet-500/30 to-indigo-500/20 shadow-xl shadow-violet-950/30 transition duration-300 ${
                                        isSpeaking
                                            ? "scale-105 shadow-violet-500/20"
                                            : ""
                                    }`}
                                >

                                    <Bot
                                        className={`h-24 w-24 text-violet-200 ${
                                            isSpeaking
                                                ? "animate-pulse"
                                                : ""
                                        }`}
                                    />

                                </div>


                                {/* Gesture */}

                                <div className="absolute -left-12 top-16 text-4xl">

                                    {getGesture()}

                                </div>

                            </div>


                            <h4 className="mt-5 text-lg font-semibold text-white">

                                Learning Buddy

                            </h4>


                            <p className="mt-1 text-center text-xs leading-5 text-gray-400">

                                {isGenerating
                                    ? "Preparing your explanation..."
                                    : isSpeaking
                                      ? "Teaching you now..."
                                      : started
                                        ? "Your personal AI tutor"
                                        : "Ready to teach"}

                            </p>


                            {/* Progress */}

                            {started &&
                                sections.length > 0 && (

                                    <div className="mt-5 w-full">

                                        <div className="mb-2 flex items-center justify-between text-xs text-gray-400">

                                            <span>
                                                Lesson Progress
                                            </span>


                                            <span>
                                                {currentIndex + 1}/{sections.length}
                                            </span>

                                        </div>


                                        <div className="h-2 overflow-hidden rounded-full bg-white/10">

                                            <div
                                                className="h-full rounded-full bg-violet-500 transition-all duration-500"
                                                style={{
                                                    width: `${
                                                        (
                                                            (currentIndex + 1) /
                                                            sections.length
                                                        ) * 100
                                                    }%`,
                                                }}
                                            />

                                        </div>

                                    </div>

                                )}

                        </div>


                        {/* =================================================
                            CONTROLS
                        ================================================= */}

                        {!started ? (

                            <button
                                type="button"
                                onClick={startTeaching}
                                disabled={
                                    isGenerating ||
                                    sections.length === 0
                                }
                                className="flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {isGenerating ? (

                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                ) : (

                                    <Play className="mr-2 h-4 w-4" />

                                )}

                                Start Teaching

                            </button>

                        ) : (

                            <div className="space-y-3">


                                <div className="grid grid-cols-2 gap-2">

                                    <button
                                        type="button"
                                        onClick={toggleAudio}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:opacity-50"
                                    >

                                        {isGenerating ? (

                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                                        ) : isSpeaking ? (

                                            <Pause className="mr-2 h-4 w-4" />

                                        ) : (

                                            <Play className="mr-2 h-4 w-4" />

                                        )}

                                        {isSpeaking
                                            ? "Pause"
                                            : "Play"}

                                    </button>


                                    <button
                                        type="button"
                                        onClick={replayStep}
                                        disabled={isGenerating}
                                        className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 disabled:opacity-50"
                                    >

                                        <RotateCcw className="mr-2 h-4 w-4" />

                                        Replay

                                    </button>

                                </div>


                                {!isLastStep ? (

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={isGenerating}
                                        className="flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
                                    >

                                        Next Step

                                        <SkipForward className="ml-2 h-4 w-4" />

                                    </button>

                                ) : (

                                    <button
                                        type="button"
                                        onClick={restartLesson}
                                        disabled={isGenerating}
                                        className="flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                                    >

                                        <RotateCcw className="mr-2 h-4 w-4" />

                                        Restart Lesson

                                    </button>

                                )}

                            </div>

                        )}


                        {!started && (

                            <p className="mt-3 text-center text-xs text-gray-500">

                                {sections.length > 0
                                    ? `${sections.length} teaching steps ready`
                                    : "Interactive lesson ready"}

                            </p>

                        )}


                        {error && (

                            <p className="mt-3 text-center text-xs text-red-300">

                                {error}

                            </p>

                        )}

                    </div>

                </aside>

            </div>

        </div>
    );
}