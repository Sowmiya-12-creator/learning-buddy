import api from "./api";


// ─────────────────────────────────────────────
// Request Types
// ─────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
}


export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}


// ─────────────────────────────────────────────
// Backend Response Types
// ─────────────────────────────────────────────

export interface LoginResponse {
  message: string;
  access_token: string;
}


export interface RegisterResponse {
  message: string;
  id?: string;
}


export interface CurrentUser {
  email: string;
  name?: string;
  learning_level?: string;
  preferred_language?: string;
  learning_goal?: string;
}


export interface CurrentUserResponse {
  message: string;
  user: CurrentUser;
}


export interface UserProfile {
  name: string;
  email: string;
}


export interface MessageResponse {
  message: string;
}


// ─────────────────────────────────────────────
// Authentication Service
// ─────────────────────────────────────────────

export const authService = {

  // Login user and store JWT token
  login: async (
    credentials: LoginCredentials
  ): Promise<LoginResponse> => {

    const { data } = await api.post<LoginResponse>(
      "/users/login",
      credentials
    );

    if (data.access_token) {
      localStorage.setItem(
        "lb_token",
        data.access_token
      );
    }

    return data;
  },


  // Register new user
  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {

    const { data } = await api.post<RegisterResponse>(
      "/users/register",
      credentials
    );

    return data;
  },


  // Get currently authenticated user
  getMe: async (): Promise<CurrentUserResponse> => {

    const { data } = await api.get<CurrentUserResponse>(
      "/users/me"
    );

    return data;
  },


  // Get basic user profile
  getProfile: async (): Promise<UserProfile> => {

    const { data } = await api.get<UserProfile>(
      "/users/profile"
    );

    return data;
  },


  // Update user's name
  updateProfile: async (
    name: string
  ): Promise<MessageResponse> => {

    const { data } = await api.put<MessageResponse>(
      "/users/profile",
      {
        name,
      }
    );

    return data;
  },


  // Delete user account
  deleteAccount: async (): Promise<MessageResponse> => {

    const { data } = await api.delete<MessageResponse>(
      "/users/profile"
    );

    return data;
  },


  // Logout is currently handled on the frontend.
  // Your backend does not need a logout endpoint
  // because JWT authentication is stateless.
  logout: (): void => {

    if (typeof window !== "undefined") {
      localStorage.removeItem("lb_token");
      localStorage.removeItem("lb_user");
    }
  },
};


export default authService;