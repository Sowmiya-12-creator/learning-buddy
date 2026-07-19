"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, LoginCredentials, RegisterCredentials } from "@/types";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("lb_user");
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        const { user: loggedInUser, token } = await authService.login(credentials);
        localStorage.setItem("lb_token", token);
        localStorage.setItem("lb_user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        toast.success(`Welcome back, ${loggedInUser.name}! 🎉`);
        router.push("/home");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Login failed. Please try again.";
        toast.error(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setIsLoading(true);
      try {
        const { user: newUser, token } = await authService.register(credentials);
        localStorage.setItem("lb_token", token);
        localStorage.setItem("lb_user", JSON.stringify(newUser));
        setUser(newUser);
        toast.success("Account created! Let's get you set up. 🚀");
        router.push("/onboarding");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Registration failed. Please try again.";
        toast.error(message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // silently ignore
    } finally {
      localStorage.removeItem("lb_token");
      localStorage.removeItem("lb_user");
      setUser(null);
      router.push("/login");
      toast.success("You've been logged out.");
    }
  }, [router]);

  const isAuthenticated = !!user;

  return { user, isLoading, isAuthenticated, login, register, logout };
}
