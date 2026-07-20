export default function Background() {
    return (
        <>
            {/* Main Background */}
            <div className="absolute inset-0 bg-[#071B3B]" />

            {/* Purple Glow */}
            <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

            {/* Blue Glow */}
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Floating Dots */}
            <div className="absolute left-10 top-24 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="absolute right-20 top-40 h-3 w-3 rounded-full bg-violet-500 animate-pulse" />
            <div className="absolute bottom-32 left-1/3 h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        </>
    );
}