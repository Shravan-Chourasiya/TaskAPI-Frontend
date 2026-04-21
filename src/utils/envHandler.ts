export function getEnvVar(name: string): string {
	const value = import.meta.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}
export function getEnvVarNum(name: string): number {
	const value = import.meta.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
}

export function getEnvVarArr(name: string): string[] {
	const value: string = import.meta.env[name] as string;
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value.split(",").map((origin) => origin.trim());
}

export function getCookieVar(name: string): object {
	const value = import.meta.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	try {
		const val = JSON.parse(value);
		val.expires = new Date(Date.now() + val.maxAge);
		return val;
	} catch (error) {
        console.log(error);
		throw new Error(`Invalid JSON in environment variable: ${name}`);
	}
}
