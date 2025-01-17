// lib/db-test.ts
import { PrismaClient } from "@prisma/client";
import chalk from "chalk"; // For colored console output

export async function testDatabaseConnection() {
	const prisma = new PrismaClient();

	try {
		// Test the connection
		await prisma.$connect();
		console.log(chalk.green("✓ Database connection successful"));

		// Test a simple query
		const result = await prisma.$queryRaw`SELECT 1`;
		console.log(chalk.green("✓ Query execution successful"));

		// Test the Projects table
		const projectCount = await prisma.project.count();
		console.log(chalk.green(`✓ Projects table accessible (${projectCount} records found)`));

		return true;
	} catch (error) {
		console.error(chalk.red("✗ Database connection failed:"));
		console.error(chalk.red(error));
		return false;
	} finally {
		await prisma.$disconnect();
	}
}
