// scripts/create-admin.js
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password) {
	return await hash(password, 10);
}

async function main() {
	const hashedPassword = await hashPassword("hany@zero31.com");

	try {
		const admin = await prisma.user.create({
			data: {
				email: "hany@zero31.com",
				password: hashedPassword,
				name: "Admin",
				role: "ADMIN",
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
