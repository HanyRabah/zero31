// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		// Remove the token cookie
		(await cookies()).delete("token");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Logout error:", error);
		return NextResponse.json({ error: "Logout failed" }, { status: 500 });
	}
}
