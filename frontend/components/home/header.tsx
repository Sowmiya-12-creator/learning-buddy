import { Bell } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-6">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Learning <span className="text-violet-400">Buddy</span>
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="rounded-full bg-white/10 p-3">
                    <Bell className="h-5 w-5 text-white" />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 font-bold text-white">
                    S
                </div>
            </div>
        </header>
    );
}