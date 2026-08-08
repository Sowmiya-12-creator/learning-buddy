"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Languages,
  Loader2,
  Target,
} from "lucide-react";
import axios from "axios";

import {
  LearningGoal,
  LearningLevel,
  PreferredLanguage,
  onboardingService,
} from "@/services/onboarding.service";

const learningLevels: {
  value: LearningLevel;
  title: string;
  description: string;
}[] = [
  {
    value: "LKG",
    title: "LKG",
    description: "Begin learning through fun activities and stories.",
  },
  {
    value: "UKG",
    title: "UKG",
    description: "Build early reading, writing and math skills.",
  },
  {
    value: "Class 1",
    title: "Class 1",
    description: "Learn basic concepts with simple explanations.",
  },
  {
    value: "Class 2",
    title: "Class 2",
    description: "Strengthen your fundamentals step by step.",
  },
  {
    value: "Class 3",
    title: "Class 3",
    description: "Develop confidence through interactive learning.",
  },
  {
    value: "Class 4",
    title: "Class 4",
    description: "Explore concepts through visuals and examples.",
  },
  {
    value: "Class 5",
    title: "Class 5",
    description: "Build strong fundamentals for higher classes.",
  },
  {
    value: "Class 6",
    title: "Class 6",
    description: "Understand concepts with practical examples.",
  },
  {
    value: "Class 7",
    title: "Class 7",
    description: "Strengthen subject knowledge with visual learning.",
  },
  {
    value: "Class 8",
    title: "Class 8",
    description: "Learn deeper concepts through AI guidance.",
  },
  {
    value: "Class 9",
    title: "Class 9",
    description: "Master foundational concepts for board preparation.",
  },
  {
    value: "Class 10",
    title: "Class 10",
    description: "Prepare confidently for board examinations.",
  },
  {
    value: "Class 11",
    title: "Class 11",
    description: "Study advanced concepts with detailed explanations.",
  },
  {
    value: "Class 12",
    title: "Class 12",
    description: "Prepare for board exams and competitive entrance tests.",
  },
];

const languages: PreferredLanguage[] = [
    "English",
    "Tamil",
];


const learningGoals: {
  value: LearningGoal;
  description: string;
}[] = [
  {
    value: "Understand Concepts",
    description: "Learn topics clearly with simple explanations.",
  },
  {
    value: "Complete Homework",
    description: "Get help understanding and completing homework.",
  },
  {
    value: "Prepare for Exams",
    description: "Revise lessons and prepare confidently for exams.",
  },
  {
    value: "Practice Questions",
    description: "Practice questions to improve understanding.",
  },
  {
    value: "Improve Grades",
    description: "Strengthen weak areas and improve your performance.",
  },
  {
    value: "Daily Learning",
    description: "Build a consistent learning habit every day.",
  },
];


export default function OnboardingPage() {
    const router = useRouter();

    const [step, setStep] = useState(1);

    const [learningLevel, setLearningLevel] =
        useState<LearningLevel | null>(null);

    const [preferredLanguage, setPreferredLanguage] =
        useState<PreferredLanguage>("English");

    const [learningGoal, setLearningGoal] =
        useState<LearningGoal | null>(null);

    const [dailyStudyTime, setDailyStudyTime] =
        useState(30);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] =
        useState(false);


    const goNext = () => {
        setError("");

        if (step === 2 && !learningLevel) {
            setError(
                "Please choose your learning level."
            );
            return;
        }

        if (step < 4) {
            setStep((current) => current + 1);
        }
    };


    const goBack = () => {
        setError("");

        if (step > 1) {
            setStep((current) => current - 1);
        }
    };


    const completeOnboarding = async () => {
        setError("");

        if (!learningLevel) {
            setError(
                "Please choose your learning level."
            );
            setStep(2);
            return;
        }

        if (!learningGoal) {
            setError(
                "Please choose your learning goal."
            );
            return;
        }

        if (
            dailyStudyTime < 10 ||
            dailyStudyTime > 480
        ) {
            setError(
                "Daily study time must be between 10 and 480 minutes."
            );
            return;
        }

        try {
            setIsLoading(true);

            const response =
                await onboardingService.complete({
                    learning_level: learningLevel,
                    preferred_language:
                        preferredLanguage,
                    learning_goal: learningGoal,
                    daily_study_time:
                        dailyStudyTime,
                });


            if (
                response.message !==
                "Onboarding completed successfully!"
            ) {
                setError(
                    response.message ||
                    "Unable to complete onboarding."
                );
                return;
            }


            // Refresh the locally stored user information.
            // The backend profile is now the source of truth.
            if (typeof window !== "undefined") {
                const existingUser =
                    localStorage.getItem("lb_user");

                if (existingUser) {
                    try {
                        const parsedUser =
                            JSON.parse(existingUser);

                        localStorage.setItem(
                            "lb_user",
                            JSON.stringify({
                                ...parsedUser,
                                learning_level:
                                    learningLevel,
                                preferred_language:
                                    preferredLanguage,
                                learning_goal:
                                    learningGoal,
                                daily_study_time:
                                    dailyStudyTime,
                                onboarding_completed:
                                    true,
                            })
                        );
                    } catch {
                        localStorage.removeItem(
                            "lb_user"
                        );
                    }
                }
            }


            router.push("/home");

        } catch (error) {

            if (axios.isAxiosError(error)) {
                const detail =
                    error.response?.data?.detail;

                const message =
                    error.response?.data?.message;

                if (Array.isArray(detail)) {
                    setError(
                        detail[0]?.msg ||
                        "Please check your selections."
                    );
                } else if (
                    typeof detail === "string"
                ) {
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
                    setError(
                        "Unable to complete onboarding. Please try again."
                    );
                }

            } else {
                setError(
                    "Something went wrong. Please try again."
                );
            }

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className="min-h-screen bg-[#071B3B] px-6 py-10 text-white">

            <div className="mx-auto w-full max-w-3xl">

                {/* Progress */}
                <div className="mb-10 flex items-center justify-center gap-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className={`h-3 rounded-full transition-all ${
                                item === step
                                    ? "w-10 bg-violet-500"
                                    : item < step
                                      ? "w-6 bg-violet-400"
                                      : "w-3 bg-gray-600"
                            }`}
                        />
                    ))}
                </div>


                {/* STEP 1 — Welcome */}
                {step === 1 && (
                    <div className="text-center">

                        <div className="mx-auto mb-10 flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/30 shadow-[0_0_60px_rgba(124,58,237,0.5)]">
                            <span className="text-8xl">
                                🤖
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold">
                            Welcome to
                        </h1>

                        <h2 className="mt-2 text-5xl font-extrabold text-violet-500">
                            Learning Buddy
                        </h2>

                        <p className="mx-auto mt-6 max-w-xl leading-7 text-gray-300">
                            Tell us a little about how
                            you learn. Learning Buddy
                            will use these preferences to
                            personalize explanations,
                            examples, visuals and your AI
                            Tutor experience.
                        </p>

                        <button
                            type="button"
                            onClick={goNext}
                            className="mt-12 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-violet-600 text-lg font-semibold transition hover:bg-violet-700"
                        >
                            Personalize My Learning

                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                )}


                {/* STEP 2 — Learning Level */}
                {step === 2 && (
                    <div>

                        <div className="mb-8 text-center">
                            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-violet-400" />

                            <h1 className="text-3xl font-bold">
                                Which class are you studying in?
                            </h1>

                            <p className="mt-3 text-gray-300">
                                We'll personalize every lesson based on your class and learning level.
                            </p>
                        </div>


                        <div className="grid gap-3 sm:grid-cols-2">

                            {learningLevels.map(
                                (level) => {

                                    const selected =
                                        learningLevel ===
                                        level.value;

                                    return (
                                        <button
                                            key={
                                                level.value
                                            }
                                            type="button"
                                            onClick={() =>
                                                setLearningLevel(
                                                    level.value
                                                )
                                            }
                                            className={`rounded-2xl border p-4 text-left transition ${
                                                selected
                                                    ? "border-violet-400 bg-violet-500/20"
                                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                            }`}
                                        >
                                            <div className="font-semibold">
                                                {
                                                    level.title
                                                }
                                            </div>

                                            <div className="mt-1 text-sm text-gray-300">
                                                {
                                                    level.description
                                                }
                                            </div>
                                        </button>
                                    );
                                }
                            )}

                        </div>
                    </div>
                )}


                {/* STEP 3 — Language */}
                {step === 3 && (
                    <div>

                        <div className="mb-10 text-center">
                            <Languages className="mx-auto mb-4 h-12 w-12 text-violet-400" />

                            <h1 className="text-3xl font-bold">
                                Choose your teaching language
                            </h1>

                            <p className="mt-3 text-gray-300">
                                Learning Buddy will use
                                this as the primary
                                language while teaching.
                            </p>
                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {languages.map(
                                (language) => {

                                    const selected =
                                        preferredLanguage ===
                                        language;

                                    return (
                                        <button
                                            key={language}
                                            type="button"
                                            onClick={() =>
                                                setPreferredLanguage(
                                                    language
                                                )
                                            }
                                            className={`rounded-2xl border p-6 text-center transition ${
                                                selected
                                                    ? "border-violet-400 bg-violet-500/20"
                                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                            }`}
                                        >
                                            <Languages className="mx-auto mb-3 h-7 w-7" />

                                            <span className="text-lg font-semibold">
                                                {language}
                                            </span>
                                        </button>
                                    );
                                }
                            )}

                        </div>
                    </div>
                )}


                {/* STEP 4 — Goal */}
                {step === 4 && (
                    <div>

                        <div className="mb-8 text-center">
                            <Target className="mx-auto mb-4 h-12 w-12 text-violet-400" />

                            <h1 className="text-3xl font-bold">
                                How can Learning Buddy help you?
                            </h1>

                            <p className="mt-3 text-gray-300">
                               Choose your main goal so we can personalize your learning journey.
                            </p>
                        </div>


                        <div className="space-y-3">

                            {learningGoals.map(
                                (goal) => {

                                    const selected =
                                        learningGoal ===
                                        goal.value;

                                    return (
                                        <button
                                            key={
                                                goal.value
                                            }
                                            type="button"
                                            onClick={() =>
                                                setLearningGoal(
                                                    goal.value
                                                )
                                            }
                                            className={`w-full rounded-2xl border p-4 text-left transition ${
                                                selected
                                                    ? "border-violet-400 bg-violet-500/20"
                                                    : "border-white/10 bg-white/5 hover:bg-white/10"
                                            }`}
                                        >
                                           
                                               <div className="flex items-center gap-3">

    <BookOpen className="h-5 w-5 text-violet-300" />

    <div>
        <div className="font-semibold">
            {goal.value}
        </div>

        <div className="mt-1 text-sm text-gray-300">
            {goal.description}
        </div>
    </div>


                                            </div>
                                        </button>
                                    );
                                }
                            )}

                        </div>


                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">

                            <label
                                htmlFor="studyTime"
                                className="font-semibold"
                            >
                                Daily learning time
                            </label>

                            <p className="mt-1 text-sm text-gray-300">
                                How many minutes would you
                                like to spend learning
                                each day?
                            </p>

                            <div className="mt-4 flex items-center gap-4">

                                <input
                                    id="studyTime"
                                    type="range"
                                    min="10"
                                    max="180"
                                    step="10"
                                    value={
                                        dailyStudyTime
                                    }
                                    onChange={(event) =>
                                        setDailyStudyTime(
                                            Number(
                                                event
                                                    .target
                                                    .value
                                            )
                                        )
                                    }
                                    className="flex-1 accent-violet-500"
                                />

                                <div className="min-w-24 rounded-xl bg-violet-500/20 px-4 py-2 text-center font-semibold text-violet-200">
                                    {dailyStudyTime} min
                                </div>

                            </div>
                        </div>

                    </div>
                )}


                {/* Error */}
                {error && (
                    <div
                        role="alert"
                        className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                        {error}
                    </div>
                )}


                {/* Navigation */}
                {step > 1 && (
                    <div className="mt-10 flex gap-4">

                        <button
                            type="button"
                            onClick={goBack}
                            disabled={isLoading}
                            className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl border border-white/20 bg-white/5 font-semibold transition hover:bg-white/10 disabled:opacity-50"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Back
                        </button>


                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl bg-violet-600 font-semibold transition hover:bg-violet-700"
                            >
                                Continue

                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={
                                    completeOnboarding
                                }
                                disabled={isLoading}
                                className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl bg-violet-600 font-semibold transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Start Learning
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        )}

                    </div>
                )}

            </div>
        </main>
    );
}