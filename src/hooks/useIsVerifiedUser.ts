import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../utils/config";
import {USE_IS_VERIFIED_USER_INTERVAL} from "../constants.js";
export function useIsVerifiedUser(): boolean {
	const [isUser, setIsUser] = useState<boolean>(true);

	useEffect(() => {
		const checkUser = async () => {
			try {
				const res = await axios.get(
					`${config.SERVER_URL}/api/v1/user/is-user`,
					{ withCredentials: true },
				);
				if (!res.data.isUser) {
					setIsUser(false);
					window.location.href = "/login";
				} else {
					setIsUser(true);
				}
			} catch (err) {
				console.error("Verification failed", err);
				setIsUser(false);
				window.location.href = "/login";
			}
		};

		// Run immediately on mount
		checkUser();

		// Run every 10 minutes
		const intervalId = setInterval(checkUser, USE_IS_VERIFIED_USER_INTERVAL);

		return () => clearInterval(intervalId);
	}, []);

	return isUser;
}
