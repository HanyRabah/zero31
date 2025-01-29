// app/api/logs/route.ts
import { appLogger, errorLogger } from "@/lib/logger";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { level, message, timestamp } = body;

		if (level === "error") {
			errorLogger.error(message);
		} else {
			appLogger.info(message);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error saving log:", error);
		return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
	}
}
