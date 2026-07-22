import Link from "next/link";

const actions = [
    { title: "AI Tutor", href: "/ai-tutor", emoji: "🤖" },
    { title: "Flashcards", href: "/flashcards", emoji: "📚" },
    { title: "Quiz", href: "/quiz", emoji: "🧠" },
    { title: "Focus", href: "/focus", emoji: "⏱️" },
];

export default function QuickActions() {
    return (
        <section className="mx-6 mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className="rounded-2xl bg-white/10 p-6 text-center transition hover:bg-white/20"
                    >
                        <div className="text-4xl">{item.emoji}</div>

                        <p className="mt-3 font-semibold text-white">
                            {item.title}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}