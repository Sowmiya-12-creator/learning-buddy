import AppLayout from "@/components/layout/app-layout";
import Welcome from "@/components/home/welcome";
import AICard from "@/components/home/ai-card";
import Stats from "@/components/home/stats";
import QuickActions from "@/components/home/quick-actions";

export default function HomePage() {
    return (
        <AppLayout>
            <Welcome />
            <AICard />
            <Stats />
            <QuickActions />
        </AppLayout>
    );
}