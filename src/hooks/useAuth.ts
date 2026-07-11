import {authStore} from "@/lib/zustandStore";

export const useAuth = () => {
	return authStore();
};
