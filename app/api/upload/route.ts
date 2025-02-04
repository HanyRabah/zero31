// app/api/upload/route.ts
// import { mkdir, writeFile } from "fs/promises";
// import { NextResponse } from "next/server";
// import { join } from "path";
// import { v4 as uuidv4 } from "uuid";
import { ensureUploadDirs } from "@/lib/upload-utils";
import { access, mkdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

function formatProjectName(name: string): string {
	return name
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing spaces
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/[^a-z0-9-]/g, ""); // Remove special characters except hyphens
}

export async function POST(request: Request) {
	try {
		ensureUploadDirs();
		const formData = await request.formData();
		const file = formData.get("file") as File;
		const projectName = formData.get("projectName") as string;
		const sectionName = formData.get("sectionName") as string;
		const fieldName = formData.get("fieldName") as string;
		const sectionImageIndex = formData.get("sectionImageIndex") as string;
		const imageExtension = file.name.split(".").pop();

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Convert file to buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Create unique filename
		const uniqueFilename = `${fieldName ? fieldName : sectionName ? sectionName : "section-image"}${
			sectionImageIndex ? `-${sectionImageIndex}` : ""
		}.${imageExtension}`;

		// Define upload path (adjust this to match your server path)
		const uploadDir = join(
			process.cwd(),
			"public",
			"uploads",
			formatProjectName(projectName),
			sectionName ? sectionName : ""
		);
		const filepath = join(uploadDir, uniqueFilename);

		// Create directory if it doesn't exist
		await createDirectory(uploadDir);

		// Write file
		await writeFile(filepath, buffer);

		// Return the URL
		return NextResponse.json({
			url: `/uploads/${formatProjectName(projectName)}/${sectionName ? sectionName + "/" : ""}${uniqueFilename}`,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		const formData = await request.formData();
		const url = formData.get("url") as string;

		if (!url) {
			return NextResponse.json({ error: "No URL provided" }, { status: 400 });
		}

		// Define file path
		const filepath = join(process.cwd(), "public", url);
		// check if file exists
		try {
			await access(filepath);
		} catch (error) {
			// if file does not exist, return 200
			// ignoring the error as the file is already not there
			return NextResponse.json({ message: "File not found" }, { status: 200 });
		}

		// Delete file
		await unlink(filepath);

		return NextResponse.json({ message: "File deleted" });
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json({ error: "Delete failed" }, { status: 500 });
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
