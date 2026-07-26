"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import AuthLayout from "@/components/auth/auth-layout";
import { authService } from "@/services/auth.service";


export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");


        // Basic validation
        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }


        if (password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }


        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        try {
            setIsLoading(true);


            // Create the user in FastAPI / MongoDB
            const response = await authService.register({
                name: name.trim(),
                email: email.trim(),
                password,
            });


            // Current backend returns HTTP 200
            // when the email already exists.
            if (
                response.message ===
                "Email already registered"
            ) {
                setError("Email already registered.");
                return;
            }


            if (
                response.message !==
                "User registered successfully"
            ) {
                setError(
                    response.message ||
                    "Unable to create account."
                );
                return;
            }


            // Automatically login after successful registration.
            const loginResponse = await authService.login({
                email: email.trim(),
                password,
            });


            if (!loginResponse.access_token) {
                // Registration succeeded, but automatic
                // login did not. User can still login manually.
                router.push("/login");
                return;
            }


            // Verify JWT and store authenticated user.
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


            // New users should complete their
            // learner personalization next.
            router.push("/onboarding");

        } catch (error) {

            if (axios.isAxiosError(error)) {

                const detail =
                    error.response?.data?.detail;

                const message =
                    error.response?.data?.message;


                if (Array.isArray(detail)) {
                    setError(
                        detail[0]?.msg ||
                        "Please check the information you entered."
                    );

                } else if (typeof detail === "string") {
                    setError(detail);

                } else if (typeof message === "string") {
                    setError(message);

                } else if (!error.response) {
                    setError(
                        "Cannot connect to Learning Buddy server. Please make sure the backend is running."
                    );

                } else {
                    setError(
                        "Account creation failed. Please try again."
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
        <AuthLayout>
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <h1 className="text-center text-3xl font-bold text-white">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-gray-300">
                    Join Learning Buddy and start learning smarter.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-white"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Enter your full name"
                            autoComplete="name"
                            disabled={isLoading}
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>


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
                            placeholder="Create password"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-white"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
                        />
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
                            ? "Creating Account..."
                            : "Create Account"}
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