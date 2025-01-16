import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		// Process contact form submission
		// Add your email service integration here

		return NextResponse.json({
			message: "Message sent successfully",
		});
	} catch (error) {
		return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
	}
}
