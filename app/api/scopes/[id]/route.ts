// app/api/scopes/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		const data = await request.json();
		const scope = await prisma.projectScope.update({
			where: { id },
			data: { name: data.name },
		});
		return NextResponse.json(scope);
	} catch (error) {
		return NextResponse.json({ error: "Failed to update scope" }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;

		await prisma.projectScope.delete({
			where: { id },
		});
		return NextResponse.json({ message: "Scope deleted" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete scope" }, { status: 500 });
	}
}
