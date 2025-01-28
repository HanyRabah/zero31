// lib/auth.ts
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function verifyToken(token: string) {
	if (!token) return null;

	try {
		const secret = new TextEncoder().encode(JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (error) {
		console.error("Token verification failed:", error);
		return null;
	}
}

export async function createToken(payload: any) {
	try {
		const secret = new TextEncoder().encode(JWT_SECRET);
		const token = await new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("24h")
			.sign(secret);

		return token;
	} catch (error) {
		console.error("Token creation failed:", error);
		return null;
	}
}
