// scripts/create-admin.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	try {
		const scopes = await prisma.scopes.create({
			data: {
				name: "read:users",
				description: "Read users",
			},
		});

		console.log("Admin user created successfully:", admin.email);
	} catch (error) {
		console.error("Error creating admin:", error);
	}
}

main()
	.catch(console.error)
	.finally(async () => {
		await prisma.$disconnect();
	});
