// src/utils/auth.js
import axios from "axios";
import { config } from "./config";

export const verifyAuth = async () => {
	try {
		const res = await axios.get(
			`${config.SERVER_URL}/api/v1/auth/account/info`,
			{
				withCredentials: true, // Cookie automatically jayegi
			},
		);
		return res.data.user; // Valid user hai
	} catch (error) {
        console.log(error);
		return null; // Invalid/expired token
	}
};
