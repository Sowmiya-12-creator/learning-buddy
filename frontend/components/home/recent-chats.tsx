"use client";

import {
    useEffect,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    MessageSquare,
    Loader2,
} from "lucide-react";

import aiTutorService, {
    ChatSessionSummary,
} from "@/services/ai-tutor.service";


export default function RecentChats() {

    const router = useRouter();

    const [chats, setChats] =
        useState<ChatSessionSummary[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ========================================================
    // Load Real Chat History
    // ========================================================

    useEffect(() => {

        const loadChats = async () => {

            try {

                setLoading(true);

                const response =
                    await aiTutorService.getHistory();

                // Home only needs the latest few conversations.
                setChats(
                    response.sessions.slice(0, 5)
                );

            } catch (err) {

                console.error(
                    "Unable to load recent chats:",
                    err
                );

                setError(
                    "Unable to load recent chats."
                );

            } finally {

                setLoading(false);
            }

        };

        loadChats();

    }, []);


    // ========================================================
    // Open Existing Conversation
    // ========================================================

    const openChat = (
        sessionId: string
    ) => {

        router.push(
            `/ai-tutor?session=${encodeURIComponent(
                sessionId
            )}`
        );
    };


    // ========================================================
    // Date Formatting
    // ========================================================

    const formatDate = (
        dateString: string
    ) => {

        const date =
            new Date(dateString);

        const now =
            new Date();

        const isToday =
            date.toDateString() ===
            now.toDateString();

        if (isToday) {

            return date.toLocaleTimeString(
                undefined,
                {
                    hour: "numeric",
                    minute: "2-digit",
                }
            );
        }

        return date.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
            }
        );
    };


    return (

        <section className="mx-6 mt-8">

            <h2 className="mb-4 text-xl font-bold text-white">
                Recent Chats
            </h2>


            {loading && (

                <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-5 text-gray-400">

                    <Loader2 className="h-4 w-4 animate-spin" />

                    Loading recent chats...

                </div>
            )}


            {!loading && error && (

                <div className="rounded-2xl bg-white/5 p-5 text-sm text-red-400">
                    {error}
                </div>
            )}


            {!loading &&
                !error &&
                chats.length === 0 && (

                    <div className="rounded-2xl bg-white/5 p-6 text-center">

                        <MessageSquare className="mx-auto h-7 w-7 text-gray-500" />

                        <p className="mt-3 text-sm text-gray-400">
                            Your conversations with Learning Buddy will appear here.
                        </p>

                    </div>
                )}


            {!loading &&
                !error &&
                chats.length > 0 && (

                    <div className="space-y-3">

                        {chats.map(
                            (chat) => (

                                <button
                                    key={
                                        chat.session_id
                                    }
                                    type="button"
                                    onClick={() =>
                                        openChat(
                                            chat.session_id
                                        )
                                    }
                                    className="flex w-full items-center justify-between rounded-2xl bg-white/10 p-4 text-left transition hover:bg-white/20"
                                >

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="rounded-xl bg-violet-500/20 p-2">

                                            <MessageSquare className="h-5 w-5 text-violet-300" />

                                        </div>


                                        <div className="min-w-0">

                                            <h3 className="truncate font-semibold text-white">
                                                {chat.title}
                                            </h3>

                                        </div>

                                    </div>


                                    <span className="ml-4 text-sm text-violet-300">
                                        Open →
                                    </span>

                                </button>
                            )
                        )}

                    </div>
                )}

        </section>
    );
}