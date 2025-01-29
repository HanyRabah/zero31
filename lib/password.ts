// lib/password.ts
import { compare, hash } from "bcryptjs";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
	return hash(password, SALT_ROUNDS);
}
// export async function hashPassword(password: string): Promise<string> {
// 	const encoder = new TextEncoder();
// 	const data = encoder.encode(password);
// 	const hash = await crypto.subtle.digest("SHA-256", data);
// 	return Array.from(new Uint8Array(hash))
// 		.map(b => b.toString(16).padStart(2, "0"))
// 		.join("");
// }
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	try {
		// Use bcrypt.compare since the stored hash is in bcrypt format
		return await compare(password, hashedPassword);
	} catch (error) {
		console.error("Password verification error:", error);
		return false;
	}
}
