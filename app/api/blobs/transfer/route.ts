// app/api/blobs/transfer/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { sourceUrl, sourceBlob, destBlob, destPath } = await request.json();

		if (!sourceUrl || !sourceBlob || !destBlob) {
			return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
		}

		// Step 1: Download the blob from source
		process.env.BLOB_READ_WRITE_TOKEN = sourceBlob;
		const response = await fetch(sourceUrl);

		if (!response.ok) {
			throw new Error(`Failed to download file: ${response.statusText}`);
		}

		const fileBlob = await response.blob();

		// Extract the file name from the URL
		const fileName = sourceUrl.split("/").pop() || "file";

		// Create a File object from the blob
		const file = new File([fileBlob], fileName, { type: fileBlob.type });

		// Step 2: Extract the original path from the source URL
		let originalPath = "";

		try {
			// Parse the URL to get the pathname
			const urlObj = new URL(sourceUrl);
			originalPath = urlObj.pathname;

			// Remove any leading slashes from the pathname
			if (originalPath.startsWith("/")) {
				originalPath = originalPath.substring(1);
			}
		} catch (error) {
			console.error("Error parsing URL:", error);
			// Fallback if URL parsing fails
			originalPath = destPath;
		}

		// Set the destination blob token
		process.env.BLOB_READ_WRITE_TOKEN = destBlob;

		// Upload to the same path structure
		const result = await put(originalPath, file, { access: "public" });

		// Extract source host and destination host info for SQL migration
		const sourceHost = new URL(sourceUrl).host;
		const destHost = new URL(result.url).host;

		return NextResponse.json({
			success: true,
			sourceUrl,
			newUrl: result.url,
			path: originalPath,
			sourceHost,
			destHost,
		});
	} catch (error: any) {
		console.error("Error transferring blob:", error);
		return NextResponse.json(
			{
				error: error.message || "Failed to transfer blob",
				// @ts-expect-error I don't know
				sourceUrl,
			},
			{ status: 500 }
		);
	}
}
