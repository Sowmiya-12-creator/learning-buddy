import AppLayout from "@/components/layout/app-layout";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";

export default function FocusPage() {
    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl">

                <h1 className="text-3xl font-bold">
                    ⏱️ Focus Timer
                </h1>

                <p className="mt-2 text-gray-300">
                    Stay focused using the Pomodoro Technique.
                </p>

                {/* Timer Card */}
                <div className="mt-10 rounded-3xl bg-white/10 p-10 text-center backdrop-blur-lg">

                    <Timer className="mx-auto h-12 w-12 text-violet-400" />

                    <h2 className="mt-6 text-7xl font-bold tracking-wider">
                        25:00
                    </h2>

                    <p className="mt-3 text-gray-300">
                        Focus Session
                    </p>

                    <div className="mt-10 flex justify-center gap-4">

                        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700">
                            <Play size={18} />
                            Start
                        </button>

                        <button className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold hover:bg-yellow-600">
                            <Pause size={18} />
                            Pause
                        </button>

                        <button className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700">
                            <RotateCcw size={18} />
                            Reset
                        </button>

                    </div>

                </div>

                {/* Session Stats */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    <div className="rounded-2xl bg-white/10 p-6 text-center">
                        <h3 className="text-lg text-gray-300">Sessions Today</h3>
                        <p className="mt-2 text-3xl font-bold">4</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-6 text-center">
                        <h3 className="text-lg text-gray-300">Focus Time</h3>
                        <p className="mt-2 text-3xl font-bold">2h 15m</p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-6 text-center">
                        <h3 className="text-lg text-gray-300">Longest Session</h3>
                        <p className="mt-2 text-3xl font-bold">50 min</p>
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}