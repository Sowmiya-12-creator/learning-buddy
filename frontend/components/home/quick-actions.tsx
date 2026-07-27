import Link from "next/link";


const actions = [
    {
        title: "Flashcards",
        description: "Revise concepts",
        href: "/flashcards",
        emoji: "📚",
    },
    {
        title: "Quiz",
        description: "Test yourself",
        href: "/quiz",
        emoji: "🧠",
    },
    {
        title: "Focus",
        description: "Start Pomodoro",
        href: "/focus",
        emoji: "⏱️",
    },
    {
        title: "Progress",
        description: "View performance",
        href: "/progress",
        emoji: "📈",
    },
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
                        className="rounded-2xl bg-white/10 p-6 transition hover:bg-white/20"
                    >

                        <div className="text-4xl">
                            {item.emoji}
                        </div>

                        <p className="mt-3 font-semibold text-white">
                            {item.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            {item.description}
                        </p>

                    </Link>

                ))}

            </div>

        </section>
    );
}