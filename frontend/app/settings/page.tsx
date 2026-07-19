import AppLayout from "@/components/layout/app-layout";
import {
    Bell,
    Moon,
    Globe,
    Shield,
    Lock,
    LogOut,
    ChevronRight,
} from "lucide-react";

const settings = [
    {
        icon: <Bell size={22} />,
        title: "Notifications",
        subtitle: "Manage notification settings",
    },
    {
        icon: <Moon size={22} />,
        title: "Appearance",
        subtitle: "Light / Dark mode",
    },
    {
        icon: <Globe size={22} />,
        title: "Language",
        subtitle: "English",
    },
    {
        icon: <Shield size={22} />,
        title: "Privacy",
        subtitle: "Privacy & Security",
    },
    {
        icon: <Lock size={22} />,
        title: "Change Password",
        subtitle: "Update your password",
    },
];

export default function SettingsPage() {
    return (
        <AppLayout>
            <div className="mx-auto max-w-4xl">

                <h1 className="mb-8 text-3xl font-bold">
                    ⚙️ Settings
                </h1>

                <div className="space-y-5">

                    {settings.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center justify-between rounded-2xl bg-white/10 p-5 hover:bg-white/20 transition"
                        >
                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-violet-600 p-3">
                                    {item.icon}
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm text-gray-300">
                                        {item.subtitle}
                                    </p>
                                </div>

                            </div>

                            <ChevronRight />
                        </div>
                    ))}

                    <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 font-semibold hover:bg-red-700">
                        <LogOut />
                        Logout
                    </button>

                </div>

            </div>
        </AppLayout>
    );
}