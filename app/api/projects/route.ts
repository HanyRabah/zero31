import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type");

	try {
		const projects = await prisma.project.findMany({
			where: type ? { type: { name: type } } : undefined,
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

		// Add proper error handling and logging
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

		// Create the project
		const project = await prisma.project.create({
			data: {
				...rest,
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
