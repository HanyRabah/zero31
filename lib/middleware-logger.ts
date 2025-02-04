// lib/middleware-logger.ts
export const middlewareLogger = {
	info: async (...args: any[]) => {
		// In Edge runtime, we can only use console.log
		console.log("[Info]", ...args);
	},
	error: async (...args: any[]) => {
		console.error("[Error]", ...args);
	},
};
