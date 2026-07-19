import { ReactNode } from "react";
import Background from "@/components/common/background";

interface Props {
    children: ReactNode;
}
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[#071B3B] flex items-center justify-center px-6">
            {children}
        </main>
    );
}
