import { useEffect } from "react";
import axios from "axios";
import { TIME_TO_WAIT_BEFORE_EXPIRY } from "@/constants";

export function useSilentTokenRenew(
	accessToken: string,
	refreshToken: string,
): void {
	useEffect(() => {
		if (!accessToken) return;

		// Decode expiry (or store expiry when issued)
		const payload = JSON.parse(atob(accessToken.split(".")[1]));
		const expiry = payload.exp * 1000; // ms
		const now = Date.now();

		// Refresh 1 minute before expiry
		const delay = expiry - now - TIME_TO_WAIT_BEFORE_EXPIRY;

		const timer = setTimeout(async () => {
			try {
				const res = await axios.post("/auth/refresh", { refreshToken });
				localStorage.setItem("accessToken", res.data.accessToken);
				console.log("Access token refreshed silently");
			} catch (err) {
				console.error("Refresh failed", err);
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login"; // Redirect to login on failure
			}
		}, delay);

		return () => clearTimeout(timer);
	}, [accessToken, refreshToken]);
}
