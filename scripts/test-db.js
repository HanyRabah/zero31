import chalk from "chalk";
import { testDatabaseConnection } from "../lib/db-test.js";

async function main() {
	console.log(chalk.blue("Testing database connection..."));

	const isConnected = await testDatabaseConnection();

	if (!isConnected) {
		console.log(chalk.red("Database connection test failed"));
		process.exit(1);
	}

	console.log(chalk.green("All database tests passed!"));
	process.exit(0);
}

main();
