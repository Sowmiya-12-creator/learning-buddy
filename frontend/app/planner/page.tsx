import AppLayout from "@/components/layout/app-layout";
import { Calendar, Clock, Plus } from "lucide-react";

export default function PlannerPage() {
    const tasks = [
        {
            subject: "DBMS",
            time: "09:00 - 10:00",
        },
        {
            subject: "React Development",
            time: "11:00 - 12:30",
        },
        {
            subject: "Operating Systems",
            time: "04:00 - 05:00",
        },
    ];

    return (
        <AppLayout>
            <h1 className="mb-8 text-3xl font-bold">
                📅 Study Planner
            </h1>

            <button className="mb-8 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3">
                <Plus />
                Add Study Session
            </button>

            <div className="space-y-5">

                {tasks.map((task) => (
                    <div
                        key={task.subject}
                        className="rounded-2xl bg-white/10 p-6"
                    >
                        <h2 className="text-xl font-bold">
                            {task.subject}
                        </h2>

                        <div className="mt-4 flex gap-6 text-gray-300">

                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                Today
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                {task.time}
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </AppLayout>
    );
}