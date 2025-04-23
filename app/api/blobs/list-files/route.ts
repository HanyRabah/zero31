// app/api/blobs/list-files/route.ts
import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// Set the old blob token
		const oldBlobSecret = "vercel_blob_rw_L6nPF9RjVQQf6oWA_RcQ4BD990wuwaORPO0i1KHX1efmaA4";
		process.env.BLOB_READ_WRITE_TOKEN = oldBlobSecret;

		// Get optional prefix from request
		const body = await request.json();
		const prefix = body.prefix || "";

		// List blobs with pagination
		let blobs: any[] = [];
		let cursor: string | undefined = undefined;
		let hasMore = true;
		const pageSize = 100;

		while (hasMore) {
			// @ts-expect-error I don't know
			const result = await list({
				limit: pageSize,
				cursor,
				prefix,
			});

			// Map the blob data to a simpler format
			// @ts-expect-error I don't know
			const mappedBlobs = result.blobs.map(blob => ({
				oldUrl: blob.url,
				newUrl: "",
				path: blob.pathname,
				size: blob.size,
				uploadedAt: blob.uploadedAt,
			}));

			blobs = [...blobs, ...mappedBlobs];

			// Check if there are more blobs to fetch
			if (result.cursor) {
				cursor = result.cursor;
			} else {
				hasMore = false;
			}

			// Safety check to prevent too many requests
			if (blobs.length > 1000) {
				hasMore = false;
			}
		}

		// Group files by folders for better organization
		const folderStructure: Record<string, { files: any[]; folders: Record<string, any> }> = {};
		blobs.forEach(blob => {
			const pathParts = blob.path.split("/");
			let currentFolder = folderStructure;

			// Create folder structure
			for (let i = 0; i < pathParts.length - 1; i++) {
				const folder = pathParts[i];
				if (!currentFolder[folder]) {
					currentFolder[folder] = { files: [], folders: {} };
				}
				currentFolder = currentFolder[folder].folders;
			}

			// Add file to its folder
			const fileName = pathParts[pathParts.length - 1];
			const folderPath = pathParts.slice(0, -1).join("/");
			let targetFolder: { files: any[]; folders: Record<string, any> } = { files: [], folders: folderStructure };

			// @ts-expect-error I don't know
			for (const part of folderPath.split("/").filter(p => p)) {
				// @ts-expect-error I don't know
				targetFolder = targetFolder[part].folders;
			}

			if (!targetFolder.files) {
				if (!targetFolder.files) {
					targetFolder.files = [];
				}
			}

			targetFolder.files.push(blob);
		});

		return NextResponse.json({
			success: true,
			files: blobs,
			folderStructure,
			totalCount: blobs.length,
		});
	} catch (error: any) {
		console.error("Error listing blobs:", error);
		return NextResponse.json(
			{
				error: error.message || "Failed to list blobs",
			},
			{ status: 500 }
		);
	}
}
