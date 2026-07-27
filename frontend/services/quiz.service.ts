import api from "./api";


// ============================================================
// Quiz Types
// ============================================================

export type QuizDifficulty =
    | "easy"
    | "medium"
    | "hard"
    | "mixed";


export interface QuizQuestion {
    difficulty: QuizDifficulty;
    question: string;
    options: string[];
    answer: string;
}


export interface QuizGenerateResponse {
    quiz: QuizQuestion[];
}


// ============================================================
// Quiz Submission Types
// ============================================================

export interface QuizAnswer {
    question: string;
    selected_answer: string;
    correct_answer: string;
}


export interface QuizSubmitRequest {
    topic: string;
    difficulty: QuizDifficulty;
    answers: QuizAnswer[];
}


export interface QuizSubmitResponse {
    total_questions: number;
    correct_answers: number;
    wrong_answers: number;
    score_percentage: number;
    message: string;
}


// ============================================================
// Quiz Service
// ============================================================

export const quizService = {

    // --------------------------------------------------------
    // Generate personalized quiz
    // --------------------------------------------------------

    generate: async (
        topic: string,
        numberOfQuestions: number,
        difficulty: QuizDifficulty
    ): Promise<QuizGenerateResponse> => {

        const { data } =
            await api.post<QuizGenerateResponse>(
                "/quiz/generate",
                {
                    topic,
                    number_of_questions:
                        numberOfQuestions,
                    difficulty,
                }
            );

        return data;
    },


    // --------------------------------------------------------
    // Submit quiz answers
    // --------------------------------------------------------

    submit: async (
        topic: string,
        difficulty: QuizDifficulty,
        answers: QuizAnswer[]
    ): Promise<QuizSubmitResponse> => {

        const { data } =
            await api.post<QuizSubmitResponse>(
                "/quiz/submit",
                {
                    topic,
                    difficulty,
                    answers,
                }
            );

        return data;
    },

};


export default quizService;