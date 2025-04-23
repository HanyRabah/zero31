import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type");

	try {
		const projects = await prisma.project.findMany({
			where: type ? { type: { name: type } } : undefined,
			orderBy: {
				sortOrder: "asc", // Add this line to sort by sortOrder
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

		console.log(`Found ${projects.length} projects`);
		return NextResponse.json(projects, {
			headers: {
				"Cache-Control": "no-store, must-revalidate, max-age=0",
			},
		});
	} catch (error) {
		return NextResponse.json({ error: `Error fetching projects ${error}` }, { status: 500 });
	}
}

// Modify the POST function in app/api/projects/route.ts

export async function POST(request: Request) {
	try {
		const data = await request.json();

		// Extract sections and scopes from the data
		const { sections, scopes, ...projectData } = data;

		// Validate required fields
		if (!projectData.title || !projectData.clientName || !projectData.description) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}
		const { typeId, ...rest } = projectData;

		// Check if the sortOrder column exists
		let hasSortOrder = true;
		try {
			// Try to query a project with sortOrder
			await prisma.project.findFirst({
				select: {
					id: true,
					sortOrder: true,
				},
			});
		} catch (e) {
			// If error contains "does not exist in the current database", set hasSortOrder to false
			if (e instanceof Error && e.message.includes("does not exist in the current database")) {
				hasSortOrder = false;
			} else {
				// If it's another type of error, throw it
				throw e;
			}
		}

		// Find the highest sortOrder value if the column exists
		let maxSortOrder = 0;
		if (hasSortOrder) {
			const highestOrderProject = await prisma.project.findFirst({
				orderBy: {
					sortOrder: "desc",
				},
				select: {
					sortOrder: true,
				},
			});

			if (highestOrderProject) {
				maxSortOrder = highestOrderProject.sortOrder + 1;
			}
		}

		// Create the project, including sortOrder if it exists
		const project = await prisma.project.create({
			data: {
				...rest,
				...(hasSortOrder ? { sortOrder: maxSortOrder } : {}), // Add sortOrder only if column exists
				type: typeId ? { connect: { id: typeId } } : undefined,
				// Connect scopes if they exist
				scopes:
					scopes?.length > 0
						? {
								create: scopes.map((scopeId: string) => ({
									scope: {
										connect: { id: scopeId },
									},
								})),
						  }
						: undefined,
				// Create sections if they exist
				sections:
					sections?.length > 0
						? {
								create: sections.map((section: any) => ({
									description: section.description || "",
									backgroundColor: section.backgroundColor || "",
									type: section.type || "",
									images:
										section.images?.length > 0
											? {
													create: section.images.map((image: any) => ({
														url: image.url || "",
														alt: image.alt || "",
													})),
											  }
											: undefined,
								})),
						  }
						: undefined,
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

		// Revalidate cache tags
		revalidateTag("projects-list");

		return NextResponse.json(project, {
			headers: {
				"Cache-Control": "no-store, must-revalidate, max-age=0",
			},
		});
	} catch (error: any) {
		console.error("Project creation error:", error.stack);
		return NextResponse.json(
			{
				error: `Error creating project: ${error.message}`,
				details: error.stack,
			},
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const { id, sections, scopes, ...projectData } = data;

		if (!id) {
			return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
		}

		// First, delete existing relationships
		await prisma.projectsOnScopes.deleteMany({
			where: { projectId: id },
		});

		await prisma.projectSection.deleteMany({
			where: { projectId: id },
		});
		const { typeId, ...rest } = projectData;

		// Then update the project with new data
		const project = await prisma.project.update({
			where: { id },
			data: {
				...rest,
				type: typeId ? { connect: { id: typeId } } : undefined,
				scopes:
					scopes?.length > 0
						? {
								create: scopes.map((scopeId: string) => ({
									scope: {
										connect: { id: scopeId },
									},
								})),
						  }
						: undefined,
				sections:
					sections?.length > 0
						? {
								create: sections.map((section: any) => ({
									description: section.description || "",
									backgroundColor: section.backgroundColor || "",
									images:
										section.images?.length > 0
											? {
													create: section.images.map((image: any) => ({
														url: image.url || "",
														alt: image.alt || "",
													})),
											  }
											: undefined,
								})),
						  }
						: undefined,
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

		return NextResponse.json(project, {
			headers: {
				"Cache-Control": "no-store, must-revalidate, max-age=0",
			},
		});
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
