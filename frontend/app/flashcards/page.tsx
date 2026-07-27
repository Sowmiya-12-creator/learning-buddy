"use client";

import AppLayout from "@/components/layout/app-layout";

import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RotateCcw,
    Sparkles,
} from "lucide-react";

import {
    useState,
} from "react";

import flashcardService, {
    Flashcard,
} from "@/services/flashcard.service";


export default function FlashcardsPage() {

    // ========================================================
    // Form State
    // ========================================================

    const [topic, setTopic] =
        useState("");

    const [numberOfCards, setNumberOfCards] =
        useState(5);


    // ========================================================
    // Flashcard State
    // ========================================================

    const [flashcards, setFlashcards] =
        useState<Flashcard[]>([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [isFlipped, setIsFlipped] =
        useState(false);


    // ========================================================
    // Request State
    // ========================================================

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ========================================================
    // Generate Flashcards
    // ========================================================

    const handleGenerate = async () => {

        const cleanTopic = topic.trim();

        if (!cleanTopic) {
            setError(
                "Please enter a topic."
            );
            return;
        }

        if (
            numberOfCards < 1 ||
            numberOfCards > 20
        ) {
            setError(
                "Choose between 1 and 20 flashcards."
            );
            return;
        }

        try {

            setIsLoading(true);
            setError("");

            const response =
                await flashcardService.generate(
                    cleanTopic,
                    numberOfCards
                );

            setFlashcards(
                response.flashcards
            );

            setCurrentIndex(0);
            setIsFlipped(false);

        } catch (err) {

            console.error(
                "Flashcard generation failed:",
                err
            );

            setError(
                "Unable to generate flashcards. Please try again."
            );

        } finally {

            setIsLoading(false);
        }
    };


    // ========================================================
    // Navigation
    // ========================================================

    const handlePrevious = () => {

        if (currentIndex > 0) {

            setCurrentIndex(
                (current) => current - 1
            );

            setIsFlipped(false);
        }
    };


    const handleNext = () => {

        if (
            currentIndex <
            flashcards.length - 1
        ) {

            setCurrentIndex(
                (current) => current + 1
            );

            setIsFlipped(false);
        }
    };


    const handleRestart = () => {

        setCurrentIndex(0);
        setIsFlipped(false);
    };


    // ========================================================
    // Current Card
    // ========================================================

    const currentCard =
        flashcards[currentIndex];


    return (

        <AppLayout>

            {/* =================================================
                Header
            ================================================= */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    📚 Flashcards
                </h1>

                <p className="mt-2 text-gray-300">
                    Generate personalized flashcards
                    for any topic you want to revise.
                </p>

            </div>


            {/* =================================================
                Generator
            ================================================= */}

            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">

                <div className="grid gap-5 md:grid-cols-[1fr_180px]">

                    {/* Topic */}

                    <div>

                        <label
                            htmlFor="flashcard-topic"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Topic
                        </label>

                        <input
                            id="flashcard-topic"
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


                    {/* Number of Cards */}

                    <div>

                        <label
                            htmlFor="card-count"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Number of cards
                        </label>

                        <select
                            id="card-count"
                            value={numberOfCards}
                            onChange={(event) =>
                                setNumberOfCards(
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

                </div>


                {/* Generate Button */}

                <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="mt-5 inline-flex items-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {isLoading ? (

                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>

                    ) : (

                        <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate Flashcards
                        </>
                    )}

                </button>


                {/* Error */}

                {error && (

                    <p className="mt-4 text-sm text-red-400">
                        {error}
                    </p>
                )}

            </div>


            {/* =================================================
                Empty State
            ================================================= */}

            {flashcards.length === 0 &&
                !isLoading && (

                    <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-center">

                        <BookOpen className="mx-auto mb-5 h-12 w-12 text-violet-400" />

                        <h2 className="text-xl font-semibold">
                            Ready to revise?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            Enter a topic above and
                            Learning Buddy will create
                            personalized flashcards for you.
                        </p>

                    </div>
                )}


            {/* =================================================
                Flashcard
            ================================================= */}

            {currentCard && (

                <div className="mx-auto max-w-2xl">

                    {/* Topic */}

                    <div className="mb-4 text-center">

                        <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
                            {topic}
                        </span>

                    </div>


                    {/* Card */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsFlipped(
                                (current) => !current
                            )
                        }
                        className="block min-h-[320px] w-full rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-center shadow-xl transition hover:scale-[1.01]"
                    >

                        <BookOpen className="mx-auto mb-6 h-12 w-12 text-white" />


                        <p className="text-sm uppercase tracking-[0.2em] text-white/70">

                            {isFlipped
                                ? "Answer"
                                : "Question"}

                        </p>


                        <div className="flex min-h-[130px] items-center justify-center">

                            <h2
                                className={
                                    isFlipped
                                        ? "mt-4 text-xl font-medium leading-8 text-white"
                                        : "mt-4 text-2xl font-bold leading-9 text-white"
                                }
                            >

                                {isFlipped
                                    ? currentCard.back
                                    : currentCard.front}

                            </h2>

                        </div>


                        <div className="mt-6">

                            <span className="inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-violet-700">

                                {isFlipped
                                    ? "Show Question"
                                    : "Flip Card"}

                            </span>

                        </div>

                    </button>


                    {/* Navigation */}

                    <div className="mt-7 flex items-center justify-between">

                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={
                                currentIndex === 0
                            }
                            className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Previous flashcard"
                        >
                            <ChevronLeft />
                        </button>


                        <div className="text-center">

                            <div className="text-sm font-medium text-gray-300">

                                Card{" "}
                                {currentIndex + 1}{" "}
                                of{" "}
                                {flashcards.length}

                            </div>


                            <button
                                type="button"
                                onClick={handleRestart}
                                className="mt-2 inline-flex items-center text-xs text-gray-500 transition hover:text-violet-300"
                            >

                                <RotateCcw className="mr-1 h-3 w-3" />

                                Restart

                            </button>

                        </div>


                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                currentIndex ===
                                flashcards.length - 1
                            }
                            className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Next flashcard"
                        >
                            <ChevronRight />
                        </button>

                    </div>

                </div>
            )}

        </AppLayout>
    );
}