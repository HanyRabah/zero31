// app/api/blobs/list/route.ts
import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { blobSecret } = await request.json();

		// Set the blob secret for this request
		process.env.BLOB_READ_WRITE_TOKEN = blobSecret;

		let blobs: any[] = [];
		let cursor: string | undefined = undefined;
		let hasMore = true;

		// Paginate through all blobs
		while (hasMore) {
			// @ts-expect-error I don't know
			const result = await list({ limit: 100, cursor });
			blobs = [...blobs, ...result.blobs];

			if (result.cursor) {
				cursor = result.cursor;
			} else {
				hasMore = false;
			}
		}

		return NextResponse.json({
			blobs: blobs.map(blob => ({
				url: blob.url,
				path: blob.pathname,
				size: blob.size,
				uploadedAt: blob.uploadedAt,
			})),
		});
	} catch (error: any) {
		console.error("Error listing blobs:", error);
		return NextResponse.json({ error: error.message || "Failed to list blobs" }, { status: 500 });
	}
}
