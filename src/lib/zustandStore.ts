import { create } from "zustand";
import type { AuthStore, PlanStore } from "@/lib/zustandStore.type";
import { apiInstance, setCsrfToken } from "@/lib/axiosInstance";
import { API_ENDPOINTS, DICEBEAR_AVATAR_API } from "@/constants";

export const authStore = create<AuthStore>((set, get) => ({
	isAuthenticated: false,
	isLoading: false,
	user: null,

	setLoading: (loading) => set({ isLoading: loading }),
	setUser: (user) => set({ user }),
	setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),

	getAvatarUrl: () => {
		const user = get().user;
		if (user?.profile?.avatarUrl) return user.profile.avatarUrl;
		const seed = user?.username ?? "default";
		return `${DICEBEAR_AVATAR_API}?seed=${seed}`;
	},

	login: async (email, password) => {
		set({ isLoading: true });
		const res = await apiInstance.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
		set({ isAuthenticated: true, user: res.data.data.user, isLoading: false });
	},

	logout: async () => {
		await apiInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
		setCsrfToken(null);
		set({ isAuthenticated: false, user: null });
	},

	refreshUser: async () => {
		const res = await apiInstance.get(API_ENDPOINTS.USER.IS_USER);
		set({ user: res.data.data.user });
	},

	checkAuth: async () => {
		set({ isLoading: true });
		try {
			const res = await apiInstance.get(API_ENDPOINTS.USER.IS_USER);
			set({ isAuthenticated: true, user: res.data.data.user });
		} catch {
			set({ isAuthenticated: false, user: null });
		} finally {
			set({ isLoading: false });
		}
	},
}));

export const planStore = create<PlanStore>((set) => ({
	selectedPlan: null,
	setSelectedPlan: (plan) => set({ selectedPlan: plan }),
	clearSelectedPlan: () => set({ selectedPlan: null }),
}));

// Alias used across the codebase
export const usePlanStore = planStore;

// Alias used across the codebase
export const usePlanStore = planStore;
