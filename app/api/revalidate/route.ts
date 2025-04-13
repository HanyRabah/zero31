// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const path = searchParams.get("path");

	if (!path) {
		return NextResponse.json({ message: "Path parameter missing" }, { status: 400 });
	}

	try {
		// Revalidate both the specific path and the projects list tag
		revalidatePath(path);
		revalidateTag("projects-list");

		return NextResponse.json({
			revalidated: true,
			path: path,
			timestamp: new Date().toISOString(),
		});
	} catch (err) {
		return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
	}
}
