"use client";

import Link from "next/link";

export default function LoginForm() {
    return (
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="text-center text-3xl font-bold text-white">
                Welcome Back 👋
            </h2>

            <p className="mt-2 text-center text-gray-300">
                Login to continue your learning journey
            </p>

            <form className="mt-8 space-y-5">

                <div>
                    <label className="mb-2 block text-white">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-white">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500"
                    />
                </div>

                <div className="text-right">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-violet-400 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                    Login
                </button>

            </form>

            <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-white/20"></div>

                <span className="mx-4 text-gray-400">
                    OR
                </span>

                <div className="h-px flex-1 bg-white/20"></div>
            </div>

            <button className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-white hover:bg-white/20">
                Continue with Google
            </button>

            <p className="mt-6 text-center text-gray-300">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-semibold text-violet-400"
                >
                    Create Account
                </Link>
            </p>

        </div>
    );
}