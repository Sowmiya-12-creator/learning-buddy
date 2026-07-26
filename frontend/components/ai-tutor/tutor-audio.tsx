"use client";

import { useEffect, useRef, useState } from "react";
import {
    Loader2,
    Pause,
    Play,
    RotateCcw,
    Volume2,
} from "lucide-react";

import { ttsService } from "@/services/tts.service";


interface TutorAudioProps {
    narration: string;
}


export default function TutorAudio({
    narration,
}: TutorAudioProps) {

    const audioRef = useRef<HTMLAudioElement | null>(
        null
    );

    const audioUrlRef = useRef<string | null>(
        null
    );

    const [isGenerating, setIsGenerating] =
        useState(false);

    const [isPlaying, setIsPlaying] =
        useState(false);

    const [hasAudio, setHasAudio] =
        useState(false);

    const [error, setError] =
        useState("");


    // Clean up audio when the component disappears.
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


    const generateAndPlay = async () => {

        if (!narration.trim()) {
            setError(
                "No narration is available for this lesson."
            );
            return;
        }

        setError("");

        try {
            setIsGenerating(true);

            const audioBlob =
                await ttsService.generateSpeech(
                    narration
                );


            if (audioUrlRef.current) {
                URL.revokeObjectURL(
                    audioUrlRef.current
                );
            }


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
                setIsPlaying(true);
            };


            audio.onpause = () => {
                setIsPlaying(false);
            };


            audio.onended = () => {
                setIsPlaying(false);
            };


            audio.onerror = () => {
                setIsPlaying(false);

                setError(
                    "Unable to play the generated audio."
                );
            };


            setHasAudio(true);

            await audio.play();

        } catch {
            setError(
                "Unable to generate speech right now."
            );
        } finally {
            setIsGenerating(false);
        }
    };


    const togglePlayback = async () => {

        const audio =
            audioRef.current;

        if (!audio) {
            await generateAndPlay();
            return;
        }


        if (audio.paused) {
            try {
                await audio.play();
            } catch {
                setError(
                    "Unable to play the audio."
                );
            }
        } else {
            audio.pause();
        }
    };


    const restartAudio = async () => {

        const audio =
            audioRef.current;

        if (!audio) {
            await generateAndPlay();
            return;
        }

        audio.currentTime = 0;

        try {
            await audio.play();
        } catch {
            setError(
                "Unable to restart the audio."
            );
        }
    };


    return (
        <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">

            <div className="flex flex-wrap items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15">
                    <Volume2 className="h-5 w-5 text-cyan-300" />
                </div>


                <div className="mr-auto">
                    <div className="font-semibold text-cyan-100">
                        Listen to this explanation
                    </div>

                    <div className="text-xs text-gray-400">
                        Hear Learning Buddy read the
                        detailed lesson aloud.
                    </div>
                </div>


                {!hasAudio ? (
                    <button
                        type="button"
                        onClick={generateAndPlay}
                        disabled={isGenerating}
                        className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Preparing...
                            </>
                        ) : (
                            <>
                                <Play className="mr-2 h-4 w-4" />
                                Listen
                            </>
                        )}
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={togglePlayback}
                            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                        >
                            {isPlaying ? (
                                <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Play
                                </>
                            )}
                        </button>


                        <button
                            type="button"
                            onClick={restartAudio}
                            aria-label="Restart narration"
                            title="Restart narration"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </>
                )}

            </div>


            {error && (
                <p className="mt-3 text-sm text-red-300">
                    {error}
                </p>
            )}

        </div>
    );
}