export default function Logo() {
    return (
        <div className="text-center">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-[0_0_40px_rgba(124,58,237,0.5)]">
                <span className="text-5xl">🤖</span>
            </div>

            <h1 className="text-4xl font-extrabold text-white">
                Learning <span className="text-violet-400">Buddy</span>
            </h1>
        </div>
    );
}