import api from "./api";

export interface Profile {
    name: string;
    email: string;
    learning_level: string;
    preferred_language: string;
    learning_goal: string;
    daily_study_time: number;
}

export const profileService = {

    // Get the logged-in user's profile
    async getProfile() {
        const response = await api.get("/users/profile");

        return response.data as Profile;
    },

    // Update the logged-in user's profile
    async updateProfile(profile: Omit<Profile, "email">) {
        const response = await api.put(
            "/users/profile",
            profile
        );

        return response.data;
    },

    // Delete the logged-in user's account
    async deleteProfile() {
        const response = await api.delete(
            "/users/profile"
        );

        return response.data;
    },

    // Delete account - kept as a separate method
    // in case the Profile page is already using deleteAccount()
    async deleteAccount() {
        const response = await api.delete(
            "/users/profile"
        );

        return response.data;
    },
};