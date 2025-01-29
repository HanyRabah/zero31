// app/api/auth/login/route.ts
import { createToken } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// Add request logging
		console.log("Login request received");

		// Parse the request body
		const body = await request.json();
		console.log("Request body:", { email: body.email, hasPassword: !!body.password });

		if (!body.email || !body.password) {
			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: body.email },
		});

		console.log("User found:", { found: !!user });

		if (!user) {
			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Verify password
		const isValid = await verifyPassword(body.password, user.password);
		console.log("Password verification:", { isValid });

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
		if (token) {
			(await cookies()).set("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 60 * 60 * 24, // 24 hours
			});
		} else {
			throw new Error("Failed to create token");
		}

		// Return success response
		return NextResponse.json({
			success: true,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error: any) {
		console.error("Login error:", error);
		return NextResponse.json({ error: "Authentication failed", details: error.message }, { status: 500 });
	}
}
