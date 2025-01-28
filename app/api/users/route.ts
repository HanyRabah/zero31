// app/api/users/route.ts
import { hashPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
			},
			orderBy: { name: "asc" },
		});
		return NextResponse.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.email || !data.password || !data.name) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			return NextResponse.json({ error: "Email already in use" }, { status: 400 });
		}

		// Hash password
		const hashedPassword = await hashPassword(data.password);

		// Create user
		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
				role: data.role || "USER", // Default role if not specified
			},
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error("Error creating user:", error);
		return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
	}
}
