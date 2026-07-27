import api from "./api";


// ============================================================
// Progress Types
// ============================================================

export interface RecentQuiz {
    topic: string;
    difficulty: string;
    score_percentage: number;
    attempted_at: string;
}


export interface ProgressResponse {
    total_quizzes: number;
    total_questions: number;

    correct_answers: number;
    wrong_answers: number;

    average_score: number;
    best_score: number;

    current_streak: number;
    longest_streak: number;

    recent_quizzes: RecentQuiz[];
}


// ============================================================
// Progress Service
// ============================================================

export const progressService = {

    getProgress:
        async (): Promise<ProgressResponse> => {

            const { data } =
                await api.get<ProgressResponse>(
                    "/progress"
                );

            return data;
        },

};


export default progressService;