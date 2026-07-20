import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/common/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Learning Buddy – AI Powered Learning",
    template: "%s | Learning Buddy",
  },
  description:
    "Learning Buddy is an AI-powered personalized learning platform that adapts to your style with smart flashcards, quizzes, and an AI tutor.",
  keywords: ["AI learning", "personalized education", "flashcards", "quiz", "study planner"],
  authors: [{ name: "Learning Buddy" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#071B3B] min-h-dvh`}>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                },
              }}
            />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}