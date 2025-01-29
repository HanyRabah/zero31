// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { hashPassword } from "../../../../lib/password";
import { prisma } from "../../../../lib/prisma";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const data = await request.json();

		const { id } = await params;
		// Verify user exists
		const existingUser = await prisma.user.findUnique({
			where: { id },
		});

		if (!existingUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Prepare update data
		const updateData: any = {
			name: data.name,
			email: data.email,
			role: data.role,
		};

		// If email is changed, check for duplicates
		if (data.email !== existingUser.email) {
			const emailExists = await prisma.user.findUnique({
				where: { email: data.email },
			});

			if (emailExists) {
				return NextResponse.json({ error: "Email already in use" }, { status: 400 });
			}
		}

		// Handle password update if provided
		if (data.password) {
			updateData.password = await hashPassword(data.password);
		}

		// Update user
		const updatedUser = await prisma.user.update({
			where: { id },
			data: updateData,
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
			},
		});

		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		// Verify user exists
		const { id } = await params;
		const user = await prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Delete user
		await prisma.user.delete({
			where: { id },
		});

		return NextResponse.json({
			message: "User deleted successfully",
			id: id,
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
	}
}
