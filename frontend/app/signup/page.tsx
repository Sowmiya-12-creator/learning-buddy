import AuthLayout from "@/components/auth/auth-layout";
import Link from "next/link";

export default function SignupPage() {
    return (
        <AuthLayout>
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <h1 className="text-center text-3xl font-bold text-white">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-gray-300">
                    Join Learning Buddy and start learning smarter.
                </p>

                <form className="mt-8 space-y-5">

                    <div>
                        <label className="mb-2 block text-white">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500"
                        />
                    </div>

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
                            placeholder="Create password"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-white">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700"
                    >
                        Create Account
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-300">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-violet-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </AuthLayout>
    );
}