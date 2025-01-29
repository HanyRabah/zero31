// app/api/types/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
	try {
		const types = await prisma.projectType.findMany({
			orderBy: { name: "asc" },
		});
		return NextResponse.json(types);
	} catch (error) {
		return NextResponse.json({ error: "Error fetching types" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const type = await prisma.projectType.create({
			data: { name: data.name },
		});
		return NextResponse.json(type);
	} catch (error) {
		return NextResponse.json({ error: "Error creating type" }, { status: 500 });
	}
}
