import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

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
		const projectName = formData.get("projectName") as string;
		const sectionName = formData.get("sectionName") as string;
		const fieldName = formData.get("fieldName") as string;
		const sectionImageIndex = formData.get("sectionImageIndex") as string;
		const imageExtension = file.name.split(".").pop();

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Create unique filename
		const uniqueFilename = `${fieldName ? fieldName : sectionName ? sectionName : "section-image"}${
			sectionImageIndex ? `-${sectionImageIndex}` : ""
		}-${Date.now()}.${imageExtension}`;

		// Define the path for the blob
		const blobPath = `uploads/${formatProjectName(projectName)}/${
			sectionName ? sectionName + "/" : ""
		}${uniqueFilename}`;

		// Upload the file to Vercel Blob
		const blob = await put(blobPath, file, { access: "public" });

		// Return the URL
		return NextResponse.json({
			url: blob.url,
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

		// Delete the file from Vercel Blob
		await del(url);

		return NextResponse.json({ message: "File deleted" });
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json({ error: "Delete failed" }, { status: 500 });
	}
}
