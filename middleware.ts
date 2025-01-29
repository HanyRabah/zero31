// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { middlewareLogger } from "./lib/middleware-logger";

export async function middleware(request: NextRequest) {
	await middlewareLogger.info("Middleware processing:", {
		path: request.nextUrl.pathname,
		method: request.method,
	});

	// Only check auth for dashboard routes
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		const token = request.cookies.get("token")?.value;

		if (!token) {
			await middlewareLogger.info("No token found in request");

			return NextResponse.redirect(new URL("/login", request.url));
		}

		try {
			const verified = await verifyToken(token);
			if (!verified) {
				// Token is invalid, redirect to login
				const response = NextResponse.redirect(new URL("/login", request.url));
				response.cookies.delete("token");
				return response;
			}

			// Token is valid, continue
			return NextResponse.next();
		} catch (error: any) {
			await middlewareLogger.error("Middleware error:", error.stack);
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	// Not a protected route, continue
	return NextResponse.next();
}

export const config = {
	matcher: [
		// Match all dashboard routes
		"/dashboard/:path*",
		// Optionally protect api routes too
		"/api/dashboard/:path*",
	],
};
