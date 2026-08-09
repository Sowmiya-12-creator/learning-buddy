import api from "./api";


export type LearningLevel =
  | "LKG"
  | "UKG"
  | "Class 1"
  | "Class 2"
  | "Class 3"
  | "Class 4"
  | "Class 5"
  | "Class 6"
  | "Class 7"
  | "Class 8"
  | "Class 9"
  | "Class 10"
  | "Class 11"
  | "Class 12";


export type PreferredLanguage =
    | "English"
    | "Tamil";


export type LearningGoal =
  | "Understand Concepts"
  | "Complete Homework"
  | "Prepare for Exams"
  | "Practice Questions"
  | "Improve Grades"
  | "Daily Learning";


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