import AuthLayout from "@/components/auth/auth-layout";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <AuthLayout>

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

                <h1 className="text-center text-3xl font-bold text-white">
                    Forgot your password?
                </h1>

                <p className="mt-3 text-center text-gray-300">
                    Enter your registered email and we will send you an OTP to reset your password.
                </p>


                <form className="mt-8 space-y-5">

                    <div>

                        <label className="mb-2 block text-sm text-white">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="
                            w-full
                            rounded-xl
                            border
                            border-white/20
                            bg-white/10
                            px-4
                            py-3
                            text-white
                            placeholder:text-gray-400
                            outline-none
                            focus:border-violet-500
                            focus:ring-2
                            focus:ring-violet-500/30
                            "
                        />

                    </div>


                    <button
                        type="submit"
                        className="
                        w-full
                        rounded-xl
                        bg-violet-600
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-violet-700
                        "
                    >
                        Send OTP
                    </button>

                </form>


                <p className="mt-6 text-center text-gray-300">

                    Remember your password?{" "}

                    <Link
                        href="/login"
                        className="
                        font-semibold
                        text-violet-400
                        hover:underline
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </AuthLayout>
    );
}