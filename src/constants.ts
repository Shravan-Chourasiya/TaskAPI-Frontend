export const OTP_LENGTH = 6;
export const USE_IS_VERIFIED_USER_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
export const TIME_TO_WAIT_BEFORE_EXPIRY = 60 * 1000; // 1 minute in milliseconds
export const REFRESH_TIMEOUT_MS = 10_000;
export const TOKEN_ERROR_STATUSES = new Set([401, 403]);
export const TOAST_AUTO_CLOSE_DURATION = 4000; // 4 seconds