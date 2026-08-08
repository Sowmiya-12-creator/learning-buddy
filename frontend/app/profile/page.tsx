"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/app-layout";
import ConfirmModal from "@/components/profile/ConfirmModal";
import {
  User,
  Mail,
  GraduationCap,
  Languages,
  Target,
  Clock,
  Pencil,
  Trash2,
  LogOut,
} from "lucide-react";

import {
  profileService,
  Profile,
} from "@/services/profile.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  

  const router = useRouter();

  const handleLogout = () => {
  setShowLogoutModal(false);

  localStorage.removeItem("token");

  router.push("/login");
};

const handleDeleteAccount = async () => {
  try {
    await profileService.deleteProfile();

    setShowDeleteModal(false);

    localStorage.removeItem("token");

    router.push("/login");
  } catch (error) {
    console.error("Failed to delete account:", error);
  }
};

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
    loadProfile();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="text-xl font-semibold">
            Loading Profile...
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          Unable to load profile.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="mx-auto mt-10 mb-28 max-w-6xl p-6">

        {/* Header */}

        <div className="rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-700 to-purple-700 py-14 px-10 shadow-xl">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl font-bold text-violet-700">

              {profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()}

            </div>

           <h1 className="mt-5 text-4xl font-bold text-white">

              {profile.name}

            </h1>

            <p className="mt-2 flex items-center gap-2 text-white/90">
    <GraduationCap className="h-6 w-6" />
    {profile.learning_level} Student
</p>

          </div>

        </div>
                {/* Personal & Learning Details */}

        <div className="mt-8 rounded-3xl bg-white/10 p-8 backdrop-blur-lg">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-2xl font-bold">

             Student Information

            </h2>

          </div>

          <div className="grid gap-8 md:grid-cols-2">

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5 transition hover:bg-white/10">

              <User className="text-violet-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Name

                </p>

                <p className="font-semibold">

                  {profile.name}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">

              <Mail className="text-blue-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Email

                </p>

                <p className="font-semibold break-all">

                  {profile.email}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">

              <GraduationCap className="text-green-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Class

                </p>

                <p className="font-semibold">

                  {profile.learning_level}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">

              <Languages className="text-yellow-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Preferred Language

                </p>

                <p className="font-semibold">

                  {profile.preferred_language}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">

              <Target className="text-pink-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Learning Goal

                </p>

                <p className="font-semibold">

                  {profile.learning_goal}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-5">

              <Clock className="text-orange-400" />

              <div>

                <p className="text-sm text-gray-400">

                  Daily Study Time

                </p>

                <p className="font-semibold">

                  {profile.daily_study_time} Minutes

                </p>

              </div>

            </div>

          </div>

        </div>
                {/* Settings & Account */}

        <div className="mt-8 rounded-[32px] bg-white/10 p-8 backdrop-blur-lg">

          <h2 className="mb-6 text-2xl font-bold">

            Account & Settings

          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <button
  onClick={() => router.push("/settings")}
  className="flex items-center justify-center gap-3 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-700"
>
  <Pencil className="h-6 w-6" />
  Edit Profile
</button>

            <button
  onClick={() => setShowLogoutModal(true)}
  className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold transition hover:bg-blue-700"
>

              <LogOut className="h-5 w-5" />

              Logout

            </button>

            <button
  onClick={() => setShowDeleteModal(true)}
  className="md:col-span-2 flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-6 py-4 font-semibold transition hover:bg-red-700"
>

              <Trash2 className="h-5 w-5" />

              Delete Account

            </button>

          </div>

        </div>

      </div>
{showLogoutModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

        <div className="w-full max-w-md rounded-3xl bg-[#1f1f2e] p-8 shadow-2xl">

            <h2 className="text-2xl font-bold text-white">

                Confirm Logout

            </h2>

            <p className="mt-4 text-gray-300">

                Are you sure you want to logout from Learning Buddy?

            </p>

            <div className="mt-8 flex justify-end gap-4">

                <button
                    onClick={() => setShowLogoutModal(false)}
                    className="rounded-xl bg-gray-600 px-5 py-2 hover:bg-gray-700"
                >
                    Cancel
                </button>

                <button
                    onClick={handleLogout}
                    className="rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-700"
                >
                    Logout
                </button>

            </div>

        </div>

    </div>
)}

<ConfirmModal
    open={showDeleteModal}
    title="Delete Account"
    message="Are you sure you want to delete your account? This action cannot be undone."
    confirmText="Delete Account"
    confirmColor="red"
    onClose={() => setShowDeleteModal(false)}
    onConfirm={handleDeleteAccount}
/>


<ConfirmModal
  open={showLogoutModal}
  title="Confirm Logout"
  message="Are you sure you want to logout from Learning Buddy?"
  confirmText="Logout"
  confirmColor="blue"
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>


    </AppLayout>
  );
}