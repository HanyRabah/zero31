// lib/logger.ts
type LogLevel = "info" | "error" | "warn" | "debug";

class Logger {
	private logToFile(level: LogLevel, message: string, ...args: any[]) {
		const timestamp = new Date().toISOString();
		const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${args.length ? JSON.stringify(args) : ""}`;

		// In production, you might want to write to a file
		if (process.env.NODE_ENV === "production") {
			// Using console methods for simplicity
			switch (level) {
				case "error":
					console.error(logMessage);
					break;
				case "warn":
					console.warn(logMessage);
					break;
				case "debug":
					console.debug(logMessage);
					break;
				default:
					console.log(logMessage);
			}
		} else {
			// In development, just use console
			console.log(logMessage);
		}
	}

	info(message: string, ...args: any[]) {
		this.logToFile("info", message, ...args);
	}

	error(message: string, ...args: any[]) {
		this.logToFile("error", message, ...args);
	}

	warn(message: string, ...args: any[]) {
		this.logToFile("warn", message, ...args);
	}

	debug(message: string, ...args: any[]) {
		this.logToFile("debug", message, ...args);
	}
}

export const logger = new Logger();
