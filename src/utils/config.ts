import { getEnvVar, getEnvVarNum } from "./envHandler.js";

export const config = {
	PORT: getEnvVar("VITE_PORT"),
	SERVER_URL: getEnvVar("VITE_SERVER_URL"),
	OTP_RESEND_COOLDOWN_SECONDS: getEnvVarNum("VITE_OTP_RESEND_COOLDOWN_SECONDS"),
	OTP_DAILY_LIMIT: getEnvVarNum("VITE_OTP_DAILY_LIMIT"),
};
