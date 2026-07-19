import AppLayout from "@/components/layout/app-layout";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

export default function FlashcardsPage() {
    return (
        <AppLayout>
            <h1 className="mb-6 text-3xl font-bold">
                📚 Flashcards
            </h1>

            <p className="mb-8 text-gray-300">
                Review concepts with interactive flashcards.
            </p>

            <div className="mx-auto max-w-xl">

                <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-center shadow-xl">

                    <BookOpen className="mx-auto mb-6 h-12 w-12" />

                    <p className="text-sm uppercase tracking-widest text-white/70">
                        Question
                    </p>

                    <h2 className="mt-4 text-3xl font-bold">
                        What is React?
                    </h2>

                    <button className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700">
                        Flip Card
                    </button>

                </div>

                <div className="mt-8 flex items-center justify-between">

                    <button className="rounded-xl bg-white/10 p-3 hover:bg-white/20">
                        <ChevronLeft />
                    </button>

                    <span className="text-gray-300">
                        Card 1 of 20
                    </span>

                    <button className="rounded-xl bg-white/10 p-3 hover:bg-white/20">
                        <ChevronRight />
                    </button>

                </div>

            </div>
        </AppLayout>
    );
}