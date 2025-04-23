// app/api/blobs/migrate-file/route.ts
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { oldUrl, filePath } = await request.json();

		if (!oldUrl || !filePath) {
			return NextResponse.json({ error: "Both oldUrl and filePath are required" }, { status: 400 });
		}

		// Step 1: Download the file from old blob
		const oldBlobSecret = "vercel_blob_rw_L6nPF9RjVQQf6oWA_RcQ4BD990wuwaORPO0i1KHX1efmaA4";
		process.env.BLOB_READ_WRITE_TOKEN = oldBlobSecret;

		const response = await fetch(oldUrl);
		if (!response.ok) {
			throw new Error(`Failed to download file: ${response.statusText}`);
		}

		const fileBlob = await response.blob();
		const fileName = filePath.split("/").pop() || "file";
		const file = new File([fileBlob], fileName, { type: fileBlob.type });

		// Step 2: Upload to new blob with the same path
		const newBlobSecret = "vercel_blob_rw_7xJ9TsMqrsqlixYr_MXP7B0mpAakIaM8SyydbyGbkv0EtjY";
		process.env.BLOB_READ_WRITE_TOKEN = newBlobSecret;

		const result = await put(filePath, file, { access: "public" });

		// Step 3: Store both the old and new URLs for SQL updates
		return NextResponse.json({
			success: true,
			oldUrl: oldUrl,
			newUrl: result.url,
			path: filePath,
		});
	} catch (error: any) {
		console.error("Error migrating file:", error);
		return NextResponse.json(
			{
				error: error.message || "Failed to migrate file",
				// @ts-expect-error I don't know
				oldUrl: request.body?.oldUrl,
			},
			{ status: 500 }
		);
	}
}
