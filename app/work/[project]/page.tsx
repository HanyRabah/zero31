import HeroImage from "@/components/sections/HeroImage";
import ProjectDetails from "@/components/sections/ProjectDetails";
import { projects } from "@/config/projects/projects";
import { Metadata } from "next";

type Params = Promise<{ projectName: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { projectName } = await params;
	const projectData = projects[projectName];

	return {
		title: projectData?.title || projectData?.clientName || "Work",
		description:
			projectData?.description ||
			"Explore our diverse portfolio of projects, showcasing our expertise and commitment to excellence in every endeavor.",
	};
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { projectName } = await params;
	const projectData = projects[projectName];
	if (!projectData) {
		return null;
	}
	return (
		<main className="flex-grow pt-[72px]">
			<HeroImage image={projectData.heroImage} alt={projectData.heroImageAlt} />
			{/* Project-specific content */}
			<ProjectDetails projectData={projectData} />
		</main>
	);
}
