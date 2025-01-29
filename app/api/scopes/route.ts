// app/api/scopes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
	try {
		const scopes = await prisma.projectScope.findMany({
			orderBy: { name: "asc" },
		});
		return NextResponse.json(scopes);
	} catch (error) {
		return NextResponse.json({ error: "Error fetching scopes" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const scope = await prisma.projectScope.create({
			data: { name: data.name },
		});
		return NextResponse.json(scope);
	} catch (error) {
		return NextResponse.json({ error: "Error creating scope" }, { status: 500 });
	}
}
