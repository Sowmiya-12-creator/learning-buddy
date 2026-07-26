"use client";

import {
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Loader2,
    MessageSquarePlus,
    SendHorizontal,
    Code2,
} from "lucide-react";

import axios from "axios";

import AppLayout from "@/components/layout/app-layout";
import VisualTeaching from "@/components/ai-tutor/visual-teaching";
import TutorAudio from "@/components/ai-tutor/tutor-audio";
import TutorAvatar from "@/components/ai-tutor/tutor-avatar";

import {
    AIResponse,
    aiTutorService,
} from "@/services/ai-tutor.service";


// ============================================================
// Display Message Type
// ============================================================

interface DisplayMessage {
    id: string;
    sender: "user" | "ai";
    text: string;
    aiResponse?: AIResponse;
}


// ============================================================
// AI Tutor Page
// ============================================================

export default function AITutorPage() {

    const [sessionId, setSessionId] =
        useState<string | null>(null);

    const [messages, setMessages] =
        useState<DisplayMessage[]>([]);

    const [question, setQuestion] =
        useState("");

    const [isSending, setIsSending] =
        useState(false);

    const [
        isCreatingSession,
        setIsCreatingSession,
    ] = useState(false);

    const [error, setError] =
        useState("");

    const bottomRef =
        useRef<HTMLDivElement | null>(null);


    // ========================================================
    // Auto Scroll
    // ========================================================

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages, isSending]);


    // ========================================================
    // Error Handler
    // ========================================================

    const handleError = (
        error: unknown,
        fallbackMessage: string
    ) => {

        if (axios.isAxiosError(error)) {

            const detail =
                error.response?.data?.detail;

            const message =
                error.response?.data?.message;

            if (typeof detail === "string") {

                setError(detail);

            } else if (
                typeof message === "string"
            ) {

                setError(message);

            } else if (!error.response) {

                setError(
                    "Cannot connect to Learning Buddy server."
                );

            } else {

                setError(fallbackMessage);
            }

            return;
        }

        setError(fallbackMessage);
    };


    // ========================================================
    // Create New Chat
    // ========================================================

    const createNewChat = async () => {

        setError("");

        try {

            setIsCreatingSession(true);

            const session =
                await aiTutorService.createSession();

            setSessionId(
                session.session_id
            );

            setMessages([]);

        } catch (error) {

            handleError(
                error,
                "Unable to create a new chat."
            );

        } finally {

            setIsCreatingSession(false);
        }
    };


    // ========================================================
    // Send Message
    // ========================================================

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const trimmedQuestion =
            question.trim();

        if (
            !trimmedQuestion ||
            isSending
        ) {
            return;
        }

        setError("");

        let activeSessionId =
            sessionId;

        try {

            setIsSending(true);


            // ------------------------------------------------
            // Automatically Create Session
            // ------------------------------------------------

            if (!activeSessionId) {

                const session =
                    await aiTutorService.createSession();

                activeSessionId =
                    session.session_id;

                setSessionId(
                    activeSessionId
                );
            }


            // ------------------------------------------------
            // Add User Message
            // ------------------------------------------------

            const userMessage: DisplayMessage = {

                id: crypto.randomUUID(),

                sender: "user",

                text: trimmedQuestion,
            };

            setMessages((current) => [
                ...current,
                userMessage,
            ]);

            setQuestion("");


            // ------------------------------------------------
            // Ask Learning Buddy
            // ------------------------------------------------

            const response =
                await aiTutorService.ask(
                    trimmedQuestion,
                    activeSessionId
                );


            // ------------------------------------------------
            // Determine Main Response Text
            //
            // Code-only responses may have no normal text.
            // ------------------------------------------------

            let responseText = "";

            if (response.explanation) {

                responseText =
                    response.explanation;

            } else if (response.example) {

                responseText =
                    response.example;

            } else if (
                response.key_points?.length
            ) {

                responseText =
                    response.key_points.join("\n");

            } else if (
                response.visual_teaching
            ) {

                responseText =
                    response.visual_teaching.description;

            } else if (response.code) {

                responseText =
                    response.topic ??
                    "Programming Response";
            }


            // ------------------------------------------------
            // Add AI Message
            // ------------------------------------------------

            const aiMessage: DisplayMessage = {

                id: crypto.randomUUID(),

                sender: "ai",

                text: responseText,

                aiResponse: response,
            };

            setMessages((current) => [
                ...current,
                aiMessage,
            ]);

        } catch (error) {

            handleError(
                error,
                "Learning Buddy could not answer right now. Please try again."
            );

        } finally {

            setIsSending(false);
        }
    };


    // ========================================================
    // UI
    // ========================================================

    return (

        <AppLayout>

            <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-5xl flex-col">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-6 flex items-center justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            🤖 AI Tutor
                        </h1>

                        <p className="mt-1 text-sm text-gray-400">
                            Ask anything and learn at
                            your own level.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={createNewChat}
                        disabled={
                            isCreatingSession ||
                            isSending
                        }
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {isCreatingSession ? (

                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                        ) : (

                            <MessageSquarePlus className="mr-2 h-4 w-4" />

                        )}

                        New Chat

                    </button>

                </div>


                {/* =================================================
                    CONVERSATION
                ================================================= */}

                <div className="flex-1 space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.03] p-5">


                    {/* Empty Chat */}

                    {messages.length === 0 && (

                        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">

                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20 text-4xl">
                                🤖
                            </div>

                            <h2 className="text-2xl font-semibold">
                                What would you like to learn?
                            </h2>

                            <p className="mt-3 max-w-lg text-gray-400">

                                Ask about technology,
                                mathematics, history,
                                languages, finance,
                                everyday skills or any
                                topic you are curious
                                about.

                            </p>

                        </div>
                    )}


                    {/* =================================================
                        MESSAGES
                    ================================================= */}

                    {messages.map((message) => {


                        // ---------------------------------------------
                        // User Message
                        // ---------------------------------------------

                        if (
                            message.sender === "user"
                        ) {

                            return (

                                <div
                                    key={message.id}
                                    className="ml-auto max-w-2xl rounded-2xl rounded-br-md bg-violet-600 px-5 py-4 text-white"
                                >
                                    {message.text}
                                </div>
                            );
                        }


                        // ---------------------------------------------
                        // AI Response
                        // ---------------------------------------------

                        const response =
                            message.aiResponse;


                        // =============================================
                        // Conversation Mode
                        // =============================================

                        if (
                            response?.response_mode ===
                            "conversation"
                        ) {

                            return (

                                <div
                                    key={message.id}
                                    className="max-w-2xl rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-5 py-4"
                                >

                                    <p className="leading-7 text-gray-100">
                                        {message.text}
                                    </p>

                                </div>
                            );
                        }


                        // =============================================
                        // Teaching / Follow-Up Mode
                        // =============================================

                        return (

                            <div
                                key={message.id}
                                className="max-w-3xl rounded-2xl rounded-bl-md border border-white/10 bg-white/5 p-5"
                            >


                                {/* Topic */}

                                {response?.topic && (

                                    <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">

                                        {response.topic}

                                    </div>
                                )}


                                {/* =====================================
                                    EXPLANATION
                                ===================================== */}

                                {response?.explanation && (

                                    <p className="whitespace-pre-wrap leading-7 text-gray-100">

                                        {
                                            response.explanation
                                        }

                                    </p>
                                )}


                                {/* =====================================
                                    PROGRAMMING CODE
                                ===================================== */}

                                {response?.code && (

                                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">


                                        {/* Code Header */}

                                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">

                                            <div className="flex items-center gap-2">

                                                <Code2 className="h-4 w-4 text-violet-300" />

                                                <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">

                                                    {
                                                        response.code_language ??
                                                        "code"
                                                    }

                                                </span>

                                            </div>

                                        </div>


                                        {/* Actual Code */}

                                        <div className="overflow-x-auto">

                                            <pre className="p-5 text-sm leading-6 text-gray-100">

                                                <code>
                                                    {
                                                        response.code
                                                    }
                                                </code>

                                            </pre>

                                        </div>

                                    </div>
                                )}


                                {/* =====================================
                                    LISTEN / TTS
                                ===================================== */}

                                {response?.narration && (

                                    <TutorAudio
                                        narration={
                                            response.narration
                                        }
                                    />

                                )}

                                {/* =====================================
    AI TEACHER AVATAR
===================================== */}

{response?.avatar_sections &&
    response.avatar_sections.length > 0 && (

    <TutorAvatar
        sections={
            response.avatar_sections
        }
    />

)}


                                {/* =====================================
                                    VISUAL LEARNING
                                ===================================== */}

                                {response?.visual_teaching && (

                                    <VisualTeaching
                                        visual={
                                            response.visual_teaching
                                        }
                                    />

                                )}


                                {/* =====================================
                                    EXAMPLE
                                ===================================== */}

                                {response?.example && (

                                    <div className="mt-5 rounded-xl bg-blue-500/10 p-4">

                                        <div className="mb-2 font-semibold text-blue-200">
                                            Example
                                        </div>

                                        <p className="whitespace-pre-wrap leading-6 text-gray-200">

                                            {
                                                response.example
                                            }

                                        </p>

                                    </div>
                                )}


                                {/* =====================================
                                    KEY POINTS
                                ===================================== */}

                                {response?.key_points &&
                                    response.key_points.length >
                                        0 && (

                                    <div className="mt-5">

                                        <div className="mb-3 font-semibold">
                                            Key Points
                                        </div>

                                        <ul className="space-y-2 text-gray-200">

                                            {response.key_points.map(
                                                (
                                                    point,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                        className="flex gap-3"
                                                    >

                                                        <span className="text-violet-400">
                                                            •
                                                        </span>

                                                        <span>
                                                            {point}
                                                        </span>

                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    </div>
                                )}


                                {/* =====================================
                                    PRACTICE QUESTION
                                ===================================== */}

                                {response?.practice_question && (

                                    <div className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4">

                                        <div className="mb-2 font-semibold text-violet-200">
                                            Try This
                                        </div>

                                        <p className="text-gray-200">

                                            {
                                                response.practice_question
                                            }

                                        </p>

                                    </div>
                                )}

                            </div>
                        );

                    })}


                    {/* =================================================
                        AI THINKING
                    ================================================= */}

                    {isSending && (

                        <div className="flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-gray-300">

                            <Loader2 className="h-5 w-5 animate-spin text-violet-400" />

                            Learning Buddy is thinking...

                        </div>
                    )}


                    <div ref={bottomRef} />

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div
                        role="alert"
                        className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >

                        {error}

                    </div>
                )}


                {/* =================================================
                    INPUT
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-5 flex gap-3"
                >

                    <input
                        type="text"
                        value={question}
                        onChange={(event) =>
                            setQuestion(
                                event.target.value
                            )
                        }
                        placeholder="Ask Learning Buddy anything..."
                        disabled={isSending}
                        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-violet-500 disabled:opacity-60"
                    />

                    <button
                        type="submit"
                        disabled={
                            isSending ||
                            !question.trim()
                        }
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Send question"
                    >

                        {isSending ? (

                            <Loader2 className="h-5 w-5 animate-spin" />

                        ) : (

                            <SendHorizontal className="h-5 w-5" />

                        )}

                    </button>

                </form>

            </div>

        </AppLayout>
    );
}