// lib/upload-utils.ts
import fs from "fs";
import path from "path";

export function ensureUploadDirs() {
	const uploadDir = path.join(process.cwd(), "public", "uploads");

	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	// Create subdirectories if needed
	["projects", "sections"].forEach(subDir => {
		const dir = path.join(uploadDir, subDir);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	});
}
