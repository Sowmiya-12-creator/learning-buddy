import AppLayout from "@/components/layout/app-layout";
import { Clock } from "lucide-react";

export default function QuizPage() {
    return (
        <AppLayout>
            <h1 className="mb-6 text-3xl font-bold">
                🧠 AI Quiz
            </h1>

            <div className="mb-6 flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 w-fit">
                <Clock size={18} />
                <span>10:00</span>
            </div>

            <div className="rounded-3xl bg-white/10 p-8">

                <h2 className="text-2xl font-bold">
                    What is a Primary Key?
                </h2>

                <div className="mt-8 space-y-4">

                    {[
                        "Unique identifier",
                        "Foreign key",
                        "Duplicate value",
                        "Null value",
                    ].map((option) => (
                        <button
                            key={option}
                            className="w-full rounded-xl bg-white/10 p-4 text-left hover:bg-violet-600"
                        >
                            {option}
                        </button>
                    ))}

                </div>

                <button className="mt-8 w-full rounded-xl bg-violet-600 py-4 font-semibold">
                    Next Question
                </button>

            </div>
        </AppLayout>
    );
}