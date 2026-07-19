import api from "./api";
import { ApiResponse, LoginCredentials, RegisterCredentials, User } from "@/types";

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>("/auth/login", credentials);
    return data.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post<ApiResponse<AuthResponse>>("/auth/register", credentials);
    return data.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/forgot-password", { email });
    return data.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const { data } = await api.post<ApiResponse<{ message: string }>>("/auth/reset-password", { token, password });
    return data.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const { data } = await api.get<ApiResponse<User>>("/auth/me");
    return data.data;
  },
};
