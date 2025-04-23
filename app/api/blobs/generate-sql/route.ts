// app/api/blobs/generate-sql/route.ts
import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

interface UrlMapping {
	oldUrl: string;
	newUrl: string;
	path: string;
}

export async function POST(request: Request) {
	try {
		const { oldBlobSecret, newBlobSecret } = await request.json();

		if (!oldBlobSecret || !newBlobSecret) {
			return NextResponse.json({ error: "Both blob secrets are required" }, { status: 400 });
		}

		// Step 1: Get all files from old blob storage
		process.env.BLOB_READ_WRITE_TOKEN = oldBlobSecret;
		const oldBlobs: UrlMapping[] = [];
		let oldCursor: string | undefined = undefined;
		let hasMoreOld = true;

		while (hasMoreOld) {
			// @ts-expect-error I don't know
			const result = await list({ limit: 100, cursor: oldCursor });

			for (const blob of result.blobs) {
				oldBlobs.push({
					oldUrl: blob.url,
					newUrl: "",
					path: blob.pathname,
				});
			}

			if (result.cursor) {
				oldCursor = result.cursor;
			} else {
				hasMoreOld = false;
			}
		}

		// Step 2: Get all files from new blob storage
		process.env.BLOB_READ_WRITE_TOKEN = newBlobSecret;
		const newBlobsMap = new Map<string, string>();
		let newCursor: string | undefined = undefined;
		let hasMoreNew = true;

		while (hasMoreNew) {
			// @ts-expect-error I don't know
			const result = await list({ limit: 100, cursor: newCursor });

			for (const blob of result.blobs) {
				// Use the path as a key to map between old and new blobs
				newBlobsMap.set(blob.pathname, blob.url);
			}

			if (result.cursor) {
				newCursor = result.cursor;
			} else {
				hasMoreNew = false;
			}
		}

		// Step 3: Match old blobs with new blobs based on path
		for (const mapping of oldBlobs) {
			const newUrl = newBlobsMap.get(mapping.path);
			if (newUrl) {
				mapping.newUrl = newUrl;
			}
		}

		// Step 4: Generate SQL update statements
		const matchedMappings = oldBlobs.filter(mapping => mapping.newUrl);
		const unmatchedMappings = oldBlobs.filter(mapping => !mapping.newUrl);

		const sqlStatements = matchedMappings.map(
			mapping => `UPDATE "Image" SET "url" = '${mapping.newUrl}' WHERE "url" = '${mapping.oldUrl}';`
		);

		// Create full SQL script
		const sqlScript = `-- URL migration script generated on ${new Date().toISOString()}
-- Old blob storage: ${oldBlobSecret.substring(0, 10)}...
-- New blob storage: ${newBlobSecret.substring(0, 10)}...
-- Total mapped files: ${matchedMappings.length}
-- Total unmapped files: ${unmatchedMappings.length}

BEGIN TRANSACTION;

${sqlStatements.join("\n")}

-- Verify the changes
SELECT COUNT(*) AS "updated_rows" FROM "Image" 
WHERE "url" LIKE '${matchedMappings[0]?.newUrl.split("/")[2] || "new-blob"}.public.blob.vercel-storage.com%';

COMMIT;
`;

		return NextResponse.json({
			success: true,
			sqlScript,
			stats: {
				total: oldBlobs.length,
				matched: matchedMappings.length,
				unmatched: unmatchedMappings.length,
			},
			mappings: matchedMappings,
			unmappedFiles: unmatchedMappings,
		});
	} catch (error: any) {
		console.error("Error generating SQL:", error);
		return NextResponse.json(
			{
				error: error.message || "Failed to generate SQL",
			},
			{ status: 500 }
		);
	}
}
