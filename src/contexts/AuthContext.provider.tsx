import React from "react";
import { authStore } from "@/lib/zustandStore";
import { AuthContext } from "@/contexts/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const store = authStore();

	return (
		<AuthContext.Provider value={store}>
			{children}
		</AuthContext.Provider>
	);
};
