import api from "./api";


// ============================================================
// Focus Types
// ============================================================

export interface FocusSessionResponse {
    message: string;
    duration_minutes: number;
}


export interface RecentFocusSession {
    duration_minutes: number;
    subject: string | null;
    topic: string | null;
    completed_at: string;
}


export interface FocusStatsResponse {
    total_sessions: number;
    total_study_minutes: number;
    today_study_minutes: number;
    recent_sessions: RecentFocusSession[];
}


// ============================================================
// Focus Service
// ============================================================

export const focusService = {

    // --------------------------------------------------------
    // Save completed focus session
    // --------------------------------------------------------

    saveSession: async (
        durationMinutes: number,
        subject?: string,
        topic?: string
    ): Promise<FocusSessionResponse> => {

        const { data } =
            await api.post<FocusSessionResponse>(
                "/focus/sessions",
                {
                    duration_minutes:
                        durationMinutes,

                    subject:
                        subject?.trim() || null,

                    topic:
                        topic?.trim() || null,
                }
            );

        return data;
    },


    // --------------------------------------------------------
    // Get real focus statistics
    // --------------------------------------------------------

    getStats:
        async (): Promise<FocusStatsResponse> => {

            const { data } =
                await api.get<FocusStatsResponse>(
                    "/focus/stats"
                );

            return data;
        },

};


export default focusService;