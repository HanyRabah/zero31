// app/api/auth/login/route.ts
import { createToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		// Log the attempt (without password)
		console.log("Login attempt for:", email);

		// Get user from database
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Verify password
		const isValid = await verifyPassword(password, user.password);

		if (!isValid) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Create token
		const token = await createToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		// Set cookie
		cookies().set({
			name: "token",
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});

		return NextResponse.json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
	}
}
