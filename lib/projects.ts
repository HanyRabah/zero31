// lib/projects.ts
import { unstable_cache } from "next/cache";
import { prisma } from "../lib/prisma";

// Use unstable_cache with revalidation tags and a short TTL
export const getProject = async (slug: string) => {
	return unstable_cache(
		async () => {
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
					return null; // Handle notFound() at the component level
				}

				return project;
			} catch (error) {
				console.error("Error fetching project:", error);
				throw new Error("Failed to fetch project");
			}
		},
		[`project-${slug}`],
		{
			tags: [`project-${slug}`, "projects-list"],
			revalidate: 10, // Revalidate after 10 seconds
		}
	)();
};

export const getAllProjects = async () => {
	return unstable_cache(
		async () => {
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
		},
		["all-projects"],
		{
			tags: ["projects-list"],
			revalidate: 10, // Revalidate after 10 seconds
		}
	)();
};

export async function getProjectById(id: string) {
	return unstable_cache(
		async () => {
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
		},
		[`project-id-${id}`],
		{
			tags: [`project-${id}`, "projects-list"],
			revalidate: 10, // Revalidate after 10 seconds
		}
	)();
}

export async function generateStaticParams() {
	const projects = await getAllProjects();

	return projects.map(project => ({
		work: project.slug,
	}));
}
