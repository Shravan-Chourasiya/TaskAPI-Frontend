import { persist } from "zustand/middleware";
import { create } from "zustand";
import { apiInstance } from "./axiosInstance";
import { API_ENDPOINTS } from "@/constants";
import type { AuthStore, PlanStore, User } from "./zustandStore.type";

export const authStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	user: null,
	isLoading: true,

	login: async (email: string, password: string) => {
		set({ isLoading: true });
		try {
			const response = await apiInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
				email,
				password,
			});
			if (!response.data || !response.data.data) {
				throw new Error(
					"Invalid response from server. Failed to Login. Try again later",
				);
			}
			set({
				isAuthenticated: true,
				user: response.data.data,
				isLoading: false,
			});
		} catch (error) {
			console.error("Login failed:", error);
			set({ isAuthenticated: false, user: null, isLoading: false });
			throw new Error(
				"Login failed. Please check your credentials and try again.",
			);
		}
	},

	logout: async () => {
		set({ isLoading: true });
		try {
			const response = await apiInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
			if (response.status !== 200) {
				console.error("Logout failed with status:", response.status);
				throw new Error(`Logout failed with status: ${response.status}`);
			}
			console.log("Logout successful");
			set({ isAuthenticated: false, user: null, isLoading: false });
			window.location.href = "/";
		} catch (error) {
			console.error("Logout failed:", error);
			set({ isLoading: false });
			throw new Error("Logout failed. Please try again.");
		}
	},

	refreshUser: async () => {
		set({ isLoading: true });
		try {
			const response = await apiInstance.get(API_ENDPOINTS.USER.IS_USER);
			if (!response.data || !response.data.data) {
				throw new Error(
					"Invalid response from server. Failed to refresh user. Try again later",
				);
			}
			if (!response.data.data.isUser) {
				set({ isAuthenticated: false, user: null, isLoading: false });
				return;
			}
			set({ user: response.data.data.user, isLoading: false });
		} catch (error) {
			console.error("Failed to refresh user:", error);
			set({ isAuthenticated: false, user: null, isLoading: false });
		}
	},

	checkAuth: async () => {
		set({ isLoading: true });
		try {
			const response = await apiInstance.get(API_ENDPOINTS.USER.IS_USER);
			if (
				response.status === 200 &&
				response.data &&
				response.data.data &&
				response.data.data.isUser
			) {
				set({
					isAuthenticated: true,
					user: response.data.data.user,
					isLoading: false,
				});
			} else {
				set({ isAuthenticated: false, user: null, isLoading: false });
			}
		} catch {
			set({ isAuthenticated: false, user: null, isLoading: false });
		}
	},

	setLoading: (loading: boolean) => set({ isLoading: loading }),
	setAuthenticated: (authenticated: boolean) =>
		set({ isAuthenticated: authenticated }),
	setUser: (user: User | null) => set({ user }),
}));



export const usePlanStore = create<PlanStore>()(
	persist(
		(set) => ({
			selectedPlan: null,
			setSelectedPlan: (plan) => set({ selectedPlan: plan }),
			clearSelectedPlan: () => set({ selectedPlan: null }),
		}),
		{
			name: "plan-storage",
			version: 2, // bump to clear stale persisted plan data with old string prices
			migrate: () => ({ selectedPlan: null }),
		},
	),
);
