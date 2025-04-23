import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const { items } = data;

		if (!items || !Array.isArray(items)) {
			return NextResponse.json({ error: "Items array is required" }, { status: 400 });
		}

		// Execute all updates in a transaction
		const updates = items.map((item, index) =>
			prisma.project.update({
				where: { id: item.id },
				data: { sortOrder: index },
			})
		);

		await prisma.$transaction(updates);

		// Revalidate the projects list
		revalidateTag("projects-list");

		return NextResponse.json(
			{ success: true },
			{
				headers: {
					"Cache-Control": "no-store, must-revalidate, max-age=0",
				},
			}
		);
	} catch (error: any) {
		console.error("Projects reordering error:", error.stack);
		return NextResponse.json(
			{
				error: `Error reordering projects: ${error.message}`,
				details: error.stack,
			},
			{ status: 500 }
		);
	}
}
