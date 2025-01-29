// app/api/upload/route.ts
// import { mkdir, writeFile } from "fs/promises";
// import { NextResponse } from "next/server";
// import { join } from "path";
// import { v4 as uuidv4 } from "uuid";

function formatProjectName(name: string): string {
	return name
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing spaces
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, ""); // Remove special characters except hyphens
}

// export async function POST(request: Request) {
// 	try {
// 		const formData = await request.formData();
// 		const file = formData.get("file") as File;

// 		// Get and format project name
// 		const rawProjectName = formData.get("projectName") as string;
// 		const projectName = formatProjectName(rawProjectName);

// 		// Check if a file was uploaded
// 		if (!file) {
// 			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
// 		}

// 		// Check if project name is valid after formatting
// 		if (!projectName) {
// 			return NextResponse.json({ error: "Invalid project name" }, { status: 400 });
// 		}

// 		// Create project directory if it doesn't exist
// 		const projectDir = join(process.cwd(), "public", "images", "projects", projectName);
// 		await mkdir(projectDir, { recursive: true });

// 		// Generate unique filename
// 		const bytes = await file.arrayBuffer();
// 		const buffer = Buffer.from(bytes);
// 		const filename = `${projectName}-${uuidv4()}-${formatProjectName(file.name)}`;
// 		const filepath = join(projectDir, filename);

// 		// Write file
// 		await writeFile(filepath, buffer);

// 		// Return the public URL
// 		return NextResponse.json({
// 			url: `/images/projects/${projectName}/${filename}`,
// 		});
// 	} catch (error) {
// 		console.error("Error uploading file:", error);
// 		return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
// 	}
// }
// app/api/upload/route.ts
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;
		const projectName = formData.get("projectName") as string;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Create unique filename
		const uniqueFilename = `${file.name}-${Date.now()}`;

		// Define upload path (adjust this to match your server path)
		const uploadDir = join(process.cwd(), "public", "uploads", projectName);
		const filepath = join(uploadDir, uniqueFilename);

		// Create directory if it doesn't exist
		await createDirectory(uploadDir);

		// Write file
		await writeFile(filepath, buffer);

		// Return the URL
		return NextResponse.json({
			url: `/uploads/${formatProjectName(projectName)}/${uniqueFilename}`,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}

async function createDirectory(path: string) {
	try {
		await mkdir(path, { recursive: true });
	} catch (error) {
		console.error("Error creating directory:", error);
		throw error;
	}
}
