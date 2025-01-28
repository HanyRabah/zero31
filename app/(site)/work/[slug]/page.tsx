// app/work/[work]/page.tsx
import ProjectSection from "@/components/projects";
import HeroImage from "@/components/projects/HeroImage";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { getAllProjects, getProject } from "@/lib/projects";
import type { ProjectSection as ProjectSectionProps } from "@/types/dashboard";
import { Project } from "@/types/dashboard";
import { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () => {
	const projects = await getAllProjects();
	return projects.map(project => ({
		slug: project.slug,
	}));
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params;
	const project = await getProject(slug);

	return {
		title: project.title || project.clientName || "Work",
		description:
			project.description ||
			"Explore our diverse portfolio of projects, showcasing our expertise and commitment to excellence in every endeavor.",
	};
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { slug } = await params;
	const project = await getProject(slug);

	return (
		<main className="flex-grow pt-[72px]">
			<HeroImage image={project.heroImage} alt={project.heroImageAlt} />
			<ProjectDetails project={project as Project} />
			<ProjectSection sections={project.sections as ProjectSectionProps[]} />
		</main>
	);
}
