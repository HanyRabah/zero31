// app/api/projects/[projectId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
		}

		const data = await request.json();
		const { sections, scopes, ...projectData } = data;

		// Verify project exists
		const existingProject = await prisma.project.findUnique({
			where: { id },
		});

		if (!existingProject) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// First delete existing relationships
		await prisma.$transaction([
			prisma.projectsOnScopes.deleteMany({
				where: { projectId: id },
			}),
			prisma.image.deleteMany({
				where: {
					section: {
						projectId: id,
					},
				},
			}),
			prisma.projectSection.deleteMany({
				where: { projectId: id },
			}),
		]);

		// Then update the project with new data
		const updatedProject = await prisma.project.update({
			where: { id },
			data: {
				...projectData,
				scopes: {
					create:
						scopes?.map((scopeId: string) => ({
							scope: {
								connect: { id: scopeId },
							},
						})) || [],
				},
				sections: {
					create:
						sections?.map((section: any) => ({
							description: section.description || "",
							backgroundColor: section.backgroundColor || "",
							images: {
								create:
									section.images?.map((image: any) => ({
										url: image.url || "",
										alt: image.alt || "",
									})) || [],
							},
						})) || [],
				},
			},
			include: {
				type: true,
				scopes: {
					include: {
						scope: true,
					},
				},
				sections: {
					include: {
						images: true,
					},
				},
			},
		});

		return NextResponse.json(updatedProject);
	} catch (error: any) {
		console.error("Project update error:", error);
		return NextResponse.json(
			{
				error: `Error updating project: ${error.message}`,
				details: error.stack,
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
		}

		// Verify project exists
		const existingProject = await prisma.project.findUnique({
			where: { id },
		});

		if (!existingProject) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Delete project
		await prisma.project.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Project deleted" });
	} catch (error: any) {
		console.error("Delete project error:", error.stack);
		return NextResponse.json(
			{
				error: `Error deleting project: ${error.message}`,
				details: error.stack,
			},
			{ status: 500 }
		);
	}
}
