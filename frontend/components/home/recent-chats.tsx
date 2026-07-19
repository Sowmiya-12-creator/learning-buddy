export default function RecentChats() {
    const chats = [
        {
            title: "Explain React Hooks",
            time: "2 min ago",
        },
        {
            title: "DBMS Normalization",
            time: "10 min ago",
        },
        {
            title: "Java OOP Concepts",
            time: "Yesterday",
        },
    ];

    return (
        <section className="mx-6 mt-8">
            <h2 className="mb-4 text-xl font-bold text-white">
                Recent Chats
            </h2>

            <div className="space-y-3">
                {chats.map((chat) => (
                    <div
                        key={chat.title}
                        className="rounded-2xl bg-white/10 p-4"
                    >
                        <h3 className="font-semibold text-white">
                            {chat.title}
                        </h3>

                        <p className="text-sm text-gray-300">
                            {chat.time}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}