// app/api/types/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		const data = await request.json();
		const type = await prisma.projectType.update({
			where: { id },
			data: { name: data.name },
		});
		return NextResponse.json(type);
	} catch (error) {
		return NextResponse.json({ error: "Failed to update type" }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		await prisma.projectType.delete({
			where: { id },
		});
		return NextResponse.json({ message: "Type deleted" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete type" }, { status: 500 });
	}
}
