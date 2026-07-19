import AppLayout from "@/components/layout/app-layout";
import {
    User,
    Mail,
    GraduationCap,
    Flame,
    Trophy,
    BookOpen,
} from "lucide-react";

export default function ProfilePage() {
    return (
        <AppLayout>
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 p-8">

                    <div className="flex flex-col items-center">

                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl font-bold text-violet-700">
                            S
                        </div>

                        <h1 className="mt-4 text-3xl font-bold">
                            Sharmila
                        </h1>

                        <p className="text-white/80">
                            Computer Science Student
                        </p>

                    </div>

                </div>

                {/* Profile Details */}
                <div className="mt-8 rounded-3xl bg-white/10 p-8">

                    <h2 className="mb-6 text-2xl font-bold">
                        Personal Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">
                            <User />
                            <span>Sharmila</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Mail />
                            <span>sharmila@example.com</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <GraduationCap />
                            <span>B.E Computer Science Engineering</span>
                        </div>

                    </div>

                </div>

                {/* Statistics */}
                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    <div className="rounded-2xl bg-white/10 p-6 text-center">

                        <Flame className="mx-auto text-orange-400" />

                        <h3 className="mt-3 text-lg">
                            Streak
                        </h3>

                        <p className="text-3xl font-bold">
                            15 Days
                        </p>

                    </div>

                    <div className="rounded-2xl bg-white/10 p-6 text-center">

                        <BookOpen className="mx-auto text-blue-400" />

                        <h3 className="mt-3 text-lg">
                            Lessons
                        </h3>

                        <p className="text-3xl font-bold">
                            120
                        </p>

                    </div>

                    <div className="rounded-2xl bg-white/10 p-6 text-center">

                        <Trophy className="mx-auto text-yellow-400" />

                        <h3 className="mt-3 text-lg">
                            XP
                        </h3>

                        <p className="text-3xl font-bold">
                            2500
                        </p>

                    </div>

                </div>

            </div>
        </AppLayout>
    );
}