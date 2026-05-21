import { REFRESH_TIMEOUT_MS, TOKEN_ERROR_STATUSES } from "@/constants";
import { config } from "@/utils/config";
import authStore from "@/lib/zustandStore";
import axios from "axios";

declare module 'axios' {
	export interface AxiosRequestConfig {
		_retry?: boolean;
	}
}

export const apiInstance = axios.create({
	baseURL: config.SERVER_URL,
	withCredentials: true,
});

let tokenRefreshInProgress = false;
let failedQueue: Array<{
	resolve: () => void;
	reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown = null): void => {
	failedQueue.forEach((entry) =>
		error ? entry.reject(error) : entry.resolve(),
	);
	failedQueue = [];
};

const waitForRefresh = (): Promise<void> =>
	new Promise((resolve, reject) => {
		failedQueue.push({ resolve, reject });
	});

const refreshToken = (): Promise<void> => {
	let timeoutId: ReturnType<typeof setTimeout>;
	
	const refresh = apiInstance
		.post("/api/v1/auth/token/refresh")
		.then(() => {
			clearTimeout(timeoutId);
			return void 0;
		});

	const timeout = new Promise<never>((_, reject) => {
		timeoutId = setTimeout(
			() => reject(new Error("Token refresh timed out")),
			REFRESH_TIMEOUT_MS,
		);
	});

	return Promise.race([refresh, timeout]);
};

apiInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		
		if (!originalRequest) {
			return Promise.reject(error);
		}
		
		const status: number = error.response?.status;
		const isTokenError: boolean = error.response?.data?.tokenExpired === true;

		const shouldAttemptRefresh =
			TOKEN_ERROR_STATUSES.has(status) &&
			isTokenError &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("auth/token/refresh");

		if (!shouldAttemptRefresh) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		if (tokenRefreshInProgress) {
			try {
				await waitForRefresh();
				return apiInstance(originalRequest);
			} catch (err) {
				return Promise.reject(err);
			}
		}

		tokenRefreshInProgress = true;

		try {
			await refreshToken();
			processQueue();
			return apiInstance(originalRequest);
		} catch (refreshError) {
			processQueue(refreshError);
			
			// Update Zustand store to log user out (without redirect)
			authStore.getState().setAuthenticated(false);
			authStore.getState().setUser(null);
			
			return Promise.reject(refreshError);
		} finally {
			tokenRefreshInProgress = false;
		}
	},
);
