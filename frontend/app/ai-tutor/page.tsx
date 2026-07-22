import AppLayout from "@/components/layout/app-layout";
import { SendHorizontal } from "lucide-react";

export default function AITutorPage() {
    return (
        <AppLayout>
            <h1 className="mb-6 text-3xl font-bold">
                🤖 AI Tutor
            </h1>

            <div className="space-y-4">
                <div className="max-w-md rounded-2xl bg-white/10 p-4">
                    Hello! 👋 How can I help you today?
                </div>

                <div className="ml-auto max-w-md rounded-2xl bg-violet-600 p-4">
                    Explain React Hooks.
                </div>

                <div className="max-w-md rounded-2xl bg-white/10 p-4">
                    React Hooks are special functions that let you use state and lifecycle features in functional components.
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <input
                    placeholder="Ask anything..."
                    className="flex-1 rounded-2xl bg-white/10 px-4 py-3 outline-none"
                />

                <button className="rounded-2xl bg-violet-600 px-5">
                    <SendHorizontal />
                </button>
            </div>
        </AppLayout>
    );
}