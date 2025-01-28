// app/api/upload/route.ts
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

function formatProjectName(name: string): string {
	return name
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing spaces
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, ""); // Remove special characters except hyphens
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		// Get and format project name
		const rawProjectName = formData.get("projectName") as string;
		const projectName = formatProjectName(rawProjectName);

		// Check if a file was uploaded
		if (!file) {
			return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
		}

		// Check if project name is valid after formatting
		if (!projectName) {
			return NextResponse.json({ error: "Invalid project name" }, { status: 400 });
		}

		// Create project directory if it doesn't exist
		const projectDir = join(process.cwd(), "public", "images", "projects", projectName);
		await mkdir(projectDir, { recursive: true });

		// Generate unique filename
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const filename = `${projectName}-${uuidv4()}-${formatProjectName(file.name)}`;
		const filepath = join(projectDir, filename);

		// Write file
		await writeFile(filepath, buffer);

		// Return the public URL
		return NextResponse.json({
			url: `/images/projects/${projectName}/${filename}`,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
	}
}
