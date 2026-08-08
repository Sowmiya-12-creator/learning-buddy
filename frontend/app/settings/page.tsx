"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/app-layout";
import ConfirmModal from "@/components/profile/ConfirmModal";
import { profileService, Profile } from "@/services/profile.service";
import {
  Shield,
  Lock,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react";

const settings = [
    {
        icon: <Shield className="h-5 w-5" />,
        title: "Privacy",
        subtitle: "Privacy & Security",
    },
    {
        icon: <Lock className="h-5 w-5" />,
        title: "Change Password",
        subtitle: "Update your password",
    },
];

export default function SettingsPage() {
  const [showProfileSuccess, setShowProfileSuccess] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
const router = useRouter();


const [showEditProfile, setShowEditProfile] = useState(false);
const [profile, setProfile] = useState<Profile | null>(null);
const [loadingProfile, setLoadingProfile] = useState(false);


const handleLogout = () => {
  setShowLogoutModal(false);
  localStorage.removeItem("token");
  router.push("/login");
};

  return (
        <AppLayout>
            <div className="mx-auto mt-10 mb-28 max-w-6xl p-6">

                <h1 className="mb-8 text-3xl font-bold">
                    ⚙️ Settings
                </h1>

                <div className="space-y-5">

                    <button
    onClick={async () => {
  setLoadingProfile(true);

  try {
    const data = await profileService.getProfile();
    setProfile(data);
    setShowEditProfile(true);
  } catch (error) {
    console.error("Failed to load profile:", error);
  } finally {
    setLoadingProfile(false);
  }
}}
    className="flex w-full items-center justify-between rounded-2xl bg-white/10 p-5 text-left transition hover:bg-white/20"
>
    <div className="flex items-center gap-4">

        <div className="rounded-xl bg-violet-600 p-3">
            <Pencil className="h-5 w-5" />
        </div>

        <div>
            <h2 className="font-semibold">
                Edit Profile
            </h2>

            <p className="text-sm text-gray-300">
                Update your personal information
            </p>
        </div>

    </div>

    <ChevronRight className="h-5 w-5" />
</button>

                    {settings.map((item) => (
    <div
        key={item.title}
        onClick={() => {
    if (item.title === "Privacy") {
        router.push("/settings/privacy");
    }

    if (item.title === "Change Password") {
        router.push("/settings/change-password");
    }
}}
        className="flex items-center justify-between rounded-2xl bg-white/10 p-5 transition hover:bg-white/20"
    >

        <div className="flex items-center gap-4">

            <div className="rounded-xl bg-violet-600 p-3">
                {item.icon}
            </div>

            <div>
                <h2 className="font-semibold">
                    {item.title}
                </h2>

               <p className="text-sm text-gray-300">
    {item.subtitle}
</p>
            </div>

        </div>

        <ChevronRight className="h-5 w-5" />

    </div>
))}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-4 font-semibold transition hover:bg-red-700"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>

                </div>
<ConfirmModal
  open={showLogoutModal}
  title="Confirm Logout"
  message="Are you sure you want to logout from Learning Buddy?"
  confirmText="Logout"
  confirmColor="blue"
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>


{showEditProfile && profile && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-2xl rounded-3xl bg-[#1f1f2e] p-8 shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-gray-300">
            Update your learning preferences
          </p>
        </div>

        <button
          onClick={() => setShowEditProfile(false)}
          className="rounded-xl bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Name
          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Learning Level */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Learning Level
          </label>

          <select
            value={profile.learning_level}
            onChange={(e) =>
              setProfile({
                ...profile,
                learning_level: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#2a2a3d] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="LKG">LKG</option>
<option value="UKG">UKG</option>
<option value="Class 1">Class 1</option>
<option value="Class 2">Class 2</option>
<option value="Class 3">Class 3</option>
<option value="Class 4">Class 4</option>
<option value="Class 5">Class 5</option>
<option value="Class 6">Class 6</option>
<option value="Class 7">Class 7</option>
<option value="Class 8">Class 8</option>
<option value="Class 9">Class 9</option>
<option value="Class 10">Class 10</option>
<option value="Class 11">Class 11</option>
<option value="Class 12">Class 12</option>
          </select>
        </div>

        {/* Preferred Language */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Preferred Language
          </label>

          <select
            value={profile.preferred_language}
            onChange={(e) =>
              setProfile({
                ...profile,
                preferred_language: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#2a2a3d] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* Learning Goal */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Learning Goal
          </label>

          <select
            value={profile.learning_goal}
            onChange={(e) =>
              setProfile({
                ...profile,
                learning_goal: e.target.value,
              })
            }
            className="w-full rounded-xl bg-[#2a2a3d] px-4 py-3 text-white outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="Understand Concepts">Understand Concepts</option>
<option value="Complete Homework">Complete Homework</option>
<option value="Prepare for Exams">Prepare for Exams</option>
<option value="Practice Questions">Practice Questions</option>
<option value="Improve Grades">Improve Grades</option>
<option value="Daily Learning">Daily Learning</option>
          </select>
        </div>

        {/* Daily Study Time */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Daily Study Time (minutes)
          </label>

          <input
            type="number"
            min="5"
            value={profile.daily_study_time}
            onChange={(e) =>
              setProfile({
                ...profile,
                daily_study_time: Number(e.target.value),
              })
            }
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-violet-500"
          />
        </div>

      </div>

      <div className="mt-8 flex gap-4">

        <button
          onClick={() => setShowEditProfile(false)}
          className="flex-1 rounded-xl bg-gray-600 py-3 font-semibold text-white transition hover:bg-gray-700"
        >
          Cancel
        </button>

      <button
 onClick={async () => {
    if (!profile) return;

    try {
        await profileService.updateProfile({
            name: profile.name,
            learning_level: profile.learning_level,
            preferred_language: profile.preferred_language,
            learning_goal: profile.learning_goal,
            daily_study_time: profile.daily_study_time,
        });

        setShowEditProfile(false);
        setShowProfileSuccess(true);

    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Failed to update profile. Please try again.");
    }
}}
  className="flex-1 rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
>
  Save Changes
</button>

      </div>

    </div>
  </div>
)}

            </div>
            {showProfileSuccess && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">

        <div className="w-full max-w-md rounded-3xl bg-[#1f2f4d] p-8 text-center shadow-2xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-3xl">
                ✓
            </div>

            <h2 className="text-2xl font-bold text-white">
                Profile Updated!
            </h2>

            <p className="mt-3 text-gray-300">
                Your profile has been updated successfully.
            </p>

            <button
                onClick={() => setShowProfileSuccess(false)}
                className="mt-7 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
                Done
            </button>

        </div>

    </div>
)}
        </AppLayout>
    );
}