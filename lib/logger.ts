// lib/logger.ts
import log4js from "log4js";

// Configure log4js with direct path strings
log4js.configure({
	appenders: {
		console: { type: "console" },
		file: {
			type: "file",
			filename: "./logs/app.log", // Using relative path
			maxLogSize: 10485760, // 10MB
			backups: 5,
			compress: true,
		},
		error: {
			type: "file",
			filename: "./logs/error.log", // Using relative path
			maxLogSize: 10485760,
			backups: 5,
			compress: true,
		},
	},
	categories: {
		default: { appenders: ["console", "file"], level: "info" },
		error: { appenders: ["console", "error"], level: "error" },
	},
});

// Create loggers
const appLogger = log4js.getLogger();
const errorLogger = log4js.getLogger("error");

export { appLogger, errorLogger };
