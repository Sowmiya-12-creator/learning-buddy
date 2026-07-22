import AppLayout from "@/components/layout/app-layout";
import { Trophy, Flame, BookOpen, Clock } from "lucide-react";

export default function ProgressPage() {
    return (
        <AppLayout>
            <h1 className="text-3xl font-bold">📈 Learning Progress</h1>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div className="rounded-3xl bg-white/10 p-6">
                    <Flame className="text-orange-400" size={40} />
                    <h2 className="mt-4 text-xl font-bold">Current Streak</h2>
                    <p className="mt-2 text-5xl font-bold">15</p>
                    <p className="text-gray-300">Days</p>
                </div>

                <div className="rounded-3xl bg-white/10 p-6">
                    <BookOpen className="text-blue-400" size={40} />
                    <h2 className="mt-4 text-xl font-bold">Lessons Completed</h2>
                    <p className="mt-2 text-5xl font-bold">128</p>
                </div>

                <div className="rounded-3xl bg-white/10 p-6">
                    <Clock className="text-green-400" size={40} />
                    <h2 className="mt-4 text-xl font-bold">Study Hours</h2>
                    <p className="mt-2 text-5xl font-bold">84h</p>
                </div>

                <div className="rounded-3xl bg-white/10 p-6">
                    <Trophy className="text-yellow-400" size={40} />
                    <h2 className="mt-4 text-xl font-bold">XP Earned</h2>
                    <p className="mt-2 text-5xl font-bold">2450</p>
                </div>

            </div>

            <div className="mt-10 rounded-3xl bg-white/10 p-8">
                <h2 className="mb-5 text-2xl font-bold">
                    Weekly Progress
                </h2>

                <div className="space-y-4">

                    <div>
                        <p>DBMS</p>
                        <div className="h-3 rounded-full bg-gray-700">
                            <div className="h-3 w-[90%] rounded-full bg-violet-500"></div>
                        </div>
                    </div>

                    <div>
                        <p>React</p>
                        <div className="h-3 rounded-full bg-gray-700">
                            <div className="h-3 w-[70%] rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <div>
                        <p>Java</p>
                        <div className="h-3 rounded-full bg-gray-700">
                            <div className="h-3 w-[55%] rounded-full bg-orange-500"></div>
                        </div>
                    </div>

                </div>
            </div>

        </AppLayout>
    );
}