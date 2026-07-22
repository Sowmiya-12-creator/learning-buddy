"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/auth-layout";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!password || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }


        if (password.length < 8) {
            setError("Password must contain at least 8 characters");
            return;
        }


        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }


        setSuccess("Password reset successfully!");

    };



    return (
        <AuthLayout>

            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">


                <h1 className="text-center text-3xl font-bold text-white">
                    Create New Password
                </h1>


                <p className="mt-3 text-center text-gray-300">
                    Create a strong password to secure your account.
                </p>



                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >


                    {/* New Password */}

                    <div>

                        <label className="mb-2 block text-sm text-white">
                            New Password
                        </label>


                        <div className="relative">

                            <input

                                type={showPassword ? "text" : "password"}

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                                placeholder="Enter new password"

                                className="
                                w-full
                                rounded-xl
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                py-3
                                pr-12
                                text-white
                                placeholder:text-gray-400
                                outline-none
                                focus:border-violet-500
                                "

                            />


                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-gray-400"
                            >

                                {
                                    showPassword
                                        ? <EyeOff size={22} />
                                        : <Eye size={22} />
                                }

                            </button>

                        </div>


                        {
                            password && password.length < 8 &&
                            <p className="mt-2 text-sm text-red-400">
                                Password must be 8+ characters
                            </p>
                        }


                    </div>





                    {/* Confirm Password */}

                    <div>

                        <label className="mb-2 block text-sm text-white">
                            Confirm Password
                        </label>


                        <div className="relative">


                            <input

                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }

                                value={confirmPassword}

                                onChange={
                                    (e) => setConfirmPassword(e.target.value)
                                }

                                placeholder="Confirm password"

                                className="
                                w-full
                                rounded-xl
                                border
                                border-white/20
                                bg-white/10
                                px-4
                                py-3
                                pr-12
                                text-white
                                placeholder:text-gray-400
                                outline-none
                                focus:border-violet-500
                                "

                            />


                            <button

                                type="button"

                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }

                                className="absolute right-4 top-3 text-gray-400"

                            >

                                {
                                    showConfirmPassword
                                        ? <EyeOff size={22} />
                                        : <Eye size={22} />
                                }


                            </button>


                        </div>


                    </div>





                    {/* Error Message */}

                    {
                        error &&

                        <p className="text-center text-sm text-red-400">
                            {error}
                        </p>

                    }





                    {/* Success Message */}

                    {
                        success &&

                        <p className="text-center text-sm text-green-400">
                            {success}
                        </p>

                    }





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
                        Reset Password

                    </button>



                </form>




                <p className="mt-6 text-center text-gray-300">

                    Remember your password?{" "}

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