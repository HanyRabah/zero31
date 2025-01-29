// app/api/logs/route.ts
import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { level, message } = body;

		switch (level) {
			case "error":
				logger.error(message);
				break;
			case "warn":
				logger.warn(message);
				break;
			case "debug":
				logger.debug(message);
				break;
			default:
				logger.info(message);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		logger.error("Error saving log:", error);
		return NextResponse.json({ error: "Failed to save log" }, { status: 500 });
	}
}
