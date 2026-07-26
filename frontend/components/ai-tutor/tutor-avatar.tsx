"use client";

import {
    AvatarSection,
} from "@/services/ai-tutor.service";

import ttsService from "@/services/tts.service";

import {
    Bot,
    Loader2,
    Play,
    RotateCcw,
    Square,
    Volume2,
} from "lucide-react";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";


interface TutorAvatarProps {
    sections: AvatarSection[];
}


export default function TutorAvatar({
    sections,
}: TutorAvatarProps) {

    const [currentSection, setCurrentSection] =
        useState(0);

    const [isTeaching, setIsTeaching] =
        useState(false);

    const [isPreparingAudio, setIsPreparingAudio] =
        useState(false);

    const [isSpeaking, setIsSpeaking] =
        useState(false);

    const [audioError, setAudioError] =
        useState("");


    const audioRef =
        useRef<HTMLAudioElement | null>(null);

    const audioUrlRef =
        useRef<string | null>(null);


    // ========================================================
    // Stop Current Audio
    // ========================================================

    const stopAudio = useCallback(() => {

        if (audioRef.current) {

            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
        }


        if (audioUrlRef.current) {

            URL.revokeObjectURL(
                audioUrlRef.current
            );

            audioUrlRef.current = null;
        }


        setIsSpeaking(false);
        setIsPreparingAudio(false);

    }, []);


    // ========================================================
    // Reset When New Lesson Arrives
    // ========================================================

    useEffect(() => {

        stopAudio();

        setCurrentSection(0);
        setIsTeaching(false);
        setAudioError("");

    }, [sections, stopAudio]);


    // ========================================================
    // Cleanup When Component Unmounts
    // ========================================================

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


    // ========================================================
    // Empty Avatar Data
    // ========================================================

    if (!sections || sections.length === 0) {
        return null;
    }


    const section =
        sections[currentSection];


    // ========================================================
    // Speak Avatar Section
    // ========================================================

    const speakSection = async (
        speech: string
    ) => {

        if (!speech.trim()) {
            return;
        }


        stopAudio();
        setAudioError("");
        setIsPreparingAudio(true);


        try {

            const audioBlob =
                await ttsService.generateSpeech(
                    speech
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

                setIsPreparingAudio(false);
                setIsSpeaking(true);
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

                audioRef.current = null;
            };


            audio.onerror = () => {

                setIsPreparingAudio(false);
                setIsSpeaking(false);

                setAudioError(
                    "Unable to play the teacher voice."
                );
            };


            await audio.play();


        } catch (error) {

            console.error(
                "Avatar TTS error:",
                error
            );

            setIsPreparingAudio(false);
            setIsSpeaking(false);

            setAudioError(
                "Unable to generate the teacher voice right now."
            );
        }
    };


    // ========================================================
    // Start Teaching
    // ========================================================

    const startTeaching = async () => {

        stopAudio();

        setCurrentSection(0);
        setIsTeaching(true);
        setAudioError("");


        const firstSection =
            sections[0];


        if (firstSection?.speech) {

            await speakSection(
                firstSection.speech
            );
        }
    };


    // ========================================================
    // Next Section
    // ========================================================

    const nextSection = async () => {

        stopAudio();
        setAudioError("");


        if (
            currentSection <
            sections.length - 1
        ) {

            const nextIndex =
                currentSection + 1;


            setCurrentSection(
                nextIndex
            );


            const nextAvatarSection =
                sections[nextIndex];


            if (nextAvatarSection?.speech) {

                await speakSection(
                    nextAvatarSection.speech
                );
            }

        } else {

            setIsTeaching(false);
            setCurrentSection(0);
        }
    };


    // ========================================================
    // Restart Teaching
    // ========================================================

    const restartTeaching = async () => {

        stopAudio();

        setCurrentSection(0);
        setIsTeaching(true);
        setAudioError("");


        const firstSection =
            sections[0];


        if (firstSection?.speech) {

            await speakSection(
                firstSection.speech
            );
        }
    };


    // ========================================================
    // Replay Current Section
    // ========================================================

    const replayCurrentSection =
        async () => {

            await speakSection(
                section.speech
            );
        };


    // ========================================================
    // Gesture
    // ========================================================

    const getGestureText = () => {

        switch (section.gesture) {

            case "welcome":
                return "👋";

            case "point_to_visual":
                return "👉";

            case "think":
                return "🤔";

            case "encourage":
                return "🌟";

            case "conclude":
                return "✅";

            case "explain":
                return "💡";

            default:
                return "👩‍🏫";
        }
    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="mt-5 overflow-hidden rounded-2xl border border-violet-400/20 bg-violet-500/5">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20">

                    <Bot className="h-5 w-5 text-violet-300" />

                </div>


                <div>

                    <div className="font-semibold text-violet-200">
                        AI Teacher
                    </div>

                    <div className="text-xs text-gray-400">

                        {isSpeaking
                            ? "Speaking..."
                            : isPreparingAudio
                            ? "Preparing teacher voice..."
                            : "Virtual teaching guide"}

                    </div>

                </div>

            </div>


            {/* =================================================
                AVATAR AREA
            ================================================= */}

            <div className="p-5">


                {/* =============================================
                    NOT STARTED
                ============================================= */}

                {!isTeaching ? (

                    <div className="flex flex-col items-center py-4 text-center">


                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-violet-500/15 text-5xl">

                            👩‍🏫

                        </div>


                        <p className="max-w-md text-sm leading-6 text-gray-300">

                            Your AI Teacher can guide you
                            through this answer using short,
                            focused teaching steps with voice.

                        </p>


                        <button
                            type="button"
                            onClick={startTeaching}
                            disabled={isPreparingAudio}
                            className="mt-5 inline-flex items-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {isPreparingAudio ? (

                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                            ) : (

                                <Play className="mr-2 h-4 w-4" />

                            )}

                            Start Teaching

                        </button>

                    </div>

                ) : (

                    /* =========================================
                        ACTIVE TEACHING
                    ========================================= */

                    <div>


                        {/* Teacher + Speech */}

                        <div className="flex items-start gap-4">


                            {/* Teacher Gesture */}

                            <div
                                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-4xl transition-transform duration-300 ${
                                    isSpeaking
                                        ? "scale-110"
                                        : "scale-100"
                                }`}
                            >

                                {getGestureText()}

                            </div>


                            {/* Speech Bubble */}

                            <div className="flex-1 rounded-2xl rounded-tl-md bg-white/5 p-4">

                                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-violet-300">

                                    <span>
                                        AI Teacher
                                    </span>


                                    {isSpeaking && (

                                        <Volume2 className="h-3.5 w-3.5 animate-pulse" />

                                    )}

                                </div>


                                <p className="leading-7 text-gray-100">

                                    {section.speech}

                                </p>

                            </div>

                        </div>


                        {/* Audio Status */}

                        {isPreparingAudio && (

                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">

                                <Loader2 className="h-4 w-4 animate-spin text-violet-400" />

                                Preparing teacher voice...

                            </div>
                        )}


                        {/* Audio Error */}

                        {audioError && (

                            <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">

                                {audioError}

                            </div>
                        )}


                        {/* Progress */}

                        <div className="mt-5 text-sm text-gray-400">

                            Step {currentSection + 1} of{" "}
                            {sections.length}

                        </div>


                        {/* Progress Bar */}

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">

                            <div
                                className="h-full rounded-full bg-violet-500 transition-all duration-300"
                                style={{
                                    width: `${
                                        (
                                            (currentSection + 1) /
                                            sections.length
                                        ) * 100
                                    }%`,
                                }}
                            />

                        </div>


                        {/* Controls */}

                        <div className="mt-5 flex flex-wrap gap-3">


                            {/* Stop Voice */}

                            {isSpeaking && (

                                <button
                                    type="button"
                                    onClick={stopAudio}
                                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/10"
                                >

                                    <Square className="mr-2 h-4 w-4" />

                                    Stop Voice

                                </button>
                            )}


                            {/* Replay */}

                            {!isSpeaking &&
                                !isPreparingAudio && (

                                <button
                                    type="button"
                                    onClick={
                                        replayCurrentSection
                                    }
                                    className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/10"
                                >

                                    <Volume2 className="mr-2 h-4 w-4" />

                                    Replay

                                </button>
                            )}


                            {/* Next / Finish */}

                            <button
                                type="button"
                                onClick={nextSection}
                                disabled={
                                    isPreparingAudio ||
                                    isSpeaking
                                }
                                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {currentSection <
                                sections.length - 1
                                    ? "Next"
                                    : "Finish"}

                            </button>


                            {/* Restart */}

                            <button
                                type="button"
                                onClick={restartTeaching}
                                disabled={
                                    isPreparingAudio ||
                                    isSpeaking
                                }
                                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                <RotateCcw className="mr-2 h-4 w-4" />

                                Restart

                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}