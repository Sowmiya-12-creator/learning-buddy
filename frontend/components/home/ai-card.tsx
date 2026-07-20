import { Sparkles } from "lucide-react";

export default function AICard() {
    return (
        <section className="mx-6 mt-8 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 shadow-xl">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-3">
                    <Sparkles className="h-6 w-6 text-white" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white">
                        AI Personal Tutor
                    </h2>

                    <p className="text-white/80">
                        Ask anything and learn smarter.
                    </p>
                </div>
            </div>

            <input
                placeholder="Ask your question..."
                className="mt-5 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 outline-none"
            />

            <button className="mt-4 w-full rounded-2xl bg-white py-3 font-semibold text-violet-700 transition hover:bg-gray-100">
                Ask AI
            </button>
        </section>
    );
}