// app/api/projects/[projectId]/route.ts
import { del, list } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// Import or copy the same formatting function used for uploads
function formatProjectName(name: string): string {
	return name
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

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

		const { typeId, ...restProjectData } = projectData;

		// Then update the project with new data
		const updatedProject = await prisma.project.update({
			where: { id },
			data: {
				...restProjectData,
				type: typeId ? { connect: { id: typeId } } : undefined,
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

		revalidateTag("projects-list");
		revalidateTag(`project-${id}`);

		return NextResponse.json(updatedProject, {
			headers: {
				"Cache-Control": "no-store, must-revalidate, max-age=0",
			},
		});
	} catch (error: any) {
		console.error("Project update error:", error.stack);
		return NextResponse.json(
			{
				error: `Error updating project: ${error.message}`,
				details: error.stack,
			},
			{ status: 500 }
		);
	}
}

// export async function DELETE(request: Request, { params }: { params: Params }) {
// 	try {
// 		const { id } = await params;
// 		if (!id) {
// 			return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
// 		}

// 		// Verify project exists
// 		const existingProject = await prisma.project.findUnique({
// 			where: { id },
// 		});

// 		if (!existingProject) {
// 			return NextResponse.json({ error: "Project not found" }, { status: 404 });
// 		}

// 		// Delete project
// 		await prisma.project.delete({
// 			where: { id },
// 		});

// 		revalidateTag("projects-list");
// 		revalidateTag(`project-${id}`);

// 		return NextResponse.json(
// 			{ message: "Project deleted" },
// 			{
// 				headers: {
// 					"Cache-Control": "no-store, must-revalidate, max-age=0",
// 				},
// 			}
// 		);
// 	} catch (error: any) {
// 		console.error("Delete project error:", error.stack);
// 		return NextResponse.json(
// 			{
// 				error: `Error deleting project: ${error.message}`,
// 				details: error.stack,
// 			},
// 			{ status: 500 }
// 		);
// 	}
// }

// app/api/projects/[projectId]/route.ts

export async function DELETE(request: Request, { params }: { params: Params }) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
		}

		// Verify project exists and get its name for the blob path
		const existingProject = await prisma.project.findUnique({
			where: { id },
		});

		if (!existingProject) {
			return NextResponse.json({ error: "Project not found" }, { status: 404 });
		}

		// Format the project name to match the upload structure
		if (!existingProject.title) {
			throw new Error("Project title is null or undefined");
		}
		const formattedProjectName = formatProjectName(existingProject.title);

		// Define the folder prefix in blob storage
		const projectFolderPrefix = `uploads/${formattedProjectName}/`;

		// List and delete all files with this prefix
		let hasMore = true;
		let cursor = undefined;

		while (hasMore) {
			const { blobs, cursor: nextCursor }: { blobs: any[]; cursor?: string } = await list({
				prefix: projectFolderPrefix,
				cursor,
				limit: 100,
			});

			console.log(`Found ${blobs.length} files to delete for project ${existingProject.title}`);

			// Delete each blob in this batch
			for (const blob of blobs) {
				console.log(`Deleting file: ${blob.url}`);
				await del(blob.url);
			}

			// Check if there are more blobs to fetch
			if (nextCursor) {
				cursor = nextCursor;
			} else {
				hasMore = false;
			}
		}

		// Delete project from database
		await prisma.project.delete({
			where: { id },
		});

		revalidateTag("projects-list");
		revalidateTag(`project-${id}`);

		return NextResponse.json(
			{ message: "Project and associated files deleted" },
			{
				headers: {
					"Cache-Control": "no-store, must-revalidate, max-age=0",
				},
			}
		);
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
