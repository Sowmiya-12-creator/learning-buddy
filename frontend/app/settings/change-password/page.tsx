"use client";

import { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        setMessage("");
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        try {
            setIsLoading(true);

            const token = localStorage.getItem("lb_token");

            if (!token) {
                setError("You are not logged in.");
                return;
            }

            const response = await fetch(
                "http://127.0.0.1:8000/users/change-password",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        current_password: currentPassword,
                        new_password: newPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.detail ||
                        data.message ||
                        "Failed to change password."
                );
                return;
            }

            if (data.message === "Current password is incorrect") {
                setError(data.message);
                return;
            }

            setMessage("Password changed successfully!");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Change password error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to change password."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#071B3B] text-white">
            <div className="mx-auto max-w-2xl px-6 py-6">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold">
                            Change Password
                        </h1>

                        <p className="text-sm text-gray-400">
                            Keep your account secure
                        </p>
                    </div>
                </div>

                {/* Main Card */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">

                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20">
                        <Lock className="h-7 w-7 text-violet-400" />
                    </div>

                    <h2 className="text-xl font-semibold">
                        Update your password
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Enter your current password and choose a new password
                        for your account.
                    </p>

                    <div className="mt-6 space-y-5">

                        {/* Current Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Current Password
                            </label>

                            <PasswordInput
                                value={currentPassword}
                                setValue={setCurrentPassword}
                                placeholder="Enter current password"
                                showPassword={showCurrent}
                                setShowPassword={setShowCurrent}
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                New Password
                            </label>

                            <PasswordInput
                                value={newPassword}
                                setValue={setNewPassword}
                                placeholder="Enter new password"
                                showPassword={showNew}
                                setShowPassword={setShowNew}
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-300">
                                Confirm New Password
                            </label>

                            <PasswordInput
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                placeholder="Confirm new password"
                                showPassword={showConfirm}
                                setShowPassword={setShowConfirm}
                            />
                        </div>

                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {message && (
                        <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {message}
                        </div>
                    )}

                    {/* Change Password Button */}
                    <button
                        type="button"
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading
                            ? "Updating..."
                            : "Change Password"}
                    </button>

                </div>
            </div>
        </main>
    );
}


/* ============================================================
   Password Input
   ============================================================ */

function PasswordInput({
    value,
    setValue,
    placeholder,
    showPassword,
    setShowPassword,
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
}) {
    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white outline-none placeholder:text-gray-500 focus:border-violet-500"
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
                {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                ) : (
                    <Eye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
}