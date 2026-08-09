"use client";

import { useEffect, useState } from "react";
import { profileService } from "@/services/profile.service";

export default function Welcome() {
    const [name, setName] = useState("Student");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await profileService.getProfile();

                if (profile?.name) {
                    setName(profile.name);
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            }
        };

        loadProfile();
    }, []);

    return (
        <section className="px-6">
            <h2 className="text-4xl font-bold text-white">
                Hi, {name} 👋
            </h2>

            <p className="mt-2 text-gray-300">
                Ready to continue your learning today?
            </p>
        </section>
    );
}