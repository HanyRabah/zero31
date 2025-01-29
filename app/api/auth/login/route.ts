// app/api/auth/login/route.ts
import { createToken } from "@/lib/auth";
import { appLogger, errorLogger } from "@/lib/logger";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		// Add request logging
		appLogger.info("Login attempt started");

		// Parse the request body
		const body = await request.json();
		appLogger.info("Login request for:", { email: body.email });

		if (!body.email || !body.password) {
			appLogger.warn("Missing credentials in login attempt");

			return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
		}

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: body.email },
		});

		if (!user) {
			appLogger.warn("User not found:", { email: body.email });

			return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
		}

		// Verify password
		const isValid = await verifyPassword(body.password, user.password);
		console.log("Password verification:", { isValid });

		if (!isValid) {
			appLogger.warn("Invalid password for user:", { email: body.email });

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
			appLogger.info("Login successful:", { email: user.email, role: user.role });
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
		errorLogger.error("Login error stack:", error.stack);
		errorLogger.error("Login error:", error);
		return NextResponse.json({ error: "Authentication failed", details: error }, { status: 500 });
	}
}
