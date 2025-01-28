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
		(await cookies()).set("token", token!, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24, // 24 hours
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
	}
}
