// lib/middleware-logger.ts
export const middlewareLogger = {
	info: async (...args: any[]) => {
		// In Edge runtime, we can only use console.log
		console.log("[Info]", ...args);

		// Optionally, you could send logs to an API endpoint
		try {
			await fetch("/api/logs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					level: "info",
					message: args.join(" "),
					timestamp: new Date().toISOString(),
				}),
			});
		} catch (error) {
			console.error("Failed to send log:", error);
		}
	},
	error: async (...args: any[]) => {
		console.error("[Error]", ...args);

		try {
			await fetch("/api/logs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					level: "error",
					message: args.join(" "),
					timestamp: new Date().toISOString(),
				}),
			});
		} catch (error) {
			console.error("Failed to send error log:", error);
		}
	},
};
