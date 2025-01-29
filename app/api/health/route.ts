// app/api/health/route.ts
import { NextResponse } from "next/server";
import { testDatabaseConnection } from "../../../lib/db-test";

export async function GET() {
	try {
		const isConnected = await testDatabaseConnection();

		if (!isConnected) {
			return NextResponse.json(
				{
					status: "error",
					message: "Database connection failed",
				},
				{ status: 503 }
			);
		}

		return NextResponse.json(
			{
				status: "ok",
				message: "Database connection healthy",
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				status: "error",
				message: "Health check failed",
			},
			{ status: 500 }
		);
	}
}
