import AppLayout from "@/components/layout/app-layout";
import Welcome from "@/components/home/welcome";
import AICard from "@/components/home/ai-card";
import Stats from "@/components/home/stats";
import QuickActions from "@/components/home/quick-actions";
import RecentChats from "@/components/home/recent-chats";

export default function HomePage() {
    return (
        <AppLayout>
            <Welcome />
            <AICard />
            <Stats />
            <QuickActions />
            <RecentChats />
        </AppLayout>
    );
}