import { create } from "zustand";

type User = {
	email: string;
	username: string;
	status: string;
	role: string[];
};

type AuthStore = {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
	login: (user: User) => void;
	logout: () => void;
	refreshUser: (user: User) => void;
	setLoading: (loading: boolean) => void;
	setAuthenticated: (authenticated: boolean) => void;
};

const authStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	user: null,
	isLoading: false,
	login: (user: User) => set({ isAuthenticated: true, user, isLoading: false }),
	logout: () => set({ isAuthenticated: false, user: null, isLoading: false }),
	refreshUser: (user: User) => set({ user }),
	setLoading: (loading: boolean) => set({ isLoading: loading }),
	setAuthenticated: (authenticated: boolean) =>
		set({ isAuthenticated: authenticated }),
}));

export default authStore;
