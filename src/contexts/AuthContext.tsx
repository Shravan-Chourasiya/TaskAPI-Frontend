import { createContext, useContext } from "react";
import type { AuthStore } from "@/lib/zustandStore.type";

export const AuthContext = createContext<AuthStore | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
