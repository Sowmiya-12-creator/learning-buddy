import AppLayout from "@/components/layout/app-layout";
import { Bell } from "lucide-react";

const notifications = [
    {
        title: "Quiz Completed",
        description: "You scored 9/10 in DBMS Quiz.",
    },
    {
        title: "Study Reminder",
        description: "React study session starts in 30 minutes.",
    },
    {
        title: "Daily Streak",
        description: "Awesome! You've maintained a 15-day streak.",
    },
];

export default function NotificationsPage() {
    return (
        <AppLayout>
            <h1 className="mb-8 text-3xl font-bold">
                🔔 Notifications
            </h1>

            <div className="space-y-5">

                {notifications.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-start gap-4 rounded-2xl bg-white/10 p-5"
                    >
                        <div className="rounded-xl bg-violet-600 p-3">
                            <Bell />
                        </div>

                        <div>
                            <h2 className="font-bold">
                                {item.title}
                            </h2>

                            <p className="mt-2 text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </AppLayout>
    );
}