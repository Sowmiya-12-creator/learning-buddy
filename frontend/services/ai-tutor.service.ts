import api from "./api";


// ============================================================
// Response Mode
// ============================================================

export type AIResponseMode =
    | "teaching"
    | "follow_up"
    | "conversation";


// ============================================================
// Avatar Types
// ============================================================

export type AvatarGesture =
    | "welcome"
    | "explain"
    | "point_to_visual"
    | "encourage"
    | "think"
    | "conclude"
    | "none";


export interface AvatarSection {
    speech: string;
    gesture: AvatarGesture;
    pause_after: boolean;
}


// ============================================================
// Visual Teaching Types
// ============================================================

export interface VisualStep {
    step: number;
    title: string;
    description: string;
}


export interface VisualTeaching {
    visual_type: string;
    title: string;
    description: string;
    steps: VisualStep[];
}


// ============================================================
// AI Tutor Response
// ============================================================

export interface AIResponse {

    // Determines how the frontend should display
    // the latest AI response.
    response_mode: AIResponseMode;

    // May be null when the learner requests
    // only an example, key points, code, visual, etc.
    explanation: string | null;

    // Optional lesson content.
    topic: string | null;

    example: string | null;

    key_points: string[];

    practice_question: string | null;


    // --------------------------------------------------------
    // Programming Content
    // --------------------------------------------------------

    // Actual source code returned for programming requests.
    code: string | null;

    // Programming language of the returned code.
    // Examples: java, python, c, cpp, javascript.
    code_language: string | null;


    // --------------------------------------------------------
    // Visual Learning
    // --------------------------------------------------------

    // Empty when visual teaching is not needed.
    visual_steps: VisualStep[];

    // Null for normal conversation and when
    // a visual is unnecessary.
    visual_teaching: VisualTeaching | null;


    // --------------------------------------------------------
    // Listen / TTS
    // --------------------------------------------------------

    // Null for normal conversation.
    // Educational questions should normally provide narration.
    narration: string | null;


    // --------------------------------------------------------
    // Avatar
    // --------------------------------------------------------

    // Empty for normal conversation.
    // Educational questions should normally provide
    // avatar teaching guidance.
    avatar_sections: AvatarSection[];
}


// ============================================================
// Chat Types
// ============================================================

export type ChatSender =
    | "user"
    | "ai";


export interface ChatMessage {
    message_id: string;

    sender: ChatSender;

    text: string;

    topic: string | null;

    visual_steps: VisualStep[];

    narration: string | null;

    avatar_sections: AvatarSection[];

    visual_teaching: VisualTeaching | null;

    timestamp: string;
}


export interface ChatSessionSummary {
    session_id: string;

    title: string;

    started_at: string;

    updated_at: string;
}


export interface ChatHistoryResponse {
    sessions: ChatSessionSummary[];
}


export interface ChatSessionResponse {
    session_id: string;

    title: string;

    started_at: string;

    updated_at: string;

    messages: ChatMessage[];
}


export interface CreateChatSessionResponse {
    session_id: string;

    title: string;

    message: string;
}


export interface DeleteChatSessionResponse {
    message: string;
}


// ============================================================
// AI Tutor Service
// ============================================================

export const aiTutorService = {

    // --------------------------------------------------------
    // Create a new conversation
    // --------------------------------------------------------

    createSession: async (
        title?: string
    ): Promise<CreateChatSessionResponse> => {

        const { data } =
            await api.post<CreateChatSessionResponse>(
                "/chat/sessions",
                {
                    title: title ?? null,
                }
            );

        return data;
    },


    // --------------------------------------------------------
    // Ask Learning Buddy
    // --------------------------------------------------------

    ask: async (
        question: string,
        sessionId?: string
    ): Promise<AIResponse> => {

        const { data } =
            await api.post<AIResponse>(
                "/ai/ask",
                {
                    question,
                    session_id:
                        sessionId ?? null,
                }
            );

        return data;
    },


    // --------------------------------------------------------
    // Get all previous conversations
    // --------------------------------------------------------

    getHistory:
        async (): Promise<ChatHistoryResponse> => {

            const { data } =
                await api.get<ChatHistoryResponse>(
                    "/chat/history"
                );

            return data;
        },


    // --------------------------------------------------------
    // Search conversation history
    // --------------------------------------------------------

    searchHistory: async (
        query: string
    ): Promise<ChatHistoryResponse> => {

        const { data } =
            await api.get<ChatHistoryResponse>(
                "/chat/search",
                {
                    params: {
                        query,
                    },
                }
            );

        return data;
    },


    // --------------------------------------------------------
    // Open a particular conversation
    // --------------------------------------------------------

    getSession: async (
        sessionId: string
    ): Promise<ChatSessionResponse> => {

        const { data } =
            await api.get<ChatSessionResponse>(
                `/chat/sessions/${sessionId}`
            );

        return data;
    },


    // --------------------------------------------------------
    // Delete conversation
    // --------------------------------------------------------

    deleteSession: async (
        sessionId: string
    ): Promise<DeleteChatSessionResponse> => {

        const { data } =
            await api.delete<DeleteChatSessionResponse>(
                `/chat/sessions/${sessionId}`
            );

        return data;
    },

};


export default aiTutorService;