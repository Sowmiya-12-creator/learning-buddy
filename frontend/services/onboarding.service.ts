import api from "./api";


export type LearningLevel =
    | "LKG"
    | "Primary"
    | "Middle School"
    | "High School"
    | "College"
    | "Professional"
    | "Lifelong Learner";


export type PreferredLanguage =
    | "English"
    | "Tamil";


export type LearningGoal =
    | "Learn New Skills"
    | "Prepare for Exams"
    | "Interview Preparation"
    | "Improve Knowledge"
    | "Learn as a Hobby";


export interface OnboardingData {
    learning_level: LearningLevel;
    preferred_language: PreferredLanguage;
    learning_goal: LearningGoal;
    daily_study_time: number;
}


export interface OnboardingResponse {
    message: string;
}


export const onboardingService = {

    complete: async (
        data: OnboardingData
    ): Promise<OnboardingResponse> => {

        const response =
            await api.post<OnboardingResponse>(
                "/onboarding",
                data
            );

        return response.data;
    },

};


export default onboardingService;