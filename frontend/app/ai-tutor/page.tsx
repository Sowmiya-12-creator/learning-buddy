"use client";

import {
    FormEvent,
    Suspense,
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

import { useSearchParams } from "next/navigation";

import AppLayout from "@/components/layout/app-layout";
import VisualTeaching from "@/components/ai-tutor/visual-teaching";
import LearningBuddyTeacher from "@/components/ai-tutor/learning-buddy-teacher";

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

function AITutorContent() {
    const searchParams =
        useSearchParams();

    const initialQuestionHandled =
        useRef(false);

    const initialSessionHandled =
        useRef(false);

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
        event?: FormEvent<HTMLFormElement>,
        questionOverride?: string
    ) => {

        event?.preventDefault();

        const trimmedQuestion =
            (
                questionOverride ??
                question
            ).trim();

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
    // Restore Existing Conversation
    // ========================================================

    useEffect(() => {

        const existingSessionId =
            searchParams.get("session");

        if (
            !existingSessionId ||
            initialSessionHandled.current
        ) {
            return;
        }

        initialSessionHandled.current = true;


        const restoreConversation =
            async () => {

                try {

                    const session =
                        await aiTutorService.getSession(
                            existingSessionId
                        );

                    setSessionId(
                        session.session_id
                    );


                    const restoredMessages =
                        session.messages.map(
                            (message) => ({

                                id:
                                    message.message_id,

                                sender:
                                    message.sender,

                                text:
                                    message.text,

                                topic:
                                    message.topic,

                                visual_steps:
                                    message.visual_steps,

                                narration:
                                    message.narration,

                                avatar_sections:
                                    message.avatar_sections,

                                visual_teaching:
                                    message.visual_teaching,

                            })
                        );


                    setMessages(
                        restoredMessages
                    );

                } catch (error) {

                    console.error(
                        "Unable to restore conversation:",
                        error
                    );
                }
            };


        restoreConversation();

    }, [searchParams]);


    // ========================================================
    // Question Passed From Home
    // ========================================================

    useEffect(() => {

        const homeQuestion =
            searchParams.get("question");

        if (
            !homeQuestion ||
            initialQuestionHandled.current
        ) {
            return;
        }

        initialQuestionHandled.current = true;

        handleSubmit(
            undefined,
            homeQuestion
        );

    }, [searchParams]);


    // ========================================================
    // UI
    // ========================================================

    return (

        <AppLayout>

            <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="mb-6 flex items-center justify-between gap-4">

                    <div>

                        <h1 className="text-3xl font-bold">
                            🤖 AI Tutor
                        </h1>

                        <p className="mt-1 text-sm text-gray-400">
                            Ask anything and learn at your own level.
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

                <div className="flex-1 space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-white/3 p-5">


                    {/* Empty Chat */}

                    {messages.length === 0 && (

                        <div className="flex min-h-95 flex-col items-center justify-center text-center">

                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet-500/20 text-4xl">
                                🤖
                            </div>


                            <h2 className="text-2xl font-semibold">
                                What would you like to learn?
                            </h2>


                            <p className="mt-3 max-w-lg text-gray-400">

                                Ask about technology, mathematics,
                                history, languages, finance,
                                everyday skills or any topic you
                                are curious about.

                            </p>

                        </div>

                    )}


                    {/* =================================================
                        MESSAGES
                    ================================================= */}

                    {messages.map((message) => {


                        // =============================================
                        // USER MESSAGE
                        // =============================================

                        if (message.sender === "user") {

                            return (

                                <div
                                    key={message.id}
                                    className="ml-auto max-w-2xl rounded-2xl rounded-br-md bg-violet-600 px-5 py-4 text-white"
                                >

                                    {message.text}

                                </div>

                            );
                        }


                        const response =
                            message.aiResponse;


                        // =============================================
                        // NORMAL CONVERSATION
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
                        // TEACHING / FOLLOW-UP RESPONSE
                        // =============================================

                        return (

                            <div
                                key={message.id}
                                className="w-full rounded-2xl rounded-bl-md border border-white/10 bg-white/5 p-5"
                            >


                                {/* Topic */}

                                {response?.topic && (

                                    <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-violet-300">

                                        {response.topic}

                                    </div>

                                )}


                                {/* Explanation */}

                                {response?.explanation && (

                                    <p className="whitespace-pre-wrap leading-7 text-gray-100">

                                        {response.explanation}

                                    </p>

                                )}


                                {/* Programming Code */}

                                {response?.code && (

                                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">

                                        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">

                                            <div className="flex items-center gap-2">

                                                <Code2 className="h-4 w-4 text-violet-300" />


                                                <span className="text-sm font-semibold uppercase tracking-wide text-gray-300">

                                                    {response.code_language ?? "code"}

                                                </span>

                                            </div>

                                        </div>


                                        <div className="overflow-x-auto">

                                            <pre className="p-5 text-sm leading-6 text-gray-100">

                                                <code>
                                                    {response.code}
                                                </code>

                                            </pre>

                                        </div>

                                    </div>

                                )}


                                {/* =================================================
                                    NEW LEARNING BUDDY CLASSROOM
                                ================================================= */}

                                {response && (

                                    <LearningBuddyTeacher
                                        topic={response.topic}
                                        explanation={response.explanation}
                                        example={response.example}
                                        code={response.code}
                                        codeLanguage={response.code_language}
                                        keyPoints={
                                            response.key_points ?? []
                                        }
                                        visual={
                                            response.visual_teaching
                                        }
                                        sections={
                                            response.avatar_sections ?? []
                                        }
                                    />

                                )}


                                {/* =================================================
                                    OLD COMPONENTS
                                ================================================= */}




                                
                                

                                {/* Practice Question */}

                                {response?.practice_question && (

                                    <div className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4">

                                        <div className="mb-2 font-semibold text-violet-200">

                                            Try This

                                        </div>


                                        <p className="text-gray-200">

                                            {response.practice_question}

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
export default function AITutorPage() {
    return (
        <Suspense fallback={null}>
            <AITutorContent />
        </Suspense>
    );
}