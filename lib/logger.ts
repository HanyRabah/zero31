// lib/logger.ts
import log4js from "log4js";
import path from "path";

// Configure log4js
log4js.configure({
	appenders: {
		console: { type: "console" },
		file: {
			type: "file",
			filename: path.join(process.cwd(), "logs", "app.log"),
			maxLogSize: 10485760, // 10MB
			backups: 5,
			compress: true,
		},
		error: {
			type: "file",
			filename: path.join(process.cwd(), "logs", "error.log"),
			maxLogSize: 10485760, // 10MB
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
