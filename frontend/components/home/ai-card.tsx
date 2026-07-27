"use client";

import {
    FormEvent,
    useState,
} from "react";

import {
    ArrowRight,
    Sparkles,
} from "lucide-react";

import { useRouter } from "next/navigation";


export default function AICard() {

    const router = useRouter();

    const [question, setQuestion] =
        useState("");


    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const trimmedQuestion =
            question.trim();

        if (!trimmedQuestion) {
            return;
        }

        router.push(
            `/ai-tutor?question=${encodeURIComponent(
                trimmedQuestion
            )}`
        );
    };


    return (

        <section className="mx-6 mt-8 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 shadow-xl">

            <div className="flex items-center gap-3">

                <div className="rounded-full bg-white/20 p-3">

                    <Sparkles className="h-6 w-6 text-white" />

                </div>


                <div>

                    <h2 className="text-xl font-bold text-white">
                        Learning Buddy
                    </h2>

                    <p className="text-white/80">
                        What would you like to learn today?
                    </p>

                </div>

            </div>


            <form
                onSubmit={handleSubmit}
                className="mt-5"
            >

                <input
                    type="text"
                    value={question}
                    onChange={(event) =>
                        setQuestion(
                            event.target.value
                        )
                    }
                    placeholder="Ask Learning Buddy anything..."
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/70 focus:border-white/40"
                />


                <button
                    type="submit"
                    disabled={!question.trim()}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-violet-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    Ask AI

                    <ArrowRight className="h-4 w-4" />

                </button>

            </form>

        </section>
    );
}