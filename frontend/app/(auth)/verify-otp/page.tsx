import AuthLayout from "@/components/auth/auth-layout";
import Link from "next/link";

export default function VerifyOtpPage() {
    return (
        <AuthLayout>

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

                <h1 className="text-center text-3xl font-bold text-white">
                    Verify OTP
                </h1>

                <p className="mt-3 text-center text-gray-300">
                    Enter the 6-digit verification code sent to your email.
                </p>


                <form className="mt-8 space-y-6">


                    <div className="flex justify-between gap-3">

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
                        />

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
                        />

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
                        />

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
                        />

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
                        />

                        <input
                            type="text"
                            maxLength={1}
                            className="h-14 w-14 rounded-xl border border-white/20 bg-white/10 text-center text-2xl text-white outline-none focus:border-violet-500"
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
                        hover:bg-violet-700
                        transition
                        "
                    >
                        Verify OTP
                    </button>


                </form>


                <p className="mt-6 text-center text-gray-300">

                    Didn't receive code?{" "}

                    <button className="font-semibold text-violet-400 hover:underline">
                        Resend OTP
                    </button>

                </p>


                <p className="mt-4 text-center">

                    <Link
                        href="/forgot-password"
                        className="text-gray-300 hover:text-white"
                    >
                        ← Change Email
                    </Link>

                </p>


            </div>

        </AuthLayout>
    );
}