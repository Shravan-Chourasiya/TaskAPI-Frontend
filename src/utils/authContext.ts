import { createContext } from "react";

export interface AuthContextType {
	// States
	isAuthenticated: boolean;
	isLoading: boolean;

	// User info
	user: {
		username: string;
		email: string;
		status?: string;
		role: string[];
	} | null;

	// Methods
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
