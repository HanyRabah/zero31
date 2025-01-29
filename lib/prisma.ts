// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}

// Add error handling
prisma.$on("error", e => {
	console.error("Prisma error:", e);
});

export default prisma;
