// lib/projects.ts
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getProject = cache(async (slug: string) => {
	try {
		const project = await prisma.project.findFirst({
			where: {
				slug: slug,
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

		if (!project) {
			return notFound();
		}

		return project;
	} catch (error) {
		console.error("Error fetching project:", error);
		throw new Error("Failed to fetch project");
	}
});

export const getAllProjects = cache(async () => {
	try {
		const projects = await prisma.project.findMany({
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

		return projects;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw new Error("Failed to fetch projects");
	}
});

export async function getProjectById(id: string) {
	return await prisma.project.findUnique({
		where: { id },
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
}

export async function generateStaticParams() {
	const projects = await getAllProjects();

	return projects.map(project => ({
		work: project.slug,
	}));
}
