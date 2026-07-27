"use client";

import AppLayout from "@/components/layout/app-layout";

import {
    Brain,
    CheckCircle2,
    Clock,
    Loader2,
    RotateCcw,
    Sparkles,
    Trophy,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import quizService, {
    QuizAnswer,
    QuizDifficulty,
    QuizQuestion,
    QuizSubmitResponse,
} from "@/services/quiz.service";


export default function QuizPage() {

    // ========================================================
    // Quiz Setup
    // ========================================================

    const [topic, setTopic] =
        useState("");

    const [numberOfQuestions, setNumberOfQuestions] =
        useState(5);

    const [difficulty, setDifficulty] =
        useState<QuizDifficulty>("easy");


    // ========================================================
    // Quiz State
    // ========================================================

    const [questions, setQuestions] =
        useState<QuizQuestion[]>([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [selectedAnswers, setSelectedAnswers] =
        useState<Record<number, string>>({});


    // ========================================================
    // Timer
    // ========================================================

    const [timeLeft, setTimeLeft] =
        useState(0);


    // ========================================================
    // Request State
    // ========================================================

    const [isGenerating, setIsGenerating] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");


    // ========================================================
    // Result
    // ========================================================

    const [result, setResult] =
        useState<QuizSubmitResponse | null>(
            null
        );


    // ========================================================
    // Timer Logic
    // ========================================================

    useEffect(() => {

        if (
            questions.length === 0 ||
            result ||
            timeLeft <= 0
        ) {
            return;
        }

        const timer = window.setInterval(
            () => {

                setTimeLeft(
                    (current) =>
                        current > 0
                            ? current - 1
                            : 0
                );

            },
            1000
        );

        return () =>
            window.clearInterval(timer);

    }, [
        questions.length,
        result,
        timeLeft,
    ]);


    // ========================================================
    // Generate Quiz
    // ========================================================

    const handleGenerate = async () => {

        const cleanTopic =
            topic.trim();

        if (!cleanTopic) {

            setError(
                "Please enter a quiz topic."
            );

            return;
        }

        try {

            setIsGenerating(true);
            setError("");
            setResult(null);

            const response =
                await quizService.generate(
                    cleanTopic,
                    numberOfQuestions,
                    difficulty
                );

            if (
                !response.quiz ||
                response.quiz.length === 0
            ) {

                setError(
                    "No quiz questions were generated."
                );

                return;
            }

            setQuestions(
                response.quiz
            );

            setCurrentIndex(0);

            setSelectedAnswers({});

            // 2 minutes per question
            setTimeLeft(
                response.quiz.length * 120
            );

        } catch (err) {

            console.error(
                "Quiz generation failed:",
                err
            );

            setError(
                "Unable to generate quiz. Please try again."
            );

        } finally {

            setIsGenerating(false);
        }
    };


    // ========================================================
    // Select Answer
    // ========================================================

    const handleSelectAnswer = (
        answer: string
    ) => {

        setSelectedAnswers(
            (current) => ({
                ...current,
                [currentIndex]: answer,
            })
        );
    };


    // ========================================================
    // Submit Quiz
    // ========================================================

    const handleSubmit = async () => {

        if (questions.length === 0) {
            return;
        }

        const unanswered =
            questions.some(
                (_, index) =>
                    !selectedAnswers[index]
            );

        if (unanswered) {

            setError(
                "Please answer all questions before submitting."
            );

            return;
        }

        const answers: QuizAnswer[] =
            questions.map(
                (question, index) => ({
                    question:
                        question.question,

                    selected_answer:
                        selectedAnswers[index],

                    correct_answer:
                        question.answer,
                })
            );

        try {

            setIsSubmitting(true);
            setError("");

            const response =
                await quizService.submit(
                    topic.trim(),
                    difficulty,
                    answers
                );

            setResult(response);

        } catch (err) {

            console.error(
                "Quiz submission failed:",
                err
            );

            setError(
                "Unable to submit quiz. Please try again."
            );

        } finally {

            setIsSubmitting(false);
        }
    };


    // ========================================================
    // Navigation
    // ========================================================

    const handleNext = () => {

        if (
            currentIndex <
            questions.length - 1
        ) {

            setCurrentIndex(
                (current) =>
                    current + 1
            );

            setError("");

        } else {

            handleSubmit();
        }
    };


    const handlePrevious = () => {

        if (currentIndex > 0) {

            setCurrentIndex(
                (current) =>
                    current - 1
            );

            setError("");
        }
    };


    // ========================================================
    // Restart
    // ========================================================

    const handleRestart = () => {

        setQuestions([]);
        setSelectedAnswers({});
        setCurrentIndex(0);
        setResult(null);
        setTimeLeft(0);
        setError("");
    };


    // ========================================================
    // Format Timer
    // ========================================================

    const formatTime = (
        seconds: number
    ) => {

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remainingSeconds =
            seconds % 60;

        return `${String(
            minutes
        ).padStart(
            2,
            "0"
        )}:${String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        )}`;
    };


    const currentQuestion =
        questions[currentIndex];


    return (

        <AppLayout>

            {/* =================================================
                Header
            ================================================= */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    🧠 AI Quiz
                </h1>

                <p className="mt-2 text-gray-300">
                    Test your knowledge with
                    personalized AI-generated quizzes.
                </p>

            </div>


            {/* =================================================
                Quiz Setup
            ================================================= */}

            {questions.length === 0 &&
                !result && (

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                    <div className="grid gap-5 lg:grid-cols-3">

                        {/* Topic */}

                        <div>

                            <label
                                htmlFor="quiz-topic"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Topic
                            </label>

                            <input
                                id="quiz-topic"
                                type="text"
                                value={topic}
                                onChange={(event) =>
                                    setTopic(
                                        event.target.value
                                    )
                                }
                                onKeyDown={(event) => {

                                    if (
                                        event.key ===
                                        "Enter"
                                    ) {
                                        handleGenerate();
                                    }
                                }}
                                placeholder="Example: Java OOP"
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500"
                            />

                        </div>


                        {/* Number of Questions */}

                        <div>

                            <label
                                htmlFor="question-count"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Questions
                            </label>

                            <select
                                id="question-count"
                                value={
                                    numberOfQuestions
                                }
                                onChange={(event) =>
                                    setNumberOfQuestions(
                                        Number(
                                            event.target.value
                                        )
                                    )
                                }
                                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                            >

                                {[5, 10, 15, 20].map(
                                    (count) => (

                                        <option
                                            key={count}
                                            value={count}
                                        >
                                            {count}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* Difficulty */}

                        <div>

                            <label
                                htmlFor="difficulty"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Difficulty
                            </label>

                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(event) =>
                                    setDifficulty(
                                        event.target
                                            .value as QuizDifficulty
                                    )
                                }
                                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none focus:border-violet-500"
                            >

                                <option value="easy">
                                    Easy
                                </option>

                                <option value="medium">
                                    Medium
                                </option>

                                <option value="hard">
                                    Hard
                                </option>

                                <option value="mixed">
                                    Mixed
                                </option>

                            </select>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="mt-6 inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {isGenerating ? (

                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                Generating Quiz...
                            </>

                        ) : (

                            <>
                                <Sparkles className="mr-2 h-5 w-5" />

                                Generate Quiz
                            </>
                        )}

                    </button>


                    {error && (

                        <p className="mt-4 text-sm text-red-400">
                            {error}
                        </p>
                    )}


                    <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">

                        <Brain className="mx-auto mb-4 h-12 w-12 text-violet-400" />

                        <h2 className="text-xl font-semibold">
                            Ready for a challenge?
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Choose a topic, difficulty
                            and number of questions.
                        </p>

                    </div>

                </div>
            )}


            {/* =================================================
                Quiz Questions
            ================================================= */}

            {currentQuestion &&
                !result && (

                <div className="mx-auto max-w-3xl">

                    {/* Quiz Information */}

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex flex-wrap gap-2">

                            <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">

                                {topic}

                            </span>

                            <span className="rounded-full bg-white/5 px-4 py-2 text-sm capitalize text-gray-300">

                                {difficulty}

                            </span>

                        </div>


                        <div className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 font-medium">

                            <Clock size={18} />

                            <span>
                                {formatTime(
                                    timeLeft
                                )}
                            </span>

                        </div>

                    </div>


                    {/* Progress */}

                    <div className="mb-4 text-sm text-gray-400">

                        Question{" "}
                        {currentIndex + 1}{" "}
                        of{" "}
                        {questions.length}

                    </div>


                    <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">

                        <div
                            className="h-full bg-violet-600 transition-all duration-300"
                            style={{
                                width:
                                    `${
                                        (
                                            (
                                                currentIndex +
                                                1
                                            ) /
                                            questions.length
                                        ) *
                                        100
                                    }%`,
                            }}
                        />

                    </div>


                    {/* Question */}

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

                        <h2 className="text-2xl font-bold leading-9">

                            {
                                currentQuestion.question
                            }

                        </h2>


                        {/* Options */}

                        <div className="mt-8 space-y-4">

                            {currentQuestion.options.map(
                                (
                                    option,
                                    optionIndex
                                ) => {

                                    const selected =
                                        selectedAnswers[
                                            currentIndex
                                        ] ===
                                        option;

                                    return (

                                        <button
                                            key={`${option}-${optionIndex}`}
                                            type="button"
                                            onClick={() =>
                                                handleSelectAnswer(
                                                    option
                                                )
                                            }
                                            className={
                                                selected
                                                    ? "w-full rounded-xl border border-violet-400 bg-violet-600 p-4 text-left font-medium text-white transition"
                                                    : "w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left text-gray-200 transition hover:bg-white/10"
                                            }
                                        >

                                            <span className="mr-3 font-semibold text-violet-300">

                                                {String.fromCharCode(
                                                    65 +
                                                        optionIndex
                                                )}.

                                            </span>

                                            {option}

                                        </button>
                                    );
                                }
                            )}

                        </div>


                        {/* Error */}

                        {error && (

                            <p className="mt-5 text-sm text-red-400">
                                {error}
                            </p>
                        )}


                        {/* Navigation */}

                        <div className="mt-8 flex gap-3">

                            <button
                                type="button"
                                onClick={
                                    handlePrevious
                                }
                                disabled={
                                    currentIndex === 0
                                }
                                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-gray-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                            >

                                Previous

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleNext
                                }
                                disabled={
                                    isSubmitting
                                }
                                className="flex-1 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                            >

                                {isSubmitting ? (

                                    <span className="inline-flex items-center">

                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />

                                        Submitting...

                                    </span>

                                ) : currentIndex ===
                                  questions.length -
                                      1 ? (

                                    "Submit Quiz"

                                ) : (

                                    "Next Question"
                                )}

                            </button>

                        </div>

                    </div>

                </div>
            )}


            {/* =================================================
                Quiz Result
            ================================================= */}

            {result && (

                <div className="mx-auto max-w-2xl rounded-3xl border border-violet-400/20 bg-violet-500/5 p-8 text-center">

                    <Trophy className="mx-auto h-16 w-16 text-violet-300" />


                    <h2 className="mt-5 text-3xl font-bold">
                        Quiz Completed!
                    </h2>


                    <div className="mt-3 text-5xl font-bold text-violet-300">

                        {Math.round(
                            result.score_percentage
                        )}
                        %

                    </div>


                    <p className="mt-4 text-lg text-gray-300">

                        {result.message}

                    </p>


                    {/* Result Stats */}

                    <div className="mt-8 grid grid-cols-3 gap-3">

                        <div className="rounded-2xl bg-white/5 p-4">

                            <div className="text-2xl font-bold">
                                {
                                    result.total_questions
                                }
                            </div>

                            <div className="mt-1 text-xs text-gray-400">
                                Questions
                            </div>

                        </div>


                        <div className="rounded-2xl bg-white/5 p-4">

                            <div className="text-2xl font-bold text-green-400">

                                {
                                    result.correct_answers
                                }

                            </div>

                            <div className="mt-1 text-xs text-gray-400">
                                Correct
                            </div>

                        </div>


                        <div className="rounded-2xl bg-white/5 p-4">

                            <div className="text-2xl font-bold text-red-400">

                                {
                                    result.wrong_answers
                                }

                            </div>

                            <div className="mt-1 text-xs text-gray-400">
                                Wrong
                            </div>

                        </div>

                    </div>


                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">

                        <CheckCircle2 className="h-4 w-4" />

                        Your result has been evaluated
                        by Learning Buddy.

                    </div>


                    <button
                        type="button"
                        onClick={handleRestart}
                        className="mt-8 inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                    >

                        <RotateCcw className="mr-2 h-5 w-5" />

                        Take Another Quiz

                    </button>

                </div>
            )}

        </AppLayout>
    );
}