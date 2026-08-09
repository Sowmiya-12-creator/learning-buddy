import { ReactNode } from "react";
import Header from "@/components/home/header";
import BottomNav from "@/components/home/bottom-nav";
import FocusTimerWatcher from "@/components/focus/FocusTimerWatcher";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-[#071B3B] text-white">
      <FocusTimerWatcher />

      <Header />

      <div className="mx-auto max-w-7xl px-6 py-6 pb-24">
        {children}
      </div>

      <BottomNav />
    </main>
  );
}