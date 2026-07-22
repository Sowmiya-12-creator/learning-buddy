function Card({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm text-gray-300">{title}</p>

            <h3 className="mt-2 text-2xl font-bold text-white">
                {value}
            </h3>
        </div>
    );
}

export default function Stats() {
    return (
        <section className="mx-6 mt-8 grid grid-cols-2 gap-4">
            <Card title="🔥 Streak" value="15 Days" />
            <Card title="📚 Study Time" value="3h 20m" />
        </section>
    );
}