"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { authService } from "@/services/auth.service";


export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");


        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }


        try {
            setIsLoading(true);

            const response = await authService.login({
                email: email.trim(),
                password,
            });


            // The current FastAPI backend returns HTTP 200
            // with a message when login credentials are incorrect.
            if (!response.access_token) {
                setError(
                    response.message ||
                    "Unable to login. Please check your details."
                );

                return;
            }


            // authService.login() already stores the JWT
            // in localStorage as "lb_token".
            //
            // Now verify that the token works by calling
            // the protected /users/me endpoint.
            const currentUserResponse =
                await authService.getMe();


            if (typeof window !== "undefined") {
                localStorage.setItem(
                    "lb_user",
                    JSON.stringify(
                        currentUserResponse.user
                    )
                );
            }


            // Authentication succeeded.
            router.push("/home");

        } catch (error) {

            if (axios.isAxiosError(error)) {

                const detail =
                    error.response?.data?.detail;

                const message =
                    error.response?.data?.message;


                if (typeof detail === "string") {
                    setError(detail);
                } else if (typeof message === "string") {
                    setError(message);
                } else if (!error.response) {
                    setError(
                        "Cannot connect to Learning Buddy server. Please make sure the backend is running."
                    );
                } else {
                    setError(
                        "Login failed. Please try again."
                    );
                }

            } else {
                setError(
                    "Something went wrong. Please try again."
                );
            }

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="text-center text-3xl font-bold text-white">
                Welcome Back 👋
            </h2>

            <p className="mt-2 text-center text-gray-300">
                Login to continue your learning journey
            </p>


            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
            >

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-white"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Enter your email"
                        autoComplete="email"
                        disabled={isLoading}
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>


                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-white"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
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


                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                        {error}
                    </div>
                )}


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading
                        ? "Logging in..."
                        : "Login"}
                </button>

            </form>


            <div className="my-6 flex items-center">
                <div className="h-px flex-1 bg-white/20" />

                <span className="mx-4 text-gray-400">
                    OR
                </span>

                <div className="h-px flex-1 bg-white/20" />
            </div>


            <button
                type="button"
                className="w-full rounded-xl border border-white/20 bg-white/10 py-3 text-white hover:bg-white/20"
            >
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