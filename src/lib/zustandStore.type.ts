export type User = {
	email: string;
	username: string;
	status: string;
	role: string[];
	profile?: {
		firstName?: string;
		lastName?: string;
		bio?: string;
		avatarUrl?: string;
		country?: string;
		city?: string;
	};
	phone?: string;
};

export type AuthStore = {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	checkAuth: () => Promise<void>;
	setLoading: (loading: boolean) => void;
	setUser: (user: User | null) => void;
	setAuthenticated: (authenticated: boolean) => void;
	getAvatarUrl: () => string;
};

export interface PlanFeatures {
	name: string;
	price: number;
	features: string[];
}

export interface PlanStore {
	selectedPlan: PlanFeatures | null;
	setSelectedPlan: (plan: PlanFeatures) => void;
	clearSelectedPlan: () => void;
}
