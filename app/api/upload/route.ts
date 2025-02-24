// app/api/upload/route.ts
// import { mkdir, writeFile } from "fs/promises";
// import { NextResponse } from "next/server";
// import { join } from "path";
import { ensureUploadDirs } from "@/lib/upload-utils";
import { access, mkdir, readdir, rmdir, unlink, writeFile } from "fs/promises";
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
		}-${Date.now()}.${imageExtension}`;

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

// add delete the whole image with the folder
// if the folder is empty or passing param called sectionName
export async function DELETE(request: Request) {
	try {
		const formData = await request.formData();
		const url = formData.get("url") as string;
		const sectionName = formData.get("sectionName") as string;

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
		// check if folder is empty
		await checkFolderEmpty(join(process.cwd(), "public", url.split("/").slice(0, -1).join("/")));

		// if sectionName is passed, delete
		if (sectionName) {
			const folderPath = join(process.cwd(), "public", url.split("/").slice(0, -1).join("/"));
			try {
				await access(folderPath);
			} catch (error) {
				// if file does not exist, return 200
				// ignoring the error as the file is already not there
				return NextResponse.json({ message: "Folder not found" }, { status: 200 });
			}
			await deleteDirectory(folderPath);
		}

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

async function deleteDirectory(path: string) {
	try {
		await rmdir(path, { recursive: true });
	} catch (error) {
		console.error("Error deleting directory:", error);
		throw error;
	}
}

async function checkFolderEmpty(path: string) {
	try {
		const files = await readdir(path);
		if (files.length === 0) {
			await deleteDirectory(path);
		}
	} catch (error) {
		console.error("Error checking folder:", error);
		throw error;
	}
}
